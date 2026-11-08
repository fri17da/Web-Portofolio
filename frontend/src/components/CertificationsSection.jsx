import React from 'react';
import { Award, BookOpen, CheckCircle2, Calendar, ExternalLink } from 'lucide-react';

const CERTIFICATIONS_LIST = [
  {
    id: 'dicoding-ai',
    title: 'AI Mini Bootcamp — Artificial Intelligence & Data Solution',
    issuer: 'Dicoding Indonesia',
    period: 'Juni 2026',
    credentialId: 'DICODING-AI-2026-SAH',
    description: 'Pelatihan intensif pengembangan solusi berbasis kecerdasan buatan terapan, machine learning fundamentals, dan pemrosesan data tabular dengan Python.',
    competencies: [
      'Machine Learning Pipeline: Data cleaning, exploratory data analysis (EDA), dan feature engineering.',
      'Model Classification & Regression: Pemilihan algoritma prediktif dan evaluasi metrik performa (F1-score, accuracy).',
      'Prompt Engineering & Generative AI: Pemanfaatan LLM API untuk otomasi pemrosesan teks dan ringkasan wawasan bisnis.',
      'Deployment & Integration: Mengemas model analitik ke dalam endpoint API siap konsumsi.',
    ],
  },
];

export default function CertificationsSection() {
  return (
    <section id="sertifikasi" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="cert-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
            Kompetensi Teruji
          </div>
          <h2 id="cert-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            Sertifikasi & Pelatihan
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
          <p className="text-sm sm:text-base text-[#09318D]/75 mt-3 leading-relaxed">
            Sertifikasi profesional dan pelatihan intensif untuk memperkuat kapabilitas dalam rekayasa data dan kecerdasan buatan.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATIONS_LIST.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-[#09318D] text-white">
                    {cert.issuer}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#09318D]/5 text-[#09318D] flex items-center gap-1.5 border border-[#09318D]/10">
                    <Calendar className="w-3.5 h-3.5 text-[#FD91CC]" />
                    {cert.period}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-[#09318D] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#FD91CC] mt-1">
                    ID: {cert.credentialId}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#09318D]/85 leading-relaxed font-sans">
                  {cert.description}
                </p>

                {/* Competencies */}
                <div className="pt-2 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#09318D]">
                    Kompetensi yang Dipelajari:
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#09318D]/80">
                    {cert.competencies.map((comp, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FD91CC] shrink-0 mt-0.5" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#09318D]/10 flex items-center justify-between text-xs text-[#09318D]/60 font-medium">
                <span>Terverifikasi Resmi</span>
                <span className="text-[#09318D] font-bold">Dicoding Indonesia</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
