import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Trophy, Award, Users, CheckCircle2, Calendar, BookOpen, Star, Sparkles } from 'lucide-react';

const TIMELINE_DATA = [
  {
    year: '2026',
    date: 'Sep 2026 – Sekarang',
    type: 'award',
    typeLabel: 'Penghargaan & Pendanaan',
    title: 'Awardee Program Mahasiswa Wirausaha (PMW) 2026',
    institution: 'Politeknik Negeri Malang',
    description: 'Terpilih menerima pendanaan hibah inkubasi usaha untuk produk inovasi pangan sehat fungsional Sukii Cookies, berfokus pada analisis pasar dan BMC.',
    icon: Trophy,
  },
  {
    year: '2026',
    date: 'Jan – Mar 2026',
    type: 'cert',
    typeLabel: 'Sertifikasi Keahlian',
    title: 'Dicoding AI Mini Bootcamp Certification',
    institution: 'Dicoding Indonesia',
    description: 'Menyelesaikan program intensif kecerdasan buatan terapan: dasar machine learning, klasifikasi data, integrasi prompt engineering, dan pemrosesan data tabular dengan Python.',
    icon: BookOpen,
  },
  {
    year: '2025',
    date: 'Okt 2025',
    type: 'award',
    typeLabel: 'Kompetisi Nasional',
    title: 'Finalis IBPC (Diponegoro Business Plan Competition)',
    institution: 'Universitas Diponegoro',
    description: 'Menembus babak finalis nasional melalui penyusunan rencana bisnis sirkular limbah organik dengan pemodelan finansial dan analisis sensitivitas.',
    icon: Award,
  },
  {
    year: '2025',
    date: 'Agt 2025',
    type: 'award',
    typeLabel: 'Kompetisi Ilmiah',
    title: 'Best Team PKM-K & Best Poster Karya Ilmiah Mahasiswa',
    institution: 'Forum Ilmiah Mahasiswa Nasional',
    description: 'Meraih gelar ganda sebagai Tim Terbaik kategori Kewirausahaan (PKM-K) sekaligus Best Poster Presenter.',
    icon: Star,
  },
  {
    year: '2025',
    date: 'Mei 2025',
    type: 'award',
    typeLabel: 'Konferensi Ilmiah',
    title: 'Presentasi Terbaik & Video Kreatif Terbaik KTI Nafpacom',
    institution: 'Nafpacom National Scientific Event',
    description: 'Penganugerahan presenter terbaik dalam pemaparan metodologi analisis data terapan serta produksi video penjelasan ilmiah paling kreatif.',
    icon: Sparkles,
  },
  {
    year: '2025',
    date: '2025',
    type: 'org',
    typeLabel: 'Kepemimpinan Organisasi',
    title: 'Koordinator Publikasi dan Dokumentasi — Try Out SNBT',
    institution: 'Panitia Nasional Try Out SNBT Polinema',
    description: 'Memimpin divisi kreatif dalam merancang materi komunikasi visual, siaran pers, dan live documentation untuk simulasi ujian yang diikuti ratusan peserta.',
    icon: Users,
  },
  {
    year: '2024',
    date: '2024 – 2025',
    type: 'org',
    typeLabel: 'Kepemimpinan Organisasi',
    title: 'Ketua Pelaksana Social Media — UKM Pendidikan & Penalaran',
    institution: 'UKM Pendidikan dan Penalaran Polinema',
    description: 'Mengelola strategi konten digital, kalender editorial penulisan ilmiah, dan meningkatkan reach audiens organisasi kampus secara signifikan.',
    icon: Users,
  },
  {
    year: '2022',
    date: 'Nov 2022',
    type: 'award',
    typeLabel: 'Kompetisi Desain',
    title: 'Juara 1 Lomba Desain Poster Nasional',
    institution: 'UNUGIRI Bojonegoro',
    description: 'Juara pertama kompetisi desain grafis nasional dengan perpaduan tipografi persuasif dan komposisi visual yang harmonis.',
    icon: Trophy,
  },
];

export default function Timeline() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const filteredData =
    filter === 'all'
      ? TIMELINE_DATA
      : TIMELINE_DATA.filter((item) => item.type === filter);

  return (
    <section id="timeline" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="timeline-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
              {t.timeline.sectionBadge}
            </div>
            <h2 id="timeline-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
              {t.timeline.title}
            </h2>
            <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#09318D]/5 p-1.5 rounded-full border border-[#09318D]/10">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-[#09318D] text-white shadow-sm'
                  : 'text-[#09318D]/70 hover:text-[#09318D]'
              }`}
            >
              {t.timeline.tabs.all}
            </button>
            <button
              type="button"
              onClick={() => setFilter('org')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'org'
                  ? 'bg-[#09318D] text-white shadow-sm'
                  : 'text-[#09318D]/70 hover:text-[#09318D]'
              }`}
            >
              {t.timeline.tabs.org}
            </button>
            <button
              type="button"
              onClick={() => setFilter('award')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'award'
                  ? 'bg-[#09318D] text-white shadow-sm'
                  : 'text-[#09318D]/70 hover:text-[#09318D]'
              }`}
            >
              {t.timeline.tabs.award}
            </button>
            <button
              type="button"
              onClick={() => setFilter('cert')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'cert'
                  ? 'bg-[#09318D] text-white shadow-sm'
                  : 'text-[#09318D]/70 hover:text-[#09318D]'
              }`}
            >
              {t.timeline.tabs.cert}
            </button>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-[#09318D]/15 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {filteredData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative group">
                {/* Node circle on the line */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-[#09318D] flex items-center justify-center text-[#FD91CC] shadow-md group-hover:border-[#FD91CC] group-hover:scale-110 transition-all">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#09318D] group-hover:bg-[#FD91CC] transition-colors" />
                </div>

                <div className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-3xl p-6 sm:p-7 transition-all shadow-sm hover:shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D]">
                      {item.typeLabel}
                    </span>
                    <span className="text-xs font-bold text-[#09318D]/60 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FD91CC]" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#09318D] mt-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#09318D]/70 mb-3">
                    {item.institution}
                  </p>

                  <p className="text-xs sm:text-sm text-[#09318D]/85 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
