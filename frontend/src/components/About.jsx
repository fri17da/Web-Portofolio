import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Award, Workflow, BarChart3, Lightbulb, MapPin, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const PILLARS = [
    {
      title: 'Business Analysis & Process Engineering',
      desc: 'Perancangan model proses bisnis (BPMN, DFD, Use Case), penyusunan SRS, serta konfigurasi modul operasional pada ERP Odoo.',
      icon: Workflow,
    },
    {
      title: 'Data Warehousing & Business Intelligence',
      desc: 'Pembangunan pipeline ETL dengan Pentaho (Star Schema, SCD 1 & 2), query data kompleks SQL, pemodelan prediktif pada Altair AI Studio, dan dashboard Power BI.',
      icon: BarChart3,
    },
    {
      title: 'Product Validation & Strategic Innovation',
      desc: 'Penyusunan Business Model Canvas (BMC), evaluasi System Usability Scale (SUS 82.5), riset preferensi pengguna, dan komersialisasi produk wirausaha berprestasi.',
      icon: Lightbulb,
    },
  ];

  return (
    <section id="tentang" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
            {t.about.sectionBadge}
          </div>
          <h2 id="about-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            {t.about.title}
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Photo Card & Personal Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-b from-[#09318D] to-[#154bbd] p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#FD91CC]/20 rounded-full blur-2xl pointer-events-none" />

              {/* Profile Avatar / Photo Container */}
              <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-1.5 bg-gradient-to-tr from-[#FD91CC] to-white/40 shadow-2xl mb-6">
                <div className="w-full h-full rounded-[22px] bg-[#09318D] flex flex-col items-center justify-center text-white overflow-hidden border-2 border-white/20 relative">
                  {/* High quality clean stylized monogram & graphic portrait representation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#09318D] via-[#103eac] to-[#FD91CC]/30 flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-display text-5xl sm:text-6xl font-black text-white tracking-tighter">
                      SA
                    </span>
                    <span className="text-[10px] font-bold text-[#FD91CC] uppercase tracking-widest mt-1">
                      Syafrida Ade
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal details info */}
              <div className="text-center space-y-1.5">
                <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                  Syafrida Ade Aulia Hakim
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#FD91CC]">
                  Business Analyst & Data Analyst
                </p>
                <p className="text-xs text-white/75 flex items-center justify-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FD91CC]" />
                  <span>Malang, Jawa Timur, Indonesia</span>
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/10 rounded-2xl p-2.5">
                  <span className="font-display text-lg font-black text-white">3.68</span>
                  <p className="text-[10px] text-white/70 font-semibold">IPK / 4.00</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-2.5">
                  <span className="font-display text-lg font-black text-[#FD91CC]">D4 SIB</span>
                  <p className="text-[10px] text-white/70 font-semibold">Polinema</p>
                </div>
              </div>
            </div>

            {/* Academic box */}
            <div className="p-6 rounded-3xl bg-[#09318D]/5 border border-[#09318D]/15 space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#09318D] text-[#FD91CC]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#09318D]">
                    {t.about.educationTitle}
                  </h4>
                  <p className="text-xs text-[#09318D]/70 font-semibold">
                    {t.about.educationSchool}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#09318D]/80 leading-relaxed pt-1">
                {t.about.educationDetail}
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Story & Key Pillars */}
          <div className="lg:col-span-7 space-y-6 text-[#09318D]">
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#09318D]/85">
              <p className="font-semibold text-lg text-[#09318D] leading-snug">
                {t.about.intro}
              </p>
              <p>
                {t.about.p1}
              </p>
              <p>
                {t.about.p2}
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="pt-4 space-y-4">
              <h4 className="font-display text-lg font-bold text-[#09318D]">
                Pilar Fokus & Keahlian Inti
              </h4>

              {PILLARS.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-[#09318D]/15 hover:border-[#FD91CC] bg-white transition-all shadow-sm hover:shadow-md flex items-start gap-4 group"
                  >
                    <div className="p-3 rounded-2xl bg-[#09318D]/10 text-[#09318D] group-hover:bg-[#09318D] group-hover:text-[#FD91CC] transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-base text-[#09318D]">
                        {p.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-[#09318D]/75 leading-relaxed font-sans mt-1">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
