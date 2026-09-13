import { useState } from 'react';
import { ExternalLink, Sparkles, ArrowRight, Eye, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

interface ProjectsSectionProps {
  onContactProject: (projectTitle: string) => void;
}

export default function ProjectsSection({ onContactProject }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 bg-transparent overflow-hidden">
      {/* Subtle Background Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/6 left-1/2 -translate-x-1/2 w-[850px] h-[700px] bg-gradient-to-tr from-[#923FFF]/12 via-[#583FFF]/8 to-[#7DBFFF]/8 rounded-full blur-[150px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-3/5 right-10 w-[600px] h-[600px] bg-[#923FFF]/10 rounded-full blur-[140px] -z-10"
      />

      {/* Section Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#923FFF]/30 text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cinematic Showcase</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Selected Featured{' '}
              <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2">
              Explore 5 flagship projects combining cutting-edge digital marketing algorithms,
              immersive 3D web interfaces, and high-converting acquisition engines.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-[#7DBFFF] animate-pulse" />
            <span>Cinematic Scroll Experience</span>
          </div>
        </div>
      </div>

      {/* 5 Vertically Stacked Project Panels — Full Width of Screen */}
      <div className="w-full space-y-24 sm:space-y-36">
        {PROJECTS_DATA.map((project, index) => (
          <motion.div
            key={project.id}
            id={`project-panel-${project.id}`}
            initial={{ opacity: 0.2, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0.3, y: -40 }}
            viewport={{ amount: 0.35, margin: '-50px 0px -50px 0px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative px-4 sm:px-6 lg:px-12 xl:px-16"
          >
            <div className="max-w-7xl mx-auto">
              {/* Card Shell taking full width */}
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl shadow-black/90 group">
                {/* Radiant top gradient border line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-brand opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
                  {/* Project Media Container (Large Full-Width Project Image) */}
                  <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div
                      onClick={() => setSelectedProject(project)}
                      data-cursor="view"
                      className="relative rounded-2xl overflow-hidden cursor-pointer group/image aspect-[16/10] bg-zinc-900 border border-white/10 shadow-2xl"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/project_analytics_seo_1788763850123.jpg';
                        }}
                        className="w-full h-full object-cover object-center group-hover/image:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Subtle hover overlay with Quick View prompt */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                        <div className="px-5 py-2.5 rounded-full bg-black/80 border border-white/20 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-[#923FFF]/40">
                          <Eye className="w-4 h-4 text-[#7DBFFF]" />
                          <span>Inspect Project & Case Study</span>
                        </div>
                      </div>

                      {/* Subtle gradient vignette at bottom */}
                      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                      {/* Category Pill floating on image */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/70 text-[#7DBFFF] border border-white/10 backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details Content */}
                  <div className={`lg:col-span-5 space-y-5 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                    {/* Index Counter */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tracking-widest text-[#7DBFFF] uppercase flex items-center gap-2">
                        <span className="w-6 h-[1px] bg-[#7DBFFF]" />
                        Project 0{index + 1} / 05
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight hover:text-[#7DBFFF] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm font-medium text-[#7DBFFF]/90">
                      {project.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Live Metric Pills */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 py-2">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                          <div className="text-sm sm:text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#7DBFFF]">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link Button to View Project */}
                    <div className="pt-3 flex items-center gap-3">
                      <button
                        id={`view-project-btn-${project.id}`}
                        onClick={() => setSelectedProject(project)}
                        data-cursor="pointer"
                        className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/30 hover:shadow-[#923FFF]/60 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer group/btn"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <button
                        id={`details-project-btn-${project.id}`}
                        onClick={() => setSelectedProject(project)}
                        data-cursor="pointer"
                        className="px-4 py-3 rounded-full text-xs font-semibold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Case Study</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Projects Page Link */}
      <div className="mt-20 text-center">
        <Link
          id="view-all-projects-page-btn"
          to="/projects"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/30 hover:shadow-[#923FFF]/60 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <span>Open Dedicated Projects Gallery & Live Demos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactProject={onContactProject}
      />
    </section>
  );
}
