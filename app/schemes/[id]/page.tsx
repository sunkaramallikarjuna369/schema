'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Share2,
  CheckCircle,
  Clock,
  Globe,
  FileText,
  Zap,
  AlertCircle,
  MessageSquare,
  ChevronRight,
  Building2,
  Calendar,
  Laptop,
  DollarSign,
  Target,
} from 'lucide-react';
import { schemes } from '@/lib/data';

const categoryColors: Record<string, string> = {
  Agriculture: 'text-green-700 bg-green-50 dark:bg-green-950/40 dark:text-green-400',
  Education: 'text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400',
  Healthcare: 'text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-400',
  Housing: 'text-orange-700 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-400',
  Business: 'text-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-400',
  Finance: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400',
  'Women Empowerment': 'text-pink-700 bg-pink-50 dark:bg-pink-950/40 dark:text-pink-400',
};

export default function SchemeDetailPage({ params }: { params: { id: string } }) {
  const scheme = schemes.find((s) => s.id === params.id);
  const [saved, setSaved] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());

  if (!scheme) notFound();

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(doc)) next.delete(doc);
      else next.add(doc);
      return next;
    });
  };

  const scoreColor =
    scheme.eligibilityScore >= 90
      ? 'text-emerald-600 dark:text-emerald-400'
      : scheme.eligibilityScore >= 75
      ? 'text-blue-600 dark:text-blue-400'
      : 'text-amber-600 dark:text-amber-400';

  const scoreBarColor =
    scheme.eligibilityScore >= 90
      ? 'from-emerald-500 to-green-400'
      : scheme.eligibilityScore >= 75
      ? 'from-blue-500 to-cyan-400'
      : 'from-amber-500 to-yellow-400';

  const relatedSchemes = schemes.filter(
    (s) => s.id !== scheme.id && s.category === scheme.category
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link href="/schemes">
            <Button variant="ghost" size="sm" className="gap-2 rounded-xl text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Schemes
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl gap-2 hidden sm:flex"
              onClick={() => setSaved(!saved)}
            >
              {saved ? <BookmarkCheck className="w-4 h-4 text-blue-600" /> : <Bookmark className="w-4 h-4" />}
              {saved ? 'Saved' : 'Save'}
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl gap-2 hidden sm:flex">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2">
                Apply Now
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title block */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={`text-xs border-none ${categoryColors[scheme.category] ?? ''}`}>
                  {scheme.category}
                </Badge>
                <Badge variant="outline" className="text-xs">{scheme.state}</Badge>
                {scheme.isNew && <Badge className="text-xs bg-emerald-500 text-white border-none">New</Badge>}
                {scheme.isTrending && <Badge className="text-xs bg-orange-500 text-white border-none">Trending</Badge>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{scheme.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {scheme.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <Laptop className="w-4 h-4" />
                  {scheme.applicationMode}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {scheme.processingTime}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{scheme.description}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview">
              <TabsList className="rounded-xl bg-secondary/60 w-full sm:w-auto">
                <TabsTrigger value="overview" className="rounded-lg text-xs">Overview</TabsTrigger>
                <TabsTrigger value="eligibility" className="rounded-lg text-xs">Eligibility</TabsTrigger>
                <TabsTrigger value="apply" className="rounded-lg text-xs">How to Apply</TabsTrigger>
                <TabsTrigger value="faq" className="rounded-lg text-xs">FAQ</TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <h2 className="font-semibold mb-4 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      Key Benefits
                    </h2>
                    <ul className="space-y-3">
                      {scheme.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Financial Assistance', value: scheme.financialAssistance, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
                    { label: 'Processing Time', value: scheme.processingTime, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/40' },
                    { label: 'Application Mode', value: scheme.applicationMode, icon: Globe, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/40' },
                  ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className={`${bg} rounded-2xl p-4`}>
                      <Icon className={`w-5 h-5 ${color} mb-2`} />
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-semibold mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                {scheme.deadline && (
                  <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl">
                    <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">Application Deadline</p>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        {new Date(scheme.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )}

                {scheme.tags.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {scheme.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs rounded-full capitalize">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Eligibility */}
              <TabsContent value="eligibility" className="mt-6 space-y-4">
                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <h2 className="font-semibold mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      Eligibility Criteria
                    </h2>
                    <ul className="space-y-3">
                      {scheme.eligibility.map((e) => (
                        <li key={e} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <h2 className="font-semibold mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-500" />
                      For Who?
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {scheme.targets.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">Not sure if you qualify?</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-0.5">
                      Not sure if you qualify? Ask our assistant for a detailed eligibility check specific to your profile.
                    </p>
                    <Link href="/chat">
                      <Button size="sm" variant="outline" className="mt-3 h-8 text-xs rounded-xl gap-2 border-blue-300 dark:border-blue-700">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Ask Scheme Assistant
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              {/* How to Apply */}
              <TabsContent value="apply" className="mt-6 space-y-4">
                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <h2 className="font-semibold mb-5 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Application Steps
                    </h2>
                    <ol className="space-y-4">
                      {scheme.applicationSteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-sm pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <h2 className="font-semibold mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-500" />
                      Required Documents
                    </h2>
                    <ul className="space-y-2">
                      {scheme.documents.map((doc) => (
                        <li key={doc} className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleDoc(doc)}
                            className="shrink-0"
                          >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                              checkedDocs.has(doc)
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'border-border/60 hover:border-emerald-400'
                            }`}>
                              {checkedDocs.has(doc) && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                          </button>
                          <span className={`text-sm ${checkedDocs.has(doc) ? 'line-through text-muted-foreground' : ''}`}>
                            {doc}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-muted-foreground mt-3">
                      {checkedDocs.size}/{scheme.documents.length} documents ready
                    </p>
                  </CardContent>
                </Card>

                <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 h-11">
                    Apply on Official Website
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </TabsContent>

              {/* FAQ */}
              <TabsContent value="faq" className="mt-6">
                <Accordion type="single" collapsible className="space-y-3">
                  {scheme.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="border border-border/60 rounded-2xl px-6 data-[state=open]:border-blue-200 dark:data-[state=open]:border-blue-800"
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

                <div className="mt-4 p-4 bg-secondary/40 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground mb-3">Have more questions about this scheme?</p>
                  <Link href="/chat">
                    <Button variant="outline" className="rounded-xl gap-2 text-sm">
                      <MessageSquare className="w-4 h-4" />
                      Ask AI Assistant
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Eligibility Score */}
            <Card className="border-border/60">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Your Eligibility</p>
                  <Badge className={`text-xs border-none ${
                    scheme.eligibilityScore >= 90 ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
                  }`}>
                    {scheme.eligibilityScore >= 90 ? 'Highly Eligible' : 'Eligible'}
                  </Badge>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className={`text-3xl font-bold ${scoreColor}`}>{scheme.eligibilityScore}%</span>
                    <span className="text-xs text-muted-foreground">match score</span>
                  </div>
                  <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${scoreBarColor} rounded-full transition-all duration-700`}
                      style={{ width: `${scheme.eligibilityScore}%` }}
                    />
                  </div>
                </div>
                <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2">
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick Info</p>
                {[
                  { label: 'Scheme ID', value: scheme.shortTitle },
                  { label: 'Department', value: scheme.department },
                  { label: 'Coverage', value: scheme.state },
                  { label: 'Mode', value: scheme.applicationMode },
                  { label: 'Processing', value: scheme.processingTime },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2 text-sm">
                    <span className="text-muted-foreground text-xs">{label}</span>
                    <span className="font-medium text-xs text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Related */}
            {relatedSchemes.length > 0 && (
              <Card className="border-border/60">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Related Schemes
                  </p>
                  <div className="space-y-2">
                    {relatedSchemes.map((s) => (
                      <Link key={s.id} href={`/schemes/${s.id}`}>
                        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition-colors cursor-pointer">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium line-clamp-1">{s.title}</p>
                            <p className="text-[10px] text-muted-foreground">{s.financialAssistance}</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
