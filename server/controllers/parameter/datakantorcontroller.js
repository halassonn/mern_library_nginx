/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   datakantorcontroller.js                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 13:03:29 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 13:07:39 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const DataKantor = require("../../models/parameters/DatakantorModel");
const { setLogs } = require("../logcontroller");

module.exports = {
  getDataKantor: async (req, res, next) => {
    const user = req.user;
    const namauser = user.nama;
    console.log(".........Get Data Kantor ku........");

    await DataKantor.find({})
      .sort({ createdAt: -1, updatedAt: -1 })
      .then((data) => {
        console.log(data);
        setLogs({
          user: namauser,
          action: `get list data Kantor`,
          method: req.method,
          status_code: res.statusCode,
          ket: `SUCCESS`,
        });

        return res.status(200).json({
          success: true,
          msg: null,
          id: "datakantor",
          data: data,
        });
      })
      .catch((err) => {
        console.log("error get data kantor: ", err);
        next(err);
      });
  },
  addDataKantor: async (req, res, next) => {
    const user = req.user;
    const namauser = user.nama;
    console.log(".........Add Data Kantor........");
    console.log(req.body);
    const { kode, nama, email, alamat, pimpinan, pusat, jabatan } = req.body;

    const newDataKantor = new DataKantor({
      kode,
      nama,
      email,
      alamat,
      pimpinan,
      pusat,
      jabatan,
    });

    // res.json([req.body]);
    try {
      await newDataKantor
        .save()
        .then(async (data) => {
          setLogs({
            user: namauser,
            action: `add data Kantor`,
            method: req.method,
            status_code: res.statusCode,
            ket: `SUCCESS`,
          });
          return res.status(201).json({
            msg: "Data Kantor Berhasil Di Simpan",
            status: "scucces",
            statusCode: 200,
            success: true,
            data: newDataKantor,
          });
        })
        .catch((error) => {
          setLogs({
            user: namauser,
            action: `add data kantor`,
            method: req.method,
            status_code: res.statusCode,
            ket: `FAILED`,
          });
          next(error);
        });
    } catch (e) {
      setLogs({
        user: namauser,
        action: `add data kantor`,
        method: req.method,
        status_code: res.statusCode,
        ket: `FAILED`,
      });
      next(e);
    }
  },
  updateDataKantor: async (req, res, next) => {
    const user = req.user;
    const namauser = user.nama;
    const kantor = user.kantor;
    console.log(".........Update Data Karyawan........");
    const { kode } = req.query;
    const { _id, nama, email, alamat, pimpinan, pusat, jabatan } = req.body;
    const existbyid = await DataKantor.findOne({ kode: kode });
    if (!existbyid) {
      throw new ErrorHandler(
        400,
        `Data Kantor dengan Kode ${existbyid.kode} belum terdaftar`
      );
    } else {
      await DataKantor.findOneAndUpdate(
        { kode: kode },
        {
          $set: {
            _id: _id,
            nama: nama,
            email: email,
            alamat: alamat,
            pimpinan: pimpinan,
            pusat: pusat,
            jabatan: jabatan,
            updatedBy: namauser,
          },
        },
        { new: true }
      )
        .then(async (data) => {
          setLogs({
            user: namauser,
            action: `update data kantor`,
            method: req.method,
            status_code: res.statusCode,
            ket: `SUCCESS`,
          });
          res.status(200).json({
            success: true,
            msg: `Data Karywan  ${existbyid.kode} Berhasil Diupdate`,
            data: data,
          });
        })
        .catch((err) => {
          err = err;
          next(err);
        });
    }
  },
  deleteDataKantor: async (req, res, next) => {
    const { kode } = req.query;
    const exist = await DataKantor.findOne({ kode: kode });
    const user = req.user;
    const namauser = user.nama;

    console.log(".........Delete Data Kantor........");

    if (!exist) {
      throw new ErrorHandler(
        400,
        `Data Kantor dengan Kode ${kode} belum terdaftar`
      );
    } else {
      await DataKantor.findOneAndRemove({ kode: kode })
        .then(async () => {
          setLogs({
            user: namauser,
            action: `delete data kantor`,
            method: req.method,
            status_code: res.statusCode,
            ket: `SUCCESS`,
          });
          res.status(200).json({
            success: true,
            msg: `Data Kantor  ${exist.kode} Berhasil Hapus`,
            data: null,
          });
        })
        .catch((err) => {
          err = err;
          next(err);
        });
    }
  },
};
