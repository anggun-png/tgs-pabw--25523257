
import "./events.js";
import { ambilProyek } from "./api.js";
import {
  state,
  isiProyek,
  muat,
  pulihkan
} from "./state.js";
import {
  aturMemuat,
  tampilkanGalat
} from "./dom.js";

window.simpanLagu = function (judul, artis, genre) {
  const section = document.querySelector("#recents");

  if (!section) return;

  let daftar = document.querySelector("#daftarLaguTersimpan");

  if (!daftar) {
    daftar = document.createElement("ul");
    daftar.id = "daftarLaguTersimpan";
    section.appendChild(daftar);
  }

  const item = document.createElement("li");
  const namaLagu = document.createElement("strong");
  const detailLagu = document.createElement("p");

  namaLagu.textContent = judul;
  detailLagu.textContent = artis + " — " + genre;

  item.append(namaLagu, detailLagu);
  daftar.appendChild(item);
};

async function mulai() {
  pulihkan(muat());
  aturMemuat(true);

  try {
    const data = await ambilProyek();
    isiProyek(data);
  } catch (galat) {
    tampilkanGalat(
      "Data gagal dimuat. Periksa koneksi, lalu muat ulang."
    );
    console.error(galat);
  } finally {
    aturMemuat(false);
  }
}

mulai();
