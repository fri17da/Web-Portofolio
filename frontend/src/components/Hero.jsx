import React, { useEffect, useState } from 'react';
import { ArrowRight, FileText, Send, Sparkles, FolderGit2, GraduationCap, Users } from 'lucide-react';
import { registerVisit } from '../services/api';

export default function Hero() {
  const [visitorStats, setVisitorStats] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        const data = await registerVisit();
        if (isMounted && data && typeof data.total !== 'undefined') {
          setVisitorStats({ total: data.total || 0, today: data.today || 0 });
        }
      } catch {
        // Sembunyikan counter jika Supabase null atau belum disiapkan tanpa error mengganggu
      }
    }
    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#09318D] via-[#154bbd] to-white text-white"
      aria-labelledby="hero-title"
    >
      {/* Background dot matrix halos */}
      <div
        className="absolute top-10 left-0 w-80 h-96 dot-pattern-overlay opacity-30 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at 0% 40%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 0% 40%, black 30%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-10 right-0 w-80 h-96 dot-pattern-overlay opacity-30 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at 100% 40%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 100% 40%, black 30%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Ambient pink glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#FD91CC]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main 2-Column Hero Content: Text on Left, Profile Photo with Pink Blob on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (Text, Pitch, Bio, CTA) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-[#FD91CC] ring-4 ring-[#FD91CC]/30 animate-pulse" />
              <span>Terbuka untuk magang: Business Analyst & Data Analyst</span>
            </div>

            {/* Headline */}
            <h1
              id="hero-title"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Halo, saya{' '}
              <span className="text-white relative inline-block">
                Syafrida
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#FD91CC] rounded-full" />
              </span>{' '}
              Ade Aulia Hakim
            </h1>

            {/* One-Sentence Pitch */}
            <p className="text-base sm:text-xl font-bold text-[#FD91CC] leading-relaxed">
              Menerjemahkan kebutuhan bisnis menjadi solusi berbasis data dan sistem yang berdampak nyata.
            </p>

            {/* Brief Bio (maksimal 3 kalimat) */}
            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-normal">
              Mahasiswa D4 Sistem Informasi Bisnis Politeknik Negeri Malang yang berfokus pada pemodelan proses bisnis, 
              perancangan arsitektur data warehouse, dan inovasi produk digital. Menggabungkan ketelitian analisis 
              kebutuhan dengan implementasi teknologi terstruktur untuk memecahkan tantangan operasional.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#proyek"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#FD91CC] to-[#fba7d7] hover:from-[#fba7d7] hover:to-[#FD91CC] text-[#09318D] font-extrabold text-sm sm:text-base shadow-xl shadow-[#FD91CC]/30 transition-all transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Lihat Proyek</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/cv-syafrida.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/30 backdrop-blur-md transition-all transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
              >
                <FileText className="w-4 h-4 text-[#FD91CC]" />
                <span>Unduh CV</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo in rounded frame with organic pink blob behind */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Pink Organic Blob behind photo */}
            <div
              className="absolute w-72 h-72 sm:w-84 sm:h-84 bg-gradient-to-tr from-[#FD91CC] via-[#fba7d7] to-[#FD91CC]/80 blur-xl opacity-75 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-float-gentle pointer-events-none"
              aria-hidden="true"
            />

            {/* Profile Photo Frame */}
            <div className="relative z-10 w-64 h-64 sm:w-76 sm:h-76 rounded-3xl p-2 bg-gradient-to-br from-white/40 via-white/20 to-[#FD91CC]/40 backdrop-blur-xl border border-white/30 shadow-2xl">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-[#09318D] border border-white/20 relative group">
                <img
                  src="/profile.jpeg"
                  alt="Foto Profil Syafrida Ade Aulia Hakim, Mahasiswa D4 Sistem Informasi Bisnis Polinema"
                  loading="eager"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized monogram if image link fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 bg-[#09318D] flex-col items-center justify-center text-white">
                  <span className="font-display text-6xl font-black text-[#FD91CC]">SA</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 mt-2">
                    Syafrida Ade
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Floating Cards Below Hero: Proyek, IPK 3.68, dan Visitor Counter (jika aktif) */}
        <div className={`mt-12 lg:mt-16 grid grid-cols-1 ${visitorStats ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-4xl mx-auto'} gap-5`}>
          
          {/* Card 1: Proyek (Jumlah) */}
          <div className="bg-[#09318D]/75 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl shadow-[#09318D]/25 transition-all duration-300 hover:-translate-y-1 hover:border-[#FD91CC]/60 flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-white/10 text-[#FD91CC] border border-white/10 shrink-0">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display text-3xl font-black text-white">5 Proyek</span>
              <p className="text-xs font-semibold text-white/80 mt-0.5">
                PBL, Wirausaha PMW & Data Warehouse
              </p>
            </div>
          </div>

          {/* Card 2: IPK 3.68 */}
          <div className="bg-gradient-to-br from-[#09318D]/90 via-[#0d3dae]/80 to-[#FD91CC]/25 backdrop-blur-xl border-2 border-[#FD91CC]/50 rounded-3xl p-6 shadow-xl shadow-[#FD91CC]/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#FD91CC] flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#FD91CC] text-[#09318D] shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-black text-white">IPK 3.68</span>
                <span className="text-xs font-bold text-[#FD91CC]">/ 4.00</span>
              </div>
              <p className="text-xs font-semibold text-white/80 mt-0.5">
                D4 Sistem Informasi Bisnis Polinema
              </p>
            </div>
          </div>

          {/* Card 3: Visitor Counter (Total & Hari ini) - Tampil jika Supabase aktif */}
          {visitorStats && (
            <div className="bg-[#09318D]/75 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl shadow-[#09318D]/25 transition-all duration-300 hover:-translate-y-1 hover:border-[#FD91CC]/60 flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-white/10 text-[#FD91CC] border border-white/10 shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70 font-semibold">Pengunjung:</span>
                  <span className="flex h-2 w-2 rounded-full bg-[#FD91CC] animate-pulse" />
                </div>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <div>
                    <span className="font-display text-xl font-black text-[#FD91CC]">
                      {visitorStats.today}
                    </span>
                    <span className="text-[10px] text-white/70 ml-1">Hari ini</span>
                  </div>
                  <div className="text-white/40">|</div>
                  <div>
                    <span className="font-display text-xl font-black text-white">
                      {visitorStats.total}
                    </span>
                    <span className="text-[10px] text-white/70 ml-1">Total</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
