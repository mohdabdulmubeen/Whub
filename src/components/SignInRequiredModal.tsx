import React, { useState } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  Mail,
  User,
  ExternalLink
} from 'lucide-react';
import {
  signInWithOAuth,
  saveSession,
  OAuthProvider,
  AuthUser,
  getOAuthConfig
} from '../services/authService';

interface SignInRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
  bookingSummary?: {
    seatName?: string;
    zoneName?: string;
    durationText?: string;
    totalAmount?: number | string;
    bookingType?: string;
    dateText?: string;
  };
  onNavigateToRegister?: () => void;
}

export const SignInRequiredModal: React.FC<SignInRequiredModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  bookingSummary,
  onNavigateToRegister
}) => {
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [notice, setNotice] = useState<{ type: 'cancel' | 'error'; message: string; provider?: OAuthProvider } | null>(null);

  if (!isOpen) return null;

  const handleOAuth = async (provider: OAuthProvider) => {
    setErrorMsg('');
    setNotice(null);
    setLoadingProvider(provider);

    try {
      const result = await signInWithOAuth(provider);
      setLoadingProvider(null);

      if (result.success) {
        onSuccess(result.user);
      } else {
        if (result.cancelled) {
          setNotice({
            type: 'cancel',
            message: result.error || 'Sign-in window was closed before completion.',
            provider
          });
        } else {
          setNotice({
            type: 'error',
            message: result.error || 'Authentication failed. Please try again.',
            provider
          });
        }
      }
    } catch (err: any) {
      setLoadingProvider(null);
      setNotice({
        type: 'error',
        message: err?.message || 'An unexpected error occurred. Please try again.',
        provider
      });
    }
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setNotice(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (authTab === 'signup' && !fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const user: AuthUser = {
        id: `user_${Date.now()}`,
        name: authTab === 'signup' ? fullName.trim() : email.split('@')[0],
        email: email.trim(),
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(authTab === 'signup' ? fullName : email.split('@')[0])}&background=d97706&color=fff`,
        provider: 'email',
        emailVerified: true,
        createdAt: new Date().toISOString()
      };

      saveSession(user, `email_token_${Date.now()}`, 'email');
      onSuccess(user);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-required-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Lockup */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 id="signin-required-title" className="text-xl font-bold tracking-tight text-foreground">
                Sign In to Confirm Booking
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sign in to secure your pass, entry PIN, and loyalty credits.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close authentication modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Feedback / Notice Banner */}
        {notice && (
          <div
            role="alert"
            className={`p-3 rounded-xl text-xs font-medium flex items-start justify-between gap-3 animate-in fade-in duration-150 ${
              notice.type === 'cancel'
                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400'
                : 'bg-destructive/10 border border-destructive/20 text-destructive'
            }`}
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  {notice.type === 'cancel' ? 'Sign-in Cancelled' : 'Authentication Error'}
                </span>
                <span>{notice.message}</span>
              </div>
            </div>
            {notice.provider && (
              <button
                type="button"
                onClick={() => handleOAuth(notice.provider!)}
                className="shrink-0 text-xs font-bold underline hover:opacity-80 cursor-pointer"
              >
                Try again
              </button>
            )}
          </div>
        )}

        {/* Social Authentication Options (Google & LinkedIn) */}
        <div className="space-y-2.5">
          <div className="grid sm:grid-cols-2 gap-2.5">
            {/* Google Button */}
            <button
              type="button"
              disabled={isSubmitting || loadingProvider !== null}
              onClick={() => handleOAuth('google')}
              className={`flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-border/80 bg-background hover:bg-muted/50 hover:border-primary/40 font-semibold text-xs text-foreground transition-all shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                loadingProvider === 'google'
                  ? 'opacity-80 ring-2 ring-primary/40 cursor-wait'
                  : loadingProvider !== null || isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:shadow-sm'
              }`}
            >
              {loadingProvider === 'google' ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
              ) : (
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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
              )}
              <span>{loadingProvider === 'google' ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>

            {/* LinkedIn Button */}
            <button
              type="button"
              disabled={isSubmitting || loadingProvider !== null}
              onClick={() => handleOAuth('linkedin')}
              className={`flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-border/80 bg-background hover:bg-muted/50 hover:border-[#0A66C2]/40 font-semibold text-xs text-foreground transition-all shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0A66C2] ${
                loadingProvider === 'linkedin'
                  ? 'opacity-80 ring-2 ring-[#0A66C2]/40 cursor-wait'
                  : loadingProvider !== null || isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:shadow-sm'
              }`}
            >
              {loadingProvider === 'linkedin' ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#0A66C2] shrink-0" />
              ) : (
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              )}
              <span>{loadingProvider === 'linkedin' ? 'Connecting...' : 'Sign in with LinkedIn'}</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground pt-0.5">
            <ShieldCheck className="h-3 w-3 text-primary shrink-0" />
            <span>Direct OAuth 2.0: No passwords ever stored in Celpin.</span>
          </div>
        </div>

        {/* Separator */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/80"></div>
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-semibold">
            <span className="bg-card px-2.5 text-muted-foreground">Or with email</span>
          </div>
        </div>

        {/* Form Mode Selector */}
        <div className="flex rounded-xl bg-muted/60 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthTab('signin');
              setErrorMsg('');
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              authTab === 'signin' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthTab('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              authTab === 'signup' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3" noValidate>
          {errorMsg && (
            <div role="alert" className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
              {errorMsg}
            </div>
          )}

          {authTab === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Patel"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loadingProvider !== null}
            className="w-full mt-2 py-2.5 px-4 rounded-xl font-semibold text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>{authTab === 'signin' ? 'Sign In & Confirm Pass' : 'Create Account & Confirm Pass'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Dedicated Register Page */}
        {onNavigateToRegister && (
          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span>Need corporate invoice or perks?</span>
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Full Member Page <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
