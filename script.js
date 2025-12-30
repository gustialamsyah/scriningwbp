// Database sederhana untuk statistik
let dataStatistik = { rendah: 0, sedang: 0, tinggi: 0 };

function prosesSkrining() {
  // 1. Ambil Data Input
  const nama = document.getElementById("nama").value.trim();
  const alamat =
    document.getElementById("alamat").value.trim() || "Tidak disebutkan";
  const blok = document.getElementById("blok").value.trim();
  const catatan = document.getElementById("catatan").value.trim();

  // 2. Validasi Input
  if (!nama || !blok) {
    alert("Mohon lengkapi Nama Warga Binaan dan Blok Hunian.");
    return;
  }

  // 3. Ambil Nilai Parameter & Hitung Total
  const f = parseInt(document.getElementById("fisik").value) || 0;
  const p = parseInt(document.getElementById("psiko").value) || 0;
  const b = parseInt(document.getElementById("perilaku").value) || 0;
  const total = f + p + b;

  // 4. Logika Penentuan Risiko & Styling
  let hasil = {
    status: "",
    warna: "",
    warnaBadge: "",
    indikasi: "",
    saran: "",
  };

  if (total <= 10) {
    hasil = {
      status: "RISIKO RENDAH",
      warna: "border-green-500 bg-green-50/50",
      warnaBadge: "bg-green-600 text-white",
      indikasi:
        "Warga binaan menunjukkan kondisi fisik dan psikologis yang stabil. Interaksi sosial di lingkungan blok berjalan dengan normal tanpa tanda-tanda agresi.",
      saran:
        "Lanjutkan pembinaan rutin dan sertakan dalam kegiatan kemandirian/kerohanian terjadwal.",
    };
    dataStatistik.rendah++;
  } else if (total <= 20) {
    hasil = {
      status: "RISIKO SEDANG",
      warna: "border-yellow-500 bg-yellow-50/50",
      warnaBadge: "bg-yellow-500 text-white",
      indikasi:
        "Terdeteksi adanya fluktuasi emosional atau perubahan perilaku. Perlu perhatian pada pola interaksi dengan sesama warga binaan.",
      saran:
        "Lakukan konseling face-to-face oleh wali pemasyarakatan dan observasi ketat oleh petugas blok dalam 3 hari ke depan.",
    };
    dataStatistik.sedang++;
  } else {
    hasil = {
      status: "RISIKO TINGGI",
      warna: "border-red-500 bg-red-50/50",
      warnaBadge: "bg-red-600 text-white",
      indikasi:
        "WBP menunjukkan gejala kritis baik secara fisik maupun perilaku yang berisiko mengganggu keamanan dan ketertiban lapas.",
      saran:
        "SEGERA lakukan sterilisasi, tempatkan di kamar isolasi observasi, dan koordinasikan dengan tim medis/KPLP.",
    };
    dataStatistik.tinggi++;
  }

  // 5. Update UI (Hasil Analisis)
  document.getElementById("placeholder-text").classList.add("hidden");
  const container = document.getElementById("hasil-container");
  container.classList.remove("hidden");

  // Efek Scroll Otomatis ke Hasil (Khusus Mobile)
  if (window.innerWidth < 1024) {
    container.scrollIntoView({ behavior: "smooth" });
  }

  // Update Identitas
  document.getElementById("out-nama").innerText = nama.toUpperCase();
  document.getElementById(
    "out-identitas"
  ).innerText = `Asal : ${alamat} | Blok : ${blok}`;
  document.getElementById("out-skor").innerText = total;

  // Gabungkan Indikasi Standar dengan Catatan Petugas
  document.getElementById("out-indikasi").innerText = catatan
    ? `${hasil.indikasi} \n\nCatatan Tambahan Petugas: "${catatan}"`
    : hasil.indikasi;

  document.getElementById("out-rekomendasi").innerText = hasil.saran;

  // Update Badge & Border Box (Tampilan Layar)
  const badge = document.getElementById("risiko-badge");
  badge.innerText = hasil.status;
  badge.className = `absolute top-4 right-4 px-4 py-1 rounded-full font-black text-[10px] uppercase shadow-md z-10 no-print ${hasil.warnaBadge}`;

  document.getElementById(
    "status-border"
  ).className = `relative group transition-all duration-700 bg-white p-6 rounded-2xl shadow-sm border-2 print:border-none print:p-0 ${hasil.warna}`;

  // 6. Update Dashboard Statistik
  updateDashboard();
}

function updateDashboard() {
  document.getElementById("stat-rendah").innerText = dataStatistik.rendah;
  document.getElementById("stat-sedang").innerText = dataStatistik.sedang;
  document.getElementById("stat-tinggi").innerText = dataStatistik.tinggi;
}

function cetakLaporan() {
  // 1. Ambil Tanggal Saat Ini
  const d = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const tanggalIndo = d.toLocaleDateString("id-ID", options);

  // 2. Masukkan ke elemen tanggal (Bawah & Atas)
  const printDateElement = document.getElementById("print-date");
  const printDateTopElement = document.getElementById("print-date-top");

  if (printDateElement) printDateElement.innerText = tanggalIndo;
  if (printDateTopElement) printDateTopElement.innerText = tanggalIndo;

  // 3. Panggil Fungsi Print Browser
  window.print();
}
