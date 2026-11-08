import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsSection from './components/SkillsSection';
import Projects from './components/Projects';
import GithubHeatmap from './components/GithubHeatmap';
import AwardsTimeline from './components/AwardsTimeline';
import CertificationsSection from './components/CertificationsSection';
import OrganizationTimeline from './components/OrganizationTimeline';
import SoftSkillsSection from './components/SoftSkillsSection';
import Footer from './components/Footer';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#09318D] selection:bg-[#FD91CC] selection:text-[#09318D]">
      {/* 1. Loading Screen (Preloader) */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#FD91CC] text-[#09318D] font-bold rounded-full shadow-lg outline-none"
      >
        Lewati ke konten utama
      </a>

      {/* Glassmorphic Floating Navbar */}
      <Navbar />

      {/* Main Single Page Sections in Strict Order */}
      <main id="main-content" className="flex-grow">
        {/* 1. Hero: Sapaan, Pitch, Badge, Profil Photo + Pink Blob, Brief Bio, Floating Cards (Proyek, IPK 3.68, Visitor Counter) */}
        <Hero />

        {/* 2. Skills & Tools: Logo react-icons / ToolIcon Monogram, Category Cards */}
        <SkillsSection />

        {/* 3. Proyek: Large Cards with Image Carousel (touch, arrows, keyboard, lightbox), contributions, tools, github/demo */}
        <Projects />

        {/* 4. GitHub Contributions: 53 weeks x 7 rows official grid, wave stagger animation, count-up header, extra stat, tooltips */}
        <GithubHeatmap />

        {/* 5. Penghargaan: Vertical timeline style, newest on top */}
        <AwardsTimeline />

        {/* 6. Sertifikasi dan Pelatihan: AI Mini Bootcamp Dicoding */}
        <CertificationsSection />

        {/* 7. Pengalaman Organisasi: UKM Pendidikan & Penalaran & Try Out SNBT */}
        <OrganizationTimeline />

        {/* 8. Kemampuan Non-Teknis: Soft skills & Bahasa only */}
        <SoftSkillsSection />
      </main>

      {/* 9. Kontak & Footer: Salin Email, LinkedIn, GitHub, Copyright (No duplicated visitor counter) */}
      <Footer />
    </div>
  );
}
