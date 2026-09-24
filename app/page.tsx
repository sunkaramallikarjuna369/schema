'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Users,
  FileText,
  MapPin,
  TrendingUp,
  Brain,
  UserPlus,
  Star,
  Shield,
  Zap,
  Globe,
  Bell,
  Heart,
  Home,
  GraduationCap,
  Wheat,
  Briefcase,
  Wallet,
  ChevronRight,
  Play,
  Quote,
} from 'lucide-react';
import { schemes, stats, testimonials, howItWorks, faqs, categories } from '@/lib/data';
import { SchemeCard } from '@/components/scheme-card';

const iconMap: Record<string, React.ElementType> = {
  FileText, Users, MapPin, TrendingUp, Brain, UserPlus, CheckCircle, Star,
  Wheat, GraduationCap, Heart, Home, Briefcase, Wallet, Sparkles,
};

const featuresList = [
  {
    icon: Brain,
    title: 'AI Eligibility Analysis',
    description: 'Intelligent matching across 1,200+ schemes using your profile data with percentage-based eligibility scores.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
  },
  {
    icon: Sparkles,
    title: 'Personalized Recommendations',
    description: 'Get curated scheme suggestions ranked by relevance, benefit amount, and application deadline.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
  {
    icon: Zap,
    title: 'Instant AI Guidance',
    description: 'Chat with our intelligent assistant for instant answers about any scheme in simple language.',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
  {
    icon: FileText,
    title: 'Smart Document Checklist',
    description: 'Auto-generated document lists tailored to your selected schemes. Track what you have and what you need.',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
  },
  {
    icon: Bell,
    title: 'Deadline Reminders',
    description: 'Never miss an application window. Get notified about scheme deadlines, openings, and new launches.',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Access everything in English, Hindi, Telugu, Tamil, Kannada, Marathi, Bengali, or Malayalam.',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
  },
  {
    icon: Shield,
    title: 'Verified & Updated Daily',
    description: 'All scheme information is verified from official government sources and updated daily by our research team.',
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-50 dark:bg-slate-950/40',
  },
  {
    icon: Star,
    title: 'Save & Compare Schemes',
    description: 'Bookmark schemes, compare benefits side-by-side, share with family, and download PDF summaries.',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
  },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const trendingSchemes = schemes.filter((s) => s.isTrending).slice(0, 4);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-8">
              <div className="animate-slide-up">
                <Badge className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-950/60">
                  <Sparkles className="w-3 h-3" />
                  1,200+ Central & State Schemes
                </Badge>
              </div>

              <div className="animate-slide-up stagger-1 space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  Discover Every Benefit{' '}
                  <span className="text-gradient">You Deserve</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Intelligent government scheme finder that matches your profile to 1,200+
                  welfare schemes across all states and central departments in seconds.
                </p>
              </div>

              <div className="animate-slide-up stagger-2 flex flex-col sm:flex-row gap-3">
                <Link href="/onboarding">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white btn-glow rounded-xl gap-2 text-base h-12 px-6 w-full sm:w-auto"
                  >
                    <Sparkles className="w-4 h-4" />
                    Find My Schemes
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/schemes">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-xl gap-2 text-base h-12 px-6 w-full sm:w-auto border-border/60 hover:bg-accent"
                  >
                    <Play className="w-4 h-4" />
                    Browse All Schemes
                  </Button>
                </Link>
              </div>

              <div className="animate-slide-up stagger-3 flex flex-wrap gap-4 pt-2">
                {[
                  { icon: CheckCircle, text: 'Free Forever', color: 'text-emerald-600 dark:text-emerald-400' },
                  { icon: Shield, text: 'Data Protected', color: 'text-blue-600 dark:text-blue-400' },
                  { icon: Globe, text: '8 Languages', color: 'text-orange-600 dark:text-orange-400' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Icon className={`w-4 h-4 ${color}`} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Dashboard Preview */}
            <div className="animate-slide-up stagger-4 hidden lg:block">
              <div className="relative">
                <div className="glass-card rounded-2xl p-6 space-y-4 shine">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Your Eligible Schemes</p>
                      <p className="text-2xl font-bold">47 Found</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: 'PM-KISAN', score: 96, benefit: '₹6,000/yr', color: 'bg-green-500' },
                      { name: 'Ayushman Bharat', score: 90, benefit: '₹5 lakh cover', color: 'bg-blue-500' },
                      { name: 'PMAY Housing', score: 88, benefit: '₹2.67 lakh', color: 'bg-orange-500' },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/50"
                      >
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.benefit}</p>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                          {item.score}% match
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Overall Eligibility</span>
                      <span className="font-semibold text-foreground">91%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                        style={{ width: '91%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-8 glass-card rounded-2xl p-4 max-w-[220px] animate-float">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Smart Assistant</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        You qualify for 3 new schemes! Tap to view requirements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 glass-card rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold">Live Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up stagger-5">
            {stats.map(({ label, value, icon }) => {
              const Icon = iconMap[icon];
              return (
                <div key={label} className="glass-card rounded-2xl p-5 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                      {Icon && <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Browse by Category</h2>
            <p className="text-muted-foreground mt-2">Explore schemes across every sector</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(({ label, icon, color }) => {
              const Icon = iconMap[icon];
              return (
                <Link key={label} href={`/schemes?category=${encodeURIComponent(label)}`}>
                  <div className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-background border border-border/60 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 cursor-pointer text-center">
                    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <span className="text-xs font-medium leading-tight">{label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-50">
              Everything You Need
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Intelligent Features for{' '}
              <span className="text-gradient">Every Citizen</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From intelligent eligibility checks to multilingual support, every feature is
              designed to make government schemes accessible to all.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuresList.map(({ icon: Icon, title, description, color, bg }) => (
              <Card
                key={title}
                className="border-border/60 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50">
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From sign-up to your first scheme application in under 5 minutes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 dark:from-blue-900 dark:via-blue-600 dark:to-blue-900" />
            {howItWorks.map(({ step, title, description, icon }, idx) => {
              const Icon = iconMap[icon] || CheckCircle;
              return (
                <div key={step} className="relative flex flex-col items-center text-center space-y-4 p-6">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30 z-10 relative">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background border-2 border-blue-600 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-blue-600">{idx + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/onboarding">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white btn-glow rounded-xl gap-2">
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Schemes */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div className="space-y-2">
              <Badge className="bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 hover:bg-orange-50">
                Trending Now
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">Popular Schemes</h2>
              <p className="text-muted-foreground">Most accessed schemes by citizens this month</p>
            </div>
            <Link href="/schemes">
              <Button variant="outline" className="rounded-xl gap-2 hidden sm:flex">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/schemes">
              <Button variant="outline" className="rounded-xl gap-2">
                View All Schemes <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Built for <span className="text-gradient">Every Indian</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Schemes for farmers to students, women to senior citizens — everyone deserves to know their benefits.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Farmers', icon: '🌾', schemes: 142 },
              { label: 'Students', icon: '🎓', schemes: 89 },
              { label: 'Women', icon: '👩', schemes: 67 },
              { label: 'Senior Citizens', icon: '🧓', schemes: 54 },
              { label: 'Entrepreneurs', icon: '💼', schemes: 78 },
              { label: 'Disabled', icon: '♿', schemes: 43 },
            ].map(({ label, icon, schemes: count }) => (
              <Link key={label} href={`/schemes?target=${encodeURIComponent(label)}`}>
                <div className="group p-5 rounded-2xl bg-background border border-border/60 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-center cursor-pointer">
                  <div className="text-3xl mb-2">{icon}</div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{count}+ schemes</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <Badge className="bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 hover:bg-pink-50">
              Success Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">Real People, Real Benefits</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t, idx) => (
              <Card
                key={idx}
                className={`border-border/60 transition-all duration-300 cursor-pointer ${
                  activeTestimonial === idx
                    ? 'border-blue-300 dark:border-blue-700 shadow-xl shadow-blue-500/10'
                    : 'hover:border-blue-200 dark:hover:border-blue-800'
                }`}
                onClick={() => setActiveTestimonial(idx)}
              >
                <CardContent className="p-6 space-y-4">
                  <Quote className="w-6 h-6 text-blue-400 opacity-60" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                    <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-semibold shrink-0`}>
                      {t.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role} · {t.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-none">
                      {t.scheme}
                    </Badge>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{t.benefit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Start Discovering Your Benefits Today
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Join 4.2 crore+ citizens who found schemes they never knew about. Free, fast, under 3 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 rounded-xl gap-2 text-base h-12 px-8 font-semibold">
                <Sparkles className="w-4 h-4" />
                Find My Schemes — Free
              </Button>
            </Link>
            <Link href="/schemes">
              <Button size="lg" variant="outline" className="border-blue-300 text-white hover:bg-white/10 rounded-xl gap-2 text-base h-12 px-8">
                Browse All 1,200+ Schemes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about SchemeSeva</p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border border-border/60 rounded-2xl px-6 data-[state=open]:border-blue-200 dark:data-[state=open]:border-blue-800 transition-colors"
              >
                <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm">SchemeSeva</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">India's Scheme Finder</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Helping every Indian citizen discover and access government welfare benefits with the power of AI.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Data protected · DPDP compliant
              </div>
            </div>
            {[
              {
                title: 'Platform',
                links: ['Find Schemes', 'Scheme Assistant', 'Dashboard', 'Browse All'],
                hrefs: ['/onboarding', '/chat', '/dashboard', '/schemes'],
              },
              {
                title: 'Categories',
                links: ['Agriculture', 'Education', 'Healthcare', 'Housing'],
                hrefs: ['/schemes?category=Agriculture', '/schemes?category=Education', '/schemes?category=Healthcare', '/schemes?category=Housing'],
              },
              {
                title: 'Company',
                links: ['About Us', 'Privacy Policy', 'Terms of Service', 'Contact'],
                hrefs: ['/about', '/privacy', '/terms', '/contact'],
              },
            ].map(({ title, links, hrefs }) => (
              <div key={title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {links.map((link, i) => (
                    <li key={link}>
                      <Link href={hrefs[i]} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2024 SchemeSeva. All rights reserved. Not affiliated with the Government of India.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
