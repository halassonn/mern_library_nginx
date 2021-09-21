/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   KaryawanModel.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 09:51:34 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 10:07:27 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require("mongoose");
// const slugify = require("slugify");

const KaryawanSchema = new mongoose.Schema(
    {
        nik: {
            type: String,
            required: [true, "Nik cannot be empty"],
        },
        no_ktp: {
            type: String,
            required: [true, "No KTP cannot be empty"],
        },
        npwp: {
            type: String,
            default: "",
        },
        nama: {
            type: String,
            required: [true, "Nama cannot be empty"],
        },
        alamat_domisili: {
            type: Object,
            required: [true, "Alamat Domisili cannot be empty"],
            default: {
                sesuaiktp: { type: Boolean },
                alamat: {
                    type: String,
                    requiredPaths: [true, "Alamat Domisili cannot be empty"],
                },
            },
        },
        alamat_ktp: {
            type: Object,
            required: [true, "Alamat KTP cannot be empty"],
            default: {
                alamat: {
                    type: String,
                    requiredPaths: [true, "Alamat Domisili cannot be empty"],
                },
                kecamatan: {
                    type: String,
                    requiredPaths: [true, "Kecamatan cannot be empty"],
                },
                kota_kab: {
                    type: String,
                    requiredPaths: [true, "Kota/Kab cannot be empty"],
                },
                propinsi: {
                    type: String,
                    requiredPaths: [true, "Propinsi cannot be empty"],
                },
                negara: {
                    type: String,
                    requiredPaths: [true, "Negara cannot be empty"],
                },
                kode_pos: {
                    type: String,
                    requiredPaths: [true, "Kodepos cannot be empty"],
                },
            },
        },
        email: {
            type: String,
            required: [true, "Email cannot be empty"],
        },
        lahir: {
            type: Object,
            required: true,
            default: {
                tempat_lahir: {
                    type: String,
                    requiredPaths: [true, "Tempat Lahir cannot be empty"],
                },
                tanggal_lahir: {
                    type: String,
                    requiredPaths: [true, "Tanggal Lahir cannot be empty"],
                },
            },
        },
        jenis_kelamin: {
            type: String,
            required: [true, "Jenis Kelamin cannot be empty"],
        },
        agama: {
            type: String,
            required: [true, "Agama cannot be empty"],
        },
        status_kawin: {
            type: String,
            required: [true, "Status Kawin cannot be empty"],
        },
        no_hp: {
            type: String,
            maxlength: 12,
        },
        usia: {
            type: String,
            default: "",
        },
        jenis_karyawan: {
            type: String,
            required: [true, "Jenis Karyawan cannot be empty"],
        },
        kantor: {
            type: String,
            required: [true, "Kode Kantor cannot be empty"],
        },
        divisi: {
            type: String,
        },
        jabatan_aktif: {
            type: Object,
            required: [true, "Jabatan cannot be empty"],
            default: {
                kode: { type: String, requiredPaths: true },
                desc: { type: String, requiredPaths: true },
            },
        },

        tgl_bergabung: {
            type: Date,
            required: [true, "Tanggal Bergabung cannot be empty"],
        },
        masa_kerja: {
            type: Object,
            default: {
                tahun: 0,
                bulan: 0,
                hari: 0,
            },
        },
        status_karyawan: {
            type: Boolean,
            required: [true, "Status Karyawan cannot be empty"],
            default: false,
        },
        avatar: {
            type: String,
        },
        createdBy: { type: String, default: "" },
        updatedBy: { type: String, default: "" },
    },
    { timestamps: true, versionKey: false }
);

KaryawanSchema.pre("save", async function (next) {
    try {
        this.masa_kerja = masakerja(this.tgl_bergabung);
        this.usia = usia(this.lahir.tanggal_lahir);
        next();
    } catch (error) {
        next(error);
    }
});
KaryawanSchema.pre("findByIdAndUpdate", async function (next) {
    try {
        this.masa_kerja = masakerja(this.tgl_bergabung);
        this.usia = usia(this.lahir.tanggal_lahir);
        next();
    } catch (error) {
        next(error);
    }
});

const Karyawan = mongoose.model("karyawan_tables", KaryawanSchema);
module.exports = Karyawan;
