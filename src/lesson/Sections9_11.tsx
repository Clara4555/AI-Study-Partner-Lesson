import { useState } from 'react';
import {
  CheckCircle2, Lightbulb, ClipboardList, BookOpen,
  Eye, EyeOff, GraduationCap, CalendarDays, Users, ShieldCheck,
} from 'lucide-react';
import {
  SectionHeader, TeachBlock, TextArea, RevealAnswer,
  FeedbackCard, CopyButton, ExampleCallout,
} from './components';
import { SectionNav } from './Navigation';
import { useLesson } from './LessonContext';

const practiceQuiz = [
  {
    id: 'next-step',
    question: 'AI explains a difficult idea, but you still cannot explain it yourself. What is the best next step?',
    options: [
      { id: 'a', label: 'Ask for a different explanation and a concrete example, then try explaining it yourself.' },
      { id: 'b', label: 'Copy the explanation so you can read it again later.' },
      { id: 'c', label: 'Assume you understand because the explanation sounds clear.' },
    ],
    correct: 'a',
    explanation: 'A new explanation and example can help, but your own explanation is the check that shows whether it made sense.',
  },
  {
    id: 'active-recall',
    question: 'Which activity is the clearest example of active recall?',
    options: [
      { id: 'a', label: 'Highlighting every sentence in your notes.' },
      { id: 'b', label: 'Closing your notes and writing what you remember.' },
      { id: 'c', label: 'Reading the same summary several times.' },
    ],
    correct: 'b',
    explanation: 'Active recall means retrieving information from memory before looking at the answer.',
  },
  {
    id: 'verify',
    question: 'AI gives you a surprising fact and a source name. What should you do?',
    options: [
      { id: 'a', label: 'Use it because a source name was included.' },
      { id: 'b', label: 'Ask the same AI tool whether the fact is correct.' },
      { id: 'c', label: 'Find and check the claim in your textbook or another trusted source.' },
    ],
    correct: 'c',
    explanation: 'Check the actual claim against an independent trusted source; AI can invent or misstate sources.',
  },
  {
    id: 'feedback',
    question: 'You have written a first draft. Which request best uses AI as a study partner?',
    options: [
      { id: 'a', label: 'Rewrite the whole thing so I can hand it in.' },
      { id: 'b', label: 'Tell me what is clear, what needs evidence, and one question to help me revise it.' },
      { id: 'c', label: 'Give me a grade and no explanation.' },
    ],
    correct: 'b',
    explanation: 'Specific feedback helps you improve your own work while keeping the thinking and revision yours.',
  },
];

export function Section9() {
  const { setAnswer } = useLesson();
  const [mc1, setMc1] = useState<string | null>(null);
  const [mc2, setMc2] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [sa1, setSa1] = useState('');
  const [sa2, setSa2] = useState('');
  const [scenario, setScenario] = useState('');
  const [promptAttempt, setPromptAttempt] = useState('');
  const [finalReflection, setFinalReflection] = useState('');
  const quizScore = practiceQuiz.filter((question) => quizAnswers[question.id] === question.correct).length;
  const quizComplete = practiceQuiz.every((question) => quizAnswers[question.id]);
  return (
    <div className="space-y-6">
      <SectionHeader num={9} title="Final Understanding Check" minutes={5} subtitle="A short check of what you have learnt today. Attempt each question before revealing answers." />

      {/* MCQ 1 */}
      <div className="lesson-card">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-3">1. Which best describes an AI study partner?</p>
        <div className="space-y-2">
          {[
            { id: 'a', label: 'A tool that does your homework for you so you finish faster' },
            { id: 'b', label: 'A tool that helps you understand, organise, and practise information — but cannot guarantee you have learnt it' },
            { id: 'c', label: 'A replacement for your teacher and textbook' },
            { id: 'd', label: 'A search engine that always gives correct facts' },
          ].map((o) => (
            <button key={o.id} onClick={() => { setMc1(o.id); setAnswer('s9-mc1', o.id); }}
              className={`choice-btn ${mc1 === o.id ? 'choice-btn-selected' : ''}`}>
              {o.label}
            </button>
          ))}
        </div>
        {mc1 && (
          <FeedbackCard show correct={mc1 === 'b'} title={mc1 === 'b' ? 'Correct' : 'Not quite'}>
            {mc1 === 'b'
              ? 'An AI study partner helps you work with information, but the learning happens in your head. It cannot guarantee understanding — only your thinking and checking can do that.'
              : 'The key idea is that AI helps you understand, organise, and practise — but it does not learn for you, it is not a teacher replacement, and it is not a guaranteed-facts search engine.'}
          </FeedbackCard>
        )}
      </div>

      {/* MCQ 2 */}
      <div className="lesson-card">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-3">2. You ask AI about a science topic and it gives you an explanation that sounds confident. What should you do before using it in your test revision?</p>
        <div className="space-y-2">
          {[
            { id: 'a', label: 'Trust it — AI is usually right about science' },
            { id: 'b', label: 'Ask AI the same question again to see if it gives the same answer' },
            { id: 'c', label: 'Check the key claims against your textbook or another trusted source' },
            { id: 'd', label: 'Ignore it and only use your own notes' },
          ].map((o) => (
            <button key={o.id} onClick={() => { setMc2(o.id); setAnswer('s9-mc2', o.id); }}
              className={`choice-btn ${mc2 === o.id ? 'choice-btn-selected' : ''}`}>
              {o.label}
            </button>
          ))}
        </div>
        {mc2 && (
          <FeedbackCard show correct={mc2 === 'c'} title={mc2 === 'c' ? 'Correct' : 'Not quite'}>
            {mc2 === 'c'
              ? 'Verification against a trusted source is the right move. AI can sound confident and still be wrong — only checking against your textbook or a reputable source confirms the claim.'
              : 'Asking AI again is not an independent check (it can repeat errors), and ignoring it wastes a useful tool. Checking against a trusted source is the verification step that catches hallucinations.'}
          </FeedbackCard>
        )}
      </div>

      {/* Short answer 1 */}
      <div className="lesson-card">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-3">3. Explain in your own words the difference between recognising information and recalling it. Why does this matter for revision?</p>
        <TextArea value={sa1} onChange={(v) => { setSa1(v); setAnswer('s9-sa1', v); }} placeholder="Your answer…" rows={3} />
        <RevealAnswer label="Show guidance">
          <p>Recognising = seeing the answer and feeling it is familiar (happens when rereading).
          Recalling = producing the answer from memory without looking (happens when answering
          questions or explaining). Recall matters because it reveals what you actually know —
          recognition can hide gaps. A test demands recall, not recognition.</p>
        </RevealAnswer>
      </div>

      {/* Short answer 2 */}
      <div className="lesson-card">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-3">4. What are the five parts of the GRACE framework, and what does each one help you do in a study prompt?</p>
        <TextArea value={sa2} onChange={(v) => { setSa2(v); setAnswer('s9-sa2', v); }} placeholder="Your answer…" rows={3} />
        <RevealAnswer label="Show guidance">
          <p><strong>G — Goal:</strong> what you want to learn. <strong>R — Role:</strong> what AI should do (e.g. study coach). <strong>A — Audience:</strong> your level (e.g. Grade 8). <strong>C — Context:</strong> what you know and what confuses you. <strong>E — Examples / Specific Details:</strong> format, examples, and understanding checks. Together they make a prompt clear, specific, and suited to your learning needs.</p>
        </RevealAnswer>
      </div>

      {/* Scenario */}
      <div className="lesson-card">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-3">5. Scenario: Your friend says, "I just ask AI to write my essay introduction and I copy it. It saves time and the teacher never notices." Using what you learnt today about AI as a study partner, explain why this is a problem and what your friend should do instead.</p>
        <TextArea value={scenario} onChange={(v) => { setScenario(v); setAnswer('s9-scenario', v); }} placeholder="Your answer…" rows={4} />
        <RevealAnswer label="Show guidance">
          <p>The problem is that copying AI text means the friend is not practising the skill of
          writing — and is presenting AI work as their own (an academic integrity issue). AI is
          replacing their effort, not helping them learn. A better approach: ask AI to help
          <em> plan</em> the introduction (what points to include, what makes a strong opening), then
          write the introduction independently. The friend could also ask AI for feedback on a draft
          they wrote themselves. This way AI supports learning without doing the work for them.</p>
        </RevealAnswer>
      </div>

      {/* Prompt improvement challenge */}
      <div className="lesson-card">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-3">6. Improve this weak study prompt using the GRACE framework:</p>
        <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm italic text-rose-700 mb-3">
          "Help me study history."
        </div>
        <TextArea value={promptAttempt} onChange={(v) => { setPromptAttempt(v); setAnswer('s9-prompt', v); }} placeholder="Write your improved GRACE prompt here…" rows={4} />
        <RevealAnswer label="Show a model answer">
          <p className="italic">
            "I want to understand the causes of the American Revolution for my Grade 8 history test
            (Goal). Act as a patient history tutor who explains clearly (Role). I am a Grade 8
            student (Audience). I understand that taxes were an issue, but I am confused about why
            representation mattered so much (Context). Explain the main causes step by step in simple
            language, give one real example, define 'no taxation without representation,' then ask me
            three questions to check my understanding without showing the answers first (Examples /
            Specific Details)."
          </p>
          <p className="mt-2 text-xs text-slate-500">Compare with yours: did you set the goal, role,
          audience, context, and specific details? You do not need to match this exactly — check that
          each GRACE element is there.</p>
        </RevealAnswer>
      </div>

      <div className="lesson-card border-l-4 border-l-[#5b8def]">
        <div className="mb-1 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#5b8def]" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Quick quiz: choose your next move</h2>
        </div>
        <p className="mb-4 text-sm text-slate-500">Answer each question, then read the feedback to check your reasoning.</p>
        <div className="space-y-5">
          {practiceQuiz.map((question, index) => {
            const selected = quizAnswers[question.id];
            return (
              <div key={question.id} className="rounded-xl border border-slate-200 p-4">
                <p className="mb-3 text-sm font-semibold text-[#1e3a5f]">{index + 1}. {question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setQuizAnswers((answers) => ({ ...answers, [question.id]: option.id }));
                        setAnswer(`s9-quiz-${question.id}`, option.id);
                      }}
                      className={`choice-btn ${selected === option.id ? 'choice-btn-selected' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {selected && (
                  <FeedbackCard
                    show
                    correct={selected === question.correct}
                    title={selected === question.correct ? 'Correct' : 'Not quite'}
                  >
                    {question.explanation}
                  </FeedbackCard>
                )}
              </div>
            );
          })}
        </div>
        {quizComplete && (
          <div className="mt-4 rounded-xl bg-[#eaf1ff] p-4 text-sm font-semibold text-[#1e3a5f]" role="status">
            Quiz score: {quizScore} out of {practiceQuiz.length}. You can change any answer to try again.
          </div>
        )}
      </div>

      {/* Final reflection */}
      <div className="lesson-card border-l-4 border-l-teal-400">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-5 w-5 text-teal-500" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Final reflection</h2>
        </div>
        <p className="text-sm font-semibold text-[#1e3a5f] mb-3">
          What is one thing you can now do with AI that you could not explain or do confidently at the
          beginning of the lesson?
        </p>
        <TextArea value={finalReflection} onChange={(v) => { setFinalReflection(v); setAnswer('s9-reflection', v); }} placeholder="Your reflection…" rows={3} />
      </div>

      <SectionNav />
    </div>
  );
}

export function Section10() {
  const assignmentText = `MY AI STUDY PARTNER EXPERIMENT

1. Topic and learning goal:
[Your topic and what you want to understand]

2. Original GRACE-informed study prompt:
[The prompt you wrote using GRACE]

3. Key points from your corrected study notes:
[Main idea + important points, after you corrected AI's summary]

4. Three practice questions and your own answers:
[Q1 + your answer]
[Q2 + your answer]
[Q3 + your answer]

5. Source used to verify an important claim:
[Which trusted source did you check? What did you find?]

6. Baseline and AI-assisted study times (recorded honestly):
- Baseline: ___ minutes
- AI-assisted: ___ minutes
- Time saved: ___ minutes (___ %)

7. Comparison of understanding before and after:
- Before: [what you could explain]
- After: [what you can explain now]

8. Short reflection:
- What did AI help me understand?
- What did I still have to do myself?
- What did I need to verify?
- Did AI save time? How do I know?
- Was the time saved worth it in terms of understanding?
- What would I change next time?`;

  const workflowText = `MY WEEKLY AI STUDY WORKFLOW

Subject/topic: ______________________________
Upcoming test or goal: _____________________

1. Before studying, write one specific question I need to answer.
2. Ask AI for an explanation at my Grade 8 level.
3. Ask one follow-up question about anything unclear.
4. Verify one important claim with my textbook or class notes.
5. Write corrected notes in my own words.
6. Close the notes and use active recall.
7. Answer three practice questions independently.
8. Record the minutes spent and the gaps I still have.
9. Revisit the hardest idea in two days.

Reflection after one week:
- What became easier to explain?
- Which AI help was most useful?
- Which tasks had to be completed independently?
- What will I change next week?`;

  const factCheckText = `AI CLAIM FACT-CHECK

Subject and topic: ___________________________
Claim AI suggested: __________________________
Where I found the claim in my source: __________
What the trusted source says: _________________
Is the claim supported, contradicted, or unclear?:
______________________________________________
What I changed in my notes after checking: ______
One question I still have: _____________________`;

  const teachBackText = `TEACH-BACK AND STUDENT-MADE QUIZ

Topic: _______________________________________
Explain the main idea in my own words:
______________________________________________
______________________________________________

Five questions I wrote:
1. __________________________________________
2. __________________________________________
3. __________________________________________
4. __________________________________________
5. __________________________________________

My answers from memory:
______________________________________________
What I checked or corrected using my notes: ______
What I can now explain without help: ____________
What I need to practise next: __________________`;

  return (
    <div className="space-y-6">
      <SectionHeader num={10} title="Four Take-Home Assignments" minutes={5} subtitle="Choose a real school topic and use these activities to turn today's lesson into a repeatable study habit." />

      <TeachBlock title="Assignment 1: My AI Study Partner Experiment" icon={ClipboardList}>
        <p>Use the study workflow you practised today for <strong>one real school topic</strong>
        before an upcoming test. Submit the following:</p>
        <StepListInline
          steps={[
            'The topic and learning goal.',
            'Your original GRACE-informed study prompt.',
            'The key points from your corrected study notes.',
            'Three practice questions and your own answers.',
            'The source or material you used to verify an important claim.',
            'The baseline and AI-assisted study times, recorded honestly.',
            'A comparison of your understanding before and after the session.',
            'A short reflection (questions below).',
          ]}
        />
      </TeachBlock>

      <ExampleCallout tone="yellow" label="Reflection questions">
        <ul className="list-disc pl-5 space-y-1">
          <li>What did AI help me understand?</li>
          <li>What did I still have to do myself?</li>
          <li>What did I need to verify?</li>
          <li>Did AI save time? How do I know?</li>
          <li>Was the time saved worth it in terms of understanding?</li>
          <li>What would I change next time?</li>
        </ul>
      </ExampleCallout>

      <div className="lesson-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Assignment template</h2>
          <CopyButton text={assignmentText} label="Copy template" />
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">{assignmentText}</pre>
        </div>
      </div>

      <div className="rounded-xl bg-[#eaf1ff] p-4 text-sm text-[#1e3a5f] border border-[#5b8def]/30">
        <strong>Why this matters:</strong> This assignment contributes to your module outcome —
        producing a study plan using AI with documented time savings measured. If your baseline
        comparison is not reliable, state that honestly and repeat the measurement under more comparable conditions.
      </div>

      <div className="lesson-card border-l-4 border-l-teal-400">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#d3f9f4]">
            <CalendarDays className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Assignment 2: My Weekly AI Study Workflow</h2>
            <p className="text-sm text-slate-600 mt-1">Use this workflow for one week in a real subject. The goal is not just to save time — it is to collect evidence that you are learning.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-xl bg-[#d3f9f4] p-4 text-sm text-teal-800">
            <div className="font-semibold mb-1">Complete at least three study sessions</div>
            <p>Record the topic, minutes, AI task, independent task, one verified claim, and one remaining gap after each session.</p>
          </div>
          <div className="rounded-xl bg-[#fff6df] p-4 text-sm text-amber-800">
            <div className="font-semibold mb-1">Finish with a teach-back</div>
            <p>Explain the hardest topic to a tutor, family member, or imaginary classmate without reading your notes.</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 mb-3">
          <h3 className="font-semibold text-[#1e3a5f]">Weekly workflow template</h3>
          <CopyButton text={workflowText} label="Copy workflow" />
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">{workflowText}</pre>
        </div>
        <div className="mt-4 rounded-xl border border-teal-200 bg-white p-4 text-sm text-slate-600">
          <div className="flex items-center gap-2 font-semibold text-teal-700 mb-2"><Users className="h-4 w-4" /> Evidence to submit</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Three dated study-session records with honest timings.</li>
            <li>One corrected set of AI-assisted notes.</li>
            <li>Three practice questions and your independent answers.</li>
            <li>A short teach-back reflection: what could you explain without help?</li>
          </ul>
        </div>
      </div>

      <div className="lesson-card border-l-4 border-l-amber-400">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#fff6df]">
            <ShieldCheck className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Assignment 3: AI Claim Fact-Check</h2>
            <p className="mt-1 text-sm text-slate-600">Practise checking AI rather than treating a confident answer as automatically true.</p>
          </div>
        </div>
        <StepListInline
          steps={[
            'Choose a current school topic and ask AI for three key facts or claims about it.',
            'Pick one claim that matters to understanding the topic.',
            'Find the related information in your textbook, class notes, or a teacher-approved source.',
            'Record whether the source supports, contradicts, or does not settle the claim. Include the page or section if available.',
            'Correct your notes in your own words and write one follow-up question.',
          ]}
        />
        <div className="mt-4 flex items-center justify-between gap-3">
          <h3 className="font-semibold text-[#1e3a5f]">Fact-check template</h3>
          <CopyButton text={factCheckText} label="Copy template" />
        </div>
        <div className="mt-2 rounded-xl bg-slate-50 p-4">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">{factCheckText}</pre>
        </div>
      </div>

      <div className="lesson-card border-l-4 border-l-[#5b8def]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#eaf1ff]">
            <BookOpen className="h-5 w-5 text-[#5b8def]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Assignment 4: Teach-Back and Make a Quiz</h2>
            <p className="mt-1 text-sm text-slate-600">Show what you can explain and recall without AI doing the work for you.</p>
          </div>
        </div>
        <StepListInline
          steps={[
            'Pick a topic you have studied and ask AI to help identify the main ideas, not write your explanation.',
            'Close AI and your notes. Explain the topic aloud or in writing as if teaching a classmate.',
            'Write five questions of your own: include facts, a why/how question, and an application question.',
            'Answer the questions from memory before checking your notes.',
            'Use AI only to get feedback on a gap or unclear explanation; verify any correction against a trusted source.',
            'Submit your first explanation, questions, independent answers, and a short note about what you improved.',
          ]}
        />
        <div className="mt-4 flex items-center justify-between gap-3">
          <h3 className="font-semibold text-[#1e3a5f]">Teach-back and quiz template</h3>
          <CopyButton text={teachBackText} label="Copy template" />
        </div>
        <div className="mt-2 rounded-xl bg-slate-50 p-4">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">{teachBackText}</pre>
        </div>
      </div>

      <SectionNav />
    </div>
  );
}

function StepListInline({ steps }: { steps: React.ReactNode[] }) {
  return (
    <ol className="space-y-2 mt-2">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-slate-700">
          <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#5b8def] text-[10px] font-bold text-white mt-0.5">{i + 1}</span>
          <span className="leading-relaxed">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export function Section11() {
  return (
    <div className="space-y-6">
      <SectionHeader num={11} title="Tutor Guide" minutes={0} subtitle="For the tutor — do not display these answers on the student-facing screen." />

      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 flex items-start gap-3">
        <BookOpen className="h-5 w-5 flex-none mt-0.5" />
        <div>
          <strong>This section is for you, the tutor.</strong> It contains suggested answers,
          follow-up questions, misconceptions, and evaluation checklists. Each block is collapsed by
          default so it does not appear on the student screen. Expand what you need as you teach.
        </div>
      </div>

      {/* Section objectives */}
      <TutorBlock title="Section objectives & suggested answers" icon={GraduationCap}>
        <div className="space-y-4 text-sm">
          <div>
            <strong>Section 1 — Welcome:</strong> Objective: establish what studying involves, define
            an AI study partner, and distinguish helping from replacing. Suggested answer for the
            student comparison: Student B develops understanding because she practises and corrects.
            Follow-up: "What would Student A struggle with in a test?"
          </div>
          <div>
            <strong>Section 2 — Capabilities:</strong> Objective: name the six AI study functions and
            match them to problems. Best matches: sc1→explanation, sc2→revision, sc3→summarisation,
            sc4→feedback, sc5→planning. Misconception: "AI can do everything equally well" — each
            function has limits.
          </div>
          <div>
            <strong>Section 3 — Research:</strong> Objective: teach focused questioning, prompt
            improvement, and verification. The AI claim about photosynthesis is wrong — glucose IS
            the plant's food, made by photosynthesis. Verification answer: check the textbook. Common
            misconception: treating AI as a search engine.
          </div>
          <div>
            <strong>Section 4 — Summarisation:</strong> Objective: teach the summarisation process
            and AI-assisted notes with verification. Essential points are p1–p6 and p9. Common
            misconception: "shorter is always better."
          </div>
          <div>
            <strong>Section 5 — Revision:</strong> Objective: teach active recall vs. recognition and
            spaced practice. Correct prediction: Student 2 (recall). Common misconception: "rereading
            is effective because it feels productive."
          </div>
          <div>
            <strong>Section 6 — GRACE:</strong> Objective: apply GRACE to study prompting. Each
            element should be present and specific. Common misconception: "GRACE guarantees correct
            answers."
          </div>
        </div>
      </TutorBlock>

      {/* Assessment answers */}
      <TutorBlock title="Final assessment answers" icon={CheckCircle2}>
        <div className="space-y-3 text-sm">
          <div><strong>Q1:</strong> Correct answer is (b). AI helps but cannot guarantee learning.</div>
          <div><strong>Q2:</strong> Correct answer is (c). Verify against a trusted source.</div>
          <div><strong>Q3:</strong> Recognition = familiarity when shown; recall = producing from memory. Recall reveals gaps; recognition hides them. A test demands recall.</div>
          <div><strong>Q4:</strong> G=Goal, R=Role, A=Audience, C=Context, E=Examples/Details. Each makes the prompt clearer and more specific.</div>
          <div><strong>Q5:</strong> Copying AI text = not learning + academic integrity issue. Better: use AI to plan or get feedback, write independently. Look for the student to mention both the learning problem and the integrity problem.</div>
          <div><strong>Q6:</strong> Improved prompt should include all five GRACE elements. Check: is the goal specific? Is context included? Is there an understanding check?</div>
        </div>
      </TutorBlock>

      {/* Checklists */}
      <TutorBlock title="Evaluation checklists" icon={ClipboardList}>
        <div className="space-y-5 text-sm">
          <div>
            <strong className="text-[#1e3a5f] block mb-2">Checklist: evaluating Michael's study prompt</strong>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Goal is specific (not just "help me study")</li>
              <li>Role is assigned (study coach, tutor, etc.)</li>
              <li>Audience/level is stated (Grade 8)</li>
              <li>Context includes what he knows AND what confuses him</li>
              <li>Examples/details include format and an understanding check</li>
              <li>The prompt would produce a useful, level-appropriate response</li>
            </ul>
          </div>
          <div>
            <strong className="text-[#1e3a5f] block mb-2">Checklist: evaluating the study sprint</strong>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Topic and starting confidence recorded</li>
              <li>Baseline time measured honestly (not invented)</li>
              <li>AI-assisted time includes verification and note correction</li>
              <li>At least one claim verified against a trusted source</li>
              <li>Notes reviewed and corrected by the student</li>
              <li>Practice questions attempted before viewing answers</li>
              <li>One answer explained in his own words</li>
              <li>Remaining gaps identified honestly</li>
              <li>Time comparison calculated correctly (or honestly noted as unreliable)</li>
            </ul>
          </div>
          <div>
            <strong className="text-[#1e3a5f] block mb-2">Checklist: documenting the time comparison</strong>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Baseline and AI times both recorded in minutes</li>
              <li>Percentage calculated only if baseline is greater than 0</li>
              <li>If AI took longer, this is shown honestly (not hidden)</li>
              <li>Time saved is considered alongside understanding quality</li>
              <li>Limitations of the comparison are stated if conditions were not fair</li>
            </ul>
          </div>
          <div>
            <strong className="text-[#1e3a5f] block mb-2">Checklist: does the student genuinely understand?</strong>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Can explain the topic in his own words without looking at notes</li>
              <li>Can answer a question he has not seen before (application, not memorisation)</li>
              <li>Can identify what he still does not understand</li>
              <li>Confidence change aligns with actual recall (not just feeling better)</li>
              <li>He attempted answers before checking — and can correct his own mistakes</li>
            </ul>
          </div>
        </div>
      </TutorBlock>

      {/* Common misconceptions */}
      <TutorBlock title="Common misconceptions to watch for" icon={Lightbulb}>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
          <li>"AI is always right because it sounds confident." — Teach verification.</li>
          <li>"Rereading is effective revision." — Teach active recall.</li>
          <li>"Shorter summaries are better." — Teach faithful summarisation.</li>
          <li>"Using AI at all is cheating." — Reframe: it is about how you use it.</li>
          <li>"GRACE guarantees correct answers." — It improves structure, not accuracy.</li>
          <li>"If AI was faster, it was better." — Time saved must be paired with understanding.</li>
          <li>"I can verify by asking AI again." — Use an independent source.</li>
        </ul>
      </TutorBlock>

      {/* Time management */}
      <TutorBlock title="Time management guidance" icon={BookOpen}>
        <div className="text-sm text-slate-600 space-y-1">
          <p>The timings in the sidebar are approximate. Prioritise understanding over finishing
          every optional interaction. If Michael is engaged in a discussion, let it continue — that
          is where real learning happens. The study sprint (Section 7) is the core; protect time for
          it. If you are short on time, compress Sections 2 and 6 (capabilities and GRACE) since the
          sprint reinforces both.</p>
        </div>
      </TutorBlock>

      <SectionNav />
    </div>
  );
}

function TutorBlock({
  title, icon: Icon, children,
}: { title: string; icon: typeof BookOpen; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lesson-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-[#1e3a5f]" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">{title}</h2>
        </div>
        {open ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
      </button>
      {open && (
        <div className="mt-4 animate-fade-in">{children}</div>
      )}
    </div>
  );
}
