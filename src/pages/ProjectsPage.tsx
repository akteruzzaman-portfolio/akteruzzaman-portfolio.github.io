import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ExternalLink, 
  ArrowUpRight, 
  Layers, 
  Calendar,
  CheckCircle,
  Eye
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import ProjectModal from '../components/ProjectModal';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = ['All', 'Web Development', 'Growth Marketing', '3D Web', 'Full-Stack Web App'];

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory === 'All'
      ? '/api/projects'
      : `/api/projects?category=${encodeURIComponent(selectedCategory)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectsList(data.projects);
        }
      })
      .catch(() => {
        // Local data fallback
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const filteredProjects = projectsList;

  return (
    <div id="projects-page" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#923FFF]/15 border border-[#923FFF]/30 text-[#7DBFFF] text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Case Studies & Work</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading"
        >
          Featured Proof of{' '}
          <span className="text-gradient-brand">
            Performance & Craft
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed"
        >
          Dive into production case studies combining modern full-stack architectures, interactive 3D WebGL interfaces, and high-converting marketing funnels.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-brand text-white shadow-lg shadow-[#923FFF]/30'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="group rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-[#923FFF]/50 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-[#923FFF]/15 transition-all duration-300"
          >
            <div>
              {/* Image Preview */}
              <div className="relative h-56 overflow-hidden bg-zinc-950">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/project_analytics_seo_1788763850123.jpg';
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/70 backdrop-blur-md text-[#7DBFFF] border border-white/10">
                  {project.category}
                </span>

                <button
                  onClick={() => setActiveModalProject(project)}
                  aria-label={`View details for ${project.title}`}
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/80 hover:bg-[#923FFF] text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#7DBFFF] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-white/5 mb-6">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="bg-zinc-800/40 p-2.5 rounded-xl border border-white/5">
                      <span className="block text-base font-extrabold text-white font-mono">{m.value}</span>
                      <span className="text-[10px] text-zinc-400 tracking-wide uppercase">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] text-zinc-300 font-mono border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-6 pt-0 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalProject(project)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer text-center"
              >
                Case Study Specs
              </button>
              <Link
                to={`/book-appointment?project=${encodeURIComponent(project.title)}`}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#7DBFFF] hover:text-white bg-[#923FFF]/15 hover:bg-[#923FFF]/30 border border-[#923FFF]/30 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Consult</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal View */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onContactProject={(title) => {
          setActiveModalProject(null);
          navigate(`/book-appointment?project=${encodeURIComponent(title)}`);
        }}
      />

      {/* CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-[#18112c] to-zinc-900 border border-white/15 text-center shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-3">Want Similar Results for Your Brand?</h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-6">
          Whether you need a full 3D redesign or a complete SEO & marketing funnel sprint, let’s talk numbers and scope.
        </p>
        <Link
          to="/book-appointment"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/30 hover:scale-105 transition-transform"
        >
          <Calendar className="w-4 h-4 text-[#7DBFFF]" />
          <span>Book a Free Scoping Call</span>
        </Link>
      </div>
    </div>
  );
}
