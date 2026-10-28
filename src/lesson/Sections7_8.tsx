import {
  Target, Clock, Bot, ShieldCheck, FileText, ListChecks,
  Timer, TrendingDown, AlertCircle, CheckCircle2,
} from 'lucide-react';
import {
  TeachBlock, SectionHeader, StepList, ExampleCallout,
  TextArea, Badge, CopyButton,
} from './components';
import { SectionNav } from './Navigation';
import { useLesson } from './LessonContext';

const steps = [
  { icon: Target, title: 'Step 1: Understand the starting point', desc: 'Record your topic, what you know, what confuses you, and your confidence (1–5).' },
  { icon: Clock, title: 'Step 2: Establish a fair baseline', desc: 'Spend a set period studying with your usual method. Record time and what you could explain.' },
  { icon: Bot, title: 'Step 3: Use AI to understand', desc: 'Use your GRACE prompt. Ask for explanations, examples, definitions, and clarification.' },
  { icon: ShieldCheck, title: 'Step 4: Verify key information', desc: 'Check at least one important claim against your textbook or a trusted source.' },
  { icon: FileText, title: 'Step 5: Create revision notes', desc: 'Ask AI for a summary. Review it and correct errors, omissions, or unclear wording.' },
  { icon: ListChecks, title: 'Step 6: Test understanding', desc: 'Generate 3–5 practice questions. Attempt them before viewing answers. Explain one in your own words.' },
  { icon: Timer, title: 'Step 7: Record AI-assisted time', desc: 'Time the AI session — including verification and note corrections.' },
  { icon: TrendingDown, title: 'Step 8: Compare fairly', desc: 'Compare baseline and AI times. Calculate time saved. Be honest about quality, not just speed.' },
];

export function Section7() {
  const { sprint, setSprintField } = useLesson();

  const baselineMin = parseFloat(sprint.baselineMinutes) || 0;
  const aiMin = parseFloat(sprint.aiMinutes) || 0;
  const timeDiff = baselineMin - aiMin;
  const pctSaved = baselineMin > 0 ? Math.round((timeDiff / baselineMin) * 100) : null;
  const aiLonger = timeDiff < 0;

  return (
    <div className="space-y-6">
      <SectionHeader num={7} title="The Study Sprint" minutes={25} subtitle="The main practical activity: use AI to study a real topic, then compare fairly." />

      <ExampleCallout tone="yellow" label="Before you start">
        <p>You were asked to bring a <strong>real school topic or exam question</strong> you struggle
        with. We will use that. If you do not have one today, use this backup topic:
        <strong> "Why do we experience day and night?"</strong></p>
      </ExampleCallout>

      <div className="grid sm:grid-cols-2 gap-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#eaf1ff]">
                <Icon className="h-5 w-5 text-[#5b8def]" />
              </div>
              <div>
                <div className="font-semibold text-sm text-[#1e3a5f]">{s.title}</div>
                <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 1 */}
      <div className="lesson-card border-l-4 border-l-[#5b8def]">
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-[#5b8def]" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Step 1: Understand the starting point</h2>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Your topic or exam question</label>
            <input className="input-base" placeholder="e.g. Why do we experience day and night?" value={sprint.topic} onChange={(e) => setSprintField('topic', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">What do you already know about it?</label>
            <TextArea value={sprint.knowsAlready} onChange={(v) => setSprintField('knowsAlready', v)} placeholder="What you already understand…" rows={2} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">What do you not understand?</label>
            <TextArea value={sprint.doesNotUnderstand} onChange={(v) => setSprintField('doesNotUnderstand', v)} placeholder="What is confusing or unclear…" rows={2} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Confidence before studying (1 = not confident, 5 = very confident)</label>
            <div className="flex gap-2">
              {['1', '2', '3', '4', '5'].map((n) => (
                <button
                  key={n}
                  onClick={() => setSprintField('confidenceBefore', n)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 font-bold transition ${
                    sprint.confidenceBefore === n
                      ? 'border-[#5b8def] bg-[#eaf1ff] text-[#1e3a5f]'
                      : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3">Confidence is a useful reflection — but it is not proof of understanding. You can feel confident and still have gaps.</p>
      </div>

      {/* Step 2 */}
      <div className="lesson-card border-l-4 border-l-amber-400">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Step 2: Establish a fair baseline</h2>
        </div>
        <p className="text-sm text-slate-500 mb-3">
          Before using AI, spend a defined period (e.g. 10 minutes) attempting to understand the
          topic using your <strong>usual study approach</strong>. This is a baseline measurement, not
          a test you must fail — it gives us something to compare against.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Start time</label>
            <input type="time" className="input-base" value={sprint.baselineStart} onChange={(e) => setSprintField('baselineStart', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">End time</label>
            <input type="time" className="input-base" value={sprint.baselineEnd} onChange={(e) => setSprintField('baselineEnd', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Total minutes</label>
            <input type="number" className="input-base" placeholder="e.g. 10" value={sprint.baselineMinutes} onChange={(e) => setSprintField('baselineMinutes', e.target.value)} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">What could you explain afterwards?</label>
            <TextArea value={sprint.baselineCouldExplain} onChange={(v) => setSprintField('baselineCouldExplain', v)} placeholder="What you understood after baseline study…" rows={2} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">What remained confusing?</label>
            <TextArea value={sprint.baselineConfusing} onChange={(v) => setSprintField('baselineConfusing', v)} placeholder="What was still unclear…" rows={2} />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          If you have an honest record of studying this topic earlier, the tutor may use that. Do not
          invent past study times — an honest in-session baseline is better than a fake one.
        </p>
      </div>

      {/* Step 3 */}
      <div className="lesson-card border-l-4 border-l-[#5b8def]">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="h-5 w-5 text-[#5b8def]" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Step 3: Use AI to understand the topic</h2>
        </div>
        <p className="text-sm text-slate-500 mb-3">
          Use your GRACE-informed prompt (from Section 6) with your topic. Ask AI for:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 mb-3">
          <li>A clear explanation.</li>
          <li>Step-by-step reasoning where appropriate.</li>
          <li>Definitions of unfamiliar terms.</li>
          <li>An example.</li>
          <li>Follow-up clarification for anything still confusing.</li>
        </ul>
        <p className="text-sm text-slate-600">
          <strong>Ask your own follow-up questions</strong> rather than blindly accepting the first
          response. If an explanation does not make sense, ask AI to reword it or give a different
          example.
        </p>
      </div>

      {/* Step 4 */}
      <div className="lesson-card border-l-4 border-l-teal-400">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-5 w-5 text-teal-500" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Step 4: Verify key information</h2>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">What claim or explanation did you check?</label>
            <TextArea value={sprint.verifiedClaim} onChange={(v) => setSprintField('verifiedClaim', v)} placeholder="The specific claim you wanted to verify…" rows={2} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">What did you find when you checked?</label>
            <TextArea value={sprint.verifiedFinding} onChange={(v) => setSprintField('verifiedFinding', v)} placeholder="What your trusted source said…" rows={2} />
          </div>
        </div>
      </div>

      {/* Step 5 */}
      <div className="lesson-card border-l-4 border-l-[#5b8def]">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-5 w-5 text-[#5b8def]" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Step 5: Create revision notes</h2>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Summary from AI (paste or write key points)</label>
            <TextArea value={sprint.notesSummary} onChange={(v) => setSprintField('notesSummary', v)} placeholder="Paste the AI summary here…" rows={3} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Corrections you made (errors, omissions, unclear wording)</label>
            <TextArea value={sprint.notesCorrections} onChange={(v) => setSprintField('notesCorrections', v)} placeholder="What did you fix in the AI's summary?" rows={2} />
          </div>
        </div>
      </div>

      {/* Step 6 */}
      <div className="lesson-card border-l-4 border-l-teal-400">
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="h-5 w-5 text-teal-500" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Step 6: Test understanding</h2>
        </div>
        <p className="text-sm text-slate-500 mb-3">
          Generate 3–5 practice questions with AI. <strong>Attempt them before viewing answers.</strong>
          Then explain at least one answer in your own words without reading the AI response.
        </p>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Your answers to the practice questions</label>
            <TextArea value={sprint.questionsAttempted} onChange={(v) => setSprintField('questionsAttempted', v)} placeholder="Write your answers here…" rows={3} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Explain one answer in your own words (without the AI response)</label>
            <TextArea value={sprint.ownExplanation} onChange={(v) => setSprintField('ownExplanation', v)} placeholder="Your own explanation…" rows={2} />
          </div>
        </div>
      </div>

      {/* Step 7 */}
      <div className="lesson-card border-l-4 border-l-amber-400">
        <div className="flex items-center gap-2 mb-3">
          <Timer className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Step 7: Record the AI-assisted time</h2>
        </div>
        <p className="text-sm text-slate-500 mb-3">
          Include the time spent using AI <em>and</em> the time spent checking information and
          correcting notes — that is the real effort to produce usable study material.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Start time</label>
            <input type="time" className="input-base" value={sprint.aiStart} onChange={(e) => setSprintField('aiStart', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">End time</label>
            <input type="time" className="input-base" value={sprint.aiEnd} onChange={(e) => setSprintField('aiEnd', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Total minutes</label>
            <input type="number" className="input-base" placeholder="e.g. 7" value={sprint.aiMinutes} onChange={(e) => setSprintField('aiMinutes', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Step 8: Comparison */}
      <div className="lesson-card border-l-4 border-l-[#1e3a5f]">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="h-5 w-5 text-[#1e3a5f]" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Step 8: Compare the results fairly</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-3 py-2 font-semibold text-slate-600">Measure</th>
                <th className="px-3 py-2 font-semibold text-slate-600">Usual study method</th>
                <th className="px-3 py-2 font-semibold text-slate-600">AI-assisted method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-3 py-2 text-slate-500">Topic</td>
                <td className="px-3 py-2 text-slate-700">{sprint.topic || '—'}</td>
                <td className="px-3 py-2 text-slate-700">{sprint.topic || '—'}</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-slate-500">Total time (min)</td>
                <td className="px-3 py-2 font-semibold text-slate-700">{sprint.baselineMinutes || '—'}</td>
                <td className="px-3 py-2 font-semibold text-slate-700">{sprint.aiMinutes || '—'}</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-slate-500">Main ideas understood</td>
                <td className="px-3 py-2 text-slate-700">{sprint.baselineCouldExplain || '—'}</td>
                <td className="px-3 py-2 text-slate-700">{sprint.notesSummary ? 'See notes above' : '—'}</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-slate-500">Questions answered independently</td>
                <td className="px-3 py-2 text-slate-700">{sprint.baselineConfusing ? 'Baseline attempt' : '—'}</td>
                <td className="px-3 py-2 text-slate-700">{sprint.questionsAttempted ? 'See Step 6' : '—'}</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-slate-500">Remaining knowledge gaps</td>
                <td className="px-3 py-2 text-slate-700">{sprint.baselineConfusing || '—'}</td>
                <td className="px-3 py-2 text-slate-700">{sprint.remainingGaps || '—'}</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-slate-500">Information verified</td>
                <td className="px-3 py-2 text-slate-700">—</td>
                <td className="px-3 py-2 text-slate-700">{sprint.verifiedClaim || '—'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <label className="text-xs font-semibold text-slate-500 mb-1 block">Remaining knowledge gaps (after AI study)</label>
          <TextArea value={sprint.remainingGaps} onChange={(v) => setSprintField('remainingGaps', v)} placeholder="What is still unclear after the AI session?" rows={2} />
        </div>

        {/* Calculator */}
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Time comparison calculator</h3>
          <div className="grid sm:grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-white p-3 border border-slate-200">
              <div className="text-xs text-slate-400">Baseline time</div>
              <div className="text-2xl font-bold text-[#1e3a5f]">{baselineMin > 0 ? `${baselineMin}m` : '—'}</div>
            </div>
            <div className="rounded-lg bg-white p-3 border border-slate-200">
              <div className="text-xs text-slate-400">AI-assisted time</div>
              <div className="text-2xl font-bold text-[#5b8def]">{aiMin > 0 ? `${aiMin}m` : '—'}</div>
            </div>
            <div className={`rounded-lg p-3 border ${aiLonger ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <div className="text-xs text-slate-400">Time difference</div>
              <div className={`text-2xl font-bold ${aiLonger ? 'text-amber-600' : 'text-emerald-600'}`}>
                {baselineMin > 0 && aiMin > 0 ? `${timeDiff > 0 ? '+' : ''}${timeDiff}m` : '—'}
              </div>
            </div>
          </div>

          {baselineMin > 0 && aiMin > 0 ? (
            <div className="mt-4">
              {pctSaved !== null && pctSaved >= 0 && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 flex-none" />
                  <span>
                    <strong>{pctSaved}% of time saved</strong> compared to your baseline.
                    Formula: ({baselineMin} − {aiMin}) ÷ {baselineMin} × 100 = {pctSaved}%.
                  </span>
                </div>
              )}
              {aiLonger && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-700 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 flex-none" />
                  <span>
                    The AI-assisted method took <strong>{Math.abs(timeDiff)} minutes longer</strong>
                    than your baseline. That is an honest result — it happens, especially when
                    learning a new workflow. Time saved is not guaranteed; what matters is whether
                    your <em>understanding</em> improved.
                  </span>
                </div>
              )}
              {pctSaved === 0 && (
                <div className="rounded-lg bg-slate-100 p-3 text-sm text-slate-600">
                  Both methods took the same time. Compare the <em>quality</em> of your understanding
                  instead — which method helped you explain the topic more clearly?
                </div>
              )}
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate-400">
              Enter both baseline and AI-assisted minutes to calculate time saved. If the baseline is
              zero or missing, we will not show a misleading percentage.
            </p>
          )}

          <p className="mt-3 text-xs text-slate-500">
            <strong>Remember:</strong> time saved matters only if learning quality is maintained or
            improved. Consider both time <em>and</em> understanding when judging the result.
          </p>
        </div>
      </div>

      <SectionNav />
    </div>
  );
}

export function Section8() {
  const { plan, setPlanField } = useLesson();

  const fields: { key: keyof typeof plan; label: string; sub: string; ph: string; rows?: number }[] = [
    { key: 'subject', label: 'Subject', sub: '', ph: 'e.g. Science', rows: 1 },
    { key: 'topic', label: 'Topic', sub: '', ph: 'e.g. Photosynthesis', rows: 1 },
    { key: 'testDate', label: 'Test date (if known)', sub: '', ph: 'e.g. Next Friday', rows: 1 },
    { key: 'alreadyUnderstand', label: 'What I already understand', sub: '', ph: 'What you can already explain…', rows: 2 },
    { key: 'needToLearn', label: 'What I need to learn', sub: '', ph: 'What is still unclear…', rows: 2 },
    { key: 'availableTime', label: 'Available study time', sub: '', ph: 'e.g. 30 min/day for 4 days', rows: 1 },
    { key: 'aiTasks', label: 'AI tasks I will use', sub: 'Where AI assists', ph: 'e.g. Explain condensation, generate practice questions, summarise notes', rows: 2 },
    { key: 'trustedSources', label: 'Trusted sources I will check', sub: 'For verification', ph: 'e.g. Science textbook p.42, BBC Bitesize', rows: 2 },
    { key: 'independentTasks', label: 'Independent practice tasks', sub: 'What I do myself', ph: 'e.g. Answer questions from memory, write own summary', rows: 2 },
    { key: 'howTestUnderstanding', label: 'How I will test my understanding', sub: '', ph: 'e.g. Active recall, practice questions, explain to a friend', rows: 2 },
    { key: 'revisitDate', label: 'When I will revisit the material', sub: 'Spaced practice', ph: 'e.g. Two days before the test', rows: 1 },
    { key: 'howRecordProgress', label: 'How I will record study time and progress', sub: '', ph: 'e.g. Log minutes in a notebook, note what I could explain', rows: 2 },
  ];

  const generatedPlan = `MY AI STUDY PLAN
Subject: ${plan.subject || '—'}
Topic: ${plan.topic || '—'}
Test date: ${plan.testDate || '—'}

WHAT I ALREADY UNDERSTAND:
${plan.alreadyUnderstand || '—'}

WHAT I NEED TO LEARN:
${plan.needToLearn || '—'}

AVAILABLE STUDY TIME:
${plan.availableTime || '—'}

AI-ASSISTED TASKS (AI helps):
${plan.aiTasks || '—'}

TRUSTED SOURCES TO CHECK (verification):
${plan.trustedSources || '—'}

INDEPENDENT PRACTICE (I do myself):
${plan.independentTasks || '—'}

HOW I WILL TEST UNDERSTANDING:
${plan.howTestUnderstanding || '—'}

WHEN I WILL REVISIT (spaced practice):
${plan.revisitDate || '—'}

HOW I WILL RECORD PROGRESS:
${plan.howRecordProgress || '—'}`;

  return (
    <div className="space-y-6">
      <SectionHeader num={8} title="Build a Personal AI Study Plan" minutes={10} subtitle="Turn the study sprint into a repeatable plan for a real upcoming test." />

      <TeachBlock title="From sprint to plan" icon={Target}>
        <p>You just ran one study sprint. Now let us turn that process into a <strong>repeatable
        plan</strong> you can use for any test or difficult subject. A good plan distinguishes
        between:</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-lg bg-[#eaf1ff] p-3 text-sm">
            <Badge tone="blue">Tasks where AI assists</Badge>
            <p className="mt-1 text-slate-600">Explaining, summarising, generating questions, giving feedback.</p>
          </div>
          <div className="rounded-lg bg-[#d3f9f4] p-3 text-sm">
            <Badge tone="teal">Tasks you do independently</Badge>
            <p className="mt-1 text-slate-600">Attempting answers, active recall, writing your own summary.</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-sm">
            <Badge tone="yellow">Tasks requiring verification</Badge>
            <p className="mt-1 text-slate-600">Checking AI claims against your textbook or trusted sources.</p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-3 text-sm">
            <Badge tone="emerald">Evidence of learning</Badge>
            <p className="mt-1 text-slate-600">What you can explain from memory, questions answered correctly.</p>
          </div>
        </div>
      </TeachBlock>

      <ExampleCallout tone="blue" label="Example workflow">
        <StepList
          color="#5b8def"
          steps={[
            'Identify the topic and learning goals.',
            'Ask AI to explain difficult concepts.',
            'Check important information against trusted sources.',
            'Create and correct study notes.',
            'Practise active recall without looking at the notes.',
            'Answer practice questions.',
            'Review mistakes.',
            'Revisit difficult material later (spaced practice).',
            'Record time spent and results.',
          ]}
        />
      </ExampleCallout>

      {/* Plan builder form */}
      <div className="lesson-card">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-1">Your study plan</h2>
        <p className="text-sm text-slate-500 mb-4">Fill in each field. Your structured plan appears below — review and edit before finalising.</p>
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">
                {f.label}
                {f.sub && <span className="text-slate-400 font-normal"> — {f.sub}</span>}
              </label>
              {f.rows === 1 ? (
                <input
                  className="input-base"
                  placeholder={f.ph}
                  value={plan[f.key]}
                  onChange={(e) => setPlanField(f.key, e.target.value)}
                />
              ) : (
                <TextArea
                  value={plan[f.key]}
                  onChange={(v) => setPlanField(f.key, v)}
                  placeholder={f.ph}
                  rows={f.rows}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Generated plan */}
      {(plan.subject || plan.topic) && (
        <div className="lesson-card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Your generated plan</h2>
            <CopyButton text={generatedPlan} label="Copy plan" />
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">{generatedPlan}</pre>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Review the plan above. If anything is missing or unclear, go back and edit the fields.
            This plan is yours — adjust it until it reflects how you will actually study.
          </p>
          <p className="text-xs text-amber-600 mt-2">
            We are not claiming this plan has improved your performance — that can only be shown with
            evidence after you use it. This is a structured approach to try and measure.
          </p>
        </div>
      )}

      <SectionNav />
    </div>
  );
}
