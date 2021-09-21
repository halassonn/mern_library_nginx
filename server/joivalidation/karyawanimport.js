const Joi = require("@hapi/joi");

module.exports = {
    KarywanSchemaImport: Joi.object().keys({
      kantor: Joi.string().required().messages({
        "string.base": "Kode Kantor Tidak Boleh Kosong",
        "string.empty": "Kode Kantor Tidak Boleh Kosong",
        "any.required": "Kode Kantor Tidak Boleh Kosong",
      }),
      nik: Joi.string().alphanum().length(7).required().messages({
        "string.base": "NIK Tidak Boleh Kosong",
        "string.empty": "NIK Tidak Boleh Kosong",
        "any.required": "NIK Tidak Boleh Kosong",
        "string.alphanum": "NIK Harus Alphanum",
        "string.length": "NIK harus 7 Digit",
      }),
      no_ktp: Joi.string()
        .pattern(/^[0-9]+$/, "numbers")
        .length(16)
        .required()
        .messages({
          "string.base": "No KTP Tidak Boleh Kosong",
          "string.empty": "No KTP Tidak Boleh Kosong",
          "string.pattern": "No KTP harus Angka",
          "string.length": "No KTP harus 16 Digit",
          "any.required": "No KTP Tidak Boleh Kosong",
        }),
      npwp: Joi.any(),
      nama: Joi.string().required().messages({
        "string.base": "Nama Tidak Boleh Kosong",
        "string.empty": "Nama Tidak Boleh Kosong",
        "any.required": "Nama Tidak Boleh Kosong",
      }),
      alamat_ktp: Joi.any(),
      alamat_domisili: Joi.any(),
      email: Joi.any(),
      lahir: Joi.any(),
      jenis_kelamin: Joi.any(),
      agama: Joi.any(),
      status_kawin: Joi.any(),
      status_karyawan: Joi.any(),
      jenis_karyawan:Joi.any(), 
      no_hp: Joi.any(),
      jabatan_aktif:Joi.any(),
      masa_kerja:Joi.any(),
      avatar:Joi.any(),
      tgl_bergabung: Joi.date().raw().required().messages({
        "date.base":
          "Tanggal Bergabung Tidak Boleh Kosong dan Format harus (YYYY-MM-DD)",
        "date.empty":
          "Tanggal Bergabung Tidak Boleh Kosong dan Format harus (YYYY-MM-DD)",
        "any.required":
          "Tanggal Bergabung Tidak Boleh Kosong dan Format harus (YYYY-MM-DD)",
      }),
    }),
    KarywanSchema: Joi.object().keys({
      _id: Joi.any(),
      nik: Joi.string().alphanum().length(7).required().messages({
        "string.base": "NIK Tidak Boleh Kosong",
        "string.empty": "NIK Tidak Boleh Kosong",
        "any.required": "NIK Tidak Boleh Kosong",
        "string.alphanum": "NIK Harus Alphanum",
        "string.length": "NIK harus 7 Digit",
      }),
      no_ktp: Joi.string()
        .pattern(/^[0-9]+$/, "numbers")
        .length(16)
        .required()
        .messages({
          "string.base": "No KTP Tidak Boleh Kosong",
          "string.empty": "No KTP Tidak Boleh Kosong",
          "string.pattern": "No KTP harus Angka",
          "string.length": "No KTP harus 16 Digit",
          "any.required": "No KTP Tidak Boleh Kosong",
        }),
      npwp: Joi.any(),
      nama: Joi.string().required().messages({
        "string.base": "Nama Tidak Boleh Kosong",
        "string.empty": "Nama Tidak Boleh Kosong",
        "any.required": "Nama Tidak Boleh Kosong",
      }),
      alamat_domisili: Joi.string().required().messages({
        "string.base": "Alamat Domisili Tidak Boleh Kosong",
        "string.empty": "Alamat Domisili Tidak Boleh Kosong",
        "any.required": "Alamat Domisili Tidak Boleh Kosong",
      }),
  
      alamat_domisili: Joi.object({
        sesuaiktp: Joi.any(),
        alamat: Joi.string().required().messages({
          "string.base": "Alamat Domisili Tidak Boleh Kosong",
          "string.empty": "Alamat Domisili Tidak Boleh Kosong",
          "any.required": "Alamat Domisili Tidak Boleh Kosong",
        }),
      })
        .required()
        .messages({
          "object.base": `Alamat Domisili Tidak Boleh Kosong dan harus berupa object dan terdiri dari: sesuaiktp dan alamat `,
          "any.required": `Alamat Domisili Tidak Boleh Kosong dan harus berupa object dan terdiri dari: sesuaiktp dan alamat `,
        }),
  
      email: Joi.string().email().required().messages({
        "string.base": "Email Tidak Boleh Kosong",
        "string.empty": "Email Tidak Boleh Kosong",
        "any.required": "Email Tidak Boleh Kosong",
        "string.email": "Format Email Salah",
      }),
  
      jenis_kelamin: Joi.string().valid("L", "P").required().messages({
        "string.base": "Jenis Kelamin Tidak Boleh Kosong",
        "string.empty": "Jenis Kelamin Tidak Boleh Kosong",
        "any.required": "Jenis Kelamin Tidak Boleh Kosong",
        "any.only": "Jenis Kelamin Harus L atau P",
      }),
      agama: Joi.string().required().messages({
        "string.base": "Agama Tidak Boleh Kosong",
        "string.empty": "Agama Tidak Boleh Kosong",
        "any.required": "Agama Tidak Boleh Kosong",
      }),
      status_kawin: Joi.string()
        .valid("TK", "K0", "K1", "K2", "K3")
        .required()
        .messages({
          "string.base": "Status Kawin Tidak Boleh Kosong",
          "string.empty": "Status Kawin Tidak Boleh Kosong",
          "any.required": "Status Kawin Tidak Boleh Kosong",
          "any.only": "Status Kawin Harus Salah Satu dari (TK, K0, K1, K2, K3)",
        }),
      jenis_karyawan: Joi.string()
        .valid("T", "TR", "H", "85")
        .required()
        .messages({
          "string.base": "Jenis Karyawan Tidak Boleh Kosong",
          "string.empty": "Jenis Karyawan Tidak Boleh Kosong",
          "any.required": "Jenis Karyawan Tidak Boleh Kosong",
          "any.only":
            "Jenis Karyawan Harus Salah Satu dari (H=PKWT, TR=Training, T=karyawan Tetap, 85=karyawan 85%)",
        }),
  
      kantor: Joi.string().required().messages({
        "string.base": "Kode Kantor Tidak Boleh Kosong",
        "string.empty": "Kode Kantor Tidak Boleh Kosong",
        "any.required": "Kode Kantor Tidak Boleh Kosong",
      }),
      tgl_bergabung: Joi.date().raw().required().messages({
        "date.base":
          "Tanggal Bergabung Tidak Boleh Kosong dan Format harus (YYYY-MM-DD)",
        "date.empty":
          "Tanggal Bergabung Tidak Boleh Kosong dan Format harus (YYYY-MM-DD)",
        "any.required":
          "Tanggal Bergabung Tidak Boleh Kosong dan Format harus (YYYY-MM-DD)",
      }),
  
      jabatan_aktif: Joi.object({
        kode: Joi.string().required().messages({
          "string.base": "Kode Jabatan Tidak Boleh Kosong",
          "string.empty": "Kode Jabatan Tidak Boleh Kosong",
          "any.required": "Kode Jabatan Tidak Boleh Kosong",
        }),
        desc: Joi.string().required().messages({
          "string.base": "Nama Jabatan Tidak Boleh Kosong",
          "string.empty": "Nama Jabatan Tidak Boleh Kosong",
          "any.required": "Nama Jabatan Tidak Boleh Kosong",
        }),
      })
        .required()
        .messages({
          "object.base": `Kode Jabatan Tidak Boleh Kosong dan harus berupa object dan terdiri dari: kode dan desc `,
          "any.required": `Kode Jabatan Tidak Boleh Kosong dan harus berupa object dan terdiri dari: kode dan desc `,
        }),
  
      kode_pos: Joi.any(),
      no_hp: Joi.any(),
  
      lahir: Joi.object({
        tempat_lahir: Joi.string().required().messages({
          "string.base": "Tempat Lahir Tidak Boleh Kosong",
          "string.empty": "Tempat Lahir Tidak Boleh Kosong",
          "any.required": "Tempat Lahir Tidak Boleh Kosong",
        }),
        tanggal_lahir: Joi.date().raw().required().messages({
          "date.base":
            "Tanggal Lahir Tidak Boleh Kosong dan Format harus (YYYY-MM-DD)",
          "date.empty":
            "Tanggal Lahir Tidak Boleh Kosong dan Format harus (YYYY-MM-DD)",
          "any.required":
            "Tanggal Lahir Tidak Boleh Kosong dan Format harus (YYYY-MM-DD)",
        }),
      })
        .required()
        .messages({
          "object.base":
            "Tempat Tgl Lahir Tidak Boleh Kosong dan harus berupa object yang terdiri dari tempat_lahir,tanggal_lahir",
          "any.required":
            "Tempat Tgl Lahir Tidak Boleh Kosong dan harus berupa object yang terdiri dari tempat_lahir,tanggal_lahir ",
        }),
  
      alamat_ktp: Joi.object({
        alamat: Joi.string().required().messages({
          "string.base": "Jalan Tidak Boleh Kosong",
          "string.empty": "Jalan Tidak Boleh Kosong",
          "any.required": "Jalan Tidak Boleh Kosong",
        }),
        kecamatan: Joi.string().required().messages({
          "string.base": "Kecamatan Tidak Boleh Kosong",
          "string.empty": "Kecamatan Tidak Boleh Kosong",
          "any.required": "Kecamatan Tidak Boleh Kosong",
        }),
        kota_kab: Joi.string().required().messages({
          "string.base": "Kota/Kabupaten Tidak Boleh Kosong",
          "string.empty": "Kota/Kabupaten Tidak Boleh Kosong",
          "any.required": "Kota/Kabupaten Tidak Boleh Kosong",
        }),
        propinsi: Joi.string().required().messages({
          "string.base": "Propinsi Tidak Boleh Kosong",
          "string.empty": "Propinsi Tidak Boleh Kosong",
          "any.required": "Propinsi Tidak Boleh Kosong",
        }),
        negara: Joi.string().required().messages({
          "string.base": "Negara Tidak Boleh Kosong",
          "string.empty": "Negara Tidak Boleh Kosong",
          "any.required": "Negara Tidak Boleh Kosong",
        }),
        kode_pos: Joi.any(),
      })
        .required()
        .messages({
          "object.base":
            "Alamat Tidak Boleh Kosong dan harus berupa object yang terdiri dari jalan,kecamatan,kotakab,propinsi,negara ",
          "any.required":
            "Alamat Tidak Boleh Kosong dan harus berupa object yang terdiri dari jalan,kecamatan,kotakab,propinsi,negara ",
        }),
    }),
  };
  