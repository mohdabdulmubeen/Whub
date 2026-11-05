import React, { useState, useEffect } from 'react';
import {
  Coffee,
  CupSoda,
  Utensils,
  Leaf,
  Cookie,
  Candy,
  Salad,
  Cake,
  IceCream,
  Plus,
  Check,
  Star,
  Sparkles,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { MenuItem } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface CafePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const CafePage: React.FC<CafePageProps> = ({ onNavigate }) => {
  const { t } = useI18n();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  useEffect(() => {
    api.getMenu().then(data => setItems(data.items));
  }, []);

  const categories = [
    { id: 'all', label: t('cafe.all') },
    { id: 'coffee', label: t('cafe.coffee') },
    { id: 'tea', label: t('cafe.tea') },
    { id: 'snacks', label: t('cafe.snacks') },
    { id: 'meals', label: t('cafe.meals') },
    { id: 'desserts', label: t('cafe.desserts') }
  ];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(i => i.category === activeCategory);

  const popularItems = items.filter(i => i.isPopular);

  const addToCart = (item: MenuItem) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    setAddedNotice(`${t('cafe.addedToOrder')}: ${item.name}`);
    setTimeout(() => setAddedNotice(null), 2000);
  };

  const getItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'coffee': return <Coffee className="h-6 w-6" />;
      case 'cup-soda': return <CupSoda className="h-6 w-6" />;
      case 'leaf': return <Leaf className="h-6 w-6" />;
      case 'cookie': return <Cookie className="h-6 w-6" />;
      case 'candy': return <Candy className="h-6 w-6" />;
      case 'salad': return <Salad className="h-6 w-6" />;
      case 'cake': return <Cake className="h-6 w-6" />;
      case 'ice-cream': return <IceCream className="h-6 w-6" />;
      default: return <Utensils className="h-6 w-6" />;
    }
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Page Title */}
      <div className="mb-8">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
          {t('cafe.badge')}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{t('cafe.title')}</h1>
            <p className="mt-2 text-muted-foreground max-w-2xl leading-relaxed">
              {t('cafe.subtitle')}
            </p>
          </div>
          {totalCartCount > 0 && (
            <button
              onClick={() => onNavigate('booking', { preselectedCart: cart })}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium shadow-md hover:bg-primary/90 transition-all shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {t('cafe.orderWithSeat')} ({totalCartCount})
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {addedNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2"
        >
          <Check className="h-4 w-4 text-success" aria-hidden="true" />
          {addedNotice}
        </div>
      )}

      {/* Most Popular Highlight Section */}
      <div className="mb-12" role="region" aria-label={t('cafe.mostPopular')}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold">{t('cafe.mostPopular')}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularItems.map(item => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card shadow-xs group hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform" aria-hidden="true">
                    {getItemIcon(item.icon)}
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground gap-1">
                    <Star className="h-3 w-3 fill-current" aria-hidden="true" /> {t('cafe.mostPopular')}
                  </span>
                </div>
                <h3 className="font-semibold text-base">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-base text-foreground">₹{item.price}</span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{t('cafe.deskDelivery')}</span>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  aria-label={`${t('cafe.add')} ${item.name}`}
                  className="inline-flex items-center justify-center text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground min-h-[36px] h-9 rounded-lg px-3 gap-1.5 shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" /> {t('cafe.add')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar" role="tablist" aria-label="Café categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium min-h-[40px] transition-all shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
              activeCategory === cat.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* All / Filtered Items Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" role="region" aria-label="Café Items">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="rounded-xl border border-border bg-card p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0" aria-hidden="true">
              {getItemIcon(item.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
              <p className="text-xs text-foreground font-bold mt-1">₹{item.price} • <span className="text-primary font-medium">{t('cafe.deskDelivery')}</span></p>
            </div>
            <button
              onClick={() => addToCart(item)}
              className="inline-flex items-center justify-center rounded-lg text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground min-h-[36px] min-w-[36px] h-9 w-9 transition-colors shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`${t('cafe.add')} ${item.name}`}
              title={`${t('cafe.add')} ${item.name}`}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
