import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  Eye,
  ArrowRight,
  Share2,
  X,
  Check,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, BlogPost } from '../data/blogsData';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function BlogPage() {
  const [postsList, setPostsList] = useState<BlogPost[]>(BLOG_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = ['All', 'SEO & Growth', 'Web Development', 'Paid Ads', 'CRO & UI/UX', 'Data & Analytics'];

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());

    const queryString = params.toString();
    const url = queryString ? `/api/blog?${queryString}` : '/api/blog';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.posts) && data.posts.length > 0) {
          setPostsList(data.posts);
        }
      })
      .catch(() => {
        // Smooth local fallback
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  const filteredPosts = postsList;

  const featuredPost = postsList.find((p) => p.featured) || postsList[0] || BLOG_POSTS[0];

  const handleShare = (post: BlogPost) => {
    const url = window.location.origin + '/blog#' + post.slug;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="pt-28 pb-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-zinc-400">
        <Link to="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <span className="text-[var(--color-primary)] font-semibold">Engineering & Growth Insights</span>
      </nav>

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-[var(--color-primary)]/40 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-5 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>Insights &amp; Thought Leadership</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 text-white drop-shadow-sm antialiased">
          Articles on{' '}
          <span className="text-[var(--color-primary)] inline-block font-black">
            Digital Growth
          </span>{' '}
          <span className="text-zinc-400 font-light">&amp;</span>{' '}
          <span className="text-[var(--color-accent)] inline-block font-black">
            Web Architecture
          </span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          In-depth technical guides, conversion psychology frameworks, and scalable marketing playbooks authored by Akteruzzaman.
        </p>
      </div>

      {/* Featured Banner Post */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[var(--color-primary)]/40 transition-all duration-300 group shadow-2xl relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center p-6 sm:p-8 lg:p-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-primary)]/20 text-[var(--color-accent)] border border-[var(--color-primary)]/30">
                  Featured Insight
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {featuredPost.publishedDate}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                {featuredPost.title}
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base line-clamp-3 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {featuredPost.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setActivePost(featuredPost)}
                  className="px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-[var(--color-glow)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleShare(featuredPost)}
                  className="p-3 rounded-xl glass-panel border border-white/10 hover:border-[var(--color-primary)]/40 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy link to article"
                  aria-label="Share article"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] border border-white/10">
              <img
                src={featuredPost.featuredImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-2 rounded-2xl glass-panel border border-white/10">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-brand text-white shadow-md shadow-[var(--color-glow)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, SEO, React..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-3xl border border-white/10">
          <p className="text-zinc-400 text-sm mb-4">No matching articles found for "{searchQuery}".</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setActivePost(post)}
              className="rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[var(--color-primary)]/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[var(--color-glow-subtle)]"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-[var(--color-accent)] border border-white/10">
                    {post.category}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[11px] font-mono text-zinc-300 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    <Clock className="w-3 h-3 text-[var(--color-primary)]" /> {post.readTime}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {post.views.toLocaleString()} views
                    </span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-2 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-semibold text-[var(--color-primary)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Full Post Reading Modal */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/60 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-primary)]/20 text-[var(--color-accent)] border border-[var(--color-primary)]/30">
                    {activePost.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                    {activePost.readTime} • {activePost.publishedDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleShare(activePost)}
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

              {/* Modal Body with formatted content */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-left">
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
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

                <div className="relative rounded-2xl overflow-hidden aspect-[21/9] border border-white/10">
                  <img
                    src={activePost.featuredImage}
                    alt={activePost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Markdown Render */}
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

                {/* Consultation CTA Banner */}
                <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[var(--color-secondary)]/20 via-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Need these results for your business?</h3>
                    <p className="text-xs sm:text-sm text-zinc-400">Book a direct technical consultation or strategy session with Akteruzzaman.</p>
                  </div>
                  <Link
                    to="/book-appointment"
                    onClick={() => setActivePost(null)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-brand text-white font-semibold text-xs whitespace-nowrap shadow-lg shadow-[var(--color-glow)] hover:scale-105 transition-all"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
