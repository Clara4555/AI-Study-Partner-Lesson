import { LessonProvider, useLesson } from './lesson/LessonContext';
import { Sidebar } from './lesson/Navigation';
import { Section1, Section2 } from './lesson/Sections1_2';
import { Section3, Section4 } from './lesson/Sections3_4';
import { Section5, Section6 } from './lesson/Sections5_6';
import { Section7, Section8 } from './lesson/Sections7_8';
import { Section9, Section10, Section11 } from './lesson/Sections9_11';

function LessonContent() {
  const { currentSection } = useLesson();

  const render = () => {
    switch (currentSection) {
      case 'welcome': return <Section1 />;
      case 'capabilities': return <Section2 />;
      case 'research': return <Section3 />;
      case 'summarisation': return <Section4 />;
      case 'revision': return <Section5 />;
      case 'grace': return <Section6 />;
      case 'sprint': return <Section7 />;
      case 'plan': return <Section8 />;
      case 'assessment': return <Section9 />;
      case 'assignment': return <Section10 />;
      case 'tutor': return <Section11 />;
      default: return <Section1 />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f8fc]">
      <Sidebar />
      <main className="min-h-[calc(100vh-7rem)] w-full flex-1 px-4 py-6 sm:px-8 sm:py-10 xl:px-12 2xl:px-20">
        <div key={currentSection} className="mx-auto w-full max-w-[1600px] animate-fade-in">
          {render()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LessonProvider>
      <LessonContent />
    </LessonProvider>
  );
}
