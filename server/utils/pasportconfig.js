const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/UserModel");
const { setLogs } = require("../controllers/logcontroller");

// JSON WEB TOKEN Strategy
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
        },
        async (payload, done) => {
            console.log(payload);
            try {
                //find the user specified in token
                const user = User.findById(payload.sub);
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
);

//LOCAL Strategy

passport.use(
    new LocalStrategy(
        {
            //Username and Password
            usernameField: "username",
        },
        async (username, password, done) => {
            try {
                //find the user given the username
                const user = await User.findOne({ username });

                //if not handle it
                if (!user) {
                    setLogs({
                        user: username,
                        action: "/signin",
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
                done(error, false);
            }
        }
    )
);
