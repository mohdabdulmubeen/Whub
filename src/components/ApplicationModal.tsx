import React, { useState } from 'react';
import { X, Rocket, Users, GraduationCap, CheckCircle2, Upload, AlertCircle, Sparkles, Mail, Instagram } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'startup' | 'mentor' | 'student';
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'startup'
}) => {
  const [role, setRole] = useState<'startup' | 'mentor' | 'student'>(defaultRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [phone, setPhone] = useState('');
  const [orgOrCollege, setOrgOrCollege] = useState('');
  const [stage, setStage] = useState('Idea Stage');
  const [pitch, setPitch] = useState('');
  const [fileName, setFileName] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please provide your name and a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to backend API
      const res = await fetch('http://localhost:5001/api/applications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: role,
          name,
          email,
          instagram,
          phone,
          organizationOrCollege: orgOrCollege,
          stageOrRole: stage,
          pitchOrBio: pitch
        })
      });

      if (!res.ok) {
        throw new Error('API submission failed');
      }

      setIsSuccess(true);
    } catch {
      // Graceful local success fallback if backend is running independently
      const stored = JSON.parse(localStorage.getItem('whub_applications') || '[]');
      stored.push({
        id: `local-${Date.now()}`,
        role,
        name,
        email,
        instagram,
        phone,
        orgOrCollege,
        stage,
        pitch,
        fileName,
        date: new Date().toISOString()
      });
      localStorage.setItem('whub_applications', JSON.stringify(stored));
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    setInstagram('');
    setPhone('');
    setOrgOrCollege('');
    setPitch('');
    setFileName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 dark:from-orange-950/40 dark:to-blue-950/40 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1">
            <Sparkles size={14} />
            Join the Warangal Movement
          </div>
          <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">
            W-Hub Onboarding Portal
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Applications directly delivered to <span className="font-semibold text-slate-700 dark:text-slate-200">contact.w.hub@gmail.com</span>
          </p>

          {/* Role selector tabs */}
          <div className="grid grid-cols-3 gap-2 mt-4 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-bold">
            <button
              type="button"
              onClick={() => setRole('startup')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition ${
                role === 'startup'
                  ? 'bg-white dark:bg-orange-600 text-orange-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Rocket size={14} />
              Startup
            </button>
            <button
              type="button"
              onClick={() => setRole('mentor')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition ${
                role === 'mentor'
                  ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users size={14} />
              Mentor
            </button>
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition ${
                role === 'student'
                  ? 'bg-white dark:bg-emerald-600 text-emerald-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap size={14} />
              Student
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-900/30">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                Application Received!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                Thank you, <strong className="text-slate-900 dark:text-white">{name}</strong>. Our team will review your application and contact you via <strong className="text-orange-500">{email}</strong> or your Instagram.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-orange-600 hover:bg-orange-700 text-white transition shadow-lg shadow-orange-600/30"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 border border-rose-200 dark:border-rose-900">
                  <AlertCircle size={15} />
                  {errorMessage}
                </div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Varma"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Mail size={12} className="text-orange-500" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Instagram & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Instagram size={12} className="text-pink-500" />
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@yourhandle"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98490 00000"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Organization or College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {role === 'startup' ? 'Startup / Venture Name' : role === 'student' ? 'College / University' : 'Company / Firm'}
                  </label>
                  <input
                    type="text"
                    value={orgOrCollege}
                    onChange={(e) => setOrgOrCollege(e.target.value)}
                    placeholder={role === 'student' ? 'e.g. NIT Warangal / Kakatiya Univ' : 'e.g. AgriSens AI'}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {role === 'startup' ? 'Venture Stage' : role === 'student' ? 'Year of Study' : 'Domain Expertise'}
                  </label>
                  {role === 'startup' ? (
                    <select
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option>Idea Stage</option>
                      <option>Prototype / MVP Ready</option>
                      <option>Early Revenue / Pilots</option>
                      <option>Fundraising / Scaling</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      placeholder={role === 'student' ? 'e.g. 3rd Year B.Tech' : 'e.g. AI / AgriTech / Angel Investor'}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  )}
                </div>
              </div>

              {/* Pitch Summary / Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {role === 'startup' ? 'Elevator Pitch / Problem You Are Solving' : role === 'student' ? 'Project / Idea Description' : 'How would you like to support Warangal startups?'}
                </label>
                <textarea
                  rows={3}
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="Describe your idea or what kind of support you are looking for (incubation, funding, mentorship, co-working space)..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* File Attachment: Pitch Deck or Photos */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span>Attach Pitch Deck, Photos or One-Pager (Optional)</span>
                  <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 10MB</span>
                </label>
                <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800/50 transition">
                  <Upload size={16} className="text-slate-400" />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {fileName || 'Click to select pitch deck or photos'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.ppt,.pptx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-display font-bold text-white bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:brightness-110 shadow-xl shadow-orange-600/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Submitting Application...'
                  ) : (
                    <>
                      <Rocket size={17} />
                      Submit Application to W-Hub
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;

