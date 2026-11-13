import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  CheckCircle2,
  Upload,
  RefreshCw,
  Link as LinkIcon,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

interface ListYourSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListYourSpaceModal: React.FC<ListYourSpaceModalProps> = ({ isOpen, onClose }) => {
  const { sendNotification } = useNotifications();

  // Form Fields State
  const [establishmentType, setEstablishmentType] = useState('');
  const [establishmentName, setEstablishmentName] = useState('');
  const [propertyOwnership, setPropertyOwnership] = useState('');
  const [city, setCity] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [picturesOption, setPicturesOption] = useState('');
  const [pictureLink, setPictureLink] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Contact Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [email, setEmail] = useState('');

  // Verification Code (Captcha)
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refId, setRefId] = useState('');

  // Generate random 5-character case-sensitive alphanumeric verification code
  const generateCaptcha = () => {
    const chars = '23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserCaptcha('');
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setIsSuccess(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!establishmentType) {
      setErrorMessage('Please select the type of establishment.');
      return;
    }
    if (!establishmentName.trim()) {
      setErrorMessage('Please enter the name of the establishment.');
      return;
    }
    if (!propertyOwnership) {
      setErrorMessage('Please select ownership of property.');
      return;
    }
    if (!city) {
      setErrorMessage('Please select your city.');
      return;
    }
    if (!completeAddress.trim()) {
      setErrorMessage('Please provide the complete address.');
      return;
    }
    if (!picturesOption) {
      setErrorMessage('Please specify how you will provide pictures of the space.');
      return;
    }
    if (!firstName.trim()) {
      setErrorMessage('First name is required.');
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage('Last name is required.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Phone number is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!userCaptcha.trim() || userCaptcha.trim() !== captchaCode) {
      setErrorMessage('Incorrect verification code. Please enter the exact case-sensitive code shown in the box.');
      return;
    }

    setIsSubmitting(true);

    // Simulate partnership lead submission
    setTimeout(() => {
      const generatedRef = `CELPIN-PARTNER-${Math.floor(100000 + Math.random() * 900000)}`;
      setRefId(generatedRef);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger user notification toast
      try {
        sendNotification(
          'booking_confirmed' as any,
          {},
          {
            title: 'Partner Application Received',
            message: `Thank you, ${firstName}! Your space listing for "${establishmentName}" (${generatedRef}) has been received. Our partner team will reach out shortly.`,
            category: 'support'
          }
        );
      } catch {
        // notification non-critical
      }
    }, 1200);
  };

  const handleReset = () => {
    setEstablishmentType('');
    setEstablishmentName('');
    setPropertyOwnership('');
    setCity('');
    setCompleteAddress('');
    setPicturesOption('');
    setPictureLink('');
    setUploadedFileName('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setAlternatePhone('');
    setEmail('');
    setUserCaptcha('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200 text-card-foreground max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative px-6 py-5 border-b border-border bg-gradient-to-r from-card via-muted/30 to-card flex items-start justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-foreground tracking-tight">
              Become a Celpin partner
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg">
              Thanks for your interest in becoming a Celpin location. Would be great if you could share a few details to help us understand the viability of your space.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-border/80 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-8 px-4 animate-in fade-in duration-300">
              <div className="h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Application submitted successfully!</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-foreground">{firstName} {lastName}</span>. We have received your space listing details for <span className="font-semibold text-foreground">{establishmentName}</span>.
              </p>
              <div className="mt-4 p-3 bg-muted rounded-xl inline-block text-xs font-mono text-muted-foreground">
                Reference ID: <span className="font-bold text-foreground">{refId}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-3 max-w-sm mx-auto">
                Our business development team will inspect your space viability and contact you on <span className="font-medium text-foreground">{phone}</span> or <span className="font-medium text-foreground">{email}</span> within 24–48 hours.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 transition-all cursor-pointer"
                >
                  Close window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Section 1: Space Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-primary flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Space details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Type of establishment */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Type of establishment <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={establishmentType}
                      onChange={(e) => setEstablishmentType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="">-Select-</option>
                      <option value="Coworking Space">Coworking Space</option>
                      <option value="Café / Restaurant">Café / Restaurant</option>
                      <option value="Commercial Office">Commercial Office</option>
                      <option value="Hotel / Lounge">Hotel / Lounge</option>
                      <option value="Standalone Building / Floor">Standalone Building / Floor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Name of establishment */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Name of establishment <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={establishmentName}
                      onChange={(e) => setEstablishmentName(e.target.value)}
                      placeholder="e.g. Hive Workspaces / Roast Café"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Ownership of property */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Ownership of property <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={propertyOwnership}
                      onChange={(e) => setPropertyOwnership(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="">-Select-</option>
                      <option value="Owned">Owned</option>
                      <option value="Leased">Leased</option>
                      <option value="Rented">Rented</option>
                    </select>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Please specify if the property is owned,leased or rented
                    </p>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      City <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="">-Select-</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Warangal">Warangal</option>
                      <option value="Hanamkonda">Hanamkonda</option>
                      <option value="Kazipet">Kazipet</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Complete Address */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Complete Address <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={completeAddress}
                    onChange={(e) => setCompleteAddress(e.target.value)}
                    placeholder="Floor, Building Name, Street / Landmark, Locality, Pincode"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Pictures of the space */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Pictures of the space <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={picturesOption}
                    onChange={(e) => setPicturesOption(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="">-Select-</option>
                    <option value="link">Provide a Drive / Dropbox / Cloud link</option>
                    <option value="upload">Upload Zip file / photos</option>
                    <option value="shoot">I need Celpin team to shoot photos</option>
                    <option value="whatsapp">Will send via WhatsApp / Email later</option>
                  </select>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    (Please specify if you would provide a link or a zip file)
                  </p>

                  {/* Conditional Picture Inputs */}
                  {picturesOption === 'link' && (
                    <div className="mt-2.5 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <LinkIcon className="h-4 w-4" />
                      </div>
                      <input
                        type="url"
                        value={pictureLink}
                        onChange={(e) => setPictureLink(e.target.value)}
                        placeholder="https://drive.google.com/drive/folders/..."
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}

                  {picturesOption === 'upload' && (
                    <div className="mt-2.5">
                      <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/40 transition-colors">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {uploadedFileName || 'Choose ZIP file or photo bundle'}
                        </span>
                        <input
                          type="file"
                          accept=".zip,.rar,.jpg,.jpeg,.png,.pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Contact Details */}
              <div className="pt-4 border-t border-border space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-foreground">Contact details</h4>
                  <p className="text-xs text-muted-foreground">We will get back to you shortly</p>
                </div>

                {/* First and Last Name */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                      <span className="text-[10px] text-muted-foreground block mt-1">First</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                      <span className="text-[10px] text-muted-foreground block mt-1">Last</span>
                    </div>
                  </div>
                </div>

                {/* Phone & Alternate Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Alternate Phone (If any)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        value={alternatePhone}
                        onChange={(e) => setAlternatePhone(e.target.value)}
                        placeholder="Optional contact number"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Verification Code */}
              <div className="pt-4 border-t border-border space-y-3">
                <label className="block text-xs font-semibold text-foreground">
                  Verification code <span className="text-destructive">*</span>
                </label>

                <div className="flex items-center gap-3">
                  {/* Captcha Display Box */}
                  <div className="relative select-none px-5 py-2.5 rounded-xl bg-muted border border-border flex items-center tracking-widest font-mono font-bold text-lg text-primary shadow-inner">
                    <span>{captchaCode}</span>
                  </div>

                  {/* Refresh Button */}
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-2.5 rounded-xl border border-border hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Generate new verification code"
                    aria-label="Refresh verification code"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">
                    Enter the case-sensitive code shown above
                  </p>
                  <input
                    type="text"
                    value={userCaptcha}
                    onChange={(e) => setUserCaptcha(e.target.value)}
                    placeholder="Enter verification code"
                    className="w-full sm:w-64 px-3.5 py-2 rounded-xl border border-border bg-background text-sm font-mono tracking-wider text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-5 border-t border-border flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-border hover:bg-accent text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 hover:shadow-lg disabled:opacity-60 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Please wait...</span>
                    </>
                  ) : (
                    <span>Let's collaborate!</span>
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
