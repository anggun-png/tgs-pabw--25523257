export const profil = {
  nama: "Anggun Dwi Suryaningrum",
  nim: "25523257",
  peran: "Mahasiswa yang menyukai musik",
  keahlian: ["HTML", "CSS", "JavaScript"]
};

export function buatPerkenalan({ nama, peran }) {
  return `Halo, saya ${nama}, ${peran}.`;
}

export const formatKeahlian = (daftar) => {
  return daftar.join(" · ");
};

export function saring(daftar, kategori) {
  if (kategori === "semua") {
    return daftar;
  }

  if (kategori === "kosong") {
    return [];
  }

  return daftar.filter((proyek) => {
    return proyek.kategori === kategori;
  });
}
