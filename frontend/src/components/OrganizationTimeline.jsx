import React from 'react';
import { Users, Calendar, CheckCircle2 } from 'lucide-react';

const ORG_EXPERIENCES = [
  {
    role: 'Koordinator Publikasi dan Dokumentasi',
    organization: 'Panitia Try Out SNBT Nasional — Polinema',
    period: '2025',
    bullets: [
      'Memimpin perancangan materi publikasi visual, media promosi digital, dan siaran pers kegiatan.',
      'Mengkoordinasikan tim dokumentasi live reporting saat simulasi ujian berlangsung dengan ratusan peserta.',
      'Menyelaraskan komunikasi visual multi-kanal untuk memastikan target kuota pendaftaran terpenuhi.',
    ],
  },
  {
    role: 'Ketua Pelaksana Social Media',
    organization: 'UKM Pendidikan dan Penalaran, Politeknik Negeri Malang',
    period: '2024 – 2025',
    bullets: [
      'Menyusun kalender editorial konten penalaran, riset ilmiah, dan strategi publikasi berkala.',
      'Memimpin tim kreatif dalam memproduksi konten visual informatif untuk meningkatkan engagement mahasiswa.',
      'Mengelola komunikasi informasi seminar, workshop metodologi riset, dan kompetisi karya tulis kampus.',
    ],
  },
];

export default function OrganizationTimeline() {
  return (
    <section id="organisasi" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="org-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
            Kepemimpinan & Kerja Sama
          </div>
          <h2 id="org-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            Pengalaman Organisasi
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
          <p className="text-sm sm:text-base text-[#09318D]/75 mt-3 leading-relaxed">
            Rekam jejak kepemimpinan tim, manajemen publikasi, dan koordinasi acara berskala mahasiswa dan nasional.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ORG_EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-[#09318D] text-white">
                    Kepemimpinan
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#09318D]/5 text-[#09318D] flex items-center gap-1.5 border border-[#09318D]/10">
                    <Calendar className="w-3.5 h-3.5 text-[#FD91CC]" />
                    {exp.period}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-[#09318D] leading-snug">
                    {exp.role}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#09318D]/70 mt-1">
                    {exp.organization}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#09318D]">
                    Ringkasan Peran:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#09318D]/85">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#FD91CC] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#09318D]/10 flex items-center justify-between text-xs text-[#09318D]/60 font-medium">
                <span>Kontribusi Nyata</span>
                <span className="font-bold text-[#09318D]">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
