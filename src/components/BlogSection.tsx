import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Clock,
  Calendar,
  Eye,
  ArrowRight,
  Share2,
  X,
  Check,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, BlogPost } from '../data/blogsData';
import { PERSONAL_INFO } from '../data/portfolioData';

interface BlogSectionProps {
  limit?: number;
  showFilters?: boolean;
}

export default function BlogSection({ limit = 3, showFilters = true }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['All', 'SEO & Growth', 'Web Development', 'Paid Ads', 'CRO & UI/UX'];

  const filteredPosts = useMemo(() => {
    const posts = selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);
    return limit ? posts.slice(0, limit) : posts;
  }, [selectedCategory, limit]);

  const handleShare = (e: React.MouseEvent, post: BlogPost) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blog#${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-[var(--color-primary)]/10 text-[var(--color-accent)] border border-[var(--color-primary)]/30 mb-4 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Growth &amp; Technical Insights</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight"
          >
            Latest Engineering &amp;{' '}
            <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
              Digital Growth Blueprints
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed"
          >
            Field-tested insights on full-funnel customer acquisition, technical SEO in the age of AI search engines, and high-performance WebGL architectures.
          </motion.p>

          {/* Category Filter Pills */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-8"
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-glow)] scale-105 border border-white/20'
                        : 'glass-pill text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              onClick={() => setActivePost(post)}
              className="group rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[var(--color-primary)]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-[var(--color-glow-subtle)] hover:-translate-y-1"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[var(--color-accent)] border border-white/15 shadow-sm">
                    {post.category}
                  </span>

                  {/* Read Time */}
                  <span className="absolute bottom-3 right-3 text-[11px] font-mono text-zinc-200 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[var(--color-primary)]" />
                      {post.publishedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3 h-3 text-zinc-400" />
                      {post.views.toLocaleString()} views
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--color-accent)] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>

                <button
                  type="button"
                  onClick={(e) => handleShare(e, post)}
                  title="Share Article Link"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Section Bottom Action Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-panel border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
              <h4 className="text-base sm:text-lg font-bold text-white">
                Looking for more technical deep-dives?
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Browse all 6+ published articles, strategy frameworks, and case studies in our knowledge base.
            </p>
          </div>

          <Link
            id="homepage-view-all-blogs-btn"
            to="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-brand shadow-lg shadow-[var(--color-glow)] hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer border border-white/15 shrink-0"
          >
            <span>View All Insights</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Interactive Full Article Modal */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-4xl rounded-3xl bg-zinc-950 border border-white/20 shadow-2xl z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 shrink-0 bg-zinc-900/60 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-accent)]">
                  <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>{activePost.category}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400">{activePost.readTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleShare(e, activePost)}
                    className="p-2 rounded-xl glass-panel border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy Article URL"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePost(null)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Close article modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-left">
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {activePost.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 py-3 border-y border-white/10">
                  <img
                    src={PERSONAL_INFO.avatarImage}
                    alt={PERSONAL_INFO.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[var(--color-primary)]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{PERSONAL_INFO.name}</h4>
                    <p className="text-xs text-zinc-400">{PERSONAL_INFO.taglineRole} • {PERSONAL_INFO.location}</p>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-[21/9] border border-white/10">
                  <img
                    src={activePost.featuredImage}
                    alt={activePost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Formatted Content */}
                <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm sm:text-base leading-relaxed">
                  {activePost.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-xl sm:text-2xl font-bold text-white pt-4 pb-1 border-b border-white/10">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-lg sm:text-xl font-bold text-[var(--color-accent)] pt-3">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('> ')) {
                      return (
                        <blockquote key={index} className="p-4 rounded-xl border-l-4 border-[var(--color-primary)] bg-white/5 italic text-zinc-200">
                          {paragraph.replace('> ', '')}
                        </blockquote>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n- ');
                      return (
                        <ul key={index} className="space-y-1.5 list-disc pl-5 text-zinc-300">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>

                {/* Call to Action Inside Article */}
                <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[var(--color-secondary)]/20 via-[var(--color-primary)]/15 to-transparent border border-[var(--color-primary)]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Need these results for your brand?</h3>
                    <p className="text-xs sm:text-sm text-zinc-400">Schedule a 1-on-1 consultation or technical strategy session with AKTERUZZAMAN.</p>
                  </div>
                  <Link
                    to="/book-appointment"
                    onClick={() => setActivePost(null)}
                    className="px-6 py-3 rounded-full bg-gradient-brand text-white font-semibold text-xs sm:text-sm whitespace-nowrap shadow-lg shadow-[var(--color-glow)] hover:scale-105 transition-all cursor-pointer border border-white/15"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
