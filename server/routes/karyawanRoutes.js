const express = require("express");
const { uploadFile } = require("../middleware/uploadfile");
const {
    getAllKaryawan,
    importKaryawans,
} = require("../controllers/karyawanController");

const router = require("express-promise-router")();

router
    .route("/karyawan_import")
    .get(getAllKaryawan)
    .post(uploadFile({ type: "xls" }).single("import"), importKaryawans);

module.exports = router;
