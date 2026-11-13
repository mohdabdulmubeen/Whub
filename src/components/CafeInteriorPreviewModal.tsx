import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Clock,
  Wifi,
  Zap,
  Star,
  CheckCircle2,
  Coffee,
  Sparkles,
  ArrowRight,
  Layers,
  Volume2,
  Sun,
  Eye
} from 'lucide-react';
import { CafeOption } from './LocationSelectorBar';

interface CafeInteriorPreviewModalProps {
  cafe: CafeOption | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectCafe?: (cafeName: string) => void;
}

export const CafeInteriorPreviewModal: React.FC<CafeInteriorPreviewModalProps> = ({
  cafe,
  isOpen,
  onClose,
  onSelectCafe
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    if (isOpen) {
      setSelectedPhotoIndex(0);
      setActiveCategory('all');
    }
  }, [isOpen, cafe]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !cafe) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      const count = cafe.photos?.length || 1;
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % count);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + count) % count);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, cafe, onClose]);

  if (!isOpen || !cafe) return null;

  const photos = cafe.photos || [
    {
      url: cafe.coverPhoto || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=85',
      category: 'Atmosphere' as const,
      caption: `${cafe.name} Interior & Work Atmosphere`
    }
  ];

  const categories = ['all', 'Atmosphere', 'Seating', 'Layout', 'Barista Counter'];

  const filteredPhotos =
    activeCategory === 'all'
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const currentPhoto = photos[selectedPhotoIndex] || photos[0];

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleConfirmReservation = () => {
    if (onSelectCafe) {
      onSelectCafe(cafe.name);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-card border border-border/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 text-card-foreground flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-4 border-b border-border bg-card flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Coffee className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-foreground truncate">
                  {cafe.name}
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                  <Star className="h-3 w-3 fill-current" />
                  {cafe.rating}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="h-3 w-3" />
                  4K Interior Preview
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 shrink-0 text-primary" />
                <span>{cafe.address || cafe.area}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-border hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
            aria-label="Close interior preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Main Body (Split Grid on Desktop, Stack on Mobile) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
          {/* Left: 4K Visual Explorer (Desktop 7 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col bg-muted/20">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-3 shrink-0">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat);
                      const targetIdx = photos.findIndex(
                        (p) => cat === 'all' || p.category === cat
                      );
                      if (targetIdx !== -1) setSelectedPhotoIndex(targetIdx);
                    }}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border/60'
                    }`}
                  >
                    {cat === 'all' ? `All Views (${photos.length})` : cat}
                  </button>
                );
              })}
            </div>

            {/* Main High-Resolution Photo Display */}
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-black shadow-lg ring-1 ring-border group">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Ultra-HD 4K Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>4K Ultra-HD Interior</span>
              </div>

              {/* Category Pill Tag */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md text-white text-[11px] font-medium shadow-xs">
                {currentPhoto.category}
              </div>

              {/* Prev / Next Navigation Arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-md"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-md"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                <p className="text-xs sm:text-sm font-semibold leading-snug drop-shadow-sm">
                  {currentPhoto.caption}
                </p>
                <div className="flex items-center justify-between text-[11px] text-white/70 mt-1">
                  <span>Photo {selectedPhotoIndex + 1} of {photos.length}</span>
                  <span className="hidden sm:inline">Use arrow keys to navigate</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div className="mt-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {photos.map((p, idx) => {
                  const isCurrent = idx === selectedPhotoIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative h-14 w-20 sm:h-16 sm:w-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-primary ring-2 ring-primary/30 scale-105'
                          : 'border-border/60 opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} alt={p.caption} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/10"></div>
                      <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-[9px] bg-black/70 text-white font-mono">
                        {p.category.slice(0, 3)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Atmosphere, Seating, Layout & Booking Details (Desktop 5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-card space-y-6">
            <div className="space-y-5">
              {/* Atmosphere & Lighting */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  <Sun className="h-4 w-4" />
                  <span>Atmosphere &amp; Ambience</span>
                </div>
                <div className="p-3.5 rounded-xl border border-border/80 bg-muted/30">
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                    {cafe.atmosphereTag || 'Natural warm lighting with balanced acoustics, designed for deep focus and comfortable laptop work.'}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-2.5 border-t border-border/60">
                    <div className="flex items-center gap-1.5">
                      <Volume2 className="h-3.5 w-3.5 text-primary" />
                      <span>Noise: Moderate/Quiet</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sun className="h-3.5 w-3.5 text-amber-500" />
                      <span>Lighting: Natural &amp; LED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seating & Layout Breakdown */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  <Layers className="h-4 w-4" />
                  <span>Seating &amp; Floor Layout</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl border border-border/70 bg-card text-xs text-muted-foreground leading-relaxed">
                    <p className="text-foreground font-semibold mb-1">Floor Plan Zoning:</p>
                    <p>{cafe.layoutDescription || 'Divided into Quiet Focus Pods along acoustic dividers, open collaboration tables in the center, and sunlit window bays.'}</p>
                  </div>

                  {/* Seating Highlights Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(cafe.seatingTypes || ['Quiet Focus Pods', 'Collaboration Tables', 'Window Bay Seats', 'Standing Desks']).map((type, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold"
                      >
                        <CheckCircle2 className="h-3 w-3 shrink-0" />
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Essential Workspace Amenities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Standard Work Amenities Included
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 text-foreground">
                    <Wifi className="h-3.5 w-3.5 text-success" />
                    <span>300+ Mbps Fiber Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 text-foreground">
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                    <span>Power at Every Desk</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 text-foreground">
                    <Coffee className="h-3.5 w-3.5 text-primary" />
                    <span>Artisanal Coffee Bar</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 text-foreground">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>{cafe.timing || '08:00 AM – 09:00 PM'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-border space-y-2">
              <button
                type="button"
                onClick={handleConfirmReservation}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Select &amp; Reserve at {cafe.name}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-[11px] text-muted-foreground">
                No upfront reservation fees • Flexible hourly &amp; full-day passes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
