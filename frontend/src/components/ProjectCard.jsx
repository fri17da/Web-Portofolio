import React from 'react';
import ImageCarousel from './ImageCarousel';
import ToolIcon from './ToolIcon';
import { GithubIcon, InstagramIcon } from './Icons';
import { Calendar, ExternalLink, CheckCircle2, Play } from 'lucide-react';
import { getProjectMediaList } from '../utils/media';

export default function ProjectCard({ project, index }) {
  const initials = project.title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const mediaList = getProjectMediaList(project);
  const hasVideo = mediaList.some((m) => m.type === 'video' || m.type === 'embed');

  return (
    <article
      className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image/Video Media Carousel */}
        <div className="lg:col-span-5">
          <ImageCarousel
            media={mediaList}
            projectTitle={project.title}
            projectInitials={initials}
          />
        </div>

        {/* Right Column: Title, Period, Tagline, Contribution, Tools, Actions */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Period Badge & Video Indicator */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#09318D]/5 text-[#09318D] border border-[#09318D]/10 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FD91CC]" />
                {project.period}
              </span>
              {hasVideo && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FD91CC]/25 text-[#09318D] border border-[#FD91CC]/50 flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 fill-current text-[#09318D]" />
                  <span>Ada Video Demo</span>
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-[#09318D]/40">
              0{index + 1}
            </span>
          </div>

          {/* Title & Tagline */}
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#09318D] leading-snug">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#09318D]/75 mt-1 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Kontribusi Saya */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#09318D]">
              Kontribusi Saya:
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#09318D]/85 font-sans">
              {project.contribution.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FD91CC] mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools yang dipakai */}
          <div className="pt-2 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#09318D]">
              Tools yang Dipakai:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((toolName, tIdx) => (
                <div
                  key={tIdx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#09318D]/5 border border-[#09318D]/10 text-[#09318D] text-xs font-bold hover:border-[#FD91CC] transition-colors"
                >
                  <ToolIcon name={toolName} size="sm" />
                  <span>{toolName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions: GitHub, Demo, Instagram (hide if empty) */}
          {(project.githubUrl || project.demoUrl || project.instagramUrl) && (
            <div className="pt-4 border-t border-[#09318D]/10 flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#09318D] hover:bg-[#09318D]/90 text-white font-bold text-xs shadow-sm transition-all transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#FD91CC]" />
                  <span>Lihat di GitHub</span>
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#09318D]/20 hover:border-[#FD91CC] text-[#09318D] font-bold text-xs transition-all transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#FD91CC]" />
                  <span>Demo</span>
                </a>
              )}

              {project.instagramUrl && (
                <a
                  href={project.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FD91CC] to-[#f472b6] hover:from-[#f472b6] hover:to-[#FD91CC] text-[#09318D] font-extrabold text-xs shadow-sm shadow-[#FD91CC]/30 transition-all transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#09318D]"
                  aria-label={`Buka Instagram ${project.title}`}
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#09318D]" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          )}

        </div>

      </div>
    </article>
  );
}
