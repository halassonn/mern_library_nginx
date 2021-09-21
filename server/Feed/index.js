/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 10:22:57 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 10:22:59 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const Jabatan = require("../models/parameters/JabatanModel");
const jabatan = [
    { kode_tingkat_jabatan: "1", kode: "1MP285", desc: "Komisaris Utama" },
    { kode_tingkat_jabatan: "1", kode: "1MP358", desc: "Komisaris" },
    { kode_tingkat_jabatan: "2", kode: "2MP857", desc: "Direktur Utama" },
    {
        kode_tingkat_jabatan: "2",
        kode: "2MP925",
        desc: "Direktur Membawahi Fungsi Kepatuhan/APU PPT",
    },
    { kode_tingkat_jabatan: "3", kode: "3MG204", desc: "Pimpinan Cabang" },
    { kode_tingkat_jabatan: "3", kode: "3PB120", desc: "Kabag Pembukuan" },
    { kode_tingkat_jabatan: "3", kode: "3KU138", desc: "Kabag Keuangan" },
    { kode_tingkat_jabatan: "3", kode: "3KR697", desc: "Kabag Kredit" },
    {
        kode_tingkat_jabatan: "3",
        kode: "3MG204",
        desc: "Satuan Pengawas Internal (SPI)",
    },

    { kode_tingkat_jabatan: "4", kode: "4PB178", desc: "Kasubag Pembukuan" },
    { kode_tingkat_jabatan: "4", kode: "4KU254", desc: "Kasubag Keuangan" },
    { kode_tingkat_jabatan: "4", kode: "4KR272", desc: "Kasubag Kredit" },

    { kode_tingkat_jabatan: "5", kode: "5PB302", desc: "Adm Pembukuan" },
    { kode_tingkat_jabatan: "5", kode: "5KR888", desc: "Account Officer / AO" },
    { kode_tingkat_jabatan: "5", kode: "5KR471", desc: "Adm Kredit" },
    { kode_tingkat_jabatan: "5", kode: "5KU253", desc: "Kasir" },
    { kode_tingkat_jabatan: "5", kode: "5KU649", desc: "Customer Service" },

    { kode_tingkat_jabatan: "6", kode: "6PB357", desc: "Driver" },
    { kode_tingkat_jabatan: "6", kode: "6PB638", desc: "Cleaning Service" },
    { kode_tingkat_jabatan: "6", kode: "6PB383", desc: "Security" },
];

const Feeding = async () => {
    //feed jabatan parameter
    console.log("feed parameter jabatan ======>");

    const ex = await Jabatan.find({});

    if (ex.length === 0)
        Jabatan.collection
            .insertMany(jabatan)
            .then((res) => {
                console.log("insert Parameter Jabatan Success");
            })
            .catch((error) => {
                console.log("Insert Paramater Jabatan is  Failed", error);
            });
};

module.exports = Feeding;