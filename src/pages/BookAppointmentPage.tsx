import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Mail, 
  Globe, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Video,
  Download,
  Share2,
  CalendarPlus
} from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';

interface SlotItem {
  time: string;
  available: boolean;
}

interface ConsultationType {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  badge?: string;
  popular?: boolean;
}

const CONSULTATION_TYPES: ConsultationType[] = [
  {
    id: 'discovery-20',
    title: 'Free Discovery Consultation',
    duration: '20 Mins',
    price: 'Free ($0)',
    description: 'Quick introductory call to review your project goals, technical viability, and initial timeline.',
    badge: 'Recommended for New Clients',
  },
  {
    id: 'seo-growth-45',
    title: 'SEO & Organic Growth Deep-Dive',
    duration: '45 Mins',
    price: '$49 / Plan Credit',
    description: 'Comprehensive audit of your domain, keyword ranking gaps, and search conversion strategy.',
    popular: true,
  },
  {
    id: 'web-3d-60',
    title: 'High-Performance Web & 3D Blueprint',
    duration: '60 Mins',
    price: '$99 / Plan Credit',
    description: 'Complete architecture review, interactive 3D WebGL scoping, UI/UX wireframes, and sprint breakdown.',
  },
];

export default function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get('service');
  const preSelectedPlan = searchParams.get('plan');
  const preSelectedProject = searchParams.get('project');

  // Step state: 1 = Consultation Type, 2 = Date & Slot, 3 = Details, 4 = Confirmed
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form selections
  const [selectedType, setSelectedType] = useState<string>(
    preSelectedPlan?.includes('3D') || preSelectedService?.includes('Web')
      ? 'web-3d-60'
      : preSelectedPlan?.includes('SEO') || preSelectedService?.includes('SEO')
      ? 'seo-growth-45'
      : 'discovery-20'
  );

  // Generate the next 14 available days (skipping past dates)
  const availableDates = React.useMemo(() => {
    const dates: Array<{ fullDate: string; dayName: string; dayNumber: string; monthName: string }> = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Skip Sundays for standard business bookings
      if (d.getDay() === 0) continue;
      dates.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate().toString(),
        monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.fullDate || '');
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientBudget, setClientBudget] = useState(
    preSelectedPlan ? preSelectedPlan : '$199 (High-Performance Web & 3D Site)'
  );
  const [clientNotes, setClientNotes] = useState(
    preSelectedProject
      ? `Regarding project: ${preSelectedProject}`
      : preSelectedService
      ? `Inquiring about ${preSelectedService}`
      : ''
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<any>(null);

  // Fetch slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;

    let isMounted = true;
    setLoadingSlots(true);
    setSelectedSlot('');

    fetch(`/api/appointments/slots?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          if (data && Array.isArray(data.slots)) {
            setSlots(data.slots);
            // Select first available slot
            const firstAvail = data.slots.find((s: SlotItem) => s.available);
            if (firstAvail) {
              setSelectedSlot(firstAvail.time);
            }
          }
          setLoadingSlots(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoadingSlots(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  const activeConsultation = CONSULTATION_TYPES.find((c) => c.id === selectedType) || CONSULTATION_TYPES[0];

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !selectedDate || !selectedSlot) {
      setBookingError('Please fill in your name, email, date, and preferred time slot.');
      return;
    }

    setIsSubmitting(true);
    setBookingError(null);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          company: clientCompany,
          consultationType: activeConsultation.title,
          date: selectedDate,
          timeSlot: selectedSlot,
          notes: clientNotes,
          budget: clientBudget,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to confirm appointment.');
      }

      setConfirmedAppointment(data.appointment);
      setCurrentStep(4);
    } catch (err: any) {
      setBookingError(err?.message || 'Error booking appointment. Please try another slot.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build Google Calendar Add Link
  const getGoogleCalendarUrl = () => {
    if (!confirmedAppointment) return '#';
    const dateStr = confirmedAppointment.date.replace(/-/g, '');
    const title = encodeURIComponent(`Consultation with AKTERUZZAMAN (${confirmedAppointment.consultationType})`);
    const details = encodeURIComponent(
      `Appointment Code: ${confirmedAppointment.code}\nType: ${confirmedAppointment.consultationType}\nWith: AKTERUZZAMAN (akteruzzaman.inf@gmail.com)\nTime: ${confirmedAppointment.timeSlot}\n\nA Google Meet link will be provided prior to the session.`
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dateStr}T140000Z/${dateStr}T150000Z`;
  };

  // Download .ics Calendar File
  const downloadIcsFile = () => {
    if (!confirmedAppointment) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AKTERUZZAMAN Portfolio//Appointment Scheduler//EN
BEGIN:VEVENT
SUMMARY:Consultation with AKTERUZZAMAN - ${confirmedAppointment.consultationType}
DESCRIPTION:Confirmation Code: ${confirmedAppointment.code}\\nTime Slot: ${confirmedAppointment.timeSlot}\\nHost: AKTERUZZAMAN (akteruzzaman.inf@gmail.com)
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `consultation_${confirmedAppointment.code}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="book-appointment-page" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#923FFF]/15 border border-[#923FFF]/30 text-[#7DBFFF] text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Real-Time Consultation Calendar</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-heading"
        >
          Schedule an{' '}
          <span className="text-gradient-brand">
            Appointment
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto"
        >
          Book a direct 1-on-1 strategy session with AKTERUZZAMAN to map out your digital marketing funnels, technical SEO, or 3D web platform.
        </motion.p>
      </div>

      {/* Booking Stepper Tracker */}
      {/* Pre-selected context banner if coming from services/pricing/projects */}
      {(preSelectedPlan || preSelectedService || preSelectedProject) && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[var(--color-secondary)]/20 via-[var(--color-primary)]/20 to-transparent border border-[var(--color-primary)]/40 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
            <span className="text-zinc-300">
              Inquiring about:{' '}
              <strong className="text-white font-semibold">
                {preSelectedPlan || preSelectedService || preSelectedProject}
              </strong>
            </span>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-accent)] border border-[var(--color-primary)]/30 shrink-0">
            Auto-Attached to Notes
          </span>
        </div>
      )}

      {currentStep < 4 && (
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
          {[
            { step: 1, label: 'Session Type' },
            { step: 2, label: 'Date & Time' },
            { step: 3, label: 'Your Info' },
          ].map((item, idx) => (
            <React.Fragment key={item.step}>
              <button
                onClick={() => {
                  if (item.step < currentStep) setCurrentStep(item.step);
                }}
                disabled={item.step > currentStep}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  currentStep === item.step
                    ? 'bg-gradient-brand text-white shadow-lg shadow-[#923FFF]/30'
                    : currentStep > item.step
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-pointer'
                    : 'bg-zinc-900 text-zinc-500 border border-white/5 opacity-60'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-[11px] font-bold">
                  {currentStep > item.step ? '✓' : item.step}
                </span>
                <span>{item.label}</span>
              </button>
              {idx < 2 && <div className="w-4 sm:w-8 h-0.5 bg-white/10" />}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Main Console Container */}
      <div className="rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        <AnimatePresence mode="wait">
          {/* STEP 1: CHOOSE CONSULTATION TYPE */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6 sm:p-10 space-y-6"
            >
              <div className="text-left mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">1. Select Consultation Objective</h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Choose the format that best matches your project stage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {CONSULTATION_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#923FFF]/15 border-[#923FFF] shadow-xl shadow-[#923FFF]/20 ring-1 ring-[#923FFF]'
                          : 'bg-zinc-900/60 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        {/* Top Header Row with Clean Badge & Price Tag */}
                        <div className="flex items-center justify-between gap-2 mb-3 min-h-[26px]">
                          {type.badge ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                              {type.badge}
                            </span>
                          ) : type.popular ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-brand text-white shadow-sm whitespace-nowrap">
                              Most Popular
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                              Direct 1-on-1
                            </span>
                          )}
                          <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 shrink-0">
                            {type.price}
                          </span>
                        </div>

                        {/* Duration Row */}
                        <div className="flex items-center gap-1.5 text-xs text-[#7DBFFF] font-semibold mb-2.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{type.duration}</span>
                        </div>

                        <h3 className="text-base font-bold text-white mb-2">{type.title}</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">{type.description}</p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-zinc-300 font-medium">
                          {isSelected ? 'Selected' : 'Select'}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-[#923FFF] border-[#923FFF]' : 'border-white/30'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-end">
                <button
                  id="appointment-step1-next-btn"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/30 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SELECT DATE & TIME SLOT */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6 sm:p-10 space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">2. Select Date & Time</h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Showing available slots for {activeConsultation.title} ({activeConsultation.duration}).
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Change session type</span>
                </button>
              </div>

              {/* Date Horizontal Selector */}
              <div>
                <span className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Choose a Date (Next 14 Days):
                </span>
                <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-none">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.fullDate;
                    return (
                      <button
                        key={item.fullDate}
                        onClick={() => setSelectedDate(item.fullDate)}
                        className={`flex-shrink-0 flex flex-col items-center justify-center w-20 py-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-brand text-white border-[#923FFF] shadow-xl shadow-[#923FFF]/30 scale-105'
                            : 'bg-zinc-900/70 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span className="text-[11px] font-semibold uppercase">{item.dayName}</span>
                        <span className="text-xl font-bold font-mono my-0.5">{item.dayNumber}</span>
                        <span className="text-[10px] text-zinc-400">{item.monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7DBFFF]" />
                    Available Slots on {selectedDate}:
                  </span>
                  <span className="text-[11px] text-zinc-500">Timezone: Local / UTC Synced</span>
                </div>

                {loadingSlots ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3 text-zinc-400">
                    <div className="w-6 h-6 border-2 border-[#923FFF] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">Checking real-time slot availability...</span>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-900/40 rounded-2xl border border-white/10 text-zinc-400 text-sm">
                    No open slots found for this date. Please select another day.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {slots.map((slot) => {
                      const isSelected = selectedSlot === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`py-3 px-3.5 rounded-xl text-xs font-semibold font-mono transition-all duration-200 border cursor-pointer ${
                            !slot.available
                              ? 'bg-zinc-900/30 border-white/5 text-zinc-600 line-through cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#923FFF] text-white border-[#923FFF] shadow-md shadow-[#923FFF]/40'
                              : 'bg-zinc-900/70 border-white/10 text-zinc-300 hover:text-white hover:border-[#923FFF]/50 hover:bg-zinc-800'
                          }`}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  id="appointment-step2-next-btn"
                  disabled={!selectedSlot}
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/30 disabled:opacity-40 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Continue to Client Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CLIENT DETAILS FORM */}
          {currentStep === 3 && (
            <motion.form
              key="step-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleBookSubmit}
              className="p-6 sm:p-10 space-y-6"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">3. Complete Your Booking</h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Selected: <strong className="text-white">{activeConsultation.title}</strong> on{' '}
                  <strong className="text-[#7DBFFF]">{selectedDate}</strong> at{' '}
                  <strong className="text-[#7DBFFF]">{selectedSlot}</strong>.
                </p>
              </div>

              {bookingError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
                  {bookingError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Johnathan Doe"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="e.g. name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Company or Current Website
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      placeholder="e.g. Acme Corp / mybrand.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Target Budget / Plan Interested In
                </label>
                <select
                  value={clientBudget}
                  onChange={(e) => setClientBudget(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF] cursor-pointer"
                >
                  <option value="$99 (SEO & Growth Sprint)">$99 (SEO & Growth Sprint)</option>
                  <option value="$199 (High-Performance Web & 3D Site)">$199 (High-Performance Web & 3D Site - Most Popular)</option>
                  <option value="$299 (Full Growth Engine & Custom Platform)">$299 (Full Growth Engine & Custom Platform)</option>
                  <option value="$500 - $1,500 (Enterprise Multi-Month Retainer)">$500 - $1,500 (Enterprise Multi-Month Retainer)</option>
                  <option value="Undecided / Exploring Options">Undecided / Exploring Options</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Project Vision & Discussion Topics
                </label>
                <textarea
                  rows={3}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Share a few bullet points on what you are looking to achieve, current website bottlenecks, or launch deadlines..."
                  className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF]"
                />
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  id="confirm-booking-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/30 disabled:opacity-50 hover:scale-105 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Booking...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Confirm & Book Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 4: INSTANT CONFIRMATION RECEIPT */}
          {currentStep === 4 && confirmedAppointment && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 sm:p-12 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#7DBFFF] block mb-1">
                  Appointment Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  You're on the Schedule, {confirmedAppointment.name}!
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto">
                  A calendar confirmation and Google Meet link will be delivered to{' '}
                  <strong className="text-white">{confirmedAppointment.email}</strong>.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-zinc-900 border border-white/10 text-left space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-zinc-400">Confirmation Code:</span>
                  <span className="text-base font-bold text-[#7DBFFF]">{confirmedAppointment.code}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Consultation:</span>
                  <span className="text-white font-sans font-semibold">{confirmedAppointment.consultationType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Date:</span>
                  <span className="text-white font-bold">{confirmedAppointment.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Time Slot:</span>
                  <span className="text-white font-bold">{confirmedAppointment.timeSlot}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-zinc-400">Host:</span>
                  <span className="text-white">AKTERUZZAMAN</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/25 hover:scale-105 transition-all"
                >
                  <CalendarPlus className="w-4 h-4 text-[#7DBFFF]" />
                  <span>Add to Google Calendar</span>
                </a>

                <button
                  onClick={downloadIcsFile}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS File</span>
                </button>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-4">
                <Link
                  to="/"
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  ← Return to Portfolio Home
                </Link>
                <span className="text-zinc-700">•</span>
                <Link
                  to="/services"
                  className="text-xs text-[#7DBFFF] hover:underline"
                >
                  Explore Services & Deliverables
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
