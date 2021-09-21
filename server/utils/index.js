const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const datenow = new Date();

module.exports = {
  masakerja: (tgl_masuk) => {
    const tglmasuk = new Date(tgl_masuk);
    const day = Math.round((datenow.getTime() - tglmasuk.getTime()) / oneDay);
    const y = Math.trunc(day / 365);
    const sishari = day - y * 365;
    const m = Math.trunc(sishari / 30);
    const h = sishari - m * 30;
    return { tahun: y, bulan: m + 1, hari: h };
  },
  usia: (tglLahir) => {
    var tgllahir = new Date(tglLahir);
    var ageday = Math.round(
      Math.round((datenow.getTime() - tgllahir.getTime()) / oneDay)
    );
    var ageyear = Math.trunc(ageday / 365);
    if (ageyear < 17)
      throw new ErrorHandler(
        400,
        "Tanggal Lahir Salah, Usia Karyawan Min 17 Tahun"
      );
    return ageyear;
  },
  toRibuan: (bilangan, satuan = null, positif = true) => {
    if (bilangan === "" || bilangan === undefined) return "";
    if (positif === true) {
      bilangan = Math.abs(bilangan);
    }
    var reverse = bilangan.toString().split("").reverse().join("");
    var ribuan = reverse.match(/\d{1,3}/g);
    if (bilangan < 0) {
      ribuan = ribuan.join(".").split("").reverse().join("");
      ribuan = `(${ribuan})`;
    } else {
      ribuan = ribuan.join(".").split("").reverse().join("");
    }

    if (satuan) {
      return `${satuan}. ${ribuan}`;
    } else {
      return ribuan;
    }
  },
};
