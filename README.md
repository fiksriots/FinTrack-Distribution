# FinTrack Distribution

Website unduhan aplikasi FinTrack untuk Android. Identitas visual mengikuti aplikasi: amber `#FBBF24`, latar hitam `#121212`, dan logo FinTrack.

## Isi website

- Tombol unduhan APK langsung dari GitHub Releases.
- Versi, ukuran file, tanggal rilis, checksum SHA-256, dan empat rilis terbaru diperbarui dari API GitHub saat halaman dibuka.
- Jika API tidak tersedia atau terkena rate limit, halaman tetap menampilkan rilis v8.9.3 yang diverifikasi pada 9 November 2026, disertai pemberitahuan dan tautan semua rilis.
- Panduan instalasi, penjelasan fitur, dan FAQ dalam bahasa Indonesia.
- Tampilan responsif tanpa framework atau dependensi build. Tampilan ponsel pada hero mengikuti capture aplikasi, dengan tab interaktif Riwayat, Grafik, Laporan, dan Saya, serta tombol + untuk pratinjau Tambah Transaksi. Laporan memiliki pilihan Analisis/Rekening dengan ringkasan kekayaan bersih, aset, dan liabilitas. Pratinjau transaksi mendukung pilihan jenis, dompet, kategori, dan contoh Rincian Barang tanpa menyimpan transaksi. Semua profil dan nominal memakai data fiktif; capture asli yang memuat data pribadi tidak disertakan. Navigasi tab mendukung klik dan tombol panah keyboard.

## Menjalankan lokal

Jalankan `python -m http.server 8000` dari folder website, lalu buka `http://localhost:8000`.

## Hosting

Publikasikan `index.html`, `style.css`, `app.js`, dan folder `assets` bersama-sama pada hosting statis. Untuk GitHub Pages, buka **Settings → Pages**, pilih **Deploy from a branch**, lalu **main / (root)**. Pengaturan Pages perlu diaktifkan pada repositori.

Pada checkout Sites, file website disalin ke `dist/`; konfigurasi hosting Sites disimpan terpisah dari repositori distribusi.

## Memperbarui aplikasi

Buat GitHub Release stabil baru di repositori ini dan unggah APK bernama `fintrack.apk`. Halaman otomatis menggunakan rilis stabil terbaru yang menyertakan APK. Jika persyaratan minimum Android berubah, perbarui teks persyaratan di `index.html`. Perbarui juga metadata cadangan di HTML saat diperlukan.

Sumber distribusi: https://github.com/fiksriots/FinTrack-Distribution/releases

© 2026 FinTrack · fikriots.id
