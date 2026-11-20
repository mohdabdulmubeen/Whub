import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, Coffee } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    solution: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.email.trim()) {
      return;
    }
    setIsSubmitting(true);
    // Simulate API callback request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 lg:py-28 bg-slate-50/70 dark:bg-slate-950/70 overflow-hidden border-t border-border"
      aria-labelledby="contact-heading"
    >
      {/* Subtle ambient gradient highlights for depth */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main 3D Container with Depth & Perspective */}
        <div className="relative group [perspective:1200px]">
          {/* Ambient 3D Backing Glow */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-primary/15 via-tan-500/10 to-amber-500/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none -z-10" />

          {/* Main Split Panel: Realistic 3D Workspace Card on Left & Clean Form Panel on Right */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 transition-all duration-500 group-hover:scale-[1.005]">
            {/* Left: 3D Visual with Image named "sample" & Polished Aligned Overlay */}
            <div className="relative lg:col-span-7 min-h-[340px] sm:min-h-[440px] lg:min-h-[600px] bg-slate-900 overflow-hidden">
              <img
                src="/images/sample.jpg"
                alt="Business professionals collaborating over coffee and laptop in a modern cafe workspace"
                className="w-full h-full object-cover object-[36%_40%] group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                decoding="async"
              />

              {/* Polished Aligned Top Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 shadow-lg text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Workspace Solutions</span>
                </div>
              </div>

              {/* Polished Aligned Bottom Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent text-white pointer-events-none">
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-tan-500/30 text-tan-200 border border-tan-400/30 backdrop-blur-xs w-fit">
                    <Coffee className="h-3 w-3 text-tan-300" />
                    <span>Cafe meetings</span>
                  </span>
                  <p className="font-display text-xl sm:text-2xl font-bold leading-snug drop-shadow-sm text-white">
                    Tailored meeting suites &amp; hybrid desks
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300 font-normal mt-1">
                    <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Instant callback
                    </span>
                    <span className="text-slate-500">•</span>
                    <span>Custom seating plans</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Clean, High-Legibility Contact Form Panel */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-9 lg:p-11 flex flex-col justify-center">
            <div>
              <h2
                id="contact-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight"
              >
                How can we help you?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
                Speak with a workspace solution expert
              </p>
            </div>

            {isSubmitted ? (
              <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-emerald-900 dark:text-emerald-100">
                  Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  Thank you, <span className="font-semibold">{form.name}</span>. Our workspace solution expert will call you on{' '}
                  <span className="font-semibold">{form.mobile}</span> regarding your{' '}
                  <span className="font-semibold">{form.solution || 'workspace'}</span> inquiry shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setForm({ name: '', mobile: '', email: '', solution: '' });
                  }}
                  className="mt-3 inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 sm:mt-7 space-y-4">
                {/* Name Field (Mandatory) */}
                <div>
                  <label
                    htmlFor="callback-name"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="callback-name"
                    type="text"
                    required
                    aria-required="true"
                    placeholder="Name*"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-2xs"
                  />
                </div>

                {/* Mobile Number Field (Mandatory - 2nd in Reference) */}
                <div>
                  <label
                    htmlFor="callback-mobile"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Mobile number <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="callback-mobile"
                    type="tel"
                    required
                    aria-required="true"
                    placeholder="Mobile number*"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-2xs"
                  />
                </div>

                {/* Email Field (Mandatory - 3rd in Reference) */}
                <div>
                  <label
                    htmlFor="callback-email"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Email <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="callback-email"
                    type="email"
                    required
                    aria-required="true"
                    placeholder="Email*"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-2xs"
                  />
                </div>

                {/* Select Solution (Dropdown with Meeting Room & Co-working Space) */}
                <div>
                  <label
                    htmlFor="callback-solution"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Select Solution
                  </label>
                  <div className="relative">
                    <select
                      id="callback-solution"
                      value={form.solution}
                      onChange={(e) => setForm({ ...form, solution: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none pr-10 cursor-pointer shadow-2xs"
                    >
                      <option value="" disabled>Select Solution</option>
                      <option value="Meeting Room">Meeting Room</option>
                      <option value="Co-working Space">Co-working Space</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Noticeable Request Callback Button (Matching Reference's Button Styling) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#1a365d] hover:bg-[#152a4a] text-white font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      'Request Callback'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};
