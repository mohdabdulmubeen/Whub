import React, { useState } from 'react';
import { Camera, Maximize2, X, Calendar, MapPin, Users, Award, Mic } from 'lucide-react';

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
  tag: string;
}

const summitPhotos: PhotoItem[] = [
  {
    id: 'summit-4',
    src: '/images/summit-stage-group.jpg',
    title: 'Warangal Open Mic Launch & Delegation',
    category: 'Flagship Launch',
    description: 'Founders, ecosystem enablers, and student leaders unveil the "Warangal Open Mic" initiative at the Warangal Start-ups & Innovation Summit 2026.',
    tag: 'Summit Milestone'
  },
  {
    id: 'summit-2',
    src: '/images/summit-keynote.jpg',
    title: 'Keynote: "From Ideas to Impact"',
    category: 'Keynote Session',
    description: 'Keynote address addressing Warangal’s high-potential tech talent and roadmap to building scalable regional ventures.',
    tag: 'Founder Spotlight'
  },
  {
    id: 'summit-3',
    src: '/images/summit-felicitation.jpg',
    title: 'Green Sapling Felicitation & Ecosystem Honor',
    category: 'Community Spirit',
    description: 'Honoring key innovation catalysts and mentors with symbolic green saplings, representing sustainable startup growth.',
    tag: 'Mentorship'
  },
  {
    id: 'summit-1',
    src: '/images/summit-discussion.jpg',
    title: 'Panelists & Organizers Strategy Circle',
    category: 'Roundtable',
    description: 'Engaged discussion between grassroots founders, academic liaisons, and ecosystem builders planning the next phases of W-Hub.',
    tag: 'Strategy'
  },
  {
    id: 'summit-5',
    src: '/images/summit-audience.jpg',
    title: 'Delegates & Student Innovators Audience',
    category: 'Summit Audience',
    description: 'Over 250+ energetic founders, aspiring innovators, and professionals gathered to participate in pitches and interactive panels.',
    tag: 'Ecosystem Vibrancy'
  }
];

export const SummitGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <section id="summit" className="py-20 relative bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50 mb-3">
              <Camera size={13} />
              Ground Reality & Moments
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Warangal Start-ups & Innovation Summit 2026
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              "From Ideas to Impact" — Real founders, student leaders, and ecosystem partners gathering to fuel Warangal's startup renaissance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
              <Calendar size={14} />
              <span>16-08-2026</span>
            </div>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span>Warangal, Telangana</span>
            </div>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <div className="flex items-center gap-1.5">
              <Users size={14} />
              <span>250+ Attendees</span>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Main Hero Photo: Stage Group with Open Mic Posters */}
          <div
            onClick={() => setSelectedPhoto(summitPhotos[0])}
            className="lg:col-span-8 group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition duration-300 border border-slate-200 dark:border-slate-800 min-h-[340px] md:min-h-[420px]"
          >
            <img
              src={summitPhotos[0].src}
              alt={summitPhotos[0].title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-orange-500 text-white shadow-md flex items-center gap-1.5">
                <Mic size={13} />
                {summitPhotos[0].tag}
              </span>
            </div>

            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/40 text-white backdrop-blur-md">
              <Maximize2 size={16} />
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {summitPhotos[0].title}
              </h3>
              <p className="text-sm text-slate-200 line-clamp-2">
                {summitPhotos[0].description}
              </p>
            </div>
          </div>

          {/* Keynote Photo */}
          <div
            onClick={() => setSelectedPhoto(summitPhotos[1])}
            className="lg:col-span-4 group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition duration-300 border border-slate-200 dark:border-slate-800 min-h-[300px] md:min-h-[420px]"
          >
            <img
              src={summitPhotos[1].src}
              alt={summitPhotos[1].title}
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-blue-600 text-white shadow-md">
                {summitPhotos[1].tag}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-lg font-bold text-white mb-1">
                {summitPhotos[1].title}
              </h3>
              <p className="text-xs text-slate-200">
                Keynote address at the Summit on Warangal's startup potential.
              </p>
            </div>
          </div>

          {/* Bottom 3 Photos in 4-col split */}
          {summitPhotos.slice(2).map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="lg:col-span-4 group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition duration-300 border border-slate-200 dark:border-slate-800 min-h-[260px]"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase rounded-full bg-slate-900/80 text-orange-300 border border-orange-500/30 backdrop-blur-sm">
                  {photo.tag}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-base font-bold text-white mb-0.5">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-orange-600 transition"
              aria-label="Close image"
            >
              <X size={20} />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-xs font-bold uppercase rounded bg-orange-600 text-white">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  Warangal Start-ups & Innovation Summit 2026
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SummitGallery;

