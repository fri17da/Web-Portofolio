import React from 'react';
import { X, ExternalLink, CheckCircle2, AlertCircle, Cpu, FileText, ArrowRight, Layers, Workflow, BarChart } from 'lucide-react';
import { GithubIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

export default function CaseStudyModal({ project, onClose }) {
  const { lang } = useLanguage();

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#09318D]/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#09318D]/15 my-auto relative">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-[#09318D] text-white p-6 sm:p-8 rounded-t-3xl flex items-start justify-between gap-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC] text-[#09318D] text-xs font-black uppercase tracking-wider mb-2">
              Studi Kasus Lengkap
            </div>
            <h3 id="case-study-title" className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-white/80 mt-1">
              {project.subtitle} • {project.period}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
            aria-label="Tutup studi kasus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 text-[#09318D]">
          
          {/* Quick Action Links: Demo & GitHub */}
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-[#09318D]/5 border border-[#09318D]/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#09318D]/70">
              Tautan Proyek:
            </span>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-[#09318D] text-white hover:bg-[#09318D]/90 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FD91CC]" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-white border border-[#09318D]/20 text-[#09318D] hover:border-[#FD91CC] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#09318D]" />
                <span>GitHub Repository</span>
              </a>
            )}
            <span className="text-xs text-[#09318D]/60 ml-auto">
              Status: <strong className="text-[#09318D]">{project.badge}</strong>
            </span>
          </div>

          {/* Screenshot Placeholder Visual */}
          <div className="rounded-2xl border-2 border-dashed border-[#09318D]/20 bg-[#09318D]/5 p-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#09318D] text-[#FD91CC] flex items-center justify-center mx-auto shadow-sm">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-base text-[#09318D]">
              Pratinjau Antarmuka & Modul Sistem
            </h4>
            <p className="text-xs text-[#09318D]/70 max-w-md mx-auto">
              Diagram arsitektur sistem, modul dashboard produksi, dan antarmuka alur kerja yang dirancang untuk {project.title}.
            </p>
          </div>

          {/* 1. Problem (Masalah) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#09318D]">
              <div className="p-2 rounded-lg bg-[#FD91CC]/25 text-[#09318D]">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl font-bold">1. Latar Belakang & Masalah</h4>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#09318D]/85 pl-9 font-sans">
              {project.caseStudy.problem}
            </p>
          </div>

          {/* 2. My Role (Peran Saya) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#09318D]">
              <div className="p-2 rounded-lg bg-[#09318D]/10 text-[#09318D]">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl font-bold">2. Peran & Tanggung Jawab Saya</h4>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#09318D]/85 pl-9 font-sans">
              {project.caseStudy.role}
            </p>
          </div>

          {/* 3. Process (Proses Analisis & Desain) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#09318D]">
              <div className="p-2 rounded-lg bg-[#09318D]/10 text-[#09318D]">
                <Workflow className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl font-bold">3. Proses & Metodologi (ERD, Use Case, BMC, VPC)</h4>
            </div>
            <div className="pl-9 space-y-2.5">
              {project.caseStudy.process.map((step, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2.5 text-sm text-[#09318D]/85">
                  <span className="w-2 h-2 rounded-full bg-[#FD91CC] mt-2 shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Measurable Results (Hasil Terukur) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#09318D]/5 to-[#FD91CC]/15 border border-[#09318D]/15 space-y-3">
            <div className="flex items-center gap-2 text-[#09318D]">
              <div className="p-2 rounded-lg bg-[#09318D] text-[#FD91CC]">
                <BarChart className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl font-bold">4. Hasil Terukur & Dampak</h4>
            </div>
            <div className="pl-9 space-y-2">
              {project.caseStudy.results.map((res, rIdx) => (
                <div key={rIdx} className="flex items-start gap-2.5 text-sm font-semibold text-[#09318D]">
                  <CheckCircle2 className="w-4 h-4 text-[#09318D] shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Technologies */}
          <div className="space-y-3 pt-2">
            <h4 className="font-display text-base font-bold text-[#09318D] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FD91CC]" />
              5. Tumpukan Teknologi & Instrumen Terapan
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#09318D]/10 text-[#09318D] font-bold text-xs border border-[#09318D]/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#09318D]/5 rounded-b-3xl border-t border-[#09318D]/10 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#09318D] text-white font-bold text-xs hover:bg-[#09318D]/90 transition-colors focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
          >
            Tutup Studi Kasus
          </button>
        </div>
      </div>
    </div>
  );
}
