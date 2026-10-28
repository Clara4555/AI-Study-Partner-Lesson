import { useState } from 'react';
import {
  Search, Lightbulb, FileSearch, ShieldCheck, Bot,
} from 'lucide-react';
import {
  TeachBlock, DiscussBlock, SectionHeader, ExampleCallout,
  MistakeCallout, StepList, FeedbackCard, TextArea, Badge,
  RevealAnswer, CopyButton,
} from './components';
import { SectionNav } from './Navigation';
import { useLesson } from './LessonContext';

export function Section3() {
  const { setAnswer } = useLesson();
  const [topic, setTopic] = useState('');
  const [knows, setKnows] = useState('');
  const [confused, setConfused] = useState('');
  const vagueQ = 'Tell me about volcanoes.';
  const [improvedQ, setImprovedQ] = useState('');
  const [verifyChoice, setVerifyChoice] = useState<string | null>(null);

  const builtPrompt = [
    topic && `Topic: ${topic}`,
    knows && `What I already understand: ${knows}`,
    confused && `What confuses me: ${confused}`,
    'Explain the confusing part step by step in simple language. Define any key terms. Give a real-life example. Then ask me three questions to check my understanding — do not show the answers until I respond.',
  ].filter(Boolean).join('\n\n');

  return (
    <div className="space-y-6">
      <SectionHeader num={3} title="Research with AI" minutes={20} subtitle="Ask focused questions, investigate, and verify what AI tells you." />

      <TeachBlock title="What does research actually mean?" icon={Search}>
        <p>
          <strong>Research</strong> is not just "looking something up." It means asking
          focused questions, gathering relevant information, <strong>checking the evidence</strong>,
          and building an informed understanding of a topic.
        </p>
        <p>There is a difference between three kinds of questions:</p>
        <div className="grid sm:grid-cols-3 gap-3 mt-2">
          <div className="rounded-xl bg-slate-50 p-3 text-sm">
            <Badge tone="slate">Quick answer</Badge>
            <p className="mt-1 text-slate-600">"What is the capital of France?" — one fact, no investigation.</p>
          </div>
          <div className="rounded-xl bg-[#eaf1ff] p-3 text-sm">
            <Badge tone="blue">Investigation</Badge>
            <p className="mt-1 text-slate-600">"How does the water cycle work and why does it matter?" — build understanding.</p>
          </div>
          <div className="rounded-xl bg-[#fff6df] p-3 text-sm">
            <Badge tone="yellow">Checking a claim</Badge>
            <p className="mt-1 text-slate-600">"Is it true that lightning never strikes the same place twice?" — verify.</p>
          </div>
        </div>
        <p>AI can help with all three — but the way you ask changes what you get back.</p>
      </TeachBlock>

      <TeachBlock title="Research questions get sharper step by step" icon={Lightbulb}>
        <p>Good research does not start with the perfect question. It starts broad and gets
        sharper as you learn. Here is an example using the water cycle:</p>
        <div className="space-y-2 mt-3">
          {[
            { q: 'What is the water cycle?', note: 'Broad — gives you an overview.' },
            { q: 'What happens during evaporation?', note: 'Focused on one stage.' },
            { q: 'How does water vapour form clouds?', note: 'Deeper — connects two ideas.' },
            { q: 'What causes precipitation?', note: 'Another stage, in detail.' },
            { q: 'How do evaporation, condensation, and precipitation work together?', note: 'Synthesises the whole process.' },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#5b8def] text-xs font-bold text-white">{i + 1}</span>
              <div className="text-sm">
                <div className="font-semibold text-[#1e3a5f]">{step.q}</div>
                <div className="text-slate-500 text-xs">{step.note}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3">Each <strong>follow-up question</strong> deepens understanding. If you
        stop at "what is the water cycle?" you get a surface answer. If you keep asking, you build
        a real mental model of how it works.</p>
        <p>Also: <strong>ask AI to explain unfamiliar terms</strong> instead of skipping past them.
        If an answer uses a word you do not understand, that is a follow-up question, not a reason
        to give up.</p>
      </TeachBlock>

      <DiscussBlock prompt="Think of a topic you are studying right now. What is one broad question you could ask about it, and what follow-up question would go deeper?">
        <p className="text-sm">If Michael struggles: "Pick any subject. What is the big idea? Now what is one piece of that idea you want to understand better?"</p>
        <p className="text-sm">If his follow-up is just a rewording of the first question: "That is the same question in different words. What would you ask to go one level deeper?"</p>
      </DiscussBlock>

      <TeachBlock title="Weak prompt vs. strong prompt" icon={FileSearch}>
        <p>A weak prompt gives you a generic answer. A strong prompt tells AI exactly what you
        need, at your level, with a way to check your understanding.</p>
        <div className="grid sm:grid-cols-2 gap-4 mt-3">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <Badge tone="rose">Weak prompt</Badge>
            <p className="mt-2 text-sm italic text-rose-800">"Tell me about the water cycle."</p>
            <p className="mt-2 text-xs text-rose-600">AI gives a generic encyclopedia answer. You do not know if it is at your level, and there is no way to check if you understood it.</p>
          </div>
          <div className="rounded-xl border border-teal-200 bg-[#d3f9f4] p-4">
            <Badge tone="teal">Strong prompt</Badge>
            <p className="mt-2 text-sm italic text-teal-800">
              "I am a Grade 8 student learning about the water cycle. I understand that water
              evaporates, but I am confused about how clouds form. Explain the process step by step
              using simple language. Define evaporation, condensation, and precipitation. Give a
              real-life example, then ask me three questions to check my understanding without
              showing the answers first."
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
          <strong>Why the strong prompt works — each part does something:</strong>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
            <li><strong>"Grade 8 student"</strong> — sets the level so the answer is not too simple or too advanced.</li>
            <li><strong>"I understand evaporation, but confused about clouds"</strong> — tells AI what to focus on and what to skip.</li>
            <li><strong>"Step by step, simple language"</strong> — asks for structure and clarity.</li>
            <li><strong>"Define key terms"</strong> — makes sure you do not get lost in vocabulary.</li>
            <li><strong>"Real-life example"</strong> — connects the idea to something you can picture.</li>
            <li><strong>"Ask me three questions, no answers first"</strong> — builds in an understanding check.</li>
          </ul>
        </div>
      </TeachBlock>

      {/* Live interaction: build a research prompt */}
      <div className="lesson-card">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-1">Try it: build your own research prompt</h2>
        <p className="text-sm text-slate-500 mb-4">
          Pick a school topic, say what you already know and what confuses you. We will assemble a
          strong prompt you can copy into any AI tool.
        </p>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">School topic</label>
            <input
              className="input-base"
              placeholder="e.g. volcanoes, fractions, the American Revolution"
              value={topic}
              onChange={(e) => { setTopic(e.target.value); setAnswer('s3-topic', e.target.value); }}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">What do you already understand about it?</label>
            <TextArea value={knows} onChange={(v) => { setKnows(v); setAnswer('s3-knows', v); }} placeholder="e.g. I know volcanoes are mountains that erupt" rows={2} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">What confuses you?</label>
            <TextArea value={confused} onChange={(v) => { setConfused(v); setAnswer('s3-confused', v); }} placeholder="e.g. I do not understand why pressure builds up inside" rows={2} />
          </div>
        </div>

        {topic && (
          <div className="mt-4 rounded-xl border border-[#5b8def]/30 bg-[#eaf1ff] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#1e3a5f]">Your assembled prompt</span>
              <CopyButton text={builtPrompt} />
            </div>
            <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">{builtPrompt}</pre>
            <p className="text-xs text-slate-500 mt-2">
              Copy this into your AI tool. We are not simulating an AI response here — use a real
              tool so you get a genuine answer you can verify.
            </p>
          </div>
        )}
      </div>

      {/* Improve a vague question */}
      <div className="lesson-card-tight">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-1">Improve this vague question</p>
        <p className="text-xs text-slate-500 mb-3">Rewrite the question so it is focused, specific, and includes an understanding check.</p>
        <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm italic text-rose-700 mb-3">
          Vague: "{vagueQ}"
        </div>
        <TextArea
          value={improvedQ}
          onChange={(v) => { setImprovedQ(v); setAnswer('s3-improved', v); }}
          placeholder="Write your improved version here…"
          rows={3}
        />
        <RevealAnswer label="Show a model improvement">
          <p className="italic">
            "I am a Grade 8 student learning about volcanoes. I know they erupt, but I do not
            understand why pressure builds up inside them. Explain step by step in simple language
            what happens inside a volcano before an eruption. Define 'magma' and 'lava.' Give a
            real example of a famous eruption, then ask me two questions to check my understanding
            without showing the answers first."
          </p>
          <p className="mt-2 text-xs text-slate-500">Compare this with yours. Did you set the level?
          Say what you already know? Ask for an explanation of the confusing part? Include an
          understanding check? You do not need to match this exactly — these are the parts that
          make a prompt strong.</p>
        </RevealAnswer>
      </div>

      {/* Verification */}
      <TeachBlock title="AI can be wrong — so check it" icon={ShieldCheck}>
        <p>AI can produce <strong>false information</strong>, misunderstand questions, or leave out
        important details. Sometimes it sounds confident even when it is wrong. This is called a
        <strong> hallucination</strong>, and it is why you must <strong>verify</strong> important
        claims.</p>
        <p>Here is a simple verification routine you can use any time AI gives you information that
        matters:</p>
        <StepList
          color="#14b8a6"
          steps={[
            <><strong>Identify the claim.</strong> What exactly is AI saying? Write it down.</>,
            <><strong>Find a credible source.</strong> A textbook, class notes, or a reputable educational website.</>,
            <><strong>Check the evidence.</strong> Does the source confirm the claim?</>,
            <><strong>Compare with another source</strong> if you can. Two trustworthy sources agreeing is stronger than one.</>,
            <><strong>Ask for help</strong> if reliable sources disagree or you cannot tell. A teacher is a great third opinion.</>,
          ]}
        />
        <p className="text-xs text-slate-500 mt-3">
          Good sources: your textbook, teacher-provided materials, reputable educational sites
          (e.g. BBC Bitesize, Khan Academy, National Geographic Kids). Be cautious with random
          websites, social media, or sources AI invents.
        </p>
      </TeachBlock>

      <div className="lesson-card-tight">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-2">Verification scenario</p>
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <Bot className="h-4 w-4 text-[#5b8def]" />
            <span className="font-semibold text-xs text-slate-500">AI said:</span>
          </div>
          <p className="italic">"Plants get their food from the soil through their roots. Photosynthesis is just how they make energy from sunlight, but it is not really their food."</p>
        </div>
        <p className="text-sm text-slate-600 mb-3">
          This sounds plausible, but it contains a significant error. <strong>How would you check it?</strong>
        </p>
        <div className="space-y-2">
          {[
            { id: 'trust', label: 'It sounds right, so I would trust it and move on' },
            { id: 'ask', label: 'I would ask AI again and see if it says the same thing' },
            { id: 'source', label: 'I would check my science textbook or a reputable educational source about photosynthesis' },
            { id: 'ignore', label: 'I would ignore the claim and not use it' },
          ].map((o) => (
            <button
              key={o.id}
              onClick={() => { setVerifyChoice(o.id); setAnswer('s3-verify', o.id); }}
              className={`choice-btn ${verifyChoice === o.id ? 'choice-btn-selected' : ''}`}
            >
              {o.label}
            </button>
          ))}
        </div>
        {verifyChoice && (
          <FeedbackCard
            show
            correct={verifyChoice === 'source'}
            title={verifyChoice === 'source' ? 'That is the right approach' : 'That approach has a problem'}
          >
            {verifyChoice === 'source' && (
              <>Yes. The claim mixes up two things. Plants <em>do</em> take in water and minerals
              through roots, but their <strong>food (glucose) is made by photosynthesis</strong>
              from carbon dioxide and water using sunlight energy. Your textbook will confirm that
              photosynthesis is how plants make their food — not just "energy." Checking a trusted
              source catches this kind of subtle error.</>
            )}
            {verifyChoice === 'trust' && (
              <>Sounding right is not the same as being right. AI can be confidently wrong. If a
              claim matters for your learning, check it against a trusted source — especially when
              it sounds simple and obvious, because those are the errors that slip past us.</>
            )}
            {verifyChoice === 'ask' && (
              <>Asking AI again can sometimes help, but AI can repeat the same error. It is not an
              independent check. Use a source outside the AI — a textbook, notes, or a reputable
              educational site — to verify.</>
            )}
            {verifyChoice === 'ignore' && (
              <>Ignoring it is safer than trusting it, but you also lose the chance to learn the
              correct idea. Verify against a trusted source so you know what is actually true.</>
            )}
          </FeedbackCard>
        )}
        {verifyChoice && (
          <RevealAnswer label="See the worked verification">
            <p><strong>Claim:</strong> "Photosynthesis is not really the plant's food; plants get food from the soil."</p>
            <p className="mt-2"><strong>Source checked:</strong> Grade 8 science textbook, section on plant nutrition.</p>
            <p className="mt-1"><strong>Evidence:</strong> The textbook states that photosynthesis produces glucose, which is the plant's food. Roots take in water and mineral nutrients, but not "food" in the sense of energy-providing glucose.</p>
            <p className="mt-1"><strong>Conclusion:</strong> The AI claim is misleading. Photosynthesis <em>is</em> how plants make their food. Correct your notes.</p>
          </RevealAnswer>
        )}
      </div>

      <MistakeCallout>
        Treating AI as a search engine that always returns facts. AI generates text that
        <em> sounds</em> right — it does not look things up the way a search engine does. That is
        why verification matters, especially for anything you will be tested on.
      </MistakeCallout>

      <SectionNav />
    </div>
  );
}

export function Section4() {
  const { setAnswer } = useLesson();
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);
  const [summaryAttempt, setSummaryAttempt] = useState('');

  const passage = `Photosynthesis is the process by which green plants make their own food. It happens mainly in the leaves, inside tiny structures called chloroplasts. The plant uses sunlight energy, carbon dioxide from the air, and water from the soil. A green pigment called chlorophyll captures the sunlight. During the process, the plant converts carbon dioxide and water into glucose, which it uses for energy and growth. Oxygen is released as a waste product. Photosynthesis is important because it provides food for almost all living things and releases the oxygen we breathe.`;

  const allPoints = [
    { id: 'p1', text: 'Photosynthesis is how green plants make their own food.', essential: true },
    { id: 'p2', text: 'It happens mainly in the leaves, inside chloroplasts.', essential: true },
    { id: 'p3', text: 'The plant uses sunlight, carbon dioxide, and water.', essential: true },
    { id: 'p4', text: 'Chlorophyll is a green pigment that captures sunlight.', essential: true },
    { id: 'p5', text: 'Carbon dioxide and water are converted into glucose.', essential: true },
    { id: 'p6', text: 'Oxygen is released as a waste product.', essential: true },
    { id: 'p7', text: 'The word "photosynthesis" comes from Greek roots.', essential: false },
    { id: 'p8', text: 'Leaves are usually green.', essential: false },
    { id: 'p9', text: 'Photosynthesis provides food for almost all living things and releases oxygen.', essential: true },
    { id: 'p10', text: 'Plants also have roots.', essential: false },
  ];

  const toggle = (id: string) =>
    setSelectedPoints((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const essentialIds = allPoints.filter((p) => p.essential).map((p) => p.id);
  const correctCount = selectedPoints.filter((id) => essentialIds.includes(id)).length;
  const wrongCount = selectedPoints.filter((id) => !essentialIds.includes(id)).length;
  const missedCount = essentialIds.filter((id) => !selectedPoints.includes(id)).length;

  return (
    <div className="space-y-6">
      <SectionHeader num={4} title="Summarisation: Turn Information into Useful Notes" minutes={15} subtitle="Shorter is not always better — the right notes preserve meaning." />

      <TeachBlock title="What is a summary?" icon={FileSearch}>
        <p>A <strong>summary</strong> is a shorter version of information that preserves the
        <strong> central ideas and important supporting details</strong>. A good summary is not
        just short — it is <em>faithful</em>. It keeps the meaning intact.</p>
        <p>There is a big difference between these four things:</p>
        <div className="space-y-2 mt-2">
          {[
            { label: 'Copying a paragraph', desc: 'Not a summary. No thinking, no selection.', tone: 'rose' },
            { label: 'Removing a few words', desc: 'Barely different. You have not identified what matters.', tone: 'rose' },
            { label: 'Rewriting the main ideas clearly', desc: 'Better — but have you kept the important details?', tone: 'yellow' },
            { label: 'Revision notes that help you remember and explain', desc: 'This is the goal. Main idea + key details, in your own clear words.', tone: 'teal' },
          ].map((r, i) => (
            <div key={i} className={`rounded-lg p-3 text-sm border ${
              r.tone === 'rose' ? 'bg-rose-50 border-rose-200' :
              r.tone === 'yellow' ? 'bg-amber-50 border-amber-200' :
              'bg-[#d3f9f4] border-teal-200'
            }`}>
              <span className="font-semibold">{r.label}:</span> <span className="text-slate-700">{r.desc}</span>
            </div>
          ))}
        </div>
      </TeachBlock>

      <TeachBlock title="The summarisation process" icon={Lightbulb}>
        <StepList
          color="#5b8def"
          steps={[
            <><strong>Understand the original information.</strong> Read it fully first.</>,
            <><strong>Identify the main idea.</strong> What is this mostly about?</>,
            <><strong>Select essential supporting points.</strong> Which details do you need to understand the main idea?</>,
            <><strong>Remove repetition and irrelevant details.</strong> Cut what does not help understanding.</>,
            <><strong>Rewrite in clear language.</strong> Use your own words.</>,
            <><strong>Check that the meaning has not changed.</strong> Compare with the original.</>,
            <><strong>Test whether the notes make sense alone</strong> — without the original text.</>,
          ]}
        />
      </TeachBlock>

      <TeachBlock title="Worked example: three versions of one passage">
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 mb-3">
          <Badge tone="slate">Original passage (Grade 8 science)</Badge>
          <p className="mt-2">{passage}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm">
            <Badge tone="rose">Poor summary</Badge>
            <p className="mt-2 text-rose-800">"Plants make food using sunlight and chlorophyll. Oxygen comes out."</p>
            <p className="mt-2 text-xs text-rose-600">This leaves out carbon dioxide, water, glucose, chloroplasts, and why photosynthesis matters. It is too short and lost the meaning.</p>
          </div>
          <div className="rounded-xl border border-teal-200 bg-[#d3f9f4] p-4 text-sm">
            <Badge tone="teal">Strong summary</Badge>
            <p className="mt-2 text-teal-800">
              "Photosynthesis is how green plants make food (glucose) in their leaves' chloroplasts.
              Chlorophyll captures sunlight, which powers the conversion of carbon dioxide and water
              into glucose. Oxygen is released as a by-product. It matters because it feeds nearly
              all living things and produces the oxygen we breathe."
            </p>
            <p className="mt-2 text-xs text-teal-600">Main idea, key inputs, key output, location, and significance — all preserved in fewer words.</p>
          </div>
        </div>
      </TeachBlock>

      {/* Interactive: select important points */}
      <div className="lesson-card">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-1">Try it: pick the important points</h2>
        <p className="text-sm text-slate-500 mb-4">
          Read the passage above, then select the points that belong in good revision notes. Leave
          out details that do not help you understand photosynthesis.
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {allPoints.map((p) => {
            const selected = selectedPoints.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                className={`text-left rounded-xl border-2 p-3 text-sm transition ${
                  selected
                    ? 'border-[#5b8def] bg-[#eaf1ff] text-[#1e3a5f]'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="flex items-start gap-2">
                  <span className={`flex h-5 w-5 flex-none items-center justify-center rounded-md text-xs mt-0.5 ${
                    selected ? 'bg-[#5b8def] text-white' : 'bg-slate-100 text-slate-400'
                  }`}>{selected ? '✓' : ''}</span>
                  <span>{p.text}</span>
                </span>
              </button>
            );
          })}
        </div>
        {selectedPoints.length > 0 && (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-[#1e3a5f] mb-2">Your selection:</p>
            <ul className="space-y-1 text-slate-600">
              <li>Correct essential points selected: <strong className="text-emerald-600">{correctCount}</strong> of {essentialIds.length}</li>
              <li>Non-essential points selected: <strong className={wrongCount > 0 ? 'text-amber-600' : 'text-emerald-600'}>{wrongCount}</strong></li>
              <li>Essential points missed: <strong className={missedCount > 0 ? 'text-amber-600' : 'text-emerald-600'}>{missedCount}</strong></li>
            </ul>
            {correctCount === essentialIds.length && wrongCount === 0 ? (
              <p className="mt-2 text-emerald-700 text-sm">Excellent — you kept every essential point and left out the rest.</p>
            ) : (
              <p className="mt-2 text-amber-700 text-sm">
                {missedCount > 0 && 'You missed some essential points — your notes would have gaps. '}
                {wrongCount > 0 && 'Some points you picked do not help explain the topic — they add clutter. '}
                Try adjusting your selection.
              </p>
            )}
          </div>
        )}
      </div>

      <TeachBlock title="AI-assisted summarisation" icon={Bot}>
        <p>You can ask AI to help turn material into revision notes. Here is a strong prompt:</p>
        <ExampleCallout tone="blue" label="Summarisation prompt">
          <p className="italic">
            "I am a Grade 8 student studying [TOPIC]. Help me turn the material I provide into useful
            revision notes. Identify the main idea, five important points, key vocabulary with
            definitions, and one example. Do not change the meaning of the original material. Identify
            anything important that is unclear or missing. Then give me three questions to test my
            understanding. Do not show the answers until I have tried."
          </p>
        </ExampleCallout>
        <p className="mt-3">After AI gives you notes, you must <strong>compare them with the original
        source</strong>. Why? Because:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm mt-1">
          <li>AI might leave out something important.</li>
          <li>AI might change the meaning slightly when rewording.</li>
          <li>AI might add something that was not in the original.</li>
        </ul>
        <p className="mt-2"><strong>Shorter does not always mean better.</strong> Notes must preserve
        the information needed to understand the topic. Cutting too much is just as bad as keeping
        too much — just in the opposite direction.</p>
      </TeachBlock>

      {/* Practice */}
      <div className="lesson-card-tight">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-1">Practice: write your own summary</p>
        <p className="text-xs text-slate-500 mb-3">
          Using the photosynthesis passage above, write a summary in your own words. Aim for the
          main idea and the key details — not every word.
        </p>
        <TextArea
          value={summaryAttempt}
          onChange={(v) => { setSummaryAttempt(v); setAnswer('s4-summary', v); }}
          placeholder="Write your summary here…"
          rows={4}
        />
        <RevealAnswer label="Compare with a model answer">
          <p>
            "Photosynthesis is how green plants make glucose (their food) in chloroplasts in their
            leaves. Chlorophyll captures sunlight energy, which powers the reaction of carbon dioxide
            and water into glucose. Oxygen is released as a by-product. This process feeds nearly all
            living things and produces the oxygen we breathe."
          </p>
          <p className="mt-2 text-xs text-slate-500">Check yours: did you include the main idea, the
          key inputs (sunlight, CO₂, water), the output (glucose + oxygen), where it happens
          (chloroplasts/leaves), and why it matters? If you missed any, that is fine — note which
          ones and try again.</p>
        </RevealAnswer>
      </div>

      <SectionNav />
    </div>
  );
}
