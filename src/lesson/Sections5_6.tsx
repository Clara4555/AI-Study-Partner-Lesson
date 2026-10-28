import { useState } from 'react';
import {
  Brain, Bot, RefreshCw, Eye, EyeOff, BookOpen, Zap, Repeat,
} from 'lucide-react';
import {
  TeachBlock, DiscussBlock, SectionHeader, ExampleCallout,
  StepList, FeedbackCard, TextArea, Badge,
  RevealAnswer, CopyButton,
} from './components';
import { SectionNav } from './Navigation';
import { useLesson } from './LessonContext';

export function Section5() {
  const { setAnswer } = useLesson();
  const [predict, setPredict] = useState<string | null>(null);
  const [recallAttempt, setRecallAttempt] = useState('');
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const samplePassage = `Photosynthesis happens in the chloroplasts in plant leaves. Chlorophyll captures sunlight energy. This energy converts carbon dioxide and water into glucose, which the plant uses for food. Oxygen is released as a by-product. The glucose is used for energy and growth, or stored as starch.`;

  const practiceQs = [
    {
      q: 'Why is active recall more effective than rereading for finding out what you know?',
      a: 'Rereading lets you recognise information, which feels familiar and easy — but recognition is not the same as remembering. Active recall forces you to retrieve information without looking, which reveals the gaps you actually have. You cannot fix a gap you do not know about.',
    },
    {
      q: 'Name two things AI can generate to help you revise a topic.',
      a: 'Any two of: recall questions, flashcards, multiple-choice questions, short-answer questions, application questions, or feedback on your attempted answers.',
    },
    {
      q: 'Why should you attempt an answer before revealing the AI\'s solution?',
      a: 'If you see the answer first, you shortcut the learning. Attempting first forces your brain to retrieve and reason — which is what builds memory and reveals gaps. The solution is most useful as feedback on your attempt, not as a shortcut to avoid trying.',
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader num={5} title="Revision: How to Find Out What You Really Know" minutes={15} subtitle="Active recall reveals gaps that rereading hides." />

      <TeachBlock title="Recognising vs. recalling — a crucial difference" icon={Brain}>
        <p>There is a big difference between <strong>recognising</strong> information and
        <strong> recalling</strong> it independently.</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <Badge tone="slate">Recognising</Badge>
            <p className="mt-2 text-slate-600">You see the answer and think "yes, I knew that." It feels easy — but you had to be shown it. This is what happens when you reread notes.</p>
          </div>
          <div className="rounded-xl bg-[#d3f9f4] p-4 text-sm">
            <Badge tone="teal">Recalling</Badge>
            <p className="mt-2 text-teal-700">You produce the answer from memory without looking. This is harder — and that difficulty is exactly what makes it stick. This is what a test demands.</p>
          </div>
        </div>
      </TeachBlock>

      <TeachBlock title="Active recall (retrieval practice)" icon={Zap}>
        <p>
          <strong>Active recall</strong> — also called <strong>retrieval practice</strong> — means
          deliberately trying to remember information <strong>without immediately looking at the
          answer</strong>.
        </p>
        <p>Why is it useful?</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm mt-1">
          <li>It reveals what you <em>actually</em> remember — not what feels familiar.</li>
          <li>It exposes gaps in your understanding.</li>
          <li>It helps you decide what to review next.</li>
          <li>It lets you practise explaining information without relying on notes.</li>
        </ul>
      </TeachBlock>

      <TeachBlock title="The active recall process" icon={Repeat}>
        <StepList
          color="#14b8a6"
          steps={[
            <><strong>Study a small amount of material.</strong> Do not try to recall everything at once.</>,
            <><strong>Hide or close the notes.</strong> No peeking.</>,
            <><strong>Recall the key ideas from memory.</strong> Say them out loud or write them down.</>,
            <><strong>Compare your attempt with the source.</strong></>,
            <><strong>Identify mistakes and missing information.</strong> What did you get wrong or leave out?</>,
            <><strong>Review the gaps.</strong> Go back to those parts.</>,
            <><strong>Try again later.</strong> Repeating the recall builds stronger memory.</>,
          ]}
        />
      </TeachBlock>

      <ExampleCallout tone="teal" label="Worked example: revising photosynthesis">
        <p>1. Maya reads her notes on photosynthesis and understands them.</p>
        <p>2. She closes her notes and tries to explain the process out loud from memory.</p>
        <p>3. She remembers sunlight, carbon dioxide, and water — but forgets to mention chlorophyll and says "oxygen is used" instead of "oxygen is released."</p>
        <p>4. She opens her notes, compares, and spots two gaps: chlorophyll's role, and the fact that oxygen is released (not used).</p>
        <p>5. She reviews those two points specifically, then closes her notes and tries again. This time she gets both right.</p>
      </ExampleCallout>

      <DiscussBlock prompt="Why do you think rereading feels productive even when it does not reveal what you have actually learnt?">
        <p className="text-sm">If Michael is unsure: "When you reread, everything looks familiar. Does 'familiar' mean the same as 'I could explain it without looking'?"</p>
      </DiscussBlock>

      {/* Interactive: predict */}
      <div className="lesson-card-tight">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-3">
          Two students revise the same topic. Student 1 rereads notes four times. Student 2 reads
          once, then closes the notes and answers practice questions. <strong>Which approach will
          reveal gaps in understanding more effectively, and why?</strong>
        </p>
        <div className="space-y-2">
          {[
            { id: 'reread', label: 'Student 1 — rereading reinforces memory' },
            { id: 'recall', label: 'Student 2 — answering questions forces recall' },
            { id: 'same', label: 'Both work equally well' },
          ].map((o) => (
            <button
              key={o.id}
              onClick={() => { setPredict(o.id); setAnswer('s5-predict', o.id); }}
              className={`choice-btn ${predict === o.id ? 'choice-btn-selected' : ''}`}
            >
              {o.label}
            </button>
          ))}
        </div>
        {predict && (
          <FeedbackCard
            show
            correct={predict === 'recall'}
            title={predict === 'recall' ? 'Correct' : 'Rethink this'}
          >
            {predict === 'recall' && (
              <>Rereading makes information feel familiar, but familiarity is not the same as being
              able to produce the answer from memory. Student 2's approach forces retrieval, which
              reveals exactly what she does and does not know — and that is the first step to fixing
              gaps. Student 1 might feel confident but be surprised in the test.</>
            )}
            {predict === 'reread' && (
              <>Rereading does expose you to the material again, but it relies on
              <em> recognition</em> — seeing the answer and feeling it is familiar. That feeling can
              hide gaps. Student 2's recall approach reveals gaps because she must produce answers
              without looking, which is what a test demands.</>
            )}
            {predict === 'same' && (
              <>They are not equal. Rereading builds familiarity; recall builds the ability to
              retrieve. For finding gaps, recall is stronger because it tests what you can produce,
              not just what you can recognise.</>
            )}
          </FeedbackCard>
        )}
        {predict && (
          <button onClick={() => setPredict(null)} className="btn-ghost mt-3">
            <RefreshCw className="h-3.5 w-3.5" /> Try again
          </button>
        )}
      </div>

      <TeachBlock title="Spaced practice (briefly)" icon={Repeat}>
        <p>
          <strong>Spaced practice</strong> means revisiting material across multiple study sessions
          — say, 20 minutes today, 20 minutes two days later, 20 minutes next week — rather than
          one long session the night before. Spacing out your study helps your brain strengthen
          memories over time. You do not need to understand the neuroscience behind it; just know
          that <strong>shorter sessions spread across days beat one long cram session</strong> for
          long-term remembering.
        </p>
      </TeachBlock>

      <TeachBlock title="AI-assisted revision" icon={Bot}>
        <p>AI can generate different kinds of revision material for you:</p>
        <div className="grid sm:grid-cols-2 gap-2 mt-2">
          {[
            'Recall questions (short answer)',
            'Flashcards',
            'Multiple-choice questions',
            'Short-answer questions',
            'Application questions (use the idea in a new situation)',
            'Feedback on your attempted answers',
          ].map((t, i) => (
            <div key={i} className="rounded-lg bg-[#eaf1ff] p-3 text-sm text-[#1e3a5f] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5b8def]" />
              {t}
            </div>
          ))}
        </div>
        <ExampleCallout tone="blue" label="Revision prompt">
          <p className="italic">
            "Act as a Grade 8 study coach for [TOPIC]. Ask me five questions that test understanding
            rather than memorisation alone. Ask one question at a time. Wait for my answer before
            revealing the solution. Explain what I got right, what I missed, and how to improve. Give
            me a hint if I am struggling. At the end, identify the two areas I should revise next."
          </p>
        </ExampleCallout>
        <p className="mt-3"><strong>Why attempt answers before revealing solutions?</strong> Because
        seeing the answer first lets your brain skip the hard work of retrieving. The struggle of
        trying is where the learning happens.</p>
        <p className="mt-2 text-sm text-slate-600">
          Also: <strong>check AI feedback against trusted learning materials</strong> if the feedback
          seems wrong. AI can mark a correct answer as wrong, or give a shaky explanation. Your
          textbook and teacher are the final authority.
        </p>
      </TeachBlock>

      {/* Try active recall now */}
      <div className="lesson-card">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-1">Try active recall right now</h2>
        <p className="text-sm text-slate-500 mb-4">
          Read this short passage once, then close your eyes or scroll away. From memory, write down
          what you can recall. Do not peek yet.
        </p>
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 mb-4">
          {samplePassage}
        </div>
        <TextArea
          value={recallAttempt}
          onChange={(v) => { setRecallAttempt(v); setAnswer('s5-recall', v); }}
          placeholder="From memory, write what you recall about photosynthesis…"
          rows={3}
        />
        <RevealAnswer label="Reveal the passage to check">
          <p>{samplePassage}</p>
          <p className="mt-2 text-xs text-slate-500">Compare what you wrote with the passage. What
          did you get right? What did you miss or get wrong? Those are your gaps — go back and
          review just those parts, then try again from memory.</p>
        </RevealAnswer>
      </div>

      {/* Mini practice quiz */}
      <div className="lesson-card">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-1">Practice questions</h2>
        <p className="text-sm text-slate-500 mb-4">Attempt each answer before revealing the solution.</p>
        <div className="space-y-4">
          {practiceQs.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-[#1e3a5f] mb-2">{i + 1}. {item.q}</p>
              <TextArea
                value={[q1, q2, q3][i]}
                onChange={(v) => {
                  if (i === 0) { setQ1(v); setAnswer('s5-pq1', v); }
                  if (i === 1) { setQ2(v); setAnswer('s5-pq2', v); }
                  if (i === 2) { setQ3(v); setAnswer('s5-pq3', v); }
                }}
                placeholder="Your answer…"
                rows={2}
              />
              <button
                onClick={() => setRevealedAnswers((r) => ({ ...r, [i]: !r[i] }))}
                className="btn-soft mt-3"
              >
                {revealedAnswers[i] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {revealedAnswers[i] ? 'Hide solution' : 'Reveal solution'}
              </button>
              {revealedAnswers[i] && (
                <div className="mt-3 rounded-xl bg-[#eaf1ff] p-4 text-sm text-slate-700 animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <SectionNav />
    </div>
  );
}

export function Section6() {
  const [goal, setGoal] = useState('');
  const [role, setRole] = useState('');
  const [audience, setAudience] = useState('');
  const [context, setContext] = useState('');
  const [examples, setExamples] = useState('');
  const [selfCheck, setSelfCheck] = useState<string[]>([]);

  const { setAnswer } = useLesson();

  const gracePrompt = [
    goal && `[Goal] ${goal}`,
    role && `[Role] ${role}`,
    audience && `[Audience] ${audience}`,
    context && `[Context] ${context}`,
    examples && `[Examples / Specific Details] ${examples}`,
  ].filter(Boolean).join('\n\n');

  const selfChecks = [
    'My goal is specific (not just "help me study")',
    'I have said what I already understand',
    'I have said what confuses me',
    'I asked for an explanation at my level',
    'I asked for an example or format',
    'I included an understanding check (questions for me to answer)',
  ];

  const toggle = (s: string) => setSelfCheck((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

  return (
    <div className="space-y-6">
      <SectionHeader num={6} title="GRACE for Study Prompting" minutes={10} subtitle="Use the GRACE framework to build a clear, structured study prompt." />

      <TeachBlock title="Connecting to what you already know: GRACE" icon={BookOpen}>
        <p>You have already learnt the <strong>GRACE</strong> prompting framework. We used it before
        to plan creative prompts. The same framework can organise a strong <strong>study</strong>
        prompt — the structure works for any kind of task you give AI.</p>
        <div className="grid sm:grid-cols-5 gap-2 mt-3">
          {[
            { l: 'G', w: 'Goal', d: 'What do I want to learn?', color: '#1e3a5f' },
            { l: 'R', w: 'Role', d: 'What should the AI do?', color: '#5b8def' },
            { l: 'A', w: 'Audience', d: 'What level suits me?', color: '#14b8a6' },
            { l: 'C', w: 'Context', d: 'What do I know / not know?', color: '#f6c343' },
            { l: 'E', w: 'Examples / Details', d: 'What format & checks?', color: '#1e3a5f' },
          ].map((g) => (
            <div key={g.l} className="rounded-xl border border-slate-200 bg-white p-3 text-center">
              <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-lg text-white font-bold" style={{ backgroundColor: g.color }}>
                {g.l}
              </div>
              <div className="text-xs font-semibold text-[#1e3a5f]">{g.w}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{g.d}</div>
            </div>
          ))}
        </div>
        <p className="mt-3">We will not spend long reteaching GRACE — the idea is the same: each
        letter helps you give AI the information it needs to help you well.</p>
      </TeachBlock>

      <TeachBlock title="Worked study example with GRACE labelled">
        <div className="rounded-xl bg-[#eaf1ff] p-4 text-sm text-slate-700 leading-relaxed">
          <p>
            <Badge tone="blue">G</Badge> "I want to understand the water cycle for Grade 8 science.
            <Badge tone="blue">R</Badge> Act as a patient study coach.
            <Badge tone="teal">A</Badge> I am a Grade 8 student.
            <Badge tone="yellow">C</Badge> I understand evaporation, but I am confused about
            condensation and precipitation.
            <Badge tone="blue">E</Badge> Explain the stages in order using simple language and a
            real-life example. Define the key terms, then test me with three questions without
            revealing the answers until I respond."
          </p>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          <p><strong>G — Goal:</strong> "Understand the water cycle for Grade 8 science." Tells AI what success looks like.</p>
          <p><strong>R — Role:</strong> "Patient study coach." Tells AI how to behave — supportive, explanatory, not just giving answers.</p>
          <p><strong>A — Audience:</strong> "Grade 8 student." Sets the level of the explanation.</p>
          <p><strong>C — Context:</strong> "I understand evaporation, confused about condensation and precipitation." Tells AI what to focus on and what to skip.</p>
          <p><strong>E — Examples / Specific Details:</strong> "Stages in order, simple language, real-life example, define key terms, test me with three questions, no answers first." Specifies the format and builds in an understanding check.</p>
        </div>
        <p className="mt-3 text-sm text-slate-600">
          <strong>Important:</strong> GRACE improves the <em>structure</em> of your prompt, but it
          does <em>not</em> guarantee the information is correct. You still need to verify important
          claims — GRACE makes a better prompt, not a perfect AI.
        </p>
      </TeachBlock>

      <DiscussBlock prompt="What would happen if you skipped the Context part (what you already know and what confuses you)?">
        <p className="text-sm">Without context, AI has to guess your level and what to focus on — so it might explain things you already know and skip the part you are stuck on.</p>
      </DiscussBlock>

      {/* Interactive GRACE prompt builder */}
      <div className="lesson-card">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-1">Build your own GRACE study prompt</h2>
        <p className="text-sm text-slate-500 mb-4">Fill in each field. Your complete prompt assembles below — copy it into your AI tool.</p>
        <div className="space-y-4">
          {[
            { label: 'G — Goal', sub: 'What do you want to learn?', val: goal, set: (v: string) => { setGoal(v); setAnswer('s6-goal', v); }, ph: 'e.g. I want to understand how fractions with different denominators are added', color: '#1e3a5f' },
            { label: 'R — Role', sub: 'What should the AI help you do?', val: role, set: (v: string) => { setRole(v); setAnswer('s6-role', v); }, ph: 'e.g. Act as a patient maths tutor who explains step by step', color: '#5b8def' },
            { label: 'A — Audience', sub: 'What level should the explanation suit?', val: audience, set: (v: string) => { setAudience(v); setAnswer('s6-audience', v); }, ph: 'e.g. I am a Grade 8 student who finds maths tricky', color: '#14b8a6' },
            { label: 'C — Context', sub: 'What do you already understand, and what confuses you?', val: context, set: (v: string) => { setContext(v); setAnswer('s6-context', v); }, ph: 'e.g. I understand equivalent fractions but I am confused about finding a common denominator', color: '#f6c343' },
            { label: 'E — Examples / Specific Details', sub: 'What explanation, example, format, and understanding check do you need?', val: examples, set: (v: string) => { setExamples(v); setAnswer('s6-examples', v); }, ph: 'e.g. Explain step by step with one worked example. Define "common denominator." Then ask me three questions — do not show answers until I respond', color: '#1e3a5f' },
          ].map((f, i) => (
            <div key={i}>
              <label className="text-xs font-semibold mb-1 flex items-center gap-2" style={{ color: f.color }}>
                <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] text-white font-bold" style={{ backgroundColor: f.color }}>
                  {f.label[0]}
                </span>
                {f.label} — <span className="text-slate-400 font-normal">{f.sub}</span>
              </label>
              <textarea
                className="input-base"
                rows={2}
                placeholder={f.ph}
                value={f.val}
                onChange={(e) => f.set(e.target.value)}
              />
            </div>
          ))}
        </div>

        {gracePrompt && (
          <div className="mt-4 rounded-xl border border-[#5b8def]/30 bg-[#eaf1ff] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#1e3a5f]">Your complete study prompt</span>
              <CopyButton text={gracePrompt} label="Copy prompt" />
            </div>
            <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">{gracePrompt}</pre>
          </div>
        )}

        {/* Self-check */}
        <div className="mt-5">
          <p className="text-sm font-semibold text-[#1e3a5f] mb-2">Self-check: is your prompt strong?</p>
          <div className="space-y-2">
            {selfChecks.map((s) => (
              <button
                key={s}
                onClick={() => toggle(s)}
                className="flex w-full items-center gap-2 rounded-lg border border-slate-200 p-2.5 text-left text-sm transition hover:border-slate-300"
              >
                <span className={`flex h-5 w-5 flex-none items-center justify-center rounded-md text-xs ${
                  selfCheck.includes(s) ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-300'
                }`}>{selfCheck.includes(s) ? '✓' : ''}</span>
                <span className={selfCheck.includes(s) ? 'text-teal-700' : 'text-slate-600'}>{s}</span>
              </button>
            ))}
          </div>
          {selfCheck.length === selfChecks.length && (
            <p className="mt-3 text-sm text-teal-700 font-semibold">All checks passed — your prompt is well-structured.</p>
          )}
          {selfCheck.length > 0 && selfCheck.length < selfChecks.length && (
            <p className="mt-3 text-sm text-amber-700">Good start. Review the unchecked items to strengthen your prompt.</p>
          )}
        </div>
      </div>

      <SectionNav />
    </div>
  );
}


