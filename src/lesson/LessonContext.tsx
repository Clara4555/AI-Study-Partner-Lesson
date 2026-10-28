import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type SectionId =
  | 'welcome'
  | 'capabilities'
  | 'research'
  | 'summarisation'
  | 'revision'
  | 'grace'
  | 'sprint'
  | 'plan'
  | 'assessment'
  | 'assignment'
  | 'tutor';

export type StudySprint = {
  topic: string;
  knowsAlready: string;
  doesNotUnderstand: string;
  confidenceBefore: string;
  baselineStart: string;
  baselineEnd: string;
  baselineMinutes: string;
  baselineCouldExplain: string;
  baselineConfusing: string;
  aiStart: string;
  aiEnd: string;
  aiMinutes: string;
  verifiedClaim: string;
  verifiedFinding: string;
  notesSummary: string;
  notesCorrections: string;
  questionsAttempted: string;
  ownExplanation: string;
  remainingGaps: string;
};

export type StudyPlan = {
  subject: string;
  topic: string;
  testDate: string;
  alreadyUnderstand: string;
  needToLearn: string;
  availableTime: string;
  aiTasks: string;
  trustedSources: string;
  independentTasks: string;
  howTestUnderstanding: string;
  revisitDate: string;
  howRecordProgress: string;
};

type LessonState = {
  currentSection: SectionId;
  setSection: (s: SectionId) => void;

  sprint: StudySprint;
  setSprintField: (k: keyof StudySprint, v: string) => void;

  plan: StudyPlan;
  setPlanField: (k: keyof StudyPlan, v: string) => void;

  answers: Record<string, string>;
  setAnswer: (k: string, v: string) => void;
};

const Ctx = createContext<LessonState | null>(null);

const emptySprint: StudySprint = {
  topic: '', knowsAlready: '', doesNotUnderstand: '', confidenceBefore: '3',
  baselineStart: '', baselineEnd: '', baselineMinutes: '',
  baselineCouldExplain: '', baselineConfusing: '',
  aiStart: '', aiEnd: '', aiMinutes: '',
  verifiedClaim: '', verifiedFinding: '',
  notesSummary: '', notesCorrections: '',
  questionsAttempted: '', ownExplanation: '', remainingGaps: '',
};

const emptyPlan: StudyPlan = {
  subject: '', topic: '', testDate: '',
  alreadyUnderstand: '', needToLearn: '', availableTime: '',
  aiTasks: '', trustedSources: '', independentTasks: '',
  howTestUnderstanding: '', revisitDate: '', howRecordProgress: '',
};

export function LessonProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState<SectionId>('welcome');
  const [sprint, setSprint] = useState<StudySprint>(emptySprint);
  const [plan, setPlan] = useState<StudyPlan>(emptyPlan);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const value: LessonState = {
    currentSection,
    setSection: setCurrentSection,
    sprint,
    setSprintField: (k, v) => setSprint((p) => ({ ...p, [k]: v })),
    plan,
    setPlanField: (k, v) => setPlan((p) => ({ ...p, [k]: v })),
    answers,
    setAnswer: (k, v) => setAnswers((p) => ({ ...p, [k]: v })),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLesson() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLesson must be used within LessonProvider');
  return ctx;
}

export const SECTIONS: {
  id: SectionId;
  num: number;
  title: string;
  short: string;
  minutes: number;
}[] = [
  { id: 'welcome', num: 1, title: 'Welcome to Your AI Study Partner', short: 'Welcome', minutes: 10 },
  { id: 'capabilities', num: 2, title: 'What AI Can Do for Studying', short: 'Capabilities', minutes: 10 },
  { id: 'research', num: 3, title: 'Research with AI', short: 'Research', minutes: 20 },
  { id: 'summarisation', num: 4, title: 'Summarisation: Useful Notes', short: 'Notes', minutes: 15 },
  { id: 'revision', num: 5, title: 'Revision & Active Recall', short: 'Revision', minutes: 15 },
  { id: 'grace', num: 6, title: 'GRACE Study Prompting', short: 'GRACE', minutes: 10 },
  { id: 'sprint', num: 7, title: 'The Study Sprint', short: 'Sprint', minutes: 25 },
  { id: 'plan', num: 8, title: 'Build a Study Plan', short: 'Plan', minutes: 10 },
  { id: 'assessment', num: 9, title: 'Final Understanding Check', short: 'Check', minutes: 5 },
  { id: 'assignment', num: 10, title: 'Take-Home Assignment', short: 'Homework', minutes: 5 },
  { id: 'tutor', num: 11, title: 'Tutor Guide', short: 'Tutor', minutes: 0 },
];

export type { SectionId };
