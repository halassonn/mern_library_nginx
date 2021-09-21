const { uploadFile } = require("../middleware/uploadfile");
const {
    getAllKaryawan,
    importKaryawans,
} = require("../controllers/karyawanController");

const router = require("express-promise-router")();

router.route("/").get(getAllKaryawan);
router
    .route("/import")
    .post(uploadFile({ type: "xls" }).single("import"), importKaryawans);

module.exports = router;
