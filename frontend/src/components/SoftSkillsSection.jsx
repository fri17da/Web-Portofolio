import React from 'react';
import { MessageSquare, Users2, Brain, Lightbulb, Clock, Sparkles, Languages, CheckCircle2 } from 'lucide-react';

const SOFT_SKILLS = [
  {
    name: 'Komunikasi',
    desc: 'Mampu mengartikulasikan kebutuhan teknis kepada pemangku kepentingan bisnis secara jelas dan persuasif.',
    icon: MessageSquare,
  },
  {
    name: 'Kerja Sama Tim',
    desc: 'Kolaboratif dalam tim lintas fungsi (desain, developer, dan manajemen operasional).',
    icon: Users2,
  },
  {
    name: 'Berpikir Kritis & Analitis',
    desc: 'Mengidentifikasi akar persoalan operasional serta merumuskan alternatif solusi berbasis data yang rasional.',
    icon: Brain,
  },
  {
    name: 'Problem Solving',
    desc: 'Tanggap dalam menghadapi kendala sistem, mereduksi risiko operasional, dan merancang mitigasi tepat sasaran.',
    icon: Lightbulb,
  },
  {
    name: 'Manajemen Waktu',
    desc: 'Terbiasa menetapkan prioritas milestone proyek, membagi tugas, dan menepati tenggat waktu pengiriman.',
    icon: Clock,
  },
  {
    name: 'Adaptif & Cepat Belajar',
    desc: 'Antusias mengeksplorasi teknologi baru, metodologi terkini, dan dinamika kebutuhan industri.',
    icon: Sparkles,
  },
];

const LANGUAGES = [
  {
    name: 'Bahasa Indonesia',
    level: 'Native / Penutur Asli',
    desc: 'Mahir berkomunikasi lisan dan tulis dalam situasi akademik maupun profesional, dibuktikan skor UKBI 695 (Sangat Unggul) dengan nilai tertinggi di kemampuan membaca (725). Terbiasa menyusun dokumen formal, menulis konten untuk media sosial organisasi, dan mempresentasikan gagasan bisnis di depan juri.',
  },
  {
    name: 'Bahasa Inggris',
    level: 'Basic / Dasar (Pasif & Aktif Terbatas)',
    desc: 'Memahami teks umum dan instruksi sederhana, menulis pesan dan email singkat, serta berkomunikasi lisan pada percakapan dasar.',
  },
];

export default function SoftSkillsSection() {
  return (
    <section id="non-teknis" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="soft-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
            Kompetensi Interpersonal & Bahasa
          </div>
          <h2 id="soft-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            Kemampuan Non-Teknis
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
          <p className="text-sm sm:text-base text-[#09318D]/75 mt-3 leading-relaxed">
            Karakter interpersonal, etos kerja, dan kemampuan berbahasa yang melengkapi kapabilitas teknis analitis.
          </p>
        </div>

        {/* Soft Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SOFT_SKILLS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-3xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 rounded-2xl bg-[#09318D] text-[#FD91CC] w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#09318D] mb-2 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#09318D]/80 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bahasa Cards */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#09318D] text-[#FD91CC]">
              <Languages className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#09318D]">
              Kemampuan Bahasa
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LANGUAGES.map((lang, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-3xl p-6 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-display font-bold text-lg text-[#09318D]">
                    {lang.name}
                  </h4>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] border border-[#FD91CC]/50">
                    {lang.level}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#09318D]/80 leading-relaxed font-sans mt-2">
                  {lang.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
