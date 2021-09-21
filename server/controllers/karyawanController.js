/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   karyawanController.js                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 09:51:02 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 13:08:15 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const Karyawan = require("../models/KaryawanModel");
const Jabatan = require("../models/parameters/JabatanModel");
const AsyncManager = require("../utils/asyncManager");
const LibraryError = require("../utils/libraryError");
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const fs = require("fs");
const { masakerja } = require("../utils");
const Joi = require("@hapi/joi");
const { KarywanSchemaImport } = require("../joivalidation/karyawanimport");
const { setLogs } = require("../controllers/logcontroller");

// $-title   Get Data Karyawan
// $-path    GET /api/v1/karyawans
// $-auth    Public
exports.getAllKaryawan = AsyncManager(async (req, res, next) => {
    const karyawans = await Karyawan.find();
    return res.status(200).json(karyawans);
});

// $-title   Import Data Karyawan
// $-path    Post /api/v1/karyawans
// $-auth    Public
exports.importKaryawans = AsyncManager(async (req, res, next) => {
    console.log("import Karyawans");
    var host = req.protocol + "://" + req.get("host").split("/")[0];
    console.log(req.files);

    const file = req.file.path;
    const user = req.user;
    const kantor = user !== undefined ? user.kode_kantor : 587;
    const namauser = user !== undefined ? user.nama : "Halasson";

    if (!file) {
        return next(new LibraryError(`No File Choosed`, 404));
    }

    if (file.split(".")[file.split(".").length - 1] === "xlsx") {
        exceltojson = xlsxtojson;
    } else {
        exceltojson = xlstojson;
    }
    exceltojson(
        {
            input: file,
            output: null, //since we don't need output.json
            lowerCaseHeaders: true,
        },
        async function (err, result) {
            if (err) {
                throw new ErrorHandler(400, err);
            }
            data = result;
            fs.unlink(file, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });

            const jb = await Jabatan.find({}, { _id: 0, kode: 1, desc: 1 });
            const dataupload = data.map((ed) => ({
                nik: ed.nik,
                no_ktp: ed.no_ktp,
                npwp: ed.npwp,
                nama: ed.nama,
                alamat_domisili: {
                    sesuaiktp:
                        ed.alamat_domisili_sesuaiktp === "1" ? true : false,
                    alamat: ed.alamat_domisili,
                },
                alamat_ktp: {
                    alamat: ed.alamat_ktp,
                    kecamatan: ed.kecamatan_ktp,
                    kota_kab: ed.kota_kab_ktp,
                    propinsi: ed.propinsi_ktp,
                    negara: ed.negara_ktp,
                    kode_pos: ed.kodepos_ktp,
                },
                email: ed.email,
                lahir: {
                    tempat_lahir: ed.tempat_lahir,
                    tanggal_lahir: ed.tanggal_lahir,
                },
                jenis_kelamin: ed.jenis_kelamin,
                agama: ed.agama,
                status_kawin: ed.status_kawin,
                jenis_karyawan: ed.jenis_karyawan,
                kantor: ed.kantor,
                tgl_bergabung: ed.tgl_bergabung,
                status_karyawan: ed.status_karyawan === "1" ? true : false,
                no_hp: ed.no_hp,
                jabatan_aktif: jb.filter(
                    (x) => x.kode.toString() === ed.kode_jabatan.toString()
                )[0],
                masa_kerja:
                    ed.jenis_karyawan === "H"
                        ? { tahun: 0, bulan: 0, hari: 0 }
                        : masakerja(ed.tgl_bergabung),
                avatar: `${host}${process.env.DIR_AVATAR_DEFAULT}${process.env.AVATAR_DEFAULT}`,
            }));

            const v = Joi.array().items(KarywanSchemaImport);
            await v
                .validateAsync(dataupload, { abortEarly: false })
                .then(async (resv) => {
                    await Karyawan.deleteMany();
                    await Karyawan.collection
                        .insertMany(resv)
                        .then((dd) => {
                            setLogs({
                                user: namauser,
                                kantor: kantor,
                                action: `import data karyawan`,
                                method: req.method,
                                status_code: res.statusCode,
                                ket: `SUCCESS`,
                            });
                            console.log(dd);
                            return res.status(200).json(dd);
                        })
                        .catch((error) => {
                            next(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                    const er = {
                        message: `Data Tidak Valid !!! \n ${
                            error.details[0].message
                        } pada baris ${
                            parseInt(
                                error.details[0].path.toString().split(",")[0]
                            ) + 1
                        }`,
                    };
                    next(er);
                });
        }
    );
});
