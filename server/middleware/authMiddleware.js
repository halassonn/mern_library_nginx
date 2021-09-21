const JWT = require("jsonwebtoken");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/UserModel");
const { setLogs } = require("../controllers/logcontroller");

const { redis_client } = require("../database/redisconnect");

const apiKeys = new Map();
apiKeys.set(process.env.X_API_KEY, true);

const loginpassport = passport
  .use(
    new LocalStrategy(
      {
        //Username and Password
        usernameField: "username",
      },
      async (username, password, done) => {
        console.log("user : ", username);
        try {
          //find the user given the username
          const user = await User.findOne({ username });

          //if not handle it
          if (!user) {
            setLogs({
              user: username,
              action: "/login",
              method: "POST",
              status_code: 401,
              ket: "FAILED with error unAuthorized",
            });
            return done(null, false);
          }

          //check if the password is correct
          const isMatch = await user.isValidPassword(password);
          //if not handle it
          if (!isMatch) {
            setLogs({
              user: username,
              action: "/login",
              method: "POST",
              status_code: 401,
              ket: "FAILED with error unAuthorized",
            });
            return done(null, false);
          }
          //otherwise return the user
          setLogs({
            user: username,
            action: "/signin",
            method: "POST",
            status_code: 200,
            ket: "SUCCESS",
          });
          done(null, user);
        } catch (error) {
          console.log(error);
          done(error, false);
        }
      }
    )
  )
  .authenticate("local", { session: false });

const passportaccesstoken = passport
  .use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      },
      async (payload, done) => {
        try {
          //find the user specified in token
          const user = await User.findById(payload.sub);

          //if user doesn't exist, handle it
          if (!user) {
            return done(null, false);
          }

          //otherwise return the users
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  )

  .authenticate("jwt", { session: false });

async function veryfyRefreshTokenonRedis(req, res, next) {
  const token = req.headers["authorization"];
  const user = JWT.verify(token, process.env.JWT_ACCESS_REFRESH_SECRET);
  const { sub } = user;
  try {
    //find the user specified in token
    const user = await User.findById(sub);

    //if user doesn't exist, handle it
    if (!user) {
      return next(null, false);
    }

    //otherwise return the users
    req.user = { ...user, id: user._id };
    next();
  } catch (error) {
    console.log(error);
  }
}
//check access token exist on redis
async function verifyAccessToken(req, res, next) {
  const token = req.headers["authorization"];
  req.token = token;
  await redis_client.get("BL_" + req.user._id, (error, data) => {
    if (error) throw error;
    if (data === token) {
      return res
        .status()
        .json({ success: "false", msg: "your token is blacklist" });
    }

    next();
  });
}

//verify API_KEY from req.header(X-API-KEY)

async function verify_X_API_KEY(req, res, next) {
  const { url, method } = req;
  const apiKey = req.get("X-API-KEY");
  if (apiKey === undefined) {
    const error = new Error("API KEY is Undefined");
    if (url === "/signin" || url === "/signup") {
      setLogs({
        user: req.body.email,
        action: url,
        method: method,
        status_code: 400,
        ket: "FAILED with error API KEY is Undefined",
      });
    } else {
      setLogs({
        user: "USER",
        action: `${method} => ${req.originalUrl}`,
        method: method,
        status_code: 400,
        ket: "FAILED with error API KEY is Undefined",
      });
    }
    next(error);
  }
  if (!apiKeys.has(apiKey)) {
    const error = new Error("Invalid API KEY");
    if (url === "/signin" || url === "/signup") {
      setLogs({
        user: req.body.email,
        action: url,
        method: method,
        status_code: 400,
      });
    } else {
      setLogs({
        user: "USER",
        action: `${method} => ${req.originalUrl}`,
        method: method,
        status_code: 400,
        ket: "FAILED with error Invalid API KEY",
      });
    }

    next(error);
  }
  next();
}

module.exports = {
  loginpassport,
  passportaccesstoken,
  veryfyRefreshTokenonRedis,
  verifyAccessToken,
  verify_X_API_KEY,
};
