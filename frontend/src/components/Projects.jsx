import React from 'react';
import { projectsData } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="proyek" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
            Portofolio Terpilih
          </div>
          <h2 id="projects-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            Proyek
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
          <p className="text-sm sm:text-base text-[#09318D]/75 mt-3 leading-relaxed">
            Kumpulan proyek akademik, kewirausahaan, dan arsitektur data warehouse dengan kontribusi analitis serta teknis nyata.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="space-y-10">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
