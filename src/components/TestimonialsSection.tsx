import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles, Building, PlusCircle, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS_DATA } from '../data/portfolioData';
import { Testimonial } from '../types';

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [rating, setRating] = useState(5);
  const [serviceProvided, setServiceProvided] = useState('High-Performance Web & 3D Site');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch reviews from backend
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {
        // Silent fallback to TESTIMONIALS_DATA
      });
  }, []);

  useEffect(() => {
    if (!autoplay || reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplay, reviews.length]);

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) {
      setSubmitError('Please enter your name and testimonial feedback.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: authorName.trim(),
          role: authorRole.trim() || 'Client',
          company: companyName.trim() || 'Founder',
          rating,
          serviceProvided,
          content: content.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review.');
      }

      if (data.review) {
        setReviews((prev) => [data.review, ...prev]);
        setCurrentIndex(0);
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowReviewModal(false);
        setAuthorName('');
        setAuthorRole('');
        setCompanyName('');
        setContent('');
      }, 2000);
    } catch (err: any) {
      setSubmitError(err.message || 'Error sending review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeTestimonial = reviews[currentIndex] || reviews[0] || TESTIMONIALS_DATA[0];

  return (
    <section id="testimonials" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Background Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-gradient-to-r from-[#923FFF]/12 via-[#583FFF]/8 to-[#7DBFFF]/10 rounded-full blur-[150px] -z-10"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#923FFF]/30 text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Trusted by Ambitious Brands &{' '}
            <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
              Growth Leaders
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Hear directly from founders, CMOs, and product directors who scaled their visibility and conversions.
          </p>

          <div className="mt-5 flex justify-center">
            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-zinc-300 glass-pill hover:text-white hover:border-[#7DBFFF]/40 transition-all cursor-pointer shadow-md"
            >
              <PlusCircle className="w-4 h-4 text-[#7DBFFF]" />
              <span>Leave a Client Review</span>
            </button>
          </div>
        </div>

        {/* Carousel / Slider Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          {/* Outer Radiant Glow Behind Active Card */}
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-3xl bg-gradient-brand opacity-30 blur-xl transition-all duration-700"
          />

          {/* Glassmorphic Testimonial Card */}
          <div className="relative rounded-3xl p-[1.5px] bg-gradient-brand shadow-2xl shadow-black/80">
            <div className="w-full bg-zinc-950/90 backdrop-blur-2xl rounded-[23px] p-6 sm:p-10 md:p-12 relative overflow-hidden">
              {/* Quote Mark Watermark */}
              <Quote className="absolute top-6 right-8 w-24 h-24 text-white/5 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id || currentIndex}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Rating Stars & Service Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      {[...Array(Number(activeTestimonial.rating) || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#7DBFFF] text-[#7DBFFF]" />
                      ))}
                      <span className="text-xs font-mono font-bold text-zinc-300 ml-2">
                        {Number(activeTestimonial.rating || 5).toFixed(1)} / 5.0
                      </span>
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#7DBFFF]">
                      {activeTestimonial.serviceProvided || 'Client Partner'}
                    </span>
                  </div>

                  {/* Feedback Quote Text */}
                  <p className="text-lg sm:text-2xl text-zinc-100 font-normal leading-relaxed italic">
                    {activeTestimonial.content}
                  </p>

                  {/* Client Profile Info */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar with glowing ring */}
                      <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-brand shadow-md shadow-[#923FFF]/40">
                        <img
                          src={activeTestimonial.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                          alt={activeTestimonial.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-white text-base sm:text-lg">
                          {activeTestimonial.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 flex items-center gap-1.5">
                          <span>{activeTestimonial.role}</span>
                          <span>•</span>
                          <span className="text-[#7DBFFF] font-medium flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {activeTestimonial.company}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        id="testimonial-prev-btn"
                        onClick={prevSlide}
                        aria-label="Previous testimonial"
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        id="testimonial-next-btn"
                        onClick={nextSlide}
                        aria-label="Next testimonial"
                        className="p-3 rounded-full bg-gradient-brand text-white shadow-md shadow-[#923FFF]/40 hover:opacity-95 transition-all cursor-pointer hover:scale-105 active:scale-95"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2.5 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                id={`testimonial-dot-${idx}`}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-brand shadow-sm shadow-[#923FFF]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* View Dedicated Reviews Page Link */}
          <div className="mt-12 text-center">
            <Link
              id="view-all-reviews-page-btn"
              to="/reviews"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 hover:border-[#7DBFFF]/50 shadow-xl shadow-black/60 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>Explore All Verified Client Reviews & Ratings</span>
              <ArrowRight className="w-4 h-4 text-[#7DBFFF]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl p-1 bg-gradient-brand shadow-2xl"
            >
              <div className="bg-zinc-950 rounded-[22px] p-6 sm:p-8 relative">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 text-[#7DBFFF] text-xs font-semibold uppercase tracking-wider mb-2">
                  <Star className="w-4 h-4 fill-[#7DBFFF]" />
                  <span>Share Your Experience</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Leave a Verified Review
                </h3>

                {submitSuccess ? (
                  <div className="py-12 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-lg font-bold text-white">Review Submitted!</h4>
                    <p className="text-xs text-zinc-400">Thank you for endorsing Akteruzzaman's work.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    {submitError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                        {submitError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-[#7DBFFF] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Your Role / Company</label>
                        <input
                          type="text"
                          value={authorRole}
                          onChange={(e) => setAuthorRole(e.target.value)}
                          placeholder="e.g. CMO at TechCorp"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-[#7DBFFF] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Rating</label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-[#7DBFFF] outline-none"
                        >
                          <option value={5}>★★★★★ 5.0 (Exceptional)</option>
                          <option value={4}>★★★★☆ 4.0 (Very Good)</option>
                          <option value={3}>★★★☆☆ 3.0 (Satisfactory)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Service Delivered</label>
                        <select
                          value={serviceProvided}
                          onChange={(e) => setServiceProvided(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-[#7DBFFF] outline-none"
                        >
                          <option value="High-Performance Web & 3D Site">High-Performance Web & 3D Site</option>
                          <option value="SEO & Organic Search Sprint">SEO & Organic Search Sprint</option>
                          <option value="Full Growth Engine & Custom Platform">Full Growth Engine & Custom Platform</option>
                          <option value="Conversion Rate Optimization (CRO)">Conversion Rate Optimization (CRO)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Your Feedback / Results *</label>
                      <textarea
                        required
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Describe the speed, results, or conversion uplift experienced..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-[#7DBFFF] outline-none resize-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowReviewModal(false)}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-brand shadow-lg hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? 'Posting...' : 'Submit Verified Review'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
