import React from 'react';
import { Users, Calendar, Award, CheckCircle2 } from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'Ketua Pelaksana Social Media',
    organization: 'UKM Pendidikan dan Penalaran, Politeknik Negeri Malang',
    period: '2024 – 2025',
    type: 'Kepemimpinan & Media Digital',
    highlights: [
      'Memimpin tim kreatif dan pengelola media sosial organisasi dalam merancang kalender editorial serta strategi branding konten edukatif.',
      'Meningkatkan engagement rate kanal media sosial organisasi melalui publikasi berkala dan kampanye visual interaktif.',
      'Mengkoordinasikan liputan kegiatan penalaran, seminar ilmiah, dan lomba karya tulis tingkat mahasiswa.',
    ],
  },
  {
    role: 'Koordinator Publikasi dan Dokumentasi',
    organization: 'Try Out SNBT Nasional — Polinema',
    period: '2025',
    type: 'Event Management & Media',
    highlights: [
      'Bertanggung jawab penuh atas perancangan materi publikasi visual, feed promosi pendaftaran, dan siaran pers kegiatan.',
      'Memimpin dokumentasi live reporting hari pelaksanaan simulasi ujian SNBT yang diikuti ratusan peserta siswa SMA/SMK.',
      'Menyelaraskan komunikasi visual multi-kanal untuk memastikan target kuota peserta tercapai secara optimal.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="pengalaman" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="experience-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/20 text-[#09318D] text-xs font-bold uppercase tracking-wider mb-3">
            Kepemimpinan & Kolaborasi
          </div>
          <h2 id="experience-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            Pengalaman Organisasi
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
        </div>

        {/* Experience Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-2xl p-6 sm:p-8 transition-all shadow-sm hover:shadow-md relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#09318D] text-white">
                    {exp.type}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#09318D]/5 text-[#09318D] border border-[#09318D]/10 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FD91CC]" />
                    {exp.period}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-[#09318D] leading-snug">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-[#09318D]/70 mt-1">
                    {exp.organization}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  {exp.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#09318D]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#FD91CC] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#09318D]/10 flex items-center justify-between text-xs text-[#09318D]/60">
                <span>Kontribusi Nyata Organisasi</span>
                <span className="font-semibold text-[#09318D]">0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
