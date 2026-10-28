import { useState, type ReactNode } from 'react';
import {
  ChevronDown, ChevronUp, Eye, EyeOff, Check, X, Lightbulb,
  MessageCircle, Clipboard, ClipboardCheck, RefreshCw,
} from 'lucide-react';

/* Section wrapper with heading and timing badge */
export function SectionHeader({
  num, title, minutes, subtitle,
}: { num: number; title: string; minutes: number; subtitle?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1e3a5f] text-sm font-bold text-white">
          {num}
        </span>
        <span className="pill bg-[#fff6df] text-amber-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {minutes} min
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#1e3a5f] mt-2">{title}</h1>
      {subtitle && <p className="text-slate-500 text-sm sm:text-base mt-1">{subtitle}</p>}
    </div>
  );
}

/* Teach block — concept explanation */
export function TeachBlock({
  title, children, icon: Icon = Lightbulb,
}: { title: string; children: ReactNode; icon?: typeof Lightbulb }) {
  return (
    <div className="lesson-card border-l-4 border-l-[#5b8def] animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-5 w-5 text-[#5b8def]" />
        <h2 className="text-lg font-semibold text-[#1e3a5f]">{title}</h2>
      </div>
      <div className="prose-sm text-slate-700 space-y-3 text-[15px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

/* Discussion block */
export function DiscussBlock({
  prompt, children,
}: { prompt: string; children?: ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="lesson-card border-l-4 border-l-teal-400 animate-fade-up">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="h-5 w-5 text-teal-500" />
        <span className="pill bg-[#d3f9f4] text-teal-700">Discuss</span>
      </div>
      <p className="text-[15px] font-semibold text-[#1e3a5f] mb-3">{prompt}</p>
      {children}
      {children && (
        <button
          onClick={() => setRevealed((r) => !r)}
          className="btn-ghost mt-3"
        >
          {revealed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {revealed ? 'Hide tutor prompts' : 'Tutor follow-up prompts'}
        </button>
      )}
      {revealed && children && (
        <div className="mt-3 rounded-xl bg-teal-50/60 p-4 text-sm text-slate-700 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

/* Simple local textarea with its own state */
export function TextArea({
  value, onChange, placeholder, rows = 3, id,
}: {
  value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number; id?: string;
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="input-base resize-y"
    />
  );
}

/* Reveal answer toggle */
export function RevealAnswer({
  label = 'Reveal answer', children,
}: { label?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button onClick={() => setOpen((o) => !o)} className="btn-soft">
        {open ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        {open ? 'Hide' : label}
      </button>
      {open && (
        <div className="mt-3 rounded-xl bg-[#eaf1ff] p-4 text-sm text-slate-700 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

/* Feedback card after a choice */
export function FeedbackCard({
  show, correct, title, children,
}: { show: boolean; correct?: boolean; title: string; children: ReactNode }) {
  if (!show) return null;
  const tone = correct === undefined
    ? 'bg-slate-50 border-slate-200'
    : correct
      ? 'bg-emerald-50 border-emerald-200'
      : 'bg-amber-50 border-amber-200';
  const Icon = correct === undefined ? Lightbulb : correct ? Check : X;
  const color = correct === undefined ? 'text-slate-500' : correct ? 'text-emerald-600' : 'text-amber-600';
  return (
    <div className={`mt-3 rounded-xl border p-4 text-sm animate-fade-in ${tone}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className={`font-semibold ${color}`}>{title}</span>
      </div>
      <div className="text-slate-700 leading-relaxed">{children}</div>
    </div>
  );
}

/* Copy-to-clipboard button */
export function CopyButton({
  text, label = 'Copy',
}: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button onClick={copy} className="btn-soft">
      {copied ? <ClipboardCheck className="h-4 w-4 text-emerald-600" /> : <Clipboard className="h-4 w-4" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

/* Example callout */
export function ExampleCallout({
  label = 'Example', tone = 'blue', children,
}: { label?: string; tone?: 'blue' | 'teal' | 'yellow'; children: ReactNode }) {
  const tones = {
    blue: 'bg-[#eaf1ff] border-[#5b8def]/30 text-[#1e3a5f]',
    teal: 'bg-[#d3f9f4] border-teal-300 text-teal-800',
    yellow: 'bg-[#fff6df] border-amber-300 text-amber-800',
  };
  return (
    <div className={`rounded-xl border p-4 text-sm leading-relaxed ${tones[tone]}`}>
      <span className="font-semibold block mb-1">{label}</span>
      {children}
    </div>
  );
}

/* Mistake callout */
export function MistakeCallout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 leading-relaxed">
      <div className="flex items-center gap-2 mb-1">
        <X className="h-4 w-4 text-rose-500" />
        <span className="font-semibold">Common mistake</span>
      </div>
      {children}
    </div>
  );
}

/* Step list */
export function StepList({
  steps, color = '#5b8def',
}: { steps: ReactNode[]; color?: string }) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3">
          <span
            className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {i + 1}
          </span>
          <div className="text-sm text-slate-700 pt-0.5 leading-relaxed">{s}</div>
        </li>
      ))}
    </ol>
  );
}

/* Choice selector — single select with feedback */
export function ChoiceSelector({
  question, options, feedback, storageKey,
}: {
  question: string;
  options: { id: string; label: string }[];
  feedback: Record<string, { correct?: boolean; title: string; body: ReactNode }>;
  storageKey: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  void storageKey;
  return (
    <div className="lesson-card-tight">
      <p className="text-sm font-semibold text-[#1e3a5f] mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => setSelected(o.id)}
            className={`choice-btn ${selected === o.id ? 'choice-btn-selected' : ''}`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {selected && feedback[selected] && (
        <FeedbackCard
          show
          correct={feedback[selected].correct}
          title={feedback[selected].title}
        >
          {feedback[selected].body}
        </FeedbackCard>
      )}
      {selected && (
        <button onClick={() => setSelected(null)} className="btn-ghost mt-3">
          <RefreshCw className="h-3.5 w-3.5" /> Try again
        </button>
      )}
    </div>
  );
}

/* Pill badge */
export function Badge({
  children, tone = 'blue',
}: { children: ReactNode; tone?: 'blue' | 'teal' | 'yellow' | 'slate' | 'rose' | 'emerald' }) {
  const tones: Record<string, string> = {
    blue: 'bg-[#eaf1ff] text-[#1e3a5f]',
    teal: 'bg-[#d3f9f4] text-teal-700',
    yellow: 'bg-[#fff6df] text-amber-700',
    slate: 'bg-slate-100 text-slate-600',
    rose: 'bg-rose-100 text-rose-600',
    emerald: 'bg-emerald-100 text-emerald-700',
  };
  return <span className={`pill ${tones[tone]}`}>{children}</span>;
}

/* Expandable details */
export function Expandable({
  summary, children,
}: { summary: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-[#1e3a5f]"
      >
        {summary}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-slate-700 leading-relaxed animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
