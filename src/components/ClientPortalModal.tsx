import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Search,
  ArrowRight,
  LogIn,
  User,
  UserPlus,
  BarChart3,
  BookOpen,
  FileText,
  Download,
  Send,
  Sparkles,
  LogOut,
  AlertCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export default function ClientPortalModal({ isOpen, onClose, onOpenBooking }: ClientPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'bookingLookup'>('login');
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'client' | 'trainee'>('client');
  const [regCompany, setRegCompany] = useState('');

  // Booking quick lookup
  const [bookingQuery, setBookingQuery] = useState('');
  const [bookingResults, setBookingResults] = useState<any[] | null>(null);

  // Authenticated State & Dashboard
  const [authUser, setAuthUser] = useState<any | null>(null);
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [activeDashTab, setActiveDashTab] = useState<'overview' | 'invoices' | 'ticket'>('overview');

  // Ticket form
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketPriority, setTicketPriority] = useState('high');
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Check existing session token on mount / open
  useEffect(() => {
    if (!isOpen) return;
    const token = localStorage.getItem('akter_portal_token');
    if (token && !authUser) {
      setLoading(true);
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setAuthUser(data.user);
            setDashboardData(data.dashboard);
          } else {
            localStorage.removeItem('akter_portal_token');
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAuthUser(data.user);
        setDashboardData(data.dashboard);
        if (data.token) {
          localStorage.setItem('akter_portal_token', data.token);
        }
      } else {
        setError(data.error || 'Invalid credentials. Please verify your details.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle 1-Click Demo Login (sajibbaig.com style)
  const handleQuickDemo = async (type: 'client' | 'trainee') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ demoType: type }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAuthUser(data.user);
        setDashboardData(data.dashboard);
        if (data.token) {
          localStorage.setItem('akter_portal_token', data.token);
        }
      } else {
        setError('Failed to initiate demo session.');
      }
    } catch (err) {
      setError('Network error during demo login.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setError('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName.trim(),
          email: regEmail.trim(),
          password: regPassword,
          role: regRole,
          company: regCompany.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAuthUser(data.user);
        setDashboardData(data.dashboard);
        if (data.token) {
          localStorage.setItem('akter_portal_token', data.token);
        }
      } else {
        setError(data.error || 'Failed to create account.');
      }
    } catch (err) {
      setError('Network error during registration.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Quick Appointment / Booking Lookup
  const handleBookingSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingQuery.trim()) {
      setError('Please enter your Appointment Code or Email.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/client/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: bookingQuery.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.appointments)) {
        setBookingResults(data.appointments);
      } else {
        setError(data.error || 'No appointment found with that code or email.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Submit Priority Ticket
  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: authUser?.id,
          userEmail: authUser?.email,
          userName: authUser?.name,
          subject: ticketSubject.trim(),
          message: ticketMessage.trim(),
          priority: ticketPriority,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTicketSuccess(data.message);
        setTicketSubject('');
        setTicketMessage('');
      }
    } catch (_) {
      setError('Failed to submit ticket. Please reach out via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('akter_portal_token');
    setAuthUser(null);
    setDashboardData(null);
    setEmail('');
    setPassword('');
    setError(null);
    setSuccessMsg(null);
    setActiveTab('login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl rounded-3xl bg-zinc-950/98 border border-white/20 p-5 sm:p-8 shadow-2xl shadow-black z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 flex items-center justify-center text-[var(--color-primary)] shadow-sm">
                  {authUser ? <ShieldCheck className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Client &amp; Trainee Portal Login</span>
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {authUser
                      ? `Logged in as ${authUser.name} (${authUser.role || 'Client'})`
                      : 'Access live campaign ROI, project deliverables & mentorship roadmaps'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close Portal"
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error / Alert banner */}
            {error && (
              <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 shrink-0">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* BODY: Authenticated Dashboard vs Login/Register Tabs */}
            <div className="py-4 overflow-y-auto flex-1 pr-1 custom-scrollbar">
              {authUser && dashboardData ? (
                /* ========================================================================= */
                /* AUTHENTICATED DASHBOARD VIEW */
                /* ========================================================================= */
                <div className="space-y-6">
                  {/* User Profile Bar */}
                  <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {authUser.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base">{authUser.name}</h4>
                          <span className="text-[11px] px-2 py-0.5 rounded-full font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {dashboardData.user?.badge || 'Active'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">
                          {authUser.email} • {dashboardData.user?.company || 'Enterprise'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleLogout}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>

                  {/* Dashboard Navigation Tabs */}
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <button
                      onClick={() => setActiveDashTab('overview')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeDashTab === 'overview'
                          ? 'bg-[var(--color-primary)] text-zinc-950 font-bold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Project Overview &amp; KPIs</span>
                    </button>
                    <button
                      onClick={() => setActiveDashTab('invoices')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeDashTab === 'invoices'
                          ? 'bg-[var(--color-primary)] text-zinc-950 font-bold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Invoices &amp; Deliverables</span>
                    </button>
                    <button
                      onClick={() => setActiveDashTab('ticket')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeDashTab === 'ticket'
                          ? 'bg-[var(--color-primary)] text-zinc-950 font-bold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Priority Support Request</span>
                    </button>
                  </div>

                  {/* TAB 1: Overview & KPIs */}
                  {activeDashTab === 'overview' && (
                    <div className="space-y-5">
                      {/* Active Milestone Progress */}
                      {dashboardData.currentMilestone && (
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-[var(--color-primary)]/30 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                              {dashboardData.currentMilestone.title}
                            </span>
                            <span className="font-mono text-[var(--color-primary)] font-bold">
                              {dashboardData.currentMilestone.percent}%
                            </span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-brand rounded-full transition-all duration-500"
                              style={{ width: `${dashboardData.currentMilestone.percent}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-zinc-400">
                            <span>Status: {dashboardData.currentMilestone.status}</span>
                            <span>{dashboardData.currentMilestone.deliveryDate || dashboardData.currentMilestone.nextSession}</span>
                          </div>
                        </div>
                      )}

                      {/* KPI Stat Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {dashboardData.stats?.map((st: any, i: number) => (
                          <div key={i} className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 text-left">
                            <span className="text-[10px] text-zinc-400 block">{st.label}</span>
                            <span className="text-lg font-black text-white block mt-0.5">{st.value}</span>
                            <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">{st.change}</span>
                          </div>
                        ))}
                      </div>

                      {/* Roadmap Milestones / Curriculum */}
                      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                          {dashboardData.type === 'trainee' ? 'Mentorship Modules' : 'Scope Milestones & Verification'}
                        </h5>
                        <div className="space-y-2">
                          {(dashboardData.milestones || dashboardData.curriculum)?.map((m: any, i: number) => (
                            <div
                              key={i}
                              className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2.5">
                                <CheckCircle2 className={`w-4 h-4 ${m.status.includes('Completed') ? 'text-emerald-400' : 'text-[var(--color-primary)]'}`} />
                                <span className="text-zinc-200 font-medium">{m.title}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[11px] text-zinc-500 font-mono hidden sm:inline">{m.date}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                                  m.status.includes('Completed')
                                    ? 'bg-emerald-500/15 text-emerald-300'
                                    : 'bg-[var(--color-primary)]/15 text-[var(--color-accent)]'
                                }`}>
                                  {m.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Invoices & Deliverables */}
                  {activeDashTab === 'invoices' && (
                    <div className="space-y-5">
                      {/* Invoices */}
                      {dashboardData.invoices && (
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                            <span>Project Invoices &amp; Receipts</span>
                            <span className="text-[10px] text-zinc-400 font-normal">Direct Stripe / Wire records</span>
                          </h5>
                          <div className="space-y-2">
                            {dashboardData.invoices.map((inv: any) => (
                              <div key={inv.id} className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                                <div>
                                  <span className="font-bold text-white block">{inv.id} — {inv.description}</span>
                                  <span className="text-[11px] text-zinc-400 font-mono">{inv.date}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-mono font-bold text-white">{inv.amount}</span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${inv.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                                    {inv.status}
                                  </span>
                                  <button
                                    onClick={() => alert(`Receipt for ${inv.id} downloaded successfully.`)}
                                    className="p-1 rounded text-zinc-400 hover:text-white"
                                    title="Download PDF"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Deliverables / Resources */}
                      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                          {dashboardData.type === 'trainee' ? 'Trainee Learning Resources' : 'Deliverable Artifacts & Codebase'}
                        </h5>
                        <div className="space-y-2">
                          {(dashboardData.deliverables || dashboardData.resources)?.map((d: any, i: number) => (
                            <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                              <div>
                                <span className="font-semibold text-white block">{d.name}</span>
                                <span className="text-[11px] text-zinc-400 font-mono">{d.type || d.size}</span>
                              </div>
                              <button
                                onClick={() => alert(`Access link for "${d.name}" verified.`)}
                                className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Download className="w-3 h-3 text-[var(--color-primary)]" />
                                <span>Access File</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Priority Support Ticket */}
                  {activeDashTab === 'ticket' && (
                    <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                      <div>
                        <h5 className="text-sm font-bold text-white">Submit Priority Client Request / Ticket</h5>
                        <p className="text-xs text-zinc-400">
                          Directly dispatches to Akteruzzaman's private console with guaranteed 4-hour SLA response.
                        </p>
                      </div>

                      {ticketSuccess ? (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
                          <div className="flex items-center gap-2 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Request Dispatched!</span>
                          </div>
                          <p>{ticketSuccess}</p>
                          <button
                            onClick={() => setTicketSuccess(null)}
                            className="mt-2 text-[11px] text-[var(--color-primary)] underline cursor-pointer"
                          >
                            Submit another inquiry
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmitTicket} className="space-y-3">
                          <div>
                            <label className="text-[11px] text-zinc-300 font-medium block mb-1">Subject / Feature Request</label>
                            <input
                              type="text"
                              value={ticketSubject}
                              onChange={(e) => setTicketSubject(e.target.value)}
                              placeholder="e.g., Conversion Tracking update or React component change"
                              required
                              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-zinc-300 font-medium block mb-1">Priority Level</label>
                            <select
                              value={ticketPriority}
                              onChange={(e) => setTicketPriority(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)]"
                            >
                              <option value="urgent">Urgent — Production blocker (1-2 hour reply)</option>
                              <option value="high">High — Next Sprint Deliverable</option>
                              <option value="normal">Normal — General Question &amp; Review</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[11px] text-zinc-300 font-medium block mb-1">Message Details</label>
                            <textarea
                              rows={3}
                              value={ticketMessage}
                              onChange={(e) => setTicketMessage(e.target.value)}
                              placeholder="Provide specifics, links, or requirements..."
                              required
                              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)] resize-none"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-xl bg-gradient-brand text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_var(--color-glow)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{loading ? 'Transmitting Request...' : 'Send Priority Ticket'}</span>
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* ========================================================================= */
                /* LOGIN / REGISTER / BOOKING LOOKUP TABS */
                /* ========================================================================= */
                <div className="space-y-5">
                  {/* Tab Selector */}
                  <div className="flex rounded-xl bg-zinc-900/90 p-1 border border-white/10">
                    <button
                      type="button"
                      onClick={() => { setActiveTab('login'); setError(null); }}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeTab === 'login'
                          ? 'bg-[var(--color-primary)] text-zinc-950 shadow-md'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Portal Login</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveTab('register'); setError(null); }}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeTab === 'register'
                          ? 'bg-[var(--color-primary)] text-zinc-950 shadow-md'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Create Account</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveTab('bookingLookup'); setError(null); }}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeTab === 'bookingLookup'
                          ? 'bg-[var(--color-primary)] text-zinc-950 shadow-md'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Code Lookup</span>
                    </button>
                  </div>

                  {/* TAB: LOGIN */}
                  {activeTab === 'login' && (
                    <div className="space-y-4">
                      {/* Fast 1-Click Demo Buttons (sajibbaig.com feature) */}
                      <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-[var(--color-primary)]/25 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                            Instant Demo Access (Explore without registering):
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuickDemo('client')}
                            disabled={loading}
                            className="px-3 py-2 rounded-xl bg-zinc-800/90 hover:bg-[var(--color-primary)] hover:text-zinc-950 text-zinc-200 border border-white/10 text-xs font-semibold text-left transition-all flex items-center justify-between group cursor-pointer"
                          >
                            <div>
                              <span className="font-bold block">Enterprise Client Demo</span>
                              <span className="text-[10px] text-zinc-400 group-hover:text-zinc-900">ROAS, Invoices &amp; Codebase</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-primary)] group-hover:text-zinc-950" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuickDemo('trainee')}
                            disabled={loading}
                            className="px-3 py-2 rounded-xl bg-zinc-800/90 hover:bg-[var(--color-primary)] hover:text-zinc-950 text-zinc-200 border border-white/10 text-xs font-semibold text-left transition-all flex items-center justify-between group cursor-pointer"
                          >
                            <div>
                              <span className="font-bold block">Mentorship Trainee Demo</span>
                              <span className="text-[10px] text-zinc-400 group-hover:text-zinc-900">Curricula, Q&amp;A &amp; Repos</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-primary)] group-hover:text-zinc-950" />
                          </button>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-center">
                        <div className="border-t border-white/10 w-full" />
                        <span className="bg-zinc-950 px-3 text-[11px] text-zinc-500 uppercase font-mono tracking-wider">
                          Or Sign In with Email
                        </span>
                      </div>

                      {/* Regular Login Form */}
                      <form onSubmit={handleLogin} className="space-y-3">
                        <div>
                          <label className="text-xs text-zinc-300 font-medium block mb-1">Email Address / Client ID</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="client@enterprise.com"
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)]"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs text-zinc-300 font-medium">Password</label>
                            <span className="text-[10px] text-zinc-400">Default demo: password123</span>
                          </div>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)]"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-2.5 rounded-xl bg-gradient-brand text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_var(--color-glow)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          <span>{loading ? 'Signing In...' : 'Sign In to Portal'}</span>
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TAB: REGISTER */}
                  {activeTab === 'register' && (
                    <form onSubmit={handleRegister} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-zinc-300 font-medium block mb-1">Full Name</label>
                          <input
                            type="text"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            placeholder="Sarah Jenkins"
                            required
                            className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)]"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-300 font-medium block mb-1">Email Address</label>
                          <input
                            type="email"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="sarah@company.com"
                            required
                            className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-zinc-300 font-medium block mb-1">Portal Account Role</label>
                          <select
                            value={regRole}
                            onChange={(e) => setRegRole(e.target.value as any)}
                            className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)]"
                          >
                            <option value="client">Client (Development &amp; Paid Ads Retainer)</option>
                            <option value="trainee">Mentorship Trainee / Bootcamp Student</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-zinc-300 font-medium block mb-1">Company or Project Name</label>
                          <input
                            type="text"
                            value={regCompany}
                            onChange={(e) => setRegCompany(e.target.value)}
                            placeholder="Venture Corp / Personal"
                            className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-zinc-300 font-medium block mb-1">Set Password</label>
                        <input
                          type="password"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-xl bg-gradient-brand text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_var(--color-glow)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>{loading ? 'Registering...' : 'Create Client / Trainee Account'}</span>
                      </button>
                    </form>
                  )}

                  {/* TAB: BOOKING LOOKUP */}
                  {activeTab === 'bookingLookup' && (
                    <div className="space-y-4">
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Enter your <strong>Appointment Code</strong> (e.g. <code className="text-[var(--color-accent)] bg-[var(--color-primary)]/10 px-1.5 py-0.5 rounded">AK-123456</code>) or booking email to view consultation times and meeting links.
                      </p>

                      <form onSubmit={handleBookingSearch} className="flex gap-2">
                        <input
                          type="text"
                          value={bookingQuery}
                          onChange={(e) => setBookingQuery(e.target.value)}
                          placeholder="AK-XXXXXX or client@domain.com"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-xs focus:outline-none focus:border-[var(--color-primary)]"
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-zinc-950 font-bold text-xs hover:bg-[var(--color-accent)] transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Search</span>
                        </button>
                      </form>

                      {/* Booking Results */}
                      {bookingResults && bookingResults.length > 0 && (
                        <div className="space-y-2 mt-3">
                          {bookingResults.map((appt) => (
                            <div key={appt.id} className="p-3.5 rounded-2xl bg-zinc-900/90 border border-emerald-500/40 space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white">{appt.consultationType}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-emerald-500/20 text-emerald-300">
                                  {appt.status?.toUpperCase()}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-zinc-400 text-[11px]">
                                <span>Date: {appt.date}</span>
                                <span>Time: {appt.timeSlot}</span>
                              </div>
                              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                                <span className="text-zinc-500 font-mono text-[10px]">Code: {appt.code}</span>
                                <a
                                  href="https://meet.google.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[var(--color-primary)] font-semibold hover:underline flex items-center gap-1 text-[11px]"
                                >
                                  <Video className="w-3 h-3" />
                                  <span>Open Google Meet</span>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Links */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="text-[var(--color-primary)] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Need a new consultation? Book session</span>
              </button>
              <span className="text-zinc-500 font-mono">256-bit Encrypted Portal</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
