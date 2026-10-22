
import { saring } from "./data.js";

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#kosong");
const memuat = document.querySelector("#muat");
const galat = document.querySelector("#galat");

export function buatKartu(proyek, favorit = []) {
  const li = document.createElement("li");
  li.className = "kartu";

  const judul = document.createElement("h3");
  judul.textContent = proyek.judul;

  const tahun = document.createElement("p");
  tahun.textContent = "Tahun: " + proyek.tahun;

  const status = document.createElement("p");
  status.textContent = proyek.selesai
    ? "Status: Selesai"
    : "Status: Dalam Proses";

  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className = "favorit";
  tombol.dataset.id = proyek.id;
  tombol.textContent = favorit.includes(proyek.id) ? "★" : "☆";
  tombol.setAttribute(
    "aria-label",
    "Tandai proyek sebagai favorit"
  );

  li.append(judul, tahun, status, tombol);

  return li;
}

export function render(state) {
  wadah.textContent = "";

  const daftar = saring(
    state.daftarProyek,
    state.kategoriAktif
  );

  document.querySelectorAll("#filter button").forEach((tombol) => {
    tombol.classList.toggle(
      "aktif",
      tombol.dataset.kategori === state.kategoriAktif
    );
  });

  if (daftar.length === 0) {
    kosong.textContent = "Belum ada proyek pada kategori ini.";
    kosong.hidden = false;
    return;
  }

  kosong.hidden = true;

  daftar.forEach((proyek) => {
    wadah.append(buatKartu(proyek, state.favorit));
  });
}

export function aturMemuat(aktif) {
  memuat.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
  galat.textContent = pesan;
  galat.hidden = false;
}
