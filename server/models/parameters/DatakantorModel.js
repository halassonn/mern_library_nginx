const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataKantorSchema = new Schema(
  {
    kode: {
      type: String,
      required: true,
      unique: true,
    },
    pusat: {
      type: Boolean,
      required: true,
      default: false,
    },
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    alamat: {
      jalan: { type: String, required: true },
      kelurahan: { type: String, required: true },
      kecamatan: { type: String, required: true },
      kabupaten: { type: String, required: true },
      propinsi: { type: String, required: true },
      negara: { type: String, required: true },
    },
    pimpinan: {
      type: String,
      required: true,
    },
    jabatan: {
      type: String,
      required: true,
    },
    createdBy: { type: String, default: "" },
    updatedBy: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const DataKantor = mongoose.model("datakantors", DataKantorSchema);
module.exports = DataKantor;
