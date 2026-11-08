import React from 'react';
import ToolIcon from './ToolIcon';
import { Code, Database, BarChart3, Briefcase, Palette, Network, FileCheck2 } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Pemrograman & Web',
    icon: Code,
    description: 'Bahasa pemrograman & framework pengembangan antarmuka dan backend API.',
    tools: [
      'Java',
      'Python',
      'Dart',
      'JavaScript',
      'PHP',
      'Laravel',
      'React',
      'Flutter',
      'Bootstrap',
    ],
  },
  {
    title: 'Database',
    icon: Database,
    description: 'Sistem manajemen basis data relasional, cloud BaaS, dan alat pemodelan.',
    tools: [
      'MySQL',
      'PostgreSQL',
      'Supabase',
      'Sybase PowerDesigner',
      'Laragon',
      'XAMPP',
    ],
  },
  {
    title: 'Data',
    icon: BarChart3,
    description: 'Platform ETL data warehouse, analitik prediktif, spreadsheet, dan visualisasi.',
    tools: [
      'Pentaho Data Integration',
      'Altair AI Studio',
      'Google Colab',
      'Power BI',
      'Excel',
    ],
  },
  {
    title: 'Bisnis',
    icon: Briefcase,
    description: 'Pemodelan strategi bisnis, value map, dan otomasi alur kerja enterprise.',
    tools: [
      'Odoo',
      'Business Model Canvas',
      'Value Proposition Canvas',
    ],
  },
  {
    title: 'Desain & Editing',
    icon: Palette,
    description: 'Perancangan prototipe antarmuka, aset visual grafis, dan konten promosi.',
    tools: [
      'Figma',
      'Canva',
      'Capcut',
      'IbisPaint X',
    ],
  },
  {
    title: 'Jaringan, API, & Kontrol Versi',
    icon: Network,
    description: 'Simulasi infrastruktur jaringan komputer, integrasi endpoint, dan version control.',
    tools: [
      'Cisco Packet Tracer',
      'GNS3',
      'REST API',
      'Git',
    ],
  },
  {
    title: 'Produktivitas',
    icon: FileCheck2,
    description: 'Dokumentasi spesifikasi sistem terstruktur dan kolaborasi kerja manajemen proyek.',
    tools: [
      'Notion',
      'Microsoft Word',
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
            Instrumen & Keahlian
          </div>
          <h2 id="skills-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            Skills & Tools
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
          <p className="text-sm sm:text-base text-[#09318D]/75 mt-3 leading-relaxed">
            Daftar teknologi, basis data, perangkat analitis, dan metodologi yang rutin saya terapkan dalam perancangan sistem dan rekayasa data.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-2xl bg-[#09318D] text-[#FD91CC] group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#09318D] leading-tight">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#09318D]/70 mb-5 leading-relaxed font-sans">
                    {cat.description}
                  </p>

                  {/* Tools Grid with Logo Hover Lift Effect */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.tools.map((toolName, tIdx) => (
                      <div
                        key={tIdx}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#09318D]/5 border border-[#09318D]/10 hover:border-[#FD91CC] hover:bg-white text-[#09318D] shadow-2xs transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md cursor-default group/item"
                      >
                        <ToolIcon name={toolName} size="sm" />
                        <span className="text-xs font-bold whitespace-nowrap">
                          {toolName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#09318D]/10 flex items-center justify-between text-[11px] text-[#09318D]/60 font-medium">
                  <span>{cat.tools.length} Perangkat</span>
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
