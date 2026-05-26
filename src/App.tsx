import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import TerminalIntro from './components/TerminalIntro';
import PrintResume from './components/PrintResume';
import EnhancedHero from './components/EnhancedHero';
import { EnhancedEducation, EnhancedExperience, EnhancedGitHubHeatmap, EnhancedProjects, EnhancedSkills } from './components/EnhancedSections';
import { SideProgress, TechMarquee } from './components/ResumeEffects';
import { resumeData } from './resumeData';

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'education', label: 'Education' },
];

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printContainerRef = useRef<HTMLDivElement | null>(null);

  const downloadPDF = async () => {
    if (isGeneratingPDF) return;
    setIsGeneratingPDF(true);

    try {
      const container = document.createElement('div');
      container.style.cssText = 'position:absolute;left:0;top:0;width:816px;height:1056px;overflow:hidden;visibility:hidden;pointer-events:none;z-index:-1;';
      document.body.appendChild(container);
      printContainerRef.current = container;

      const root = createRoot(container);
      root.render(<PrintResume />);

      await new Promise(resolve => setTimeout(resolve, 400));

      const html2pdf = (await import('html2pdf.js')).default;
      const source = container.querySelector('#resume-pdf-page') as HTMLElement;
      if (!source) throw new Error('PDF content not found');

      const opt = {
        margin: [0, 0, 0, 0] as [number, number, number, number],
        filename: 'Jonathon-Fritz-Resume.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 816,
          windowHeight: 1056,
        },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait' as const,
        },
      };

      await html2pdf().set(opt).from(source).save();

      root.unmount();
      document.body.removeChild(container);
      printContainerRef.current = null;
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    const skipIntro = new URLSearchParams(window.location.search).get('skipIntro');
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

    if (skipIntro === 'true' || hasSeenIntro) {
      setShowIntro(false);
      setShowContent(true);
      sessionStorage.setItem('hasSeenIntro', 'true');
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
    setTimeout(() => setShowContent(true), 300);
  };

  return (
    <>
      {showIntro && !showContent && <TerminalIntro onComplete={handleIntroComplete} />}

      {showContent && (
        <div className="resume-root fade-in">
          <SideProgress sections={SECTIONS} enabled />
          <div className="resume-shell">
            <EnhancedHero />
            <TechMarquee items={resumeData.techMarquee} enabled speed={50} />

            <main className="resume-main">
              <div className="resume-grid">
                <aside className="resume-side">
                  <EnhancedSkills />
                </aside>
                <div className="resume-flow">
                  <EnhancedExperience />
                  <EnhancedGitHubHeatmap />
                  <EnhancedProjects />
                  <EnhancedEducation />
                </div>
              </div>
            </main>

            <footer className="resume-footer">
              <div className="footer-row">
                <span className="footer-copy">© {new Date().getFullYear()} {resumeData.name}</span>
                <span className="footer-stamp">
                  <span className="footer-stamp-dot" />
                  <span>built on bare metal · deployed via gitops</span>
                </span>
                <button onClick={downloadPDF} disabled={isGeneratingPDF} className="pdf-button">
                  {isGeneratingPDF ? 'Generating PDF…' : 'Download PDF'}
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
