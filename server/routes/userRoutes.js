const { Login, Logout } = require("../controllers/userController");
const router = require("express-promise-router")();

const {
    loginpassport,
    passportaccesstoken,
    veryfyRefreshTokenonRedis,
    verifyAccessToken,
    verify_X_API_KEY,
} = require("../middleware/authMiddleware");

router.route("/login").post([verify_X_API_KEY, loginpassport], Login);
router.route("/logout").post([verify_X_API_KEY,passportaccesstoken], Logout);

module.exports = router;
