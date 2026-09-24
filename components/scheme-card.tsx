'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  TrendingUp,
  Clock,
  Zap,
} from 'lucide-react';
import type { Scheme } from '@/lib/data';

const categoryColors: Record<string, string> = {
  Agriculture: 'text-green-700 bg-green-50 dark:bg-green-950/40 dark:text-green-400',
  Education: 'text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400',
  Healthcare: 'text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-400',
  Housing: 'text-orange-700 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-400',
  Employment: 'text-slate-700 bg-slate-50 dark:bg-slate-950/40 dark:text-slate-400',
  'Women Empowerment': 'text-pink-700 bg-pink-50 dark:bg-pink-950/40 dark:text-pink-400',
  Business: 'text-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-400',
  Finance: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400',
  'Social Welfare': 'text-violet-700 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-400',
  'Skill Development': 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400',
};

function EligibilityRing({ score }: { score: number }) {
  const radius = 18;
  const circ = 2 * Math.PI * radius;
  const dash = (score / 100) * circ;
  const color = score >= 90 ? '#22c55e' : score >= 75 ? '#3b82f6' : '#f59e0b';

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
        />
      </svg>
      <span className="absolute text-[10px] font-bold" style={{ color }}>{score}%</span>
    </div>
  );
}

interface SchemeCardProps {
  scheme: Scheme;
  compact?: boolean;
}

export function SchemeCard({ scheme, compact = false }: SchemeCardProps) {
  const [saved, setSaved] = useState(false);
  const colorClass = categoryColors[scheme.category] ?? 'text-slate-700 bg-slate-50';

  return (
    <div className="group relative flex flex-col h-full bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300 hover:-translate-y-0.5">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`text-[10px] px-2 py-0.5 rounded-full border-none font-medium ${colorClass}`}>
                {scheme.category}
              </Badge>
              <Badge variant="outline" className="text-[10px] px-2 py-0.5 rounded-full">
                {scheme.state}
              </Badge>
              {scheme.isNew && (
                <Badge className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white border-none">
                  New
                </Badge>
              )}
            </div>
            <h3 className="text-sm font-semibold leading-snug line-clamp-2">{scheme.title}</h3>
            <p className="text-xs text-muted-foreground">{scheme.department}</p>
          </div>
          <EligibilityRing score={scheme.eligibilityScore} />
        </div>

        {/* Benefit */}
        <div className="bg-secondary/60 rounded-xl px-3 py-2.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Benefit</p>
          <p className="text-sm font-semibold mt-0.5 text-foreground">{scheme.financialAssistance}</p>
        </div>

        {/* Meta */}
        {!compact && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {scheme.isTrending && (
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-orange-500" />
                Trending
              </span>
            )}
            {scheme.isHighBenefit && (
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                High Benefit
              </span>
            )}
            {scheme.deadline && (
              <span className="flex items-center gap-1 ml-auto">
                <Clock className="w-3 h-3" />
                {new Date(scheme.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <Link href={`/schemes/${scheme.id}`} className="flex-1">
            <Button
              size="sm"
              className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-1.5"
            >
              View Details
              <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-xl shrink-0 border-border/60 hover:border-blue-200"
            onClick={() => setSaved(!saved)}
            aria-label={saved ? 'Unsave scheme' : 'Save scheme'}
          >
            {saved ? (
              <BookmarkCheck className="w-3.5 h-3.5 text-blue-600" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
