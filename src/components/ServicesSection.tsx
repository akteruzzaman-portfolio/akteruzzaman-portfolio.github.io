import {
  Search,
  TrendingUp,
  Code,
  Zap,
  Box,
  BarChart3,
  Cpu,
  Share2,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/portfolioData';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const getServiceIcon = (iconName: string) => {
    const iconClass = 'w-6 h-6 text-white';
    switch (iconName) {
      case 'Search':
        return <Search className={iconClass} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} />;
      case 'Code':
        return <Code className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'Box':
        return <Box className={iconClass} />;
      case 'BarChart3':
        return <BarChart3 className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'Share2':
        return <Share2 className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Background Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#923FFF]/12 rounded-full blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#7DBFFF]/10 rounded-full blur-[130px] -z-10"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#923FFF]/30 text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Impact Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Organic Scale &{' '}
            <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
              High-Converting Impact
            </span>
          </h2>
          <p className="text-zinc-200 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            Every service is precision-crafted to bridge conversion rate optimization, search ranking authority, and next-generation interactive web development.
          </p>
        </div>

        {/* Glassmorphic Service Cards Grid with Gradient Glow Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="group relative rounded-3xl p-[1px] transition-all duration-300 hover:scale-[1.02] cursor-default flex flex-col"
            >
              {/* Glowing Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-brand opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-[2px] -z-10" />

              {/* Glassmorphic Card Body */}
              <div className="h-full w-full bg-zinc-950/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border border-white/15 group-hover:border-transparent flex flex-col justify-between transition-colors shadow-xl">
                <div>
                  {/* Icon & Highlight Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-[#923FFF]/30 group-hover:scale-110 transition-transform duration-300">
                      {getServiceIcon(service.iconName)}
                    </div>

                    {service.highlight && (
                      <span className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#923FFF]/20 border border-[#923FFF]/40 text-[#7DBFFF]">
                        {service.highlight}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#7DBFFF] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Feature List */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-200">
                        <Check className="w-3.5 h-3.5 text-[#7DBFFF] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquire Action Button */}
                <button
                  id={`service-inquire-${service.id}`}
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-200 group-hover:text-white bg-white/10 group-hover:bg-gradient-brand border border-white/15 group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md group-hover:shadow-[#923FFF]/30 mt-2"
                >
                  <span>Inquire for this Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Services Direct Route Link */}
        <div className="mt-14 text-center">
          <Link
            id="view-all-services-page-btn"
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 hover:border-[#7DBFFF]/50 shadow-xl shadow-black/60 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>Explore All 8 Dedicated Services & Case Examples</span>
            <ArrowRight className="w-4 h-4 text-[#7DBFFF]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
