'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sparkles,
  TrendingUp,
  Bell,
  Bookmark,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  ChevronRight,
  AlertCircle,
  Star,
  RefreshCw,
  User,
  ArrowRight,
} from 'lucide-react';
import { schemes } from '@/lib/data';
import { SchemeCard } from '@/components/scheme-card';

const recommendedSchemes = schemes.slice(0, 6);
const savedSchemes = schemes.slice(2, 5);
const recentSchemes = schemes.slice(1, 4);

const upcomingDeadlines = [
  { name: 'PM Scholarship Scheme', date: '2024-10-31', daysLeft: 17, urgency: 'high' },
  { name: 'PMAY Urban', date: '2024-12-31', daysLeft: 78, urgency: 'medium' },
];

const documentChecklist = [
  { doc: 'Aadhaar Card', done: true },
  { doc: 'Income Certificate', done: true },
  { doc: 'Bank Passbook', done: true },
  { doc: 'Caste Certificate', done: false },
  { doc: 'Residence Certificate', done: false },
  { doc: 'Passport Photo (2 copies)', done: true },
];

const aiSuggestions = [
  { text: 'You may qualify for Sukanya Samriddhi Yojana — check eligibility', type: 'new' },
  { text: 'PM-KISAN installment due. Verify your bank details to receive it.', type: 'action' },
  { text: 'PM Scholarship deadline in 17 days — apply now', type: 'urgent' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('recommended');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                  R
                </div>
                <span className="text-sm text-muted-foreground">Welcome back,</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold">Rahul Kumar</h1>
              <p className="text-muted-foreground text-sm mt-1">Farmer · Telangana · OBC · Below ₹3 lakh</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/chat">
                <Button variant="outline" className="rounded-xl gap-2 hidden sm:flex">
                  <MessageSquare className="w-4 h-4" />
                  Scheme Assistant
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="rounded-xl w-9 h-9">
                <Bell className="w-4 h-4" />
              </Button>
              <Link href="/onboarding">
                <Button variant="outline" size="icon" className="rounded-xl w-9 h-9">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Eligible Schemes', value: '47', icon: Sparkles, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40' },
                { label: 'Saved Schemes', value: '12', icon: Bookmark, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
                { label: 'Upcoming Deadlines', value: '3', icon: Clock, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/40' },
                { label: 'New This Week', value: '8', icon: TrendingUp, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/40' },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <Card key={label} className="border-border/60">
                  <CardContent className="p-4">
                    <div className={`w-8 h-8 rounded-xl ${bg} ${color} flex items-center justify-center mb-3`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Suggestions */}
            <Card className="border-border/60 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {aiSuggestions.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-xl border ${
                      s.type === 'urgent'
                        ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                        : s.type === 'action'
                        ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
                        : 'bg-background border-border/60'
                    }`}
                  >
                    {s.type === 'urgent' ? (
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    ) : s.type === 'action' ? (
                      <Bell className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <Star className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm flex-1">{s.text}</p>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Scheme Tabs */}
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="rounded-xl bg-secondary/60">
                    <TabsTrigger value="recommended" className="rounded-lg text-xs">
                      Recommended
                    </TabsTrigger>
                    <TabsTrigger value="saved" className="rounded-lg text-xs">
                      Saved
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="rounded-lg text-xs">
                      Recently Viewed
                    </TabsTrigger>
                  </TabsList>
                  <Link href="/schemes">
                    <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground">
                      View All <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>

                <TabsContent value="recommended" className="mt-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {recommendedSchemes.slice(0, 4).map((scheme) => (
                      <SchemeCard key={scheme.id} scheme={scheme} compact />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="saved" className="mt-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {savedSchemes.map((scheme) => (
                      <SchemeCard key={scheme.id} scheme={scheme} compact />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="recent" className="mt-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {recentSchemes.map((scheme) => (
                      <SchemeCard key={scheme.id} scheme={scheme} compact />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Eligibility Score */}
            <Card className="border-border/60">
              <CardContent className="p-6 text-center space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Your AI Match Score</p>
                <div className="relative w-28 h-28 mx-auto">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      fill="none"
                      stroke="url(#scoreGrad)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(91 / 100) * 2 * Math.PI * 48} ${2 * Math.PI * 48}`}
                    />
                    <defs>
                      <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">91%</span>
                    <span className="text-xs text-muted-foreground">match</span>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Excellent Profile!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You match 47 out of 52 potential schemes
                  </p>
                </div>
                <Link href="/onboarding">
                  <Button variant="outline" className="w-full rounded-xl text-xs gap-2">
                    <User className="w-3.5 h-3.5" />
                    Update Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((d) => (
                  <div key={d.name} className={`p-3 rounded-xl border ${
                    d.urgency === 'high'
                      ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20'
                      : 'border-border/60 bg-secondary/30'
                  }`}>
                    <p className="text-xs font-medium line-clamp-1">{d.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      <Badge className={`text-[10px] ${
                        d.urgency === 'high'
                          ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-none'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-none'
                      }`}>
                        {d.daysLeft}d left
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-xs text-muted-foreground gap-1 h-8 rounded-xl">
                  View all deadlines <ChevronRight className="w-3 h-3" />
                </Button>
              </CardContent>
            </Card>

            {/* Document Checklist */}
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Document Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {documentChecklist.map(({ doc, done }) => (
                  <div key={doc} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      done ? 'bg-emerald-500' : 'border-2 border-border/60'
                    }`}>
                      {done && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-xs ${done ? 'text-foreground' : 'text-muted-foreground'}`}>{doc}</span>
                  </div>
                ))}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Documents ready</span>
                    <span className="font-medium text-foreground">
                      {documentChecklist.filter((d) => d.done).length}/{documentChecklist.length}
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{
                        width: `${(documentChecklist.filter((d) => d.done).length / documentChecklist.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/60">
              <CardContent className="p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Quick Actions</p>
                {[
                  { label: 'Scheme Assistant', href: '/chat', icon: MessageSquare },
                  { label: 'Browse All Schemes', href: '/schemes', icon: FileText },
                  { label: 'Update My Profile', href: '/onboarding', icon: User },
                ].map(({ label, href, icon: Icon }) => (
                  <Link key={label} href={href}>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-xs rounded-xl hover:bg-accent">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                      {label}
                      <ArrowRight className="w-3 h-3 ml-auto text-muted-foreground" />
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
