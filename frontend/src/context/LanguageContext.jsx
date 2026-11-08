import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  id: {
    // Nav
    nav: {
      about: 'Tentang',
      projects: 'Proyek',
      caseStudies: 'Studi Kasus',
      artifacts: 'Galeri Artefak',
      timeline: 'Timeline',
      skills: 'Kemampuan',
      contact: 'Kontak',
      contactBtn: 'Hubungi Saya',
      cvBtn: 'Unduh CV',
    },
    // Hero
    hero: {
      statusBadge: 'Terbuka untuk magang / kerja: Business Analyst & Data Analyst',
      tags: ['Business Analysis', 'Data Analysis', 'Web Development'],
      headlinePart1: 'Menerjemahkan kebutuhan bisnis menjadi ',
      headlinePart2: 'solusi berbasis data',
      subheadline: 'Mahasiswa D4 Sistem Informasi Bisnis Polinema (IPK 3.68/4.00) yang memadukan pemodelan proses bisnis terstruktur, rekayasa data warehouse, dan strategi digital yang berdampak nyata.',
      ctaProjects: 'Lihat Proyek',
      ctaCv: 'Unduh CV',
      badgeFloat1: 'Data-Driven Solution',
      badgeFloat2: 'BPMN & ERP Specialist',
      stats: [
        { label: 'Proyek Selesai', value: '5+' },
        { label: 'Penghargaan', value: '5' },
        { label: 'IPK Kumulatif', value: '3.68' },
        { label: 'Kompetisi Bisnis', value: '3+' },
      ],
    },
    // Dashboard Cards
    dashboard: {
      githubTitle: 'GitHub Contributions',
      githubSub: 'Aktivitas kode publik setahun terakhir',
      fri17da: '@fri17da',
      totalContr: 'kontribusi',
      gaugeTitle: 'Validasi Produk & Kualitas',
      gaugeScore: '82.5',
      gaugeScoreLabel: 'Skor SUS OLIM',
      gaugeGrade: 'Grade A — Kategori Unggul (Acceptable)',
      gaugeSub: 'Evaluasi kepuasan pengguna System Usability Scale pada marketplace komoditi limbah organik.',
      gaugeMetric2: '5+',
      gaugeMetric2Label: 'Proyek Unggulan',
      gaugeMetric3: '100%',
      gaugeMetric3Label: 'Riset Terarah',
      trendTitle: 'Tren Pengunjung 7 Hari',
      trendSub: 'Monitoring lalu lintas portofolio',
      todayVisitors: 'Hari ini',
      totalVisitors: 'Total Kunjungan',
      uniqueNotice: '1 pengunjung unik per perangkat per hari',
    },
    // About & Bio
    about: {
      sectionBadge: 'Profil & Bio Personal',
      title: 'Tentang Syafrida',
      intro: 'Halo! Saya Syafrida Ade Aulia Hakim, mahasiswa tingkat akhir D4 Sistem Informasi Bisnis di Politeknik Negeri Malang.',
      p1: 'Fokus minat saya bertumpu pada jembatan strategis antara analisis proses bisnis dan analisis data analitis. Saya menikmati proses membedah kebutuhan pengguna, merumuskan model konseptual (BPMN, DFD, ERD), hingga menerjemahkannya ke dalam pipeline data dan antarmuka perangkat lunak.',
      p2: 'Selain akademis, saya aktif dalam program inkubasi wirausaha dan kompetisi rencana bisnis nasional. Pengalaman ini mengasah intuisi saya dalam melihat nilai komersial dari setiap baris kode dan metrik data.',
      educationTitle: 'Pendidikan',
      educationSchool: 'Politeknik Negeri Malang — D4 Sistem Informasi Bisnis',
      educationGpa: 'IPK 3.68 / 4.00',
      educationDetail: 'Mata Kuliah Utama: Business Process Management, Data Warehouse, Enterprise Resource Planning (Odoo), Data Mining, Analisis & Perancangan SI.',
    },
    // Projects
    projects: {
      sectionBadge: 'Portofolio Terpilih',
      title: 'Proyek Unggulan',
      subtitle: 'Kumpulan proyek aplikasi, kewirausahaan, dan rekayasa data dengan kontribusi nyata.',
      viewCaseStudy: 'Baca Studi Kasus Lengkap',
      liveDemo: 'Live Demo',
      githubRepo: 'Repo GitHub',
    },
    // Artifact Gallery
    gallery: {
      sectionBadge: 'Analyst Artifacts',
      title: 'Galeri Artefak Business Analysis',
      subtitle: 'Bukti nyata keterampilan pemodelan analitis, perancangan arsitektur sistem, dan visualisasi data bisnis.',
      clickToZoom: 'Klik untuk memperbesar artefak',
    },
    // Timeline
    timeline: {
      sectionBadge: 'Perjalanan & Rekam Jejak',
      title: 'Timeline Pengalaman, Prestasi & Sertifikasi',
      subtitle: 'Rekapitulasi pengalaman kepemimpinan organisasi, penghargaan kompetisi nasional, dan pelatihan keahlian.',
      tabs: { all: 'Semua', org: 'Organisasi', award: 'Penghargaan', cert: 'Sertifikasi' },
    },
    // Skills
    skills: {
      sectionBadge: 'Alat & Teknologi',
      title: 'Kemampuan & Perangkat Kerja',
      subtitle: 'Teknologi modern dan metodologi yang rutin saya gunakan dalam analisis bisnis dan data.',
    },
    // Contact
    contact: {
      sectionBadge: 'Mari Terhubung',
      title: 'Siap Berkolaborasi?',
      subtitle: 'Saya terbuka untuk posisi magang, full-time Business Analyst / Data Analyst, maupun proyek lepas.',
      copyEmail: 'Salin Email',
      copiedEmail: 'Tersalin ke Clipboard!',
      sendEmail: 'Kirim Email',
      whatsapp: 'Hubungi via WhatsApp',
      linkedin: 'Profil LinkedIn',
      github: 'Kunjungi GitHub',
    },
    // Footer
    footer: {
      rights: 'Hak cipta dilindungi.',
      backToTop: 'Kembali ke atas',
      builtWith: 'Dibuat dengan React (Vite) & Laravel API',
    },
  },
  en: {
    // Nav
    nav: {
      about: 'About',
      projects: 'Projects',
      caseStudies: 'Case Studies',
      artifacts: 'Artifacts',
      timeline: 'Timeline',
      skills: 'Skills',
      contact: 'Contact',
      contactBtn: 'Contact Me',
      cvBtn: 'Download CV',
    },
    // Hero
    hero: {
      statusBadge: 'Open for Internship / Work: Business Analyst & Data Analyst',
      tags: ['Business Analysis', 'Data Analysis', 'Web Development'],
      headlinePart1: 'Translating business needs into ',
      headlinePart2: 'data-driven solutions',
      subheadline: 'Business Information Systems senior student at Polinema (GPA 3.68/4.00) combining structured business process modeling, data warehouse engineering, and high-impact digital strategies.',
      ctaProjects: 'View Projects',
      ctaCv: 'Download CV',
      badgeFloat1: 'Data-Driven Solution',
      badgeFloat2: 'BPMN & ERP Specialist',
      stats: [
        { label: 'Completed Projects', value: '5+' },
        { label: 'Awards Won', value: '5' },
        { label: 'Cumulative GPA', value: '3.68' },
        { label: 'Business Competitions', value: '3+' },
      ],
    },
    // Dashboard Cards
    dashboard: {
      githubTitle: 'GitHub Contributions',
      githubSub: 'Public code commits over the past year',
      fri17da: '@fri17da',
      totalContr: 'contributions',
      gaugeTitle: 'Product Validation & Quality',
      gaugeScore: '82.5',
      gaugeScoreLabel: 'OLIM SUS Score',
      gaugeGrade: 'Grade A — Excellent Category (Acceptable)',
      gaugeSub: 'System Usability Scale user satisfaction evaluation on organic waste commodity marketplace.',
      gaugeMetric2: '5+',
      gaugeMetric2Label: 'Key Projects',
      gaugeMetric3: '100%',
      gaugeMetric3Label: 'Data-Backed Research',
      trendTitle: '7-Day Visitor Trend',
      trendSub: 'Live portfolio traffic monitor',
      todayVisitors: 'Today',
      totalVisitors: 'Total Visits',
      uniqueNotice: '1 unique visitor per device per day',
    },
    // About & Bio
    about: {
      sectionBadge: 'Profile & Personal Bio',
      title: 'About Syafrida',
      intro: 'Hello! I am Syafrida Ade Aulia Hakim, a senior student of Business Information Systems at State Polytechnic of Malang.',
      p1: 'My core focus lies at the strategic intersection of business process analysis and analytical data engineering. I enjoy dissecting stakeholder requirements, building conceptual models (BPMN, DFD, ERD), and translating them into reliable data pipelines and intuitive software interfaces.',
      p2: 'Beyond academics, I actively take part in entrepreneurship incubations and national business plan competitions. This sharpens my intuition for uncovering tangible commercial value behind every line of code and data metric.',
      educationTitle: 'Education',
      educationSchool: 'State Polytechnic of Malang — D4 Business Information Systems',
      educationGpa: 'GPA 3.68 / 4.00',
      educationDetail: 'Core coursework: Business Process Management, Data Warehouse, Enterprise Resource Planning (Odoo), Data Mining, IS Analysis & Design.',
    },
    // Projects
    projects: {
      sectionBadge: 'Featured Portfolio',
      title: 'Key Projects',
      subtitle: 'A collection of application, entrepreneurship, and data engineering projects with real-world impact.',
      viewCaseStudy: 'Read Full Case Study',
      liveDemo: 'Live Demo',
      githubRepo: 'GitHub Repo',
    },
    // Artifact Gallery
    gallery: {
      sectionBadge: 'Analyst Artifacts',
      title: 'Business Analysis Artifacts Gallery',
      subtitle: 'Tangible proof of analytical modeling, system architecture design, and business intelligence dashboards.',
      clickToZoom: 'Click image to inspect artifact',
    },
    // Timeline
    timeline: {
      sectionBadge: 'Journey & Milestones',
      title: 'Experience, Awards & Certifications Timeline',
      subtitle: 'Chronicle of organizational leadership, national competition wins, and specialized training.',
      tabs: { all: 'All', org: 'Leadership', award: 'Awards', cert: 'Certifications' },
    },
    // Skills
    skills: {
      sectionBadge: 'Toolbox & Technologies',
      title: 'Skills & Tools',
      subtitle: 'Modern technologies and proven methodologies I regularly employ in business and data analytics.',
    },
    // Contact
    contact: {
      sectionBadge: 'Get in Touch',
      title: 'Ready to Collaborate?',
      subtitle: 'Open for internship opportunities, full-time Business Analyst / Data Analyst roles, and consulting projects.',
      copyEmail: 'Copy Email',
      copiedEmail: 'Copied to Clipboard!',
      sendEmail: 'Send Email',
      whatsapp: 'Chat on WhatsApp',
      linkedin: 'LinkedIn Profile',
      github: 'Visit GitHub',
    },
    // Footer
    footer: {
      rights: 'All rights reserved.',
      backToTop: 'Back to top',
      builtWith: 'Built with React (Vite) & Laravel API',
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('id');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved === 'en' || saved === 'id') {
      setLang(saved);
    }
  }, []);

  const toggleLang = () => {
    const next = lang === 'id' ? 'en' : 'id';
    setLang(next);
    localStorage.setItem('portfolio_lang', next);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
