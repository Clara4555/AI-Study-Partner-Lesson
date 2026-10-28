import { Clock, GraduationCap, BookOpen } from 'lucide-react';
import { SECTIONS, useLesson, type SectionId } from './LessonContext';

export function Sidebar() {
  const { currentSection, setSection } = useLesson();
  const idx = SECTIONS.findIndex((s) => s.id === currentSection);
  const progress = Math.round(((idx + 1) / SECTIONS.length) * 100);

  const go = (id: SectionId) => {
    setSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-3 sm:px-8 xl:px-12">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#1e3a5f]">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <div className="truncate font-semibold leading-tight text-[#1e3a5f]">AI Study Partner</div>
            <div className="text-xs text-slate-400">Grade 8 · 120 min</div>
          </div>
          <div className="ml-auto hidden w-48 flex-none sm:block">
            <div className="mb-1 flex justify-between text-[10px] text-slate-400">
              <span>Lesson progress</span>
              <span>{progress}%</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-label="Lesson progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#5b8def] to-teal-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="whitespace-nowrap text-xs font-semibold text-slate-500 sm:hidden">
          {idx + 1}/{SECTIONS.length}
        </div>
        <div className="hidden items-center gap-2 border-l border-slate-200 pl-4 text-xs text-slate-400 xl:flex">
          <BookOpen className="h-4 w-4" />
          For Michael &amp; tutor
        </div>
      </div>
      <nav aria-label="Lesson sections" className="scrollbar-none mx-auto flex max-w-[1600px] gap-1 overflow-x-auto px-3 pb-2 sm:px-8 xl:px-12">
        {SECTIONS.map((section, sectionIndex) => {
          const active = section.id === currentSection;
          const done = sectionIndex < idx;
          return (
            <button
              key={section.id}
              onClick={() => go(section.id)}
              aria-current={active ? 'step' : undefined}
              className={`flex flex-none items-center gap-2 rounded-xl px-3 py-2 text-xs transition ${
                active
                  ? 'bg-[#1e3a5f] font-semibold text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold ${
                active ? 'bg-white/20 text-white' : done ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-400'
              }`}>
                {done ? '✓' : section.num}
              </span>
              <span>{section.short}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export function SectionNav() {
  const { currentSection, setSection } = useLesson();
  const idx = SECTIONS.findIndex((s) => s.id === currentSection);
  const prev = idx > 0 ? SECTIONS[idx - 1] : null;
  const next = idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null;

  const go = (id: SectionId) => {
    setSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-slate-200">
      {prev ? (
        <button onClick={() => go(prev.id)} className="btn-ghost">
          <span className="flex flex-col items-start">
            <span className="text-[10px] text-slate-400">Previous</span>
            <span>{prev.short}</span>
          </span>
        </button>
      ) : <div />}

      {next ? (
        <button onClick={() => go(next.id)} className="btn-primary">
          <span className="flex flex-col items-start">
            <span className="text-[10px] text-white/60">Next</span>
            <span>{next.short}</span>
          </span>
        </button>
      ) : <div />}
    </div>
  );
}

export function TimeBadge({ minutes }: { minutes: number }) {
  return (
    <span className="pill bg-[#fff6df] text-amber-700">
      <Clock className="h-3 w-3" />
      {minutes} min
    </span>
  );
}
