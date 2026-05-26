import { useEffect, useRef, useState } from 'react';
import type { AgentNode } from '../resumeData';

type InViewOptions = IntersectionObserverInit;

export function useInView(opts: InViewOptions = { rootMargin: '0px 0px -10% 0px', threshold: 0.18 }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      });
    }, opts);

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, opts]);

  return [ref, inView] as const;
}

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  enabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollReveal({ children, delay = 0, y = 24, enabled = true, className = '', style = {} }: ScrollRevealProps) {
  const [ref, inView] = useInView();
  if (!enabled) return <div ref={ref} className={className} style={style}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 720ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 720ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  enabled?: boolean;
}

export function CountUp({ value, prefix = '', suffix = '', duration = 1400, enabled = true }: CountUpProps) {
  const [ref, inView] = useInView();
  const [n, setN] = useState(enabled ? 0 : value);

  useEffect(() => {
    if (!enabled || !inView) return;

    let raf = 0;
    const start = performance.now();
    const tick = (time: number) => {
      const progress = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, enabled]);

  const display = value >= 10 || Number.isInteger(value) ? Math.round(n).toLocaleString() : n.toFixed(1);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

export function useTilt<T extends HTMLElement>(maxDeg = 6, enabled = true) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let raf: number | null = null;
    let tx = 0;
    let ty = 0;
    let ttx = 0;
    let tty = 0;

    const loop = () => {
      tx += (ttx - tx) * 0.12;
      ty += (tty - ty) * 0.12;
      el.style.transform = `perspective(900px) rotateX(${tx.toFixed(2)}deg) rotateY(${ty.toFixed(2)}deg)`;
      if (Math.abs(ttx - tx) > 0.05 || Math.abs(tty - ty) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };

    const onMove = (event: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width;
      const y = (event.clientY - r.top) / r.height;
      ttx = (y - 0.5) * -2 * maxDeg;
      tty = (x - 0.5) * 2 * maxDeg;
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      ttx = 0;
      tty = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [maxDeg, enabled]);

  return ref;
}

interface SpotlightProps {
  enabled?: boolean;
  color?: string;
}

export function Spotlight({ enabled = true, color = 'rgba(110, 231, 183, 0.18)' }: SpotlightProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (event: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty('--sx', `${event.clientX - r.left}px`);
      el.style.setProperty('--sy', `${event.clientY - r.top}px`);
      el.style.opacity = '1';
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `radial-gradient(620px circle at var(--sx,50%) var(--sy,50%), ${color}, transparent 55%)`,
        opacity: 0,
        transition: 'opacity 320ms ease',
        zIndex: 1,
        mixBlendMode: 'screen',
      }}
    />
  );
}

interface RoleRotatorProps {
  words: string[];
  enabled?: boolean;
  intervalMs?: number;
  typeMs?: number;
}

export function RoleRotator({ words, enabled = true, intervalMs = 2600, typeMs = 50 }: RoleRotatorProps) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState(words[0] || '');
  const [phase, setPhase] = useState<'hold' | 'out' | 'in'>('hold');

  useEffect(() => {
    if (!enabled) {
      setText(words[0] || '');
      return;
    }
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('out'), intervalMs);
    } else if (phase === 'out') {
      if (text.length === 0) {
        setIdx((i) => (i + 1) % words.length);
        setPhase('in');
      } else {
        timeout = setTimeout(() => setText(text.slice(0, -1)), typeMs * 0.6);
      }
    } else {
      const target = words[idx];
      if (text.length === target.length) {
        setPhase('hold');
      } else {
        timeout = setTimeout(() => setText(target.slice(0, text.length + 1)), typeMs);
      }
    }
    return () => clearTimeout(timeout);
  }, [phase, text, idx, enabled, intervalMs, typeMs, words]);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <span>{text}</span>
      <span aria-hidden className="role-rotator-cursor" />
    </span>
  );
}

interface TechMarqueeProps {
  items: string[];
  enabled?: boolean;
  speed?: number;
}

export function TechMarquee({ items, enabled = true, speed = 60 }: TechMarqueeProps) {
  if (!enabled) return null;
  const doubled = [...items, ...items];
  return (
    <div className="tech-marquee" aria-hidden>
      <div className="tech-marquee-fade tech-marquee-fade-l" />
      <div className="tech-marquee-fade tech-marquee-fade-r" />
      <div className="tech-marquee-track" style={{ animationDuration: `${Math.max(20, items.length * (60 / speed) * 2.2)}s` }}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="tech-marquee-item">
            <span className="tech-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

interface AgentNetworkProps {
  agents: AgentNode[];
  enabled?: boolean;
  size?: number;
}

export function AgentNetwork({ agents, enabled = true, size = 420 }: AgentNetworkProps) {
  const reqRef = useRef<number>();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();
    const loop = (now: number) => {
      setT((now - start) / 1000);
      reqRef.current = requestAnimationFrame(loop);
    };
    reqRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.4;
  const nodes = agents.map((agent, i) => {
    const angle = (i / agents.length) * Math.PI * 2 + t * 0.05;
    return {
      ...agent,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="agent-network" aria-label="Actual CTO agents network" role="img">
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(110,231,183,0.55)" />
          <stop offset="60%" stopColor="rgba(110,231,183,0.10)" />
          <stop offset="100%" stopColor="rgba(110,231,183,0)" />
        </radialGradient>
        <filter id="agentGlow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="rgba(110,231,183,0.10)" strokeDasharray="2 4" />
      <circle cx={cx} cy={cy} r={r * 0.6} fill="none" stroke="rgba(110,231,183,0.06)" />
      <circle cx={cx} cy={cy} r={48} fill="url(#hubGlow)" />
      {nodes.map((node, i) => {
        const pulse = (Math.sin(t * 2 + i * 0.6) + 1) / 2;
        return (
          <line
            key={`l-${node.name}`}
            x1={cx}
            y1={cy}
            x2={node.x}
            y2={node.y}
            stroke={node.color}
            strokeOpacity={0.08 + pulse * 0.22}
            strokeWidth={0.9}
          />
        );
      })}
      {nodes.map((node, i) => {
        const pulse = (Math.sin(t * 2 + i * 0.6) + 1) / 2;
        return (
          <g key={`n-${node.name}`} filter="url(#agentGlow)">
            <circle cx={node.x} cy={node.y} r={6 + pulse * 2.5} fill={node.color} opacity={0.45 + pulse * 0.5} />
            <circle cx={node.x} cy={node.y} r={2.4} fill="#0b1714" />
            <text x={node.x} y={node.y - 12} textAnchor="middle" fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize={9} fill="rgba(220,255,240,0.78)" letterSpacing="1.2" style={{ textTransform: 'uppercase' }}>
              {node.name}
            </text>
          </g>
        );
      })}
      <g>
        <circle cx={cx} cy={cy} r={14} fill="#0b1714" stroke="rgba(110,231,183,0.65)" />
        <text x={cx} y={cy + 3} textAnchor="middle" fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize={10} fill="#6ee7b7" fontWeight="700">
          CTO
        </text>
      </g>
    </svg>
  );
}

interface SideProgressProps {
  sections: { id: string; label: string }[];
  enabled?: boolean;
}

export function SideProgress({ sections, enabled = true }: SideProgressProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      const offsets = sections.map((section) => {
        const el = document.getElementById(section.id);
        if (!el) return Infinity;
        const rect = el.getBoundingClientRect();
        return Math.abs(rect.top - 180);
      });
      const min = Math.min(...offsets);
      setActive(offsets.indexOf(min));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections, enabled]);

  if (!enabled) return null;
  return (
    <nav className="side-progress" aria-label="Section navigation">
      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`side-progress-dot ${i === active ? 'is-active' : ''}`}
          onClick={(event) => {
            event.preventDefault();
            const el = document.getElementById(section.id);
            if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
          }}
        >
          <span className="side-progress-label">{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
