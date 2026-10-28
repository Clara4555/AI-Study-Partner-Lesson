import { useState } from 'react';
import {
  Lightbulb, BookOpen, Bot, Brain, Search, ClipboardList,
  RefreshCw, FileText, ListChecks, Clock, GraduationCap,
} from 'lucide-react';
import {
  TeachBlock, DiscussBlock, SectionHeader,
  MistakeCallout, FeedbackCard,
  TextArea, Badge, Expandable,
} from './components';
import { SectionNav } from './Navigation';
import { useLesson } from './LessonContext';

export function Section1() {
  const { setAnswer } = useLesson();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [usualApproach, setUsualApproach] = useState('');

  return (
    <div className="space-y-6">
      <SectionHeader
        num={1}
        title="Welcome to Your AI Study Partner"
        minutes={10}
        subtitle="Learn smarter through research, summarisation, revision, and responsible AI use."
      />

      <TeachBlock title="What does studying actually involve?" icon={BookOpen}>
        <p>
          Studying is not just reading a textbook over and over. Real studying means
          <strong> understanding</strong> ideas, <strong>organising</strong> them in your mind,
          and <strong>checking</strong> whether you can explain them without help. That is a lot
          to do at once, so it is no surprise that students get stuck.
        </p>
        <p>Here are five common study difficulties — do any of these sound familiar?</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          {[
            { icon: '📖', text: 'Reading a textbook but not understanding it.' },
            { icon: '🧩', text: 'Knowing the words in a definition but not being able to explain the meaning.' },
            { icon: '🌫️', text: 'Remembering a fact during revision but forgetting it during a test.' },
            { icon: '❓', text: 'Looking at a difficult question and not knowing where to start.' },
            { icon: '📚', text: 'Having too much information and not knowing what is important.' },
          ].map((d, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 text-sm">
              <span className="text-lg leading-none">{d.icon}</span>
              <span className="text-slate-700">{d.text}</span>
            </div>
          ))}
        </div>
      </TeachBlock>

      <TeachBlock title="What is an AI study partner?" icon={Bot}>
        <p>
          An <strong>AI study partner</strong> is a generative AI tool you use to help you
          <em> understand, organise, and practise</em> information. Think of it like a study
          buddy who is always available — it can reword confusing explanations, give you
          examples, turn long pages into useful notes, and quiz you on what you have learnt.
        </p>
        <p>But an AI study partner is <strong>not</strong> a human teacher. It does not
        automatically know which explanation is correct, and it <strong>cannot guarantee</strong>
        that you have actually learnt something. Only you can do the thinking, checking, and
        remembering that turns information into understanding.</p>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <BookOpen className="h-6 w-6 text-slate-500" />
            </div>
            <div className="font-semibold text-sm text-[#1e3a5f]">1. Learning resource</div>
            <p className="text-xs text-slate-500 mt-1">Provides the information — textbooks, notes, videos.</p>
          </div>
          <div className="rounded-xl border border-[#5b8def]/30 bg-[#eaf1ff] p-4 text-center">
            <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-white">
              <Bot className="h-6 w-6 text-[#5b8def]" />
            </div>
            <div className="font-semibold text-sm text-[#1e3a5f]">2. AI study partner</div>
            <p className="text-xs text-slate-600 mt-1">Helps explain, organise, and practise the information.</p>
          </div>
          <div className="rounded-xl border border-teal-200 bg-[#d3f9f4] p-4 text-center">
            <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-white">
              <Brain className="h-6 w-6 text-teal-600" />
            </div>
            <div className="font-semibold text-sm text-[#1e3a5f]">3. You (the student)</div>
            <p className="text-xs text-slate-600 mt-1">Think, check, answer, and build real understanding.</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          The resource gives the raw information. AI helps you work with it. But only you can
          actually learn it — the thinking happens inside your head.
        </p>
      </TeachBlock>

      <DiscussBlock prompt="Which of the five study difficulties have you experienced yourself? Pick one and tell me what you usually do when you get stuck.">
        <div className="space-y-2 text-sm">
          <p><strong>If Michael picks a difficulty:</strong> Ask him to describe a specific time it happened. What subject? What did he try?</p>
          <p><strong>If he says "all of them":</strong> Great — ask which one is most frustrating and why. We will use that as a thread throughout the lesson.</p>
          <p><strong>If he gives a vague answer:</strong> "Tell me about the last time you felt stuck while studying. What were you trying to learn?"</p>
          <p><strong>If he says he never struggles:</strong> Ask about the hardest topic this term — what makes it hard?</p>
        </div>
      </DiscussBlock>

      <div className="lesson-card-tight">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-3">
          Which study difficulty sounds most familiar to you?
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            'Reading but not understanding',
            'Knowing words but not the meaning',
            'Forgetting facts during tests',
            'Not knowing where to start',
            'Too much information, no main points',
          ].map((d) => (
            <button
              key={d}
              onClick={() => { setSelectedDifficulty(d); setAnswer('s1-difficulty', d); }}
              className={`choice-btn ${selectedDifficulty === d ? 'choice-btn-selected' : ''}`}
            >
              {d}
            </button>
          ))}
        </div>
        {selectedDifficulty && (
          <div className="mt-4">
            <p className="text-sm text-slate-600 mb-2">
              What do you usually do when you get stuck like that?
            </p>
            <TextArea
              value={usualApproach}
              onChange={(v) => { setUsualApproach(v); setAnswer('s1-approach', v); }}
              placeholder="Describe what you normally try…"
              rows={2}
            />
          </div>
        )}
      </div>

      <TeachBlock title="Two students, two approaches" icon={GraduationCap}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <div className="font-semibold text-sm text-rose-800 mb-1">Student A</div>
            <p className="text-sm text-rose-700">
              Asks AI for the answer to every homework question and copies the responses
              straight into the work.
            </p>
          </div>
          <div className="rounded-xl border border-teal-200 bg-[#d3f9f4] p-4">
            <div className="font-semibold text-sm text-teal-800 mb-1">Student B</div>
            <p className="text-sm text-teal-700">
              Asks AI to explain confusing concepts, tries the questions independently, and
              uses AI feedback to correct mistakes.
            </p>
          </div>
        </div>
      </TeachBlock>

      <div className="lesson-card-tight">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-3">
          Which student is more likely to develop independent understanding, and why?
        </p>
        <div className="space-y-2">
          {[
            { id: 'a', label: 'Student A — gets answers quickly and efficiently' },
            { id: 'b', label: 'Student B — practises and corrects mistakes' },
            { id: 'same', label: 'Both equally — they both use AI' },
          ].map((o) => (
            <button
              key={o.id}
              onClick={() => { setSelectedStudent(o.id); setAnswer('s1-student', o.id); }}
              className={`choice-btn ${selectedStudent === o.id ? 'choice-btn-selected' : ''}`}
            >
              {o.label}
            </button>
          ))}
        </div>
        {selectedStudent && (
          <FeedbackCard
            show
            correct={selectedStudent === 'b'}
            title={selectedStudent === 'b' ? 'That is the stronger approach' : 'Think about what builds understanding'}
          >
            {selectedStudent === 'b' && (
              <>Student B uses AI as a <em>coach</em>, not an answer machine. By trying first
              and correcting after, she practises the actual skills she needs in a test —
              recalling, reasoning, and explaining. Student A may finish faster, but he is
              practising <em>copying</em>, not understanding. When the test comes and AI is
              not there, Student A has no skills to fall back on.</>
            )}
            {selectedStudent === 'a' && (
              <>Getting answers fast feels efficient, but understanding is built by <em>trying</em>.
              Student A practises copying, not thinking. In a test — without AI — he will struggle.
              AI is most powerful when it helps you learn <em>how</em> to answer, not when it
              answers for you.</>
            )}
            {selectedStudent === 'same' && (
              <>Both students use AI, but <em>how</em> they use it matters more than whether they
              use it. Student B builds understanding through practice and correction. Student A
              builds dependency. Same tool, very different result.</>
            )}
          </FeedbackCard>
        )}
        {selectedStudent && (
          <button onClick={() => setSelectedStudent(null)} className="btn-ghost mt-3">
            <RefreshCw className="h-3.5 w-3.5" /> Try again
          </button>
        )}
      </div>

      <MistakeCallout>
        Thinking that using AI at all means you are "cheating" or not learning. Using AI
        <em> well</em> — to explain, organise, and quiz yourself — is powerful. The problem is
        using AI to <em>skip</em> the thinking. We will come back to this idea throughout the lesson.
      </MistakeCallout>

      <SectionNav />
    </div>
  );
}

export function Section2() {
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [selectedExample, setSelectedExample] = useState(0);
  const [discussionIndex, setDiscussionIndex] = useState(0);
  const [discussionResponses, setDiscussionResponses] = useState<Record<number, string>>({});
  const [coachChoice, setCoachChoice] = useState<string | null>(null);
  const { setAnswer } = useLesson();

  const capabilities = [
    { id: 'explanation', label: 'Explanation', icon: Lightbulb },
    { id: 'research', label: 'Research support', icon: Search },
    { id: 'summarisation', label: 'Summarisation', icon: FileText },
    { id: 'revision', label: 'Revision', icon: ListChecks },
    { id: 'feedback', label: 'Feedback', icon: ClipboardList },
    { id: 'planning', label: 'Study planning', icon: Clock },
  ];

  const scenarios = [
    { id: 'sc1', text: 'I do not understand how fractions work.', best: 'explanation' },
    { id: 'sc2', text: 'I need to remember the causes of the American Revolution.', best: 'revision' },
    { id: 'sc3', text: 'My science notes are long and confusing.', best: 'summarisation' },
    { id: 'sc4', text: 'I answered this question but do not know why my answer is wrong.', best: 'feedback' },
    { id: 'sc5', text: 'I need to prepare for a test next week.', best: 'planning' },
  ];

  const examples = [
    { title: 'Turn confusion into a simple explanation', subject: 'Maths · Fractions', prompt: 'I understand equivalent fractions, but I get stuck adding fractions with different denominators. Explain the steps using a pizza example, then give me one problem to try without showing the answer.', benefit: 'AI helps translate a difficult idea and gives you a chance to practise instead of handing over homework answers.' },
    { title: 'Ask better research questions', subject: 'History · Industrial Revolution', prompt: 'Help me investigate how factories changed children’s lives. Give me three focused questions, define any difficult words, and suggest what evidence I should look for in my textbook.', benefit: 'AI helps you decide what to investigate. You still gather and check the evidence yourself.' },
    { title: 'Make notes you can actually revise', subject: 'Science · Photosynthesis', prompt: 'Turn these notes into a one-page revision guide with the main idea, five key points, vocabulary, and one labelled process. Keep the original meaning and flag anything unclear.', benefit: 'AI can organise information, but you compare the result with the original and correct it.' },
    { title: 'Get feedback without giving away the work', subject: 'English · Paragraph writing', prompt: 'Here is my paragraph about a character’s decision. Tell me what is clear, what evidence is missing, and one question I should answer to improve it. Do not rewrite the paragraph for me.', benefit: 'AI acts like a coach. You keep ownership of the thinking and writing.' },
    { title: 'Build a realistic revision plan', subject: 'Geography · Upcoming test', prompt: 'I have four 25-minute sessions before my test. Help me divide rivers, weather, and map skills across the sessions. Include active recall, a source check, and a final practice quiz.', benefit: 'AI helps break a large task into manageable steps, while you complete and measure the work.' },
  ];

  const discussions = [
    'If an AI explanation is easy to read but you still cannot explain the idea, what should you ask next?',
    'Which of these examples would save time for you this week? What would you still need to do yourself?',
    'How could you tell whether an AI-generated quiz is testing real understanding or only word memorisation?',
    'When might a textbook, teacher, or classmate be a better study partner than AI?',
    'If AI gives you two different answers to the same question, what would you do before deciding which one to use?',
    'What is one school task where you want coaching from AI, but would not want AI to do the work for you?',
  ];

  const capData: Record<string, {
    example: string; prompt: string; why: string; limit: string; discuss: string;
  }> = {
    explanation: {
      example: 'You do not understand how fractions work. AI rewords the idea using a pizza analogy and walks through one problem step by step.',
      prompt: '"I do not understand how adding fractions works. Explain it simply with a real-life example and walk through one problem step by step."',
      why: 'It turns a confusing explanation into language you can actually understand, at your level.',
      limit: 'The AI might use an analogy that makes sense to it but not to you — or oversimplify and leave out an important step.',
      discuss: 'When would an AI explanation be more useful than your textbook? When would the textbook be better?',
    },
    research: {
      example: 'You are researching renewable energy. AI helps you list key concepts, generate focused questions, and organise what to look into.',
      prompt: '"I am researching renewable energy for a school project. What are the five most important concepts I should understand? Help me write three focused research questions."',
      why: 'It helps you get started and find direction when a topic feels too big.',
      limit: 'AI may suggest sources that do not exist (called "hallucinated" sources). You must verify any source it names.',
      discuss: 'Why is asking "what should I research?" different from asking "what is the answer?"',
    },
    summarisation: {
      example: 'You have three pages of science notes on photosynthesis. AI identifies the main idea, five key points, and important vocabulary.',
      prompt: '"Turn these notes on photosynthesis into revision notes: main idea, five important points, key vocabulary with definitions, and one example."',
      why: 'It saves time and helps you see the structure of information buried in long text.',
      limit: 'A summary can leave out something important. You must compare it with the original and check nothing essential was dropped.',
      discuss: 'Is a shorter summary always a better summary? When might it not be?',
    },
    revision: {
      example: 'AI generates five practice questions on the water cycle, asks them one at a time, and gives feedback after you answer.',
      prompt: '"Act as my study coach for the water cycle. Ask me five questions that test understanding, one at a time. Wait for my answer, then explain what I got right and what I missed."',
      why: 'Active recall — trying to remember without looking — is one of the most effective ways to find out what you really know.',
      limit: 'AI questions might be too easy, too hard, or off-topic. You should judge whether the questions actually test the right things.',
      discuss: 'Why is answering a question harder and more useful than rereading the answer?',
    },
    feedback: {
      example: 'You wrote a paragraph about a historical event. AI points out where your reasoning is weak and suggests how to strengthen it.',
      prompt: '"Here is my answer about why the Industrial Revolution changed cities. Tell me what I got right, what I missed, and how to improve — but do not rewrite it for me."',
      why: 'You learn more from correcting your own mistakes than from seeing a perfect answer you did not write.',
      limit: 'AI feedback can be wrong or too vague. Check its suggestions against your textbook or teacher if something does not seem right.',
      discuss: 'Why is "fix my answer" a better prompt than "give me the answer"?',
    },
    planning: {
      example: 'You have a test in five days. AI helps you break the topic into sessions, decide what to study each day, and plan when to revisit hard parts.',
      prompt: '"I have a science test on photosynthesis in five days and can study 30 minutes a day. Break the topic into a study plan with what to focus on each day and when to revisit difficult parts."',
      why: 'A plan turns a big, stressful task into small, manageable steps — and spreads study across days, which helps retention.',
      limit: 'A plan only helps if you follow it. AI cannot study for you, and it cannot know your other commitments unless you tell it.',
      discuss: 'Why might studying 30 minutes a day for five days work better than 2.5 hours the night before?',
    },
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        num={2}
        title="What AI Can Do for Studying"
        minutes={10}
        subtitle="Six ways AI can support learning — and the limit of each."
      />

      <TeachBlock title="Six ways AI can help you study" icon={Lightbulb}>
        <p>AI is not just one tool. It can support studying in six main ways. For each one, we will look at what it does, a sample prompt, why it helps, and a limit you should keep in mind.</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.id} className="rounded-xl border border-slate-200 bg-white p-3 flex items-start gap-3">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#eaf1ff]">
                  <Icon className="h-5 w-5 text-[#5b8def]" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#1e3a5f]">{c.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </TeachBlock>

      <div className="lesson-card border-l-4 border-l-teal-400">
        <div className="flex items-center gap-2 mb-1">
          <Bot className="h-5 w-5 text-teal-600" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Good study-partner examples</h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">Choose an example to see how a strong request helps Michael learn without asking AI to do the learning for him.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {examples.map((example, index) => (
            <button
              key={example.title}
              onClick={() => setSelectedExample(index)}
              className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${selectedExample === index ? 'border-teal-400 bg-[#d3f9f4] text-teal-800' : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300'}`}
            >
              {example.subject}
            </button>
          ))}
        </div>
        <div className="rounded-xl bg-[#eaf1ff] p-4 animate-fade-in">
          <Badge tone="blue">{examples[selectedExample].subject}</Badge>
          <h3 className="font-semibold text-[#1e3a5f] mt-2">{examples[selectedExample].title}</h3>
          <p className="text-sm italic text-slate-700 mt-2">“{examples[selectedExample].prompt}”</p>
          <p className="text-sm text-slate-600 mt-3"><strong>Why this is helpful:</strong> {examples[selectedExample].benefit}</p>
        </div>
      </div>

      <div className="lesson-card border-l-4 border-l-[#f6c343]">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Discussion deck for Michael</h2>
        </div>
        <p className="text-sm text-slate-500 mb-3">Choose a question, discuss it aloud with the tutor, then capture Michael’s thinking here.</p>
        <div className="rounded-xl bg-[#fff6df] p-4 text-sm font-semibold text-amber-900">{discussions[discussionIndex]}</div>
        <TextArea
          value={discussionResponses[discussionIndex] || ''}
          onChange={(value) => {
            setDiscussionResponses((responses) => ({ ...responses, [discussionIndex]: value }));
            setAnswer(`s2-discussion-${discussionIndex}`, value);
          }}
          placeholder="Write Michael’s response or a useful follow-up idea…"
          rows={3}
        />
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {discussions.map((_, index) => (
            <button key={index} onClick={() => setDiscussionIndex(index)} className={`h-8 w-8 rounded-full text-xs font-bold ${discussionIndex === index ? 'bg-[#1e3a5f] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{index + 1}</button>
          ))}
          <span className="text-xs text-slate-400 ml-1">Ask a follow-up: “What makes you think that?”</span>
        </div>
      </div>

      <div className="lesson-card border-l-4 border-l-[#5b8def]">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-5 w-5 text-[#5b8def]" />
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Try a study-partner conversation</h2>
        </div>
        <p className="text-sm text-slate-600 mb-3">
          AI explains evaporation, but you still cannot picture how water vapour becomes a cloud.
          What is the most helpful next request?
        </p>
        <div className="space-y-2">
          {[
            { id: 'coach', label: 'Ask for a simple step-by-step explanation, a real-life example, and one question to try.' },
            { id: 'answer', label: 'Ask AI to write the exact answer to memorise for the test.' },
            { id: 'copy', label: 'Ask AI to make the explanation longer and copy it into your notes.' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setCoachChoice(option.id)}
              className={`choice-btn ${coachChoice === option.id ? 'choice-btn-selected' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {coachChoice && (
          <FeedbackCard
            show
            correct={coachChoice === 'coach'}
            title={coachChoice === 'coach' ? 'That keeps you doing the learning' : 'Try a more active next step'}
          >
            {coachChoice === 'coach'
              ? 'A concrete example and a question let you build a mental picture and test yourself. After answering, check the explanation against your class notes.'
              : 'A longer or memorised answer may still leave you unsure. Ask for a different explanation, then try a question yourself before looking at an answer.'}
          </FeedbackCard>
        )}
      </div>

      {/* Detailed cards for each capability */}
      <div className="space-y-3">
        {capabilities.map((c) => {
          const data = capData[c.id];
          const Icon = c.icon;
          return (
            <Expandable key={c.id} summary={`${c.label} — how it works`}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-[#5b8def] flex-none mt-0.5" />
                  <div>
                    <Badge tone="blue">School example</Badge>
                    <p className="mt-1">{data.example}</p>
                  </div>
                </div>
                <div>
                  <Badge tone="teal">Sample prompt</Badge>
                  <p className="mt-1 italic text-slate-600">{data.prompt}</p>
                </div>
                <div>
                  <Badge tone="emerald">Why it is useful</Badge>
                  <p className="mt-1">{data.why}</p>
                </div>
                <div>
                  <Badge tone="rose">Limitation / risk</Badge>
                  <p className="mt-1">{data.limit}</p>
                </div>
                <div className="rounded-lg bg-[#fff6df] p-3 text-amber-800">
                  <strong>Discuss:</strong> {data.discuss}
                </div>
              </div>
            </Expandable>
          );
        })}
      </div>

      <TeachBlock title="Helping vs. replacing your effort" icon={Brain}>
        <p>There is a big difference between AI <strong>helping you learn</strong> and AI
        <strong> replacing your effort</strong>. Here is a simple way to tell them apart:</p>
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <div className="rounded-xl border border-teal-200 bg-[#d3f9f4] p-4 text-sm">
            <div className="font-semibold text-teal-800 mb-1">AI is helping when…</div>
            <ul className="list-disc pl-5 space-y-1 text-teal-700">
              <li>You understand the explanation afterward.</li>
              <li>You can explain it without looking.</li>
              <li>You did the thinking and AI gave feedback.</li>
              <li>You checked the information yourself.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm">
            <div className="font-semibold text-rose-800 mb-1">AI is replacing when…</div>
            <ul className="list-disc pl-5 space-y-1 text-rose-700">
              <li>You copy without understanding.</li>
              <li>You cannot explain the answer without AI.</li>
              <li>You skip the thinking and go straight to the answer.</li>
              <li>You trust it without checking.</li>
            </ul>
          </div>
        </div>
      </TeachBlock>

      {/* Interactive: match scenarios */}
      <div className="lesson-card">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-1">Activity: Choose the right kind of help</h2>
        <p className="text-sm text-slate-500 mb-4">
          For each scenario, pick the AI study function that fits best. There may be more than one
          reasonable answer — what matters is your reasoning.
        </p>
        <div className="space-y-4">
          {scenarios.map((sc) => {
            const sel = matched[sc.id];
            return (
              <div key={sc.id} className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-700 mb-2">{sc.text}</p>
                <div className="flex flex-wrap gap-2">
                  {capabilities.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setMatched((m) => ({ ...m, [sc.id]: c.id }))}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                        sel === c.id
                          ? 'border-[#5b8def] bg-[#eaf1ff] text-[#1e3a5f]'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                {sel && (
                  <FeedbackCard
                    show
                    correct={sel === sc.best}
                    title={sel === sc.best ? 'Good match' : 'A different function fits better — but let us check your reasoning'}
                  >
                    {sel === sc.best
                      ? <>This is the best fit. {capData[sc.best].why} The key idea is that the
                      problem is about <strong>{capabilities.find((c) => c.id === sc.best)?.label?.toLowerCase() || sc.best}</strong>,
                      and that is exactly what this AI function does well.</>
                      : <>The strongest fit here is <strong>{capabilities.find((c) => c.id === sc.best)?.label}</strong>.
                      That said, {capabilities.find((c) => c.id === sel)?.label} can also play a supporting
                      role. The point is to pick the tool that matches the <em>core</em> problem — not
                      just any tool that touches the topic.</>}
                  </FeedbackCard>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <SectionNav />
    </div>
  );
}
