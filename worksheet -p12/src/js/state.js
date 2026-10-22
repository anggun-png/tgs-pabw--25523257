
import { render } from "./dom.js";

const KUNCI = "pabw-p11";
const VERSI = 2;

export const state = {
  daftarProyek: [],
  kategoriAktif: "semua",
  favorit: []
};

export function isiProyek(daftar) {
  state.daftarProyek = daftar;
  render(state);
}

export function ubahKategori(kategori) {
  state.kategoriAktif = kategori;
  simpan(state);
  render(state);
}

export function ubahFavorit(id) {
  const idProyek = Number(id);

  if (state.favorit.includes(idProyek)) {
    state.favorit = state.favorit.filter(
      (item) => item !== idProyek
    );
  } else {
    state.favorit.push(idProyek);
  }

  simpan(state);
  render(state);
}

export function simpan(state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: state.kategoriAktif,
    favorit: state.favorit
  };

  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));

    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI);
      return null;
    }

    return isi;
  } catch {
    localStorage.removeItem(KUNCI);
    return null;
  }
}

export function pulihkan(isi) {
  if (!isi || isi.versi !== VERSI) return;

  if (
    ["semua", "selesai", "proses", "kosong"].includes(
      isi.kategoriAktif
    )
  ) {
    state.kategoriAktif = isi.kategoriAktif;
  }

  if (Array.isArray(isi.favorit)) {
    state.favorit = isi.favorit
      .map(Number)
      .filter((id) => Number.isFinite(id) && id > 0);
  }
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = "semua";
  state.favorit = [];
  render(state);
}
