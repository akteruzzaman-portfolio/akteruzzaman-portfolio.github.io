import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Quote,
  CheckCircle2,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Phone,
  ThumbsUp,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  serviceProvided?: string;
  content: string;
  avatar?: string;
  createdAt?: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(5.0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    serviceProvided: 'High-Performance Web Development',
    rating: 5,
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reviews) {
          setReviews(data.reviews);
          setAverageRating(data.averageRating || 5.0);
          setTotalReviews(data.totalReviews || data.reviews.length);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      setSubmitError('Please provide your name and feedback.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitSuccess('Thank you! Your verified review has been posted.');
        setFormData({
          name: '',
          role: '',
          company: '',
          serviceProvided: 'High-Performance Web Development',
          rating: 5,
          content: '',
        });
        fetchReviews();
        setTimeout(() => {
          setSubmitSuccess(null);
          setIsFormOpen(false);
        }, 3000);
      } else {
        setSubmitError(data.error || 'Failed to submit review.');
      }
    } catch {
      setSubmitError('Network error submitting review.');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['All', 'Web Development', 'SEO Strategy', '3D Web', 'Growth Marketing'];

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'All') return true;
    return r.serviceProvided?.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div id="reviews-page" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" className="text-xs text-zinc-400 hover:text-white transition-colors">
          Home
        </Link>
        <span className="text-xs text-zinc-600">/</span>
        <span className="text-xs text-[#7DBFFF] font-medium">Verified Client Testimonials</span>
      </div>

      {/* Header Banner */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-medium mb-4">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Real Client Outcomes & Verifiable Proof</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
          Client Feedback &{' '}
          <span className="text-gradient-brand">
            Verified Testimonials
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
          Read uncensored testimonials from startup founders, product leads, and business owners who partnered with AKTERUZZAMAN to engineer high-converting web apps, 3D WebGL experiences, and scalable organic search funnels.
        </p>

        {/* Aggregate Ratings Scoreboard */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-2xl font-mono font-bold text-white block">
              {averageRating} / 5.0
            </span>
            <span className="text-xs text-zinc-400">Average Rating ({totalReviews} Reviews)</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-mono font-bold text-emerald-400 block">100%</span>
            <span className="text-xs text-zinc-400">On-Time Delivery Rate</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-mono font-bold text-[#7DBFFF] block">3.8x</span>
            <span className="text-xs text-zinc-400">Average ROI Multiplier</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-mono font-bold text-[#923FFF] block">94%</span>
            <span className="text-xs text-zinc-400">Client Retention & Referrals</span>
          </div>
        </div>
      </div>

      {/* Action Row: Category Filter + Submit Review Button */}
      <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-gradient-brand text-white shadow-md shadow-[#923FFF]/30'
                  : 'text-zinc-400 hover:text-white bg-zinc-900/80 border border-white/10 hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          id="open-review-form-btn"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all cursor-pointer shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-[#7DBFFF]" />
          <span>{isFormOpen ? 'Close Review Form' : 'Submit a Testimonial'}</span>
        </button>
      </div>

      {/* Review Submission Form Drawer / Panel */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-12"
          >
            <form
              onSubmit={handleSubmitReview}
              className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-[#923FFF]/40 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Share Your Project Experience</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Your feedback will be published on the portfolio after verification.
                  </p>
                </div>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              {submitSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{submitSuccess}</span>
                </div>
              )}

              {submitError && (
                <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Henderson"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#7DBFFF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Role / Title</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Co-Founder & CEO"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#7DBFFF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Company / Brand</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Innovations Ltd."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#7DBFFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Service Delivered</label>
                  <select
                    value={formData.serviceProvided}
                    onChange={(e) => setFormData({ ...formData, serviceProvided: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#7DBFFF]"
                  >
                    <option value="High-Performance Web Development">High-Performance Web Development</option>
                    <option value="3D Web & Interactive Experiences">3D Web & Interactive Experiences</option>
                    <option value="SEO & Organic Search Domination">SEO & Organic Search Domination</option>
                    <option value="Full-Funnel Paid Advertising">Full-Funnel Paid Advertising</option>
                    <option value="Conversion Rate Optimization (CRO)">Conversion Rate Optimization (CRO)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Rating</label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 transition-all ${
                            star <= formData.rating
                              ? 'fill-amber-400 text-amber-400 scale-110'
                              : 'text-zinc-600 hover:text-amber-400'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-400 ml-2 font-mono">
                      {formData.rating}.0 / 5.0
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Testimonial & Results Achieved *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Share details on the communication, technical execution, and commercial results achieved..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#7DBFFF]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-brand text-xs font-bold text-white shadow-lg shadow-[#923FFF]/40 hover:scale-105 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting...' : 'Post Testimonial'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-[#923FFF]/40 transition-all flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              {/* Star Rating & Verified Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-zinc-800 text-zinc-800'
                      }`}
                    />
                  ))}
                </div>

                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Client</span>
                </div>
              </div>

              {/* Service Tag */}
              {rev.serviceProvided && (
                <span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 text-[10px] font-mono text-[#7DBFFF] mb-3">
                  {rev.serviceProvided}
                </span>
              )}

              {/* Review Content */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-6">
                "{rev.content}"
              </p>
            </div>

            {/* Client Signature */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <img
                src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={rev.name}
                className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
              />
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white block truncate">{rev.name}</span>
                <span className="text-[10px] text-zinc-400 block truncate">
                  {rev.role} {rev.company && `• ${rev.company}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ready to become our next success story?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            Let's discuss your project scope, timeline, and ROI objectives on a free 20-minute strategy call.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/30 transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp ({PERSONAL_INFO.whatsapp})</span>
          </a>

          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/40 hover:scale-105 transition-all cursor-pointer"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
