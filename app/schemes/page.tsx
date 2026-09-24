'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  TrendingUp,
  Zap,
  Sparkles,
} from 'lucide-react';
import { schemes, categories } from '@/lib/data';
import { SchemeCard } from '@/components/scheme-card';
import { cn } from '@/lib/utils';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(schemes.map((s) => s.category)))];
const ALL_STATES = ['All', 'Central', ...Array.from(new Set(schemes.map((s) => s.state).filter((s) => s !== 'Central')))];
const ALL_MODES = ['All', 'Online', 'Offline', 'Both'];

export default function SchemesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [state, setState] = useState('All');
  const [mode, setMode] = useState('All');
  const [filter, setFilter] = useState<'all' | 'trending' | 'high-benefit' | 'new'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const matchQuery =
        !query ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.department.toLowerCase().includes(query.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchCategory = category === 'All' || s.category === category;
      const matchState = state === 'All' || s.state === state;
      const matchMode = mode === 'All' || s.applicationMode === mode;
      const matchFilter =
        filter === 'all' ||
        (filter === 'trending' && s.isTrending) ||
        (filter === 'high-benefit' && s.isHighBenefit) ||
        (filter === 'new' && s.isNew);

      return matchQuery && matchCategory && matchState && matchMode && matchFilter;
    });
  }, [query, category, state, mode, filter]);

  const hasActiveFilters = category !== 'All' || state !== 'All' || mode !== 'All' || filter !== 'all';

  const clearFilters = () => {
    setCategory('All');
    setState('All');
    setMode('All');
    setFilter('all');
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border/60 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Browse All Schemes</h1>
            <p className="text-muted-foreground">
              Explore {schemes.length} government welfare schemes — central and state
            </p>
          </div>

          {/* Search bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search schemes, departments, keywords..."
                className="pl-10 h-11 rounded-xl bg-secondary/40 border-border/60 focus:border-blue-300 dark:focus:border-blue-700"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              className={cn('h-11 rounded-xl gap-2', showFilters && 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40')}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:block">Filters</span>
              {hasActiveFilters && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 p-4 rounded-2xl bg-secondary/40 border border-border/60 space-y-4 animate-scale-in">
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-9 rounded-xl text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">State / Central</label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="h-9 rounded-xl text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Application Mode</label>
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger className="h-9 rounded-xl text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_MODES.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs gap-1.5 text-muted-foreground rounded-xl">
                  <X className="w-3.5 h-3.5" />
                  Clear all filters
                </Button>
              )}
            </div>
          )}

          {/* Quick filter pills */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {[
              { key: 'all', label: 'All Schemes', icon: null },
              { key: 'trending', label: 'Trending', icon: TrendingUp },
              { key: 'high-benefit', label: 'High Benefit', icon: Zap },
              { key: 'new', label: 'New', icon: Sparkles },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key as typeof filter)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                  filter === key
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25'
                    : 'bg-background border-border/60 text-muted-foreground hover:border-blue-200 dark:hover:border-blue-800 hover:text-foreground'
                )}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {label}
              </button>
            ))}

            <div className="ml-auto text-xs text-muted-foreground">
              {filtered.length} scheme{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div className="border-b border-border/60 bg-background/80 sticky top-16 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-thin">
            <button
              type="button"
              onClick={() => setCategory('All')}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                category === 'All'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-background border-border/60 text-muted-foreground hover:text-foreground hover:border-blue-200 dark:hover:border-blue-800'
              )}
            >
              All
            </button>
            {categories.map(({ label }) => (
              <button
                key={label}
                type="button"
                onClick={() => setCategory(label)}
                className={cn(
                  'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                  category === label
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-background border-border/60 text-muted-foreground hover:text-foreground hover:border-blue-200 dark:hover:border-blue-800'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary/60 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No schemes found</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Try adjusting your search or filters to find schemes that match your needs.
            </p>
            <Button variant="outline" onClick={clearFilters} className="rounded-xl gap-2">
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>

            {filtered.length < schemes.length && (
              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground">
                  Showing {filtered.length} of {schemes.length} schemes. Use filters to refine.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
