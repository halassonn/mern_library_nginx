const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    user: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    method:{
        type: String,
        required: true,
        default:"UNKOWN"
    },
    status_code:{
        type: String,
        required: true,
    },
    ket:{
        type: String,
        required: true,
    },
    createdBy: { type: String, default: "System" },
    updatedBy: { type: String, default: "" },
},{ timestamps: true, versionKey: false })


module.exports = {
  LogApp: mongoose.model("logapps", LogSchema),
};