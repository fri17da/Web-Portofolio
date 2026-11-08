import React from 'react';
import { Trophy, Award, Medal, Star, Sparkles } from 'lucide-react';

const AWARDS = [
  {
    title: 'Awardee Program Mahasiswa Wirausaha (PMW) Polinema',
    year: '2026',
    organizer: 'Politeknik Negeri Malang',
    category: 'Pendanaan Wirausaha Nasional',
    description: 'Terpilih menerima pendanaan inkubasi dan pengembangan usaha untuk produk inovasi pangan fungsional sehat Sukii Cookies.',
    icon: Trophy,
  },
  {
    title: 'Finalis IBPC (Diponegoro Business Plan Competition)',
    year: '2025',
    organizer: 'Universitas Diponegoro',
    category: 'Kompetisi Bisnis Nasional',
    description: 'Menembus babak finalis kompetisi rencana bisnis nasional melalui pengajuan model bisnis sirkular dan proyeksi finansial yang teruji.',
    icon: Award,
  },
  {
    title: 'Best Team PKM-K & Best Poster Karya Ilmiah Mahasiswa',
    year: '2025',
    organizer: 'Forum Ilmiah Mahasiswa',
    category: 'Kreativitas Ilmiah & Visual',
    description: 'Meraih penghargaan ganda sebagai Tim Terbaik kategori Kewirausahaan (PKM-K) sekaligus Desain Poster Ilmiah Terbaik.',
    icon: Medal,
  },
  {
    title: 'Presentasi Terbaik & Video Kreatif Terbaik KTI Nafpacom',
    year: '2025',
    organizer: 'Nafpacom National Scientific Conference',
    category: 'Komunikasi Ilmiah & Multimedia',
    description: 'Dinobatkan sebagai Presenter Terbaik dan pembuat Video Kreatif Terbaik dalam pemaparan karya tulis ilmiah terapan.',
    icon: Star,
  },
  {
    title: 'Juara 1 Lomba Desain Poster Nasional',
    year: '2022',
    organizer: 'UNUGIRI Bojonegoro',
    category: 'Kompetisi Desain Grafis',
    description: 'Peringkat pertama dalam kompetisi desain poster nasional dengan mengedepankan kekuatan narasi visual dan tipografi persuasif.',
    icon: Trophy,
  },
];

export default function Awards() {
  return (
    <section id="penghargaan" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="awards-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/20 text-[#09318D] text-xs font-bold uppercase tracking-wider mb-3">
            Prestasi & Rekognisi
          </div>
          <h2 id="awards-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            Penghargaan & Prestasi
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AWARDS.map((award, index) => {
            const Icon = award.icon;
            return (
              <div
                key={index}
                className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-2xl p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-[#09318D] text-[#FD91CC] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-display font-extrabold text-sm px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] border border-[#FD91CC]/50">
                      {award.year}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#09318D]/60 block mb-1">
                      {award.category}
                    </span>
                    <h3 className="font-display font-bold text-lg text-[#09318D] leading-snug">
                      {award.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#09318D]/70 mt-1">
                      {award.organizer}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#09318D]/80 leading-relaxed font-sans">
                    {award.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#09318D]/10 text-[11px] text-[#09318D]/60 font-medium">
                  Rekognisi Terverifikasi
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
