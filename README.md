# Website Portfolio Pribadi — Syafrida Ade Aulia Hakim

Portfolio modern responsif monorepo untuk **Syafrida Ade Aulia Hakim**, Mahasiswa D4 Sistem Informasi Bisnis di Politeknik Negeri Malang (IPK 3.68 / 4.00), spesialisasi **Business Analysis** dan **Data Analysis**.

Dibangun dengan arsitektur **Monorepo**:
- **Frontend**: React 19 + Vite + Tailwind CSS + Lucide Icons
- **Backend**: Laravel 13 (API-only) + SQLite/MySQL + GitHub GraphQL API Proxy + Visitor Counter

---

## 🎨 Palet Warna (Color Palette)

Sesuai panduan desain, warna yang digunakan murni berasal dari 3 warna dasar berikut serta turunan *tint/opacity*:
- **Deep Blue**: `#09318D` — Digunakan untuk latar Hero, Navbar, dan Footer.
- **Pure White**: `#FFFFFF` — Digunakan untuk latar belakang section konten dan teks kontras.
- **Bubblegum Pink**: `#FD91CC` — Digunakan sebagai aksen utama (tombol, badge status, level kontribusi GitHub, border aktif).

Tipografi memadukan font display **Bricolage Grotesque** dengan font body bersih **Figtree** yang diimpor dari Google Fonts. Kontras warna telah diuji dan memenuhi standar aksesibilitas WCAG AAA/AA serta mendukung `prefers-reduced-motion` dan navigasi fokus keyboard.

---

## 🚀 Fitur Utama

1. **GitHub Contribution Graph (User: `fri17da`)**:
   - Backend memanggil GitHub GraphQL API (`contributionsCollection.contributionCalendar`) menggunakan token `GITHUB_TOKEN` (scope `read:user`), dilengkapi *cache* selama 1 jam (3600 detik).
   - Dilengkapi fallback cerdas yang otomatis menyajikan data kontribusi nyata dari aktivitas publik user `fri17da` jika token belum disetel.
   - Frontend merender heatmap 53 minggu x 7 hari dengan gradasi warna pink bertingkat (`NONE`, `FIRST_QUARTILE`, `SECOND_QUARTILE`, `THIRD_QUARTILE`, `FOURTH_QUARTILE`).
   - Dilengkapi tooltip detail tanggal dan jumlah kontribusi, total kontribusi setahun, skeleton loading saat memuat data, penanganan error dengan tombol coba lagi, serta scroll horizontal pada perangkat mobile.
2. **Visitor Counter (Penghitung Pengunjung Unik)**:
   - Migration tabel `visits` (`id`, `fingerprint` unik SHA-256, `visited_on`, `timestamps`).
   - `POST /api/visit`: Mencatat kunjungan unik berbasis hash SHA-256 (`IP + User-Agent + Tanggal`), dihitung sekali per hari dengan proteksi *rate limiting* (*throttle*).
   - `GET /api/visitors`: Mengembalikan statistik `{ total, today }`.
   - Frontend otomatis mencatat kunjungan saat halaman dimuat dan menampilkan jumlah pengunjung hari ini serta total seluruh kunjungan di footer.
3. **Konfigurasi CORS & Keamanan**:
   - CORS Laravel dikonfigurasi melalui `backend/config/cors.php` dan hanya mengizinkan *origin* frontend yang terdaftar di `.env` (`FRONTEND_URL`).
   - Frontend membaca base URL API dari `.env` (`VITE_API_URL`).
4. **Dokumen CV**:
   - Tersedia tautan langsung ke berkas CV PDF di `public/cv-syafrida.pdf`.

---

## 📁 Struktur Monorepo

```
Web-Portofolio/
├── backend/                  # Laravel 13 API Backend
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── GitHubController.php   # Proxy GitHub GraphQL & Cache 1 Jam
│   │   │   └── VisitController.php    # Visitor Counter & Throttle
│   │   └── Models/
│   │       └── Visit.php              # Model data kunjungan
│   ├── config/
│   │   ├── cors.php                   # Konfigurasi origin CORS
│   │   └── services.php               # Konfigurasi token GitHub
│   ├── database/
│   │   └── migrations/
│   │       └── 2026_11_07_195925_create_visits_table.php
│   ├── routes/
│   │   └── api.php                    # Endpoint API
│   ├── tests/Feature/
│   │   └── PortfolioApiTest.php       # Unit & Feature Test Suite
│   ├── .env.example
│   └── composer.json
│
├── frontend/                 # React (Vite) Frontend
│   ├── public/
│   │   └── cv-syafrida.pdf            # Berkas CV Syafrida Ade Aulia Hakim
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Sticky Navigation Bar
│   │   │   ├── Hero.jsx               # Hero Section & Pitch
│   │   │   ├── GitHubContributionGraph.jsx # Heatmap 53 Minggu x 7 Hari
│   │   │   ├── About.jsx              # Profil & Latar Belakang
│   │   │   ├── Projects.jsx           # Kartu Proyek (FoodFlow, Sukii, OLIM, dll.)
│   │   │   ├── Experience.jsx         # Pengalaman Organisasi
│   │   │   ├── Awards.jsx             # Penghargaan & Prestasi
│   │   │   ├── Skills.jsx             # 5 Kelompok Kemampuan
│   │   │   ├── Footer.jsx             # Kontak & Visitor Counter
│   │   │   └── Icons.jsx              # SVG Icons
│   │   ├── services/
│   │   │   └── api.js                 # Integrasi API Backend
│   │   ├── App.jsx
│   │   ├── index.css                  # Tailwind CSS & Aksesibilitas
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🛠️ Langkah Instalasi & Menjalankan

Pastikan di komputer Anda telah terpasang:
- **PHP >= 8.2** (disarankan PHP 8.4) & **Composer**
- **Node.js >= 18** & **npm**

### 1. Setup Backend (Laravel)

Buka terminal pada folder `backend/`:

```bash
cd backend

# 1. Install dependensi PHP
composer install

# 2. Salin environment file
cp .env.example .env
# Pada Windows PowerShell gunakan:
# Copy-Item .env.example .env

# 3. Generate Application Key
php artisan key:generate

# 4. Install API scaffolding (jika clone fresh repo)
php artisan install:api

# 5. Jalankan migrasi database SQLite
php artisan migrate

# 6. (Opsional) Isi Personal Access Token GitHub Anda di .env
# GITHUB_TOKEN=ghp_your_token_here (scope: read:user)
# Catatan: Backend telah dilengkapi fallback data publik fri17da jika token dikosongkan.

# 7. Jalankan server Laravel backend
php artisan serve --port=8000
```

Backend akan aktif di `http://127.0.0.1:8000`.

### 2. Setup Frontend (React + Vite)

Buka terminal baru pada folder `frontend/`:

```bash
cd frontend

# 1. Install dependensi Node.js
npm install

# 2. Salin environment file
cp .env.example .env
# Pada Windows PowerShell gunakan:
# Copy-Item .env.example .env

# 3. Jalankan server Vite development
npm run dev
```

Frontend akan aktif di `http://127.0.0.1:5173`. Buka alamat tersebut di peramban (browser) Anda.

---

## 🧪 Pengujian (Testing)

### Menjalankan Test Backend

```bash
cd backend
php artisan test
```
*Menguji endpoint visitor counter (kunjungan unik harian, throttle) dan endpoint GraphQL kontribusi GitHub.*

### Menjalankan Build Frontend

```bash
cd frontend
npm run build
```
*Menghasilkan bundle statis produksi di direktori `frontend/dist/`.*

---

## 📡 Daftar Endpoint API Backend

| Metode | URL | Keterangan |
| :--- | :--- | :--- |
| `GET` | `/api/github/contributions` | Mengembalikan riwayat kontribusi 53 minggu x 7 hari user `fri17da` (cache 1 jam) |
| `POST` | `/api/visit` | Mencatat 1 pengunjung unik per hari (SHA-256 IP + User Agent + Tanggal) dengan *throttle* |
| `GET` | `/api/visitors` | Mengembalikan jumlah statistik `{ total, today }` |
| `GET` | `/api/visitors/trend` | Mengembalikan riwayat tren jumlah kunjungan 7 hari terakhir untuk mini line chart |

---

## 👤 Identitas Pemilik Portfolio

- **Nama**: Syafrida Ade Aulia Hakim
- **Pendidikan**: D4 Sistem Informasi Bisnis, Politeknik Negeri Malang (IPK: 3.68 / 4.00)
- **Fokus Keahlian**: Business Analysis & Data Analysis
- **Email**: [syafridaaulia455@gmail.com](mailto:syafridaaulia455@gmail.com)
- **LinkedIn**: [linkedin.com/in/syafrida-ade-aulia-hakim](https://linkedin.com/in/syafrida-ade-aulia-hakim)
- **GitHub**: [github.com/fri17da](https://github.com/fri17da)
