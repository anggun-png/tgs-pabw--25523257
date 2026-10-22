
import {
  ubahKategori,
  ubahFavorit,
  aturUlang
} from "./state.js";

const filter = document.querySelector("#filter");
const daftar = document.querySelector("#daftar");
const tombolAturUlang = document.querySelector("#atur-ulang");

filter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button[data-kategori]");
  if (!tombol) return;

  ubahKategori(tombol.dataset.kategori);
});

daftar.addEventListener("click", (event) => {
  const tombol = event.target.closest("button.favorit");
  if (!tombol) return;

  ubahFavorit(tombol.dataset.id);
});

tombolAturUlang?.addEventListener("click", aturUlang);

// Validasi formulir lagu
const formLagu = document.querySelector("#formLagu");
const tombolSimpan = document.querySelector("#tombolSimpan");

const kolomLagu = [
  {
    input: document.querySelector("#song"),
    pesan: document.querySelector("#galat-song"),
    nama: "judul lagu"
  },
  {
    input: document.querySelector("#artis"),
    pesan: document.querySelector("#galat-artis"),
    nama: "artis"
  },
  {
    input: document.querySelector("#genre"),
    pesan: document.querySelector("#galat-genre"),
    nama: "genre"
  }
];

let sudahDikirim = false;

function periksaKolom(kolom, tampilkanGalat = false) {
  const sah = kolom.input.value.trim() !== "";

  if (sah) {
    kolom.input.removeAttribute("aria-invalid");
    kolom.pesan.textContent = "";
    kolom.pesan.classList.remove("tampil");
  } else if (tampilkanGalat) {
    kolom.input.setAttribute("aria-invalid", "true");
    kolom.pesan.textContent =
      "Silakan isi " + kolom.nama + " terlebih dahulu.";
    kolom.pesan.classList.add("tampil");
  }

  return sah;
}

function periksaForm() {
  const semuaSah = kolomLagu.every((kolom) =>
    periksaKolom(kolom, sudahDikirim)
  );

  tombolSimpan.disabled = !semuaSah;
  return semuaSah;
}

kolomLagu.forEach((kolom) => {
  kolom.input.addEventListener("input", periksaForm);
});

formLagu.addEventListener("submit", (event) => {
  event.preventDefault();
  sudahDikirim = true;

  if (!periksaForm()) {
    const bermasalah = kolomLagu.find(
      (kolom) => kolom.input.value.trim() === ""
    );

    bermasalah?.input.focus();
    return;
  }

  window.simpanLagu(
    document.querySelector("#song").value.trim(),
    document.querySelector("#artis").value.trim(),
    document.querySelector("#genre").value.trim()
  );

  formLagu.reset();
  sudahDikirim = false;
  periksaForm();
});

periksaForm();
