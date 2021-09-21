const multer = require("multer");

const storagexls = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `.${process.env.DIR_XLS_DEFAULT}`);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const storage = (type) => {
  const imagefilter = ["png", "jpg"];
  const dir_save =
    type.toString() === "xls" || type.toString() === "xlsx"
      ? process.env.DIR_XLS_DEFAULT
      : imagefilter.includes(type.toString())
      ? process.env.DIR_AVATAR_DEFAULT
      : new Error("ERROR DIRECTORY STORAGE");
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `.${dir_save}`);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    },
  });
};

const fileFilterXls = (req, file, cb) => {
  // reject a file
  if (
    ["xls", "xlsx"].indexOf(
      file.originalname.split(".")[file.originalname.split(".").length - 1]
    ) > -1
  ) {
    cb(null, true);
  } else {
    cb(new ErrorHandler(400, "Wrong file type, must be .xls or xlsx"), false);
  }
};

const fileFilterImage = (req, file, cb) => {};

const uploadFile = ({ type = null }) => {
  const imagefilter = ["png", "jpg"];
  const filterfile =
    type.toString() === "xls" || type.toString() === "xlsx"
      ? fileFilterXls
      : imagefilter.includes(type.toString())
      ? fileFilterImage
      : null;

  return multer({
    storage: storage(type),
    fileFilter: filterfile,
  });
};
module.exports = { uploadFile };
