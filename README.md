# SeruputinAja

Aplikasi web pemesanan dan kasir kedai kopi yang ringan, cepat, dan mudah digunakan untuk mengelola transaksi pelanggan secara langsung.

SeruputinAja adalah sistem pemesanan dan point-of-sale (POS) berbasis web yang dirancang dengan antarmuka hangat dan sederhana. Aplikasi ini menghubungkan pengalaman pemesanan mandiri oleh pelanggan dengan operasional kasir secara real-time tanpa memerlukan konfigurasi backend yang rumit.

Aplikasi ini berjalan langsung di browser dengan penyimpanan lokal untuk mencatat pesanan, antrean, hingga riwayat penjualan.

## Fitur Utama

- **Katalog & Pemesanan Pelanggan:** Menampilkan daftar menu lengkap dengan pencarian, keranjang belanja interaktif, dan halaman checkout.
- **Manajemen Antrean Kasir:** Memantau pesanan masuk secara real-time, konfirmasi status pembayaran, serta memperbarui status penyajian hingga selesai.
- **Buat Pesanan Manual:** Memudahkan kasir mencatat pesanan langsung di tempat dengan opsi tipe pesanan (Dine In / Take Away) dan metode pembayaran (Tunai / QRIS).
- **Daftar Menu Operasional:** Tampilan katalog cepat untuk membantu kasir mengecek ketersediaan dan harga menu saat melayani pelanggan.
- **Riwayat & Rekap Penjualan:** Mencatat seluruh transaksi yang telah selesai beserta total penjualan harian yang terakumulasi.
- **Sinkronisasi Penyimpanan Lokal:** Data pesanan tersimpan otomatis di `localStorage` dan tersinkronisasi secara langsung antar-tab/halaman.
- **Responsive:** Tampilan menyesuaikan layar desktop, tablet, maupun perangkat mobile.

## Teknologi

| Teknologi | Kegunaan |
| :--- | :--- |
| React (Vite) | Framework utama & pengelolaan komponen UI |
| React Router | Navigasi halaman pelanggan dan panel kasir |
| Tailwind CSS | Styling antarmuka dan tata letak responsif |
| JavaScript | Logika aplikasi, keranjang, dan perhitungan transaksi |
| LocalStorage API | Penyimpanan dan sinkronisasi data pesanan secara lokal |

## Konsep

SeruputinAja mengusung konsep alur kerja terpadu dalam satu aplikasi web: pelanggan dapat memesan dengan nyaman dari katalog utama, sementara kasir memiliki panel operasional tersendiri yang fokus pada kecepatan pencatatan, pemantauan antrean, dan pencatatan riwayat transaksi.

---

**SeruputinAja**  
*Hangatkan Harimu, Satu Seduhan Setiap Waktu.*