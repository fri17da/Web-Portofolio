/**
 * Data Proyek Portofolio
 * 
 * Mendukung FOTO dan VIDEO:
 * 1. Foto: format .jpg, .png, .webp, dll. (disimpan di /public/projects/<slug>/)
 * 2. Video Langsung: format .mp4, .webm, .mov (disimpan di /public/projects/<slug>/)
 * 3. Video Embed: link YouTube (https://youtu.be/... atau https://youtube.com/watch?v=...) atau Vimeo
 * 
 * Penggunaan:
 * - Bisa ditaruh di `media: [...]` atau `images: [...]`
 * - Otomatis mendeteksi tipe file (jika akhiran .mp4 / link youtube -> otomatis player video)
 */
export const projectsData = [
  {
    slug: 'foodflow',
    title: 'FoodFlow: Sistem Informasi Manajemen Stok dan Gizi pada MBG dan Usaha Katering',
    period: 'PBL Sem 5, Sep 2026 – Sekarang',
    tagline: 'Otomasi perencanaan produksi gizi massal dan sinkronisasi stok gudang katering.',
    images: [
      '/projects/foodflow/1.jpg',
      '/projects/foodflow/2.jpg',
      '/projects/foodflow/3.jpg',
    ],
    contribution: [
      'Memimpin analisis proses bisnis, penyusunan ERD komprehensif, dan manajemen timeline proyek.',
      'Merancang modul perencanaan produksi dan kalkulasi bahan baku dengan algoritma konversi satuan otomatis.',
      'Mengembangkan manajemen formulasi menu & resep serta visualisasi analitik pada dashboard produksi.',
      'Membangun sistem permintaan bahan gudang dengan alur verifikasi bertingkat dan pemantauan stok real-time.',
      'Melakukan migrasi skema database terintegrasi dan pengujian otomatis unit/fitur menggunakan PHPUnit.',
    ],
    tools: [
      'Laravel 13',
      'PHP',
      'PostgreSQL',
      'Supabase',
      'JavaScript',
      'Blade',
      'Chart.js',
      'PHPUnit',
      'DuckDNS',
      'AWS VPC',
    ],
    githubUrl: 'https://github.com/pembunuhGila/Foodflow.git',
  },
  {
    slug: 'sukii-cookies',
    title: 'Sukii Cookies — Inovasi Camilan Fungsional Sukun, Kelor, dan Bit',
    period: 'PMW Polinema 2026, Jun 2026 – Sekarang',
    tagline: 'Inovasi produk pangan fungsional bergizi tinggi berbasis komoditas lokal bernilai tambah.',
    images: [
      '/projects/sukii-cookies/1.jpg',
      '/projects/sukii-cookies/2.jpg',
      '/projects/sukii-cookies/3.jpg',
    ],
    contribution: [
      'Mengembangkan formulasi inovasi camilan sehat bergizi berbasis tepung sukun lokal, kelor, dan bit.',
      'Menyusun kerangka Business Model Canvas (BMC) untuk validasi model bisnis dan penetrasi pasar.',
      'Merancang identitas visual, kemasan, dan penyuntingan tampilan produk untuk daya tarik komersial.',
      'Memproduksi konten promosi kreatif dan mengelola strategi kampanye digital di media sosial.',
    ],
    tools: [
      'Canva',
      'Capcut',
      'Business Model Canvas',
    ],
    instagramUrl: 'https://www.instagram.com/sukiicookies.mlg?psln=dWlpbHZ4ZWRjeTdu',
  },
  {
    slug: 'olim',
    title: 'OLIM: Marketplace Komoditi Limbah Organik',
    period: 'PBL Sem 4, Feb – Jun 2026',
    tagline: 'Platform ekonomi sirkular penghubung produsen limbah organik dengan pengolah BSF dan pupuk.',
    images: [
      '/projects/olim/1.jpg',
      '/projects/olim/2.jpg',
      '/projects/olim/3.jpg',
    ],
    contribution: [
      'Melakukan analisis dan perancangan sistem menyeluruh melalui pemodelan UML terstruktur dan ERD relasional.',
      'Menyusun Business Model Canvas (BMC) dan Value Proposition Canvas (VPC) untuk memetakan pain points pengguna.',
      'Merancang modul Admin Complaint Management dan Dispute Resolution untuk mediasi keluhan mutu komoditi.',
      'Mengembangkan mekanisme persetujuan transaksi aman dan alokasi pengembalian dana sebagian (partial refund).',
      'Membangun fitur operasional terpadu yang memfasilitasi transaksi antar stakeholder komoditi limbah.',
    ],
    tools: [
      'Flutter',
      'Dart',
      'PostgreSQL',
      'Supabase',
      'Midtrans',
      'Biteship',
    ],
    githubUrl: 'https://github.com/NaufalAlifAdjani/Olim-Apps.git',
  },
  {
    slug: 'hospital-dw',
    title: 'Hospital Management Information System (Data Warehouse)',
    period: 'Mata Kuliah Data Warehouse, Mei – Jun 2026',
    tagline: 'Arsitektur data warehouse analitik multi-dimensi untuk pemantauan layanan rumah sakit.',
    images: [
      '/projects/hospital-dw/1.jpg',
      '/projects/hospital-dw/2.jpg',
      '/projects/hospital-dw/3.jpg',
    ],
    contribution: [
      'Membangun pipeline ETL menyeluruh dari sistem transaksional OLTP ke arsitektur Data Warehouse (Star Schema).',
      'Merancang tabel dimensi terstruktur, khususnya Dim Departemen dan Dim Produsen Obat.',
      'Menerapkan metodologi Slowly Changing Dimensions (SCD Type 1 dan Type 2) untuk menjaga konsistensi riwayat.',
      'Menyediakan dukungan data analitis untuk pemantauan tagihan layanan medis dan ketersediaan persediaan obat.',
    ],
    tools: [
      'Pentaho Data Integration',
      'Laragon',
      'SQL',
      'MySQL',
      'phpMyAdmin',
    ],
    demoUrl: '',
  },
  {
    slug: 'lab-ilet',
    title: 'Sistem Informasi Laboratorium InLET',
    period: 'PBL Sem 3, Feb – Jul 2025',
    tagline: 'Sistem otomasi manajemen inventaris dan administrasi peminjaman instrumen laboratorium.',
    media: [
      {
        type: 'image',
        src: '/projects/lab-ilet/inlet 1.png',
        title: 'Tampilan Sistem Informasi Laboratorium InLET',
      },
      {
        type: 'video',
        src: 'https://drive.google.com/file/d/1Vndr318vemUyc7f_WcvQYVPXix-6cg4M/view?usp=sharing',
        title: 'Video Demo SIM Laboratorium InLET',
      },
    ],
    contribution: [
      'Melakukan analisis dan perancangan sistem menyeluruh: Use Case Diagram, DFD, ERD, CDM, dan PDM.',
      'Melakukan pengisian dan manipulasi data terstruktur menggunakan Data Manipulation Language (DML).',
      'Mengembangkan fitur portal informasi interaktif: Gallery, News, dan Halaman News Detail.',
      'Membangun halaman User Management admin untuk pengelolaan hak akses staf dan mahasiswa.',
    ],
    tools: [
      'PHP',
      'HTML',
      'CSS',
      'Bootstrap',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com/amandadealovas/LAB_INLET.git',
    demoUrl: '',
  },
];
