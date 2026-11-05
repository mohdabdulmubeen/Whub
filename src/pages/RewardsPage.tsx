import React, { useState, useEffect } from 'react';
import {
  Zap,
  Clock,
  TrendingUp,
  Coffee,
  Crown,
  Star,
  Award,
  Gift,
  CheckCircle2,
  ArrowRight,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import { UserProfile, RewardItem, ActivityLog } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface RewardsPageProps {
  onNavigate: (page: string) => void;
}

export const RewardsPage: React.FC<RewardsPageProps> = ({ onNavigate }) => {
  const { t } = useI18n();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    api.getRewards().then(data => {
      setProfile(data.profile);
      setRewards(data.rewards);
      setActivity(data.activity);
    });
  }, []);

  const handleRedeem = async (reward: RewardItem) => {
    if (!profile) return;
    if (profile.credits < reward.creditCost) {
      alert(`You need ${reward.creditCost} credits, but you have ${profile.credits}.`);
      return;
    }

    const res = await api.redeemReward(reward.id);
    setProfile(prev => prev ? { ...prev, credits: prev.credits - reward.creditCost } : null);
    setActivity(prev => [
      {
        id: `act_${Date.now()}`,
        type: 'redeemed',
        title: 'Redeemed reward',
        credits: -reward.creditCost,
        description: reward.name,
        date: 'Just now'
      },
      ...prev
    ]);
    setNotice(res.message);
    setTimeout(() => setNotice(null), 2500);
  };

  const getRewardIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock': return <Clock className="h-5 w-5" />;
      case 'coffee': return <Coffee className="h-5 w-5" />;
      case 'gift': return <Gift className="h-5 w-5" />;
      case 'crown': return <Crown className="h-5 w-5" />;
      default: return <Award className="h-5 w-5" />;
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
          {t('rewards.badge')}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{t('rewards.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('rewards.subtitle')}</p>
      </div>

      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2.5 rounded-full text-sm font-medium shadow-xl flex items-center gap-2 animate-in fade-in"
        >
          <Check className="h-4 w-4 text-success" aria-hidden="true" />
          {notice}
        </div>
      )}

      {/* Top 4 Metrics Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" role="region" aria-label="Member Statistics">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-foreground">{profile?.credits ?? 320}</p>
              <p className="text-xs text-muted-foreground">{t('rewards.creditsAvailable')}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-chart-4/15 text-chart-4" aria-hidden="true">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-foreground">{profile?.hoursBooked ?? 47}h</p>
              <p className="text-xs text-muted-foreground">{t('rewards.totalHours')}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/15 text-success" aria-hidden="true">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-foreground">{profile?.totalSaved ?? 12} Perks</p>
              <p className="text-xs text-muted-foreground">{t('rewards.perksUnlocked')}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-chart-3/15 text-chart-3" aria-hidden="true">
              <Coffee className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-foreground">{profile?.freeCoffeesReady ?? 2}</p>
              <p className="text-xs text-muted-foreground">{t('rewards.freeCoffees')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Tier Progress and Redeem Store */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Tier Banner */}
          <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="bg-gradient-to-r from-primary/15 via-accent/30 to-chart-3/15 p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('rewards.currentTier')}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Crown className="h-6 w-6 text-primary" aria-hidden="true" />
                    <span className="font-display text-2xl font-bold text-foreground">Gold Member</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t('rewards.lifetimePoints')}</p>
                  <p className="font-display text-2xl font-bold text-foreground">{profile?.lifetimePoints ?? 820}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{t('rewards.progressTo')}</span>
                <span className="font-medium text-foreground">820 / 1000</span>
              </div>
              <div className="relative w-full h-2.5 rounded-full bg-secondary overflow-hidden" role="progressbar" aria-valuenow={82} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '82%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('rewards.pointsNeeded')}</p>
            </div>
          </div>

          {/* Redeem Credits Store */}
          <div role="region" aria-label={t('rewards.redeemTitle')}>
            <h2 className="text-lg font-semibold mb-4 text-foreground">{t('rewards.redeemTitle')}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {rewards.map(reward => {
                const canAfford = (profile?.credits ?? 0) >= reward.creditCost;
                return (
                  <div key={reward.id} className="rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0" aria-hidden="true">
                          {getRewardIcon(reward.icon)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">{reward.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{reward.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-3">
                      <span className="text-sm font-bold text-primary flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> {reward.creditCost} credits
                      </span>
                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={!canAfford}
                        aria-label={`${t('rewards.redeemBtn')} ${reward.name} for ${reward.creditCost} credits`}
                        className="inline-flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:pointer-events-none min-h-[36px] h-9 px-3 rounded-lg shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {t('rewards.redeemBtn')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Membership Tiers & Activity Log */}
        <div className="space-y-6">
          {/* Tiers Card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs" role="region" aria-label={t('rewards.membershipTiers')}>
            <h3 className="font-semibold text-base mb-4 text-foreground">{t('rewards.membershipTiers')}</h3>
            <div className="space-y-3">
              {/* Bronze */}
              <div className="p-3 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-semibold">Bronze</span>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground" role="list">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" /> 1 credit per booking session</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" /> Access to all zones</li>
                </ul>
              </div>

              {/* Silver */}
              <div className="p-3 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-semibold">Silver</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">500+ pts</span>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground" role="list">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" /> 1.5 credits per session</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" /> Complimentary café upgrades</li>
                </ul>
              </div>

              {/* Gold (Current) */}
              <div className="p-3 rounded-xl border border-primary bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="text-sm font-semibold text-foreground">Gold</span>
                  <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-bold ml-auto">Current</span>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground" role="list">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" /> 2 credits per session</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" /> Priority café perks</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" /> Complimentary beverage every 10 visits</li>
                </ul>
              </div>

              {/* Platinum */}
              <div className="p-3 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-semibold">Platinum</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">2,500+ pts</span>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground" role="list">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" /> 3 credits per session</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" /> Priority access across all zones</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" /> Unlimited quiet pod reservations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs" role="region" aria-label={t('rewards.recentActivity')}>
            <h3 className="font-semibold text-base mb-4 text-foreground">{t('rewards.recentActivity')}</h3>
            <div className="space-y-3">
              {activity.map(act => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                    act.credits > 0 ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'
                  }`} aria-hidden="true">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-foreground">{act.title}</p>
                      <span className={`text-sm font-semibold ${act.credits > 0 ? 'text-success' : 'text-destructive'}`}>
                        {act.credits > 0 ? `+${act.credits}` : act.credits}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{act.description}</p>
                    <p className="text-[10px] text-muted-foreground/70">{act.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => onNavigate('booking')}
          className="inline-flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] h-11 px-6 rounded-xl gap-2 shadow-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {t('rewards.bookAnother')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
