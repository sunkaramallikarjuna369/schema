'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  User,
  MapPin,
  Wallet,
  Briefcase,
  GraduationCap,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, title: 'Personal Info', icon: User, description: 'Basic identity details' },
  { id: 2, title: 'Location', icon: MapPin, description: 'State and district' },
  { id: 3, title: 'Income & Finance', icon: Wallet, description: 'Annual income details' },
  { id: 4, title: 'Occupation', icon: Briefcase, description: 'Work and employment status' },
  { id: 5, title: 'Education', icon: GraduationCap, description: 'Educational background' },
  { id: 6, title: 'Category & Status', icon: Heart, description: 'Social category and conditions' },
];

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand',
  'West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

type FormData = {
  age: string;
  gender: string;
  maritalStatus: string;
  state: string;
  district: string;
  annualIncome: string;
  bankAccount: string;
  occupation: string;
  employmentStatus: string;
  isFarmer: string;
  isBusinessOwner: string;
  education: string;
  isStudent: string;
  category: string;
  isDisabled: string;
  hasBPLCard: string;
};

const INITIAL: FormData = {
  age: '', gender: '', maritalStatus: '',
  state: '', district: '',
  annualIncome: '', bankAccount: '',
  occupation: '', employmentStatus: '', isFarmer: '', isBusinessOwner: '',
  education: '', isStudent: '',
  category: '', isDisabled: '', hasBPLCard: '',
};

function OptionButton({
  value,
  selected,
  onClick,
  children,
}: {
  value: string;
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200',
        selected
          ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25'
          : 'bg-background border-border/60 text-foreground hover:border-blue-300 dark:hover:border-blue-700 hover:bg-accent'
      )}
    >
      {children}
    </button>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const set = (key: keyof FormData, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const progress = ((step - 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (step < STEPS.length) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    router.push('/dashboard');
  };

  const currentStepInfo = STEPS[step - 1];
  const StepIcon = currentStepInfo.icon;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/6 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/6 rounded-full blur-[80px]" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm">SchemeSeva</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">Build Your Profile</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Answer a few questions and our AI will find your eligible schemes instantly
          </p>
        </div>

        {/* Step progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium mb-3">
            <span>Step {step} of {STEPS.length}</span>
            <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-between mt-4 px-1">
            {STEPS.map(({ id, icon: Icon }) => (
              <div key={id} className="flex flex-col items-center gap-1">
                <button
                  onClick={() => id < step && setStep(id)}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center transition-all border-2',
                    id < step
                      ? 'bg-blue-600 border-blue-600 text-white cursor-pointer'
                      : id === step
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'bg-background border-border/60 text-muted-foreground cursor-default'
                  )}
                >
                  {id < step ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Step card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Step header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
              <StepIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="font-semibold">{currentStepInfo.title}</h2>
              <p className="text-xs text-muted-foreground">{currentStepInfo.description}</p>
            </div>
            <Badge className="ml-auto bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 text-xs">
              {step}/{STEPS.length}
            </Badge>
          </div>

          {/* Step 1 — Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Age *</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 28"
                    value={form.age}
                    onChange={(e) => set('age', e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gender *</Label>
                <div className="flex flex-wrap gap-2">
                  {['Male', 'Female', 'Transgender', 'Prefer not to say'].map((g) => (
                    <OptionButton key={g} value={g} selected={form.gender === g} onClick={() => set('gender', g)}>
                      {g}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Marital Status</Label>
                <div className="flex flex-wrap gap-2">
                  {['Single', 'Married', 'Widowed', 'Divorced'].map((m) => (
                    <OptionButton key={m} value={m} selected={form.maritalStatus === m} onClick={() => set('maritalStatus', m)}>
                      {m}
                    </OptionButton>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Location */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">State *</Label>
                <Select value={form.state} onValueChange={(v) => set('state', v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">District</Label>
                <Input
                  placeholder="e.g. Hyderabad"
                  value={form.district}
                  onChange={(e) => set('district', e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  State is required to match state-specific schemes along with all central government schemes.
                </p>
              </div>
            </div>
          )}

          {/* Step 3 — Income */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Annual Family Income *</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Below ₹1 lakh',
                    '₹1–3 lakh',
                    '₹3–6 lakh',
                    '₹6–12 lakh',
                    '₹12–18 lakh',
                    'Above ₹18 lakh',
                  ].map((inc) => (
                    <OptionButton key={inc} value={inc} selected={form.annualIncome === inc} onClick={() => set('annualIncome', inc)}>
                      {inc}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Bank Account</Label>
                <div className="flex flex-wrap gap-2">
                  {['Yes — Active', 'Yes — Jan Dhan', 'No bank account'].map((b) => (
                    <OptionButton key={b} value={b} selected={form.bankAccount === b} onClick={() => set('bankAccount', b)}>
                      {b}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs text-blue-700 dark:text-blue-300">
                Income details determine eligibility for EWS/LIG/MIG categories for housing, healthcare, and financial schemes.
              </div>
            </div>
          )}

          {/* Step 4 — Occupation */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Primary Occupation</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Farmer', 'Government Employee', 'Private Employee',
                    'Self Employed', 'Business Owner', 'Daily Wage Worker',
                    'Homemaker', 'Retired', 'Unemployed',
                  ].map((occ) => (
                    <OptionButton key={occ} value={occ} selected={form.occupation === occ} onClick={() => set('occupation', occ)}>
                      {occ}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Are you a Farmer?</Label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((v) => (
                    <OptionButton key={v} value={v} selected={form.isFarmer === v} onClick={() => set('isFarmer', v)}>
                      {v}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Do you own a business / MSME?</Label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((v) => (
                    <OptionButton key={v} value={v} selected={form.isBusinessOwner === v} onClick={() => set('isBusinessOwner', v)}>
                      {v}
                    </OptionButton>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5 — Education */}
          {step === 5 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Highest Education</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'No Formal Education',
                    'Primary (1–5)',
                    'Middle School (6–8)',
                    'Secondary (10th)',
                    'Senior Secondary (12th)',
                    'Diploma / ITI',
                    'Graduate',
                    'Post Graduate',
                    'Doctorate',
                  ].map((edu) => (
                    <OptionButton key={edu} value={edu} selected={form.education === edu} onClick={() => set('education', edu)}>
                      {edu}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Are you currently a student?</Label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((v) => (
                    <OptionButton key={v} value={v} selected={form.isStudent === v} onClick={() => set('isStudent', v)}>
                      {v}
                    </OptionButton>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 6 — Category */}
          {step === 6 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Social Category *</Label>
                <div className="flex flex-wrap gap-2">
                  {['General', 'OBC', 'SC', 'ST', 'EWS', 'Minority'].map((cat) => (
                    <OptionButton key={cat} value={cat} selected={form.category === cat} onClick={() => set('category', cat)}>
                      {cat}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Person with Disability?</Label>
                <div className="flex flex-wrap gap-2">
                  {['No', 'Yes — Physical', 'Yes — Visual', 'Yes — Hearing', 'Yes — Intellectual'].map((v) => (
                    <OptionButton key={v} value={v} selected={form.isDisabled === v} onClick={() => set('isDisabled', v)}>
                      {v}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">BPL (Below Poverty Line) Card?</Label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((v) => (
                    <OptionButton key={v} value={v} selected={form.hasBPLCard === v} onClick={() => set('hasBPLCard', v)}>
                      {v}
                    </OptionButton>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="rounded-xl gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {step < STEPS.length ? (
              <Button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 btn-glow"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 btn-glow min-w-[160px]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Find My Schemes
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Your information is secure and used only to match you with relevant government schemes.
        </p>
      </div>
    </div>
  );
}
