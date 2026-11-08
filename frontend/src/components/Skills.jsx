import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Code2, Database, BarChart3, Briefcase, Palette, CheckCircle2 } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Pemrograman & Framework Web',
    icon: Code2,
    desc: 'Pengembangan arsitektur backend API, antarmuka interaktif, dan mobile app.',
    tools: [
      { name: 'PHP', level: 'Lanjutan' },
      { name: 'Laravel 13 (API & Web)', level: 'Lanjutan' },
      { name: 'Python', level: 'Menengah' },
      { name: 'Dart / Flutter', level: 'Menengah' },
      { name: 'JavaScript / React 19', level: 'Menengah' },
      { name: 'HTML5 & CSS3', level: 'Lanjutan' },
      { name: 'Tailwind CSS', level: 'Lanjutan' },
      { name: 'Bootstrap', level: 'Lanjutan' },
    ],
  },
  {
    title: 'Database & Data Warehouse',
    icon: Database,
    desc: 'Pemodelan skema relasional, BaaS cloud, dan arsitektur analitik multi-dimensi.',
    tools: [
      { name: 'PostgreSQL', level: 'Lanjutan' },
      { name: 'MySQL', level: 'Lanjutan' },
      { name: 'Supabase (Cloud BaaS)', level: 'Menengah' },
      { name: 'Star Schema Architecture', level: 'Lanjutan' },
      { name: 'SCD Type 1 & Type 2', level: 'Menengah' },
      { name: 'ERD / CDM / PDM Modeling', level: 'Lanjutan' },
    ],
  },
  {
    title: 'Data Analytics & Business Intelligence',
    icon: BarChart3,
    desc: 'Pipeline ETL, data mining, visualisasi metrik performa bisnis eksekutif.',
    tools: [
      { name: 'Pentaho Data Integration (PDI)', level: 'Lanjutan' },
      { name: 'Altair AI Studio (RapidMiner)', level: 'Menengah' },
      { name: 'Power BI Dashboard', level: 'Menengah' },
      { name: 'Microsoft Excel (Advanced & Pivot)', level: 'Lanjutan' },
      { name: 'Google Colab (Pandas / NumPy)', level: 'Menengah' },
      { name: 'Data Mining & Cleaning', level: 'Lanjutan' },
    ],
  },
  {
    title: 'Analisis Bisnis & Manajemen Sistem',
    icon: Briefcase,
    desc: 'Metodologi perancangan strategi bisnis, validasi produk, dan ERP terintegrasi.',
    tools: [
      { name: 'ERP Odoo', level: 'Menengah' },
      { name: 'Business Model Canvas (BMC)', level: 'Lanjutan' },
      { name: 'Value Proposition Canvas (VPC)', level: 'Lanjutan' },
      { name: 'System Usability Scale (SUS)', level: 'Lanjutan' },
      { name: 'BPMN 2.0 & DFD Level 0–2', level: 'Lanjutan' },
      { name: 'Use Case & SRS Documentation', level: 'Lanjutan' },
      { name: 'Jira & Trello (Agile Management)', level: 'Menengah' },
    ],
  },
  {
    title: 'Desain & Media Kreatif',
    icon: Palette,
    desc: 'Perancangan prototipe antarmuka sistem (UI/UX) dan materi publikasi persuasif.',
    tools: [
      { name: 'Figma (UI/UX & Prototyping)', level: 'Lanjutan' },
      { name: 'Canva', level: 'Lanjutan' },
      { name: 'CapCut (Video Production)', level: 'Lanjutan' },
      { name: 'IbisPaint X (Digital Art)', level: 'Lanjutan' },
      { name: 'Visual Typography & Branding', level: 'Lanjutan' },
    ],
  },
];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="kemampuan" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
            {t.skills.sectionBadge}
          </div>
          <h2 id="skills-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            {t.skills.title}
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
          <p className="text-sm sm:text-base text-[#09318D]/75 mt-3 leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-2xl bg-[#09318D] text-[#FD91CC] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#09318D] leading-tight">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#09318D]/70 mb-5 leading-relaxed font-sans">
                    {cat.desc}
                  </p>

                  {/* Pills with Technology Name and Mini Dot */}
                  <div className="flex flex-wrap gap-2">
                    {cat.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-[#09318D]/5 text-[#09318D] border border-[#09318D]/10 hover:border-[#FD91CC] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FD91CC]" />
                        <span>{tool.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#09318D]/10 flex items-center justify-between text-[11px] text-[#09318D]/60 font-medium">
                  <span>{cat.tools.length} Perangkat & Framework</span>
                  <span className="font-bold text-[#09318D]">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
