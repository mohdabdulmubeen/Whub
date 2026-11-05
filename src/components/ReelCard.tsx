import React from 'react';
import { Instagram, Play, ExternalLink, Sparkles, Heart, MessageCircle, Share2 } from 'lucide-react';

export const ReelCard: React.FC = () => {
  const reelUrl = 'https://www.instagram.com/reel/DcRG-5qzRU1/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==';
  const profileUrl = 'https://www.instagram.com/whubwgl/';

  return (
    <section id="reels" className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0d1733] to-slate-950 text-white">
      {/* Ambient background glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-orange-500/20 via-rose-500/20 to-blue-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Social Handles */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-pink-500/20 to-orange-500/20 text-orange-400 border border-orange-500/30">
              <Sparkles size={13} className="text-pink-400" />
              Community Energy & Stories
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">
              Watch the Warangal Startup Movement Unfold
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              From open mic pitches and founder fireside chats to hackathons and summit highlights, follow <span className="text-orange-400 font-bold">@Whubwgl</span> on Instagram to see Warangal’s builders in action.
            </p>

            {/* Instagram Profile Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600">
                  <img
                    src="/images/w-hub-logo.jpg"
                    alt="W-Hub Instagram Profile"
                    className="w-full h-full object-cover rounded-full border-2 border-slate-900"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white flex items-center gap-1.5 text-base">
                    @Whubwgl
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="Active" />
                  </h4>
                  <p className="text-xs text-slate-400">Warangal Hub • Startups & Innovation</p>
                </div>
              </div>

              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-pink-600 to-orange-500 text-white hover:brightness-110 shadow-lg shadow-pink-500/20 transition"
              >
                <Instagram size={16} />
                Follow on Insta
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-rose-400" />
                <span>Active Founder Community</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-blue-400" />
                <span>Open Mic Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 size={16} className="text-emerald-400" />
                <span>Grassroots Stories</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Featured Reel Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900 group">
              {/* Reel Poster Image Preview (using the keynote / summit snapshot) */}
              <div className="relative aspect-[9/14] overflow-hidden bg-slate-950">
                <img
                  src="/images/summit-keynote.jpg"
                  alt="Featured Warangal Summit Reel"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold text-white">
                    <Instagram size={14} className="text-pink-400" />
                    <span>Featured Reel</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500 text-[10px] font-extrabold uppercase text-white">
                    Must Watch
                  </span>
                </div>

                {/* Play Button Trigger */}
                <a
                  href={reelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex flex-col items-center justify-center group/play cursor-pointer"
                  aria-label="Play Reel on Instagram"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 flex items-center justify-center text-white shadow-2xl shadow-orange-500/50 group-hover/play:scale-110 transition duration-300 ring-4 ring-white/30">
                    <Play size={26} fill="white" className="ml-1" />
                  </div>
                  <span className="mt-4 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-white border border-white/20 group-hover/play:bg-black/90 transition">
                    Watch Reel on Instagram
                  </span>
                </a>

                {/* Bottom Reel Caption and Details */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-white/40">
                      <img src="/images/w-hub-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-bold text-white">@Whubwgl</span>
                  </div>

                  <p className="text-xs text-slate-200 line-clamp-2">
                    Catch the pulse of the Warangal Start-ups & Innovation Summit 2026! Innovate · Collaborate · Build. 🚀
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px] text-slate-400">
                    <span>Reel ID: DcRG-5qzRU1</span>
                    <a
                      href={reelUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
                    >
                      Open Link <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReelCard;

