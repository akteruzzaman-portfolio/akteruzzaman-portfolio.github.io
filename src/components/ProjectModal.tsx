import { X, ExternalLink, Github, CheckCircle2, TrendingUp, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onContactProject: (projectTitle: string) => void;
}

export default function ProjectModal({ project, onClose, onContactProject }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        id="project-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="project-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 my-8"
        >
          {/* Top Gradient Bar */}
          <div className="h-1.5 w-full bg-gradient-brand" />

          {/* Close Button */}
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Hero Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-zinc-900">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/project_analytics_seo_1788763850123.jpg';
              }}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#923FFF]/40 text-[#7DBFFF] border border-[#923FFF]/50 backdrop-blur-md mb-2 inline-block">
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Tagline & Description */}
            <div>
              <p className="text-base sm:text-lg font-medium text-[#7DBFFF] mb-2">
                {project.tagline}
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <span className="text-xs text-zinc-400 font-medium mb-1">{metric.label}</span>
                  <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7DBFFF] to-[#923FFF]">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Case Study Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#923FFF]" />
                  <span>The Challenge</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {project.caseStudy.challenge}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-[#7DBFFF]" />
                  <span>The Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Key Deliverables / Results */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#7DBFFF]" />
                <span>Verified Strategic Results</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.caseStudy.results.map((res, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#923FFF] shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#583FFF]" />
                <span>Stack & Technologies Deployed</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  id="modal-inquire-project-btn"
                  onClick={() => {
                    onClose();
                    onContactProject(project.title);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/40 hover:shadow-[#923FFF]/70 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#7DBFFF]" />
                  <span>Inquire for Similar Project</span>
                </button>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Architecture</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center gap-2"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-4 h-4 text-[#7DBFFF]" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
