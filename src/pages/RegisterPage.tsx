import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  Coffee,
  ShieldCheck,
  Star,
  Building2,
  Check
} from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (page: string, params?: any) => void;
  redirectTo?: string;
  initialParams?: any;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onNavigate,
  redirectTo = 'booking',
  initialParams
}) => {
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  
  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passStrength = calculatePasswordStrength(password);

  const proceedToBooking = (userName?: string, userEmail?: string) => {
    onNavigate(redirectTo || 'booking', {
      ...initialParams,
      customerName: userName || fullName || 'Member',
      customerEmail: userEmail || email || 'member@celpin.com'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'register') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please provide a valid work or personal email.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Please agree to the Terms of Service to continue.');
        return;
      }
    } else {
      if (!email.trim() || !password) {
        setErrorMsg('Please fill in your email and password.');
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        localStorage.setItem(
          'celpin_user',
          JSON.stringify({ name: fullName || 'Member', email, phone })
        );
      } catch {}
      // Auto-forward to booking after brief confirmation
      setTimeout(() => {
        proceedToBooking();
      }, 1400);
    }, 600);
  };

  const handleSocialAuth = (provider: 'google' | 'linkedin') => {
    setIsSubmitting(true);
    const mockName = provider === 'google' ? 'Google User' : 'LinkedIn Member';
    const mockEmail = provider === 'google' ? 'user@gmail.com' : 'user@linkedin.com';
    setFullName(mockName);
    setEmail(mockEmail);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        localStorage.setItem(
          'celpin_user',
          JSON.stringify({ name: mockName, email: mockEmail })
        );
      } catch {}
      setTimeout(() => {
        proceedToBooking(mockName, mockEmail);
      }, 1400);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Breadcrumb & Quick Switch */}
      <div className="border-b border-border/60 bg-card/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="font-semibold text-foreground">
              {authMode === 'register' ? 'Member Account' : 'Account Sign In'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground hidden sm:inline">
              Need a desk right now?
            </span>
            <button
              onClick={() => proceedToBooking()}
              className="font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              Book without account <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Value Proposition & Brand Showcase */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header Lockup */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Premium Coworking Community
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Work Where Ideas <br />
                <span className="text-primary">Turn Into Momentum</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Join Celpin to unlock seamless hourly desks, collaborative meeting spaces, and barista coffee delivered straight to your workstation.
              </p>
            </div>

            {/* Visual Feature Highlights */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-border/70 bg-card/60 shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Instant Access, Flexible Sessions</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Reserve on-demand seating with immediate digital pass generation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-border/70 bg-card/60 shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Coffee className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Smart Café &amp; Table Service</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Order espresso, cold brew, and snacks directly to your seat via QR.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-border/70 bg-card/60 shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">5-Second Digital QR Pass</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Instant booking confirmation and paperless check-in at every hub.</p>
                </div>
              </div>
            </div>

            {/* Member Review Card */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-semibold text-muted-foreground ml-2">4.8 / 5.0 rating</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                “Celpin is my daily go-to. Signing up took 30 seconds, and having high-speed Wi-Fi with hot desks ready anytime is unbeatable.”
              </p>
              <div className="mt-3.5 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                  AK
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Arjun Kumar</p>
                  <p className="text-[11px] text-muted-foreground">Product Engineer &amp; Celpin Member</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Clean Account Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card shadow-xl p-6 sm:p-8 lg:p-10 transition-all">
              
              {/* SUCCESS STATE */}
              {isSuccess ? (
                <div className="py-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="inline-flex items-center justify-center h-18 w-18 rounded-full bg-success/15 text-success mx-auto ring-8 ring-success/10">
                    <Check className="h-10 w-10 stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                      {authMode === 'register' ? 'Welcome to Celpin!' : 'Welcome Back!'}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                      {authMode === 'register'
                        ? 'Your membership account is ready. Your complimentary welcome pass has been applied to your profile.'
                        : 'You have signed in successfully. Ready to book your next workspace?'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 max-w-sm mx-auto text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account:</span>
                      <span className="font-semibold text-foreground">{email || 'member@celpin.com'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-semibold text-success flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Verified Active
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                      onClick={() => proceedToBooking()}
                      className="inline-flex items-center justify-center font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-7 rounded-xl shadow-md hover:shadow-lg transition-all gap-2 cursor-pointer"
                    >
                      <span>Proceed to Book Workspace</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('home')}
                      className="inline-flex items-center justify-center font-medium border border-border bg-background hover:bg-accent h-12 px-6 rounded-xl transition-all cursor-pointer text-sm"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              ) : (
                /* MAIN FORM */
                <div>
                  {/* Auth Mode Tabs */}
                  <div className="flex items-center justify-between border-b border-border pb-4 mb-6" role="tablist" aria-label="Authentication modes">
                    <div className="flex gap-4">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={authMode === 'register'}
                        onClick={() => {
                          setAuthMode('register');
                          setErrorMsg('');
                        }}
                        className={`text-lg font-bold pb-1 transition-colors cursor-pointer relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-t-sm ${
                          authMode === 'register'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Create Account
                        {authMode === 'register' && (
                          <span className="absolute left-0 bottom-[-17px] w-full h-0.5 bg-primary rounded-full" />
                        )}
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={authMode === 'login'}
                        onClick={() => {
                          setAuthMode('login');
                          setErrorMsg('');
                        }}
                        className={`text-lg font-bold pb-1 transition-colors cursor-pointer relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-t-sm ${
                          authMode === 'login'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Sign In
                        {authMode === 'login' && (
                          <span className="absolute left-0 bottom-[-17px] w-full h-0.5 bg-primary rounded-full" />
                        )}
                      </button>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      Complimentary Member Pass
                    </span>
                  </div>

                  {/* PROMINENT SOCIAL SIGNUP BUTTONS (GOOGLE & LINKEDIN) */}
                  <div className="space-y-3 mb-6">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {/* Google Button */}
                      <button
                        type="button"
                        onClick={() => handleSocialAuth('google')}
                        className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border/80 bg-background hover:bg-muted/50 hover:border-primary/40 font-medium text-sm text-foreground transition-all shadow-xs cursor-pointer group"
                      >
                        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                          />
                        </svg>
                        <span>
                          {authMode === 'register' ? 'Sign up with Google' : 'Sign in with Google'}
                        </span>
                      </button>

                      {/* LinkedIn Button */}
                      <button
                        type="button"
                        onClick={() => handleSocialAuth('linkedin')}
                        className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border/80 bg-background hover:bg-muted/50 hover:border-primary/40 font-medium text-sm text-foreground transition-all shadow-xs cursor-pointer group"
                      >
                        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="#0A66C2">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span>
                          {authMode === 'register' ? 'Sign up with LinkedIn' : 'Sign in with LinkedIn'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* CLEAR VISUAL SEPARATOR */}
                  <div className="relative my-7">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/80"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
                      <span className="bg-card px-3 text-muted-foreground">
                        Or continue with email
                      </span>
                    </div>
                  </div>

                  {/* FORM FIELDS */}
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Error Banner */}
                    {errorMsg && (
                      <div id="reg-error-msg" role="alert" className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
                        {errorMsg}
                      </div>
                    )}

                    {authMode === 'register' && (
                      <>
                        {/* Full Name */}
                        <div>
                          <label htmlFor="reg-full-name" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                            Full Name <span className="text-destructive" aria-hidden="true">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground" aria-hidden="true">
                              <User className="h-4 w-4" />
                            </div>
                            <input
                              id="reg-full-name"
                              type="text"
                              required
                              aria-required="true"
                              aria-invalid={!!errorMsg && !fullName.trim()}
                              aria-describedby={errorMsg ? 'reg-error-msg' : undefined}
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="e.g. Arjun Kumar"
                              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Email Field */}
                    <div>
                      <label htmlFor="reg-email" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Work or Personal Email <span className="text-destructive" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground" aria-hidden="true">
                          <Mail className="h-4 w-4" />
                        </div>
                        <input
                          id="reg-email"
                          type="email"
                          required
                          aria-required="true"
                          aria-invalid={!!errorMsg && !email.trim()}
                          aria-describedby={errorMsg ? 'reg-error-msg' : undefined}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    {authMode === 'register' && (
                      /* Phone Number & Company Row */
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="reg-phone" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                            Phone Number (Optional)
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground" aria-hidden="true">
                              <Phone className="h-4 w-4" />
                            </div>
                            <input
                              id="reg-phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+91 98765 43210"
                              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="reg-company" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                            Organization / Studio (Optional)
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground" aria-hidden="true">
                              <Building2 className="h-4 w-4" />
                            </div>
                            <input
                              id="reg-company"
                              type="text"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="e.g. Acme Tech or Freelance"
                              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Password Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="reg-password" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Password <span className="text-destructive" aria-hidden="true">*</span>
                        </label>
                        {authMode === 'login' && (
                          <a href="#forgot" className="text-xs text-primary hover:underline font-medium">
                            Forgot password?
                          </a>
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground" aria-hidden="true">
                          <Lock className="h-4 w-4" />
                        </div>
                        <input
                          id="reg-password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          aria-required="true"
                          aria-invalid={!!errorMsg && password.length < 6}
                          aria-describedby={errorMsg ? 'reg-error-msg' : undefined}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Minimum 6 characters"
                          className="w-full bg-background border border-border rounded-xl pl-10 pr-11 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                        <button
                          type="button"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground cursor-pointer focus-visible:outline-hidden focus-visible:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                        </button>
                      </div>

                      {/* Password strength meter */}
                      {authMode === 'register' && password && (
                        <div className="mt-2 space-y-1">
                          <div className="flex gap-1 h-1.5 w-full bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={passStrength * 25} aria-valuemin={0} aria-valuemax={100}>
                            <div
                              className={`h-full transition-all ${
                                passStrength <= 1
                                  ? 'w-1/4 bg-destructive'
                                  : passStrength === 2
                                  ? 'w-2/4 bg-warning'
                                  : passStrength === 3
                                  ? 'w-3/4 bg-primary'
                                  : 'w-full bg-success'
                              }`}
                            />
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            {passStrength <= 1 && 'Weak password'}
                            {passStrength === 2 && 'Fair password'}
                            {passStrength === 3 && 'Good password'}
                            {passStrength >= 4 && 'Strong password'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Terms & Conditions (Registration only) */}
                    {authMode === 'register' && (
                      <div className="space-y-2 pt-1">
                        <label htmlFor="reg-agree-terms" className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            id="reg-agree-terms"
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded text-primary focus:ring-primary/20 border-border"
                          />
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            I agree to the Terms of Service and Workspace Guidelines
                          </span>
                        </label>

                        <label htmlFor="reg-subscribe" className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            id="reg-subscribe"
                            type="checkbox"
                            checked={subscribeNewsletter}
                            onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded text-primary focus:ring-primary/20 border-border"
                          />
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            Receive complimentary member passes and event updates
                          </span>
                        </label>
                      </div>
                    )}

                    {/* Primary CTA */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full min-h-[48px] h-12 inline-flex items-center justify-center font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 gap-2 text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        {isSubmitting ? (
                          <span>Processing...</span>
                        ) : authMode === 'register' ? (
                          <>
                            <span>Create Account &amp; Continue</span>
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </>
                        ) : (
                          <>
                            <span>Sign In to Account</span>
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Footer Toggle text */}
                    <div className="text-center pt-2">
                      <p className="text-xs text-muted-foreground">
                        {authMode === 'register' ? (
                          <>
                            Already have an account?{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setAuthMode('login');
                                setErrorMsg('');
                              }}
                              className="font-bold text-primary hover:underline cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
                            >
                              Sign In
                            </button>
                          </>
                        ) : (
                          <>
                            Need an account?{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setAuthMode('register');
                                setErrorMsg('');
                              }}
                              className="font-bold text-primary hover:underline cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
                            >
                              Create Account
                            </button>
                          </>
                        )}
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

