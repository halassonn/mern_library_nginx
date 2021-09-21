const express = require("express");
const router = express.Router();

const user_auth = require("./userRoutes");
const karyawan = require("./karyawanRoutes");

router.use("/user", user_auth);
router.use("/karyawan", karyawan);
// router.use("/home", home);

module.exports = router;