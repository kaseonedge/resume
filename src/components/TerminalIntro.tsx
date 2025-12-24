import React, { useState, useEffect, useRef, useCallback } from 'react';
import { animate, stagger } from 'animejs';
import '../styles/terminal-animations.css';

interface TerminalIntroProps {
  onComplete: () => void;
}

// Terminal content with types for better control
type LineType = 'aws' | 'command' | 'output' | 'empty';

interface TerminalLine {
  type: LineType;
  content: string;
}

// The terminal content with explicit types
const TERMINAL_CONTENT: TerminalLine[] = [
  { type: 'aws', content: 'on arn:aws:eks:us-east-1:123456789012:cluster/prod ~ on main [!+?] is 📦 v1.0.0' },
  { type: 'command', content: '❯ helm repo add jfritz https://jonathonfritz.github.io/resume/' },
  { type: 'output', content: '"jfritz" has been added to your repositories' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ helm install resume jfritz/resume' },
  { type: 'output', content: 'NAME: resume' },
  { type: 'output', content: 'LAST DEPLOYED: Tue Mar 04 14:35:21 2025' },
  { type: 'output', content: 'NAMESPACE: default' },
  { type: 'output', content: 'STATUS: deployed' },
  { type: 'output', content: 'REVISION: 1' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ kubectl get pod -l app=resume' },
  { type: 'output', content: 'NAME                      READY     STATUS    RESTARTS   AGE' },
  { type: 'output', content: 'resume-6f7d9c7b8d-x2zs1   1/1       Running   0          42s' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ kubectl port-forward resume-6f7d9c7b8d-x2zs1 8080:80' },
  { type: 'output', content: 'Forwarding from 127.0.0.1:8080 -> 80' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ open http://localhost:8080' }
];

// Floating particle component
const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Draw connection lines between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

// Connection establishing animation
const ConnectionAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll('.connect-line');
    const status = containerRef.current.querySelector('.connect-status');

    // Animate connection lines
    animate(lines, {
      scaleX: [0, 1],
      opacity: [0, 1],
      delay: stagger(150),
      duration: 400,
      ease: 'outExpo',
    });

    // Animate status text
    setTimeout(() => {
      if (status) {
        animate(status, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 500,
          ease: 'outExpo',
        });
      }
    }, 600);

    // Complete after animation
    setTimeout(onComplete, 1500);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center gap-4">
      <div className="text-emerald-400 text-sm font-mono mb-4 opacity-60">
        ESTABLISHING SECURE CONNECTION
      </div>
      <div className="flex flex-col gap-2 w-64">
        <div className="connect-line h-1 bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20 rounded origin-left" style={{ transform: 'scaleX(0)' }} />
        <div className="connect-line h-1 bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20 rounded origin-left" style={{ transform: 'scaleX(0)' }} />
        <div className="connect-line h-1 bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20 rounded origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
      <div className="connect-status text-emerald-400 text-xs font-mono mt-4 opacity-0">
        ✓ CONNECTION ESTABLISHED
      </div>
    </div>
  );
};

const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete }) => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [completedLines, setCompletedLines] = useState<string[]>([TERMINAL_CONTENT[0].content]);
  const [currentLine, setCurrentLine] = useState<string>('');
  const [contentIndex, setContentIndex] = useState(1);
  const [showCursor, setShowCursor] = useState(true);

  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalWindowRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isMobile = useRef(window.innerWidth < 768);

  const getTypingSpeed = useCallback(() => isMobile.current ? 70 : 50, []);
  const getLineDelay = useCallback(() => isMobile.current ? 250 : 150, []);

  // Show terminal after connection animation
  const handleConnectionComplete = useCallback(() => {
    setShowTerminal(true);
  }, []);

  // Animate terminal window entrance
  useEffect(() => {
    if (showTerminal && terminalWindowRef.current) {
      animate(terminalWindowRef.current, {
        scale: [0.9, 1],
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        ease: 'outExpo',
      });

      // Animate header dots
      const dots = terminalWindowRef.current.querySelectorAll('.terminal-dot');
      animate(dots, {
        scale: [0, 1],
        delay: stagger(100, { start: 300 }),
        duration: 400,
        ease: 'outElastic(1, 0.5)',
      });
    }
  }, [showTerminal]);

  useEffect(() => {
    document.body.classList.add('terminal-active');
    return () => document.body.classList.remove('terminal-active');
  }, []);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const addTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(callback);
      } else {
        callback();
      }
    }, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  useEffect(() => {
    if (!terminalRef.current) return;
    const scrollTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTo({
            top: terminalRef.current.scrollHeight,
            behavior: isMobile.current ? 'auto' : 'smooth'
          });
        }
      });
    }, 10);
    return () => clearTimeout(scrollTimeout);
  }, [completedLines, currentLine]);

  useEffect(() => {
    const id = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => clearTimeouts, []);

  useEffect(() => {
    const handleResize = () => { isMobile.current = window.innerWidth < 768; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main animation logic - only start when terminal is shown
  useEffect(() => {
    if (!showTerminal) return;

    if (contentIndex >= TERMINAL_CONTENT.length) {
      addTimeout(() => onComplete(), 2000);
      return;
    }

    const line = TERMINAL_CONTENT[contentIndex];

    if (line.type === 'command') {
      setCurrentLine('');
      let charIndex = 0;
      const content = line.content;
      const typingSpeed = getTypingSpeed();

      const typeNextChar = () => {
        if (charIndex <= content.length) {
          setCurrentLine(content.substring(0, charIndex));
          charIndex++;

          if (charIndex <= content.length) {
            addTimeout(typeNextChar, typingSpeed);
          } else {
            addTimeout(() => {
              setCompletedLines(prev => [...prev, content]);
              setCurrentLine('');

              if (content.includes('helm install')) {
                addTimeout(() => setContentIndex(prev => prev + 1), isMobile.current ? 2500 : 3500);
              } else {
                setContentIndex(prev => prev + 1);
              }
            }, 400);
          }
        }
      };

      addTimeout(typeNextChar, 400);
    }
    else if (line.type === 'output') {
      addTimeout(() => {
        setCompletedLines(prev => [...prev, line.content]);
        addTimeout(() => setContentIndex(prev => prev + 1), getLineDelay());
      }, 16);
    }
    else if (line.type === 'empty') {
      addTimeout(() => {
        setCompletedLines(prev => [...prev, '']);
        addTimeout(() => setContentIndex(prev => prev + 1), getLineDelay() / 2);
      }, 16);
    }
  }, [contentIndex, onComplete, getTypingSpeed, getLineDelay, showTerminal]);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50 p-2 sm:p-4 overscroll-none hw-accelerated overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, #0a0a0a 70%)',
        }}
      />

      {/* Connection animation or Terminal */}
      {!showTerminal ? (
        <ConnectionAnimation onComplete={handleConnectionComplete} />
      ) : (
        <div
          ref={terminalWindowRef}
          className="w-full max-w-[1050px] bg-[#0d0d0d] text-gray-400 rounded-lg font-mono text-xs sm:text-sm md:text-base overflow-hidden shadow-2xl border border-emerald-500/20 flex flex-col hw-accelerated"
          style={{ opacity: 0 }}
        >
          {/* Terminal header with animated dots */}
          <div className="terminal-header flex items-center justify-between p-2 sm:p-3 bg-[#111111] border-b border-emerald-500/10 flex-shrink-0">
            <div className="flex space-x-2">
              <div className="terminal-dot w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full" style={{ transform: 'scale(0)' }}></div>
              <div className="terminal-dot w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full" style={{ transform: 'scale(0)' }}></div>
              <div className="terminal-dot w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full" style={{ transform: 'scale(0)' }}></div>
            </div>
            <div className="text-xs sm:text-sm text-emerald-500/60 font-medium tracking-wider">
              jfritz@cluster ~ kubectl
            </div>
            <div className="w-2 h-2 sm:w-3 sm:h-3"></div>
          </div>

          <div
            ref={terminalRef}
            className="terminal-content h-[70vh] overflow-y-auto p-4 bg-[#0d0d0d] rounded terminal-scrollbar overscroll-none will-change-transform flex-grow"
            style={{
              WebkitOverflowScrolling: 'touch',
              transform: 'translateZ(0)',
              position: 'relative'
            }}
          >
            <div className="absolute inset-0 p-4">
              {completedLines.map((line, i) => (
                <div
                  key={`line-${i}`}
                  className={`terminal-text ${line === '' ? 'mb-2' : 'mb-0'} ${line.startsWith('❯') ? 'text-emerald-400' : line.includes('STATUS: deployed') ? 'text-green-400' : ''}`}
                >
                  {line}
                </div>
              ))}

              {currentLine && (
                <div className="terminal-text text-emerald-400">
                  {currentLine}
                  {showCursor && <span className="inline-block w-2 h-4 bg-emerald-500 ml-0.5 cursor-blink"></span>}
                </div>
              )}

              {!currentLine && contentIndex >= TERMINAL_CONTENT.length && (
                <div className="terminal-text">
                  <span className="inline-block w-2 h-4 bg-emerald-500 ml-0.5 cursor-blink"></span>
                </div>
              )}

              <div style={{ height: '30vh' }}></div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          clearTimeouts();
          onComplete();
        }}
        className="fixed bottom-6 right-6 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-md transition-all duration-200 border border-emerald-500/30 hover:border-emerald-500/50 touch-manipulation backdrop-blur-sm"
      >
        Skip Intro
      </button>
    </div>
  );
};

export default TerminalIntro;
