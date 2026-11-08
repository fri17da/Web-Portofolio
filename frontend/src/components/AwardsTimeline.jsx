import React from 'react';
import { Trophy, Award, Star, Medal, Sparkles, Calendar } from 'lucide-react';

const AWARDS_LIST = [
  {
    year: '2026',
    title: 'Awardee Program Mahasiswa Wirausaha (PMW) Polinema',
    organizer: 'Politeknik Negeri Malang',
    description: 'Terpilih menerima pendanaan inkubasi dan pengembangan produk usaha camilan sehat fungsional Sukii Cookies berbasis tepung sukun.',
    icon: Trophy,
  },
  {
    year: '2025',
    title: 'Finalis IBPC (Diponegoro Business Plan Competition)',
    organizer: 'Universitas Diponegoro',
    description: 'Menembus babak finalis kompetisi business plan nasional dengan perancangan model bisnis sirkular komoditi limbah organik.',
    icon: Award,
  },
  {
    year: '2025',
    title: 'Best Team PKM-K & Best Poster Karya Ilmiah Mahasiswa',
    organizer: 'Forum Ilmiah Mahasiswa Nasional',
    description: 'Meraih penghargaan ganda sebagai Tim Terbaik kategori Kewirausahaan (PKM-K) sekaligus Desain Poster Ilmiah Terbaik.',
    icon: Medal,
  },
  {
    year: '2025',
    title: 'Presentasi Terbaik & Video Kreatif Terbaik KTI Nafpacom',
    organizer: 'Nafpacom National Scientific Conference',
    description: 'Penganugerahan presenter terbaik dalam pemaparan karya ilmiah serta produser video kreatif terbaik penyampaian substansi riset.',
    icon: Star,
  },
  {
    year: '2022',
    title: 'Juara 1 Lomba Desain Poster Nasional',
    organizer: 'UNUGIRI Bojonegoro',
    description: 'Juara pertama dalam kompetisi desain poster nasional dengan perpaduan tipografi persuasif dan komposisi narasi visual.',
    icon: Trophy,
  },
];

export default function AwardsTimeline() {
  return (
    <section id="penghargaan" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="awards-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
            Prestasi & Rekognisi
          </div>
          <h2 id="awards-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            Penghargaan
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
          <p className="text-sm sm:text-base text-[#09318D]/75 mt-3 leading-relaxed">
            Daftar prestasi dan rekognisi kompetisi bisnis, karya ilmiah, serta desain tingkat nasional (diurutkan dari yang terbaru).
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#09318D]/15 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {AWARDS_LIST.map((award, idx) => {
            const Icon = award.icon;
            return (
              <div key={idx} className="relative group">
                {/* Node dot on timeline */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-[#09318D] flex items-center justify-center text-[#FD91CC] shadow-md group-hover:border-[#FD91CC] group-hover:scale-110 transition-all">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#09318D] group-hover:bg-[#FD91CC] transition-colors" />
                </div>

                <div className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-3xl p-6 sm:p-7 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-display font-black text-sm px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] border border-[#FD91CC]/40">
                        {award.year}
                      </span>
                      <span className="text-xs font-semibold text-[#09318D]/60 flex items-center gap-1.5">
                        <Icon className="w-4 h-4 text-[#FD91CC]" />
                        {award.organizer}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#09318D] leading-snug mt-1">
                      {award.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#09318D]/80 leading-relaxed font-sans mt-2">
                      {award.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#09318D]/10 flex items-center justify-between text-[11px] text-[#09318D]/60 font-medium">
                    <span>Tingkat Nasional</span>
                    <span className="font-bold text-[#09318D]">0{idx + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
