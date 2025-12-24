import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Code2, 
  Server, 
  Shield, 
  Link2, 
  Users,
  Cpu,
  Terminal
} from 'lucide-react';

interface Skill {
  category: string;
  skills: string[];
}

interface SkillsProps {
  skills: Skill[];
}

const getCategoryIcon = (category: string) => {
  const lower = category.toLowerCase();
  if (lower.includes('ai') || lower.includes('agent')) return <Brain className="w-4 h-4" />;
  if (lower.includes('systems') || lower.includes('programming')) return <Terminal className="w-4 h-4" />;
  if (lower.includes('infrastructure') || lower.includes('devops')) return <Server className="w-4 h-4" />;
  if (lower.includes('observability') || lower.includes('security')) return <Shield className="w-4 h-4" />;
  if (lower.includes('blockchain') || lower.includes('web3')) return <Link2 className="w-4 h-4" />;
  if (lower.includes('leadership') || lower.includes('open source')) return <Users className="w-4 h-4" />;
  return <Code2 className="w-4 h-4" />;
};

const getCategoryColor = (category: string): string => {
  const lower = category.toLowerCase();
  if (lower.includes('ai') || lower.includes('agent')) return 'from-purple-500/20 to-purple-900/10 border-purple-500/30';
  if (lower.includes('systems') || lower.includes('programming')) return 'from-orange-500/20 to-orange-900/10 border-orange-500/30';
  if (lower.includes('infrastructure') || lower.includes('devops')) return 'from-blue-500/20 to-blue-900/10 border-blue-500/30';
  if (lower.includes('observability') || lower.includes('security')) return 'from-emerald-500/20 to-emerald-900/10 border-emerald-500/30';
  if (lower.includes('blockchain') || lower.includes('web3')) return 'from-cyan-500/20 to-cyan-900/10 border-cyan-500/30';
  if (lower.includes('leadership') || lower.includes('open source')) return 'from-amber-500/20 to-amber-900/10 border-amber-500/30';
  return 'from-zinc-500/20 to-zinc-900/10 border-zinc-500/30';
};

const getCategoryIconColor = (category: string): string => {
  const lower = category.toLowerCase();
  if (lower.includes('ai') || lower.includes('agent')) return 'text-purple-400 bg-purple-500/20';
  if (lower.includes('systems') || lower.includes('programming')) return 'text-orange-400 bg-orange-500/20';
  if (lower.includes('infrastructure') || lower.includes('devops')) return 'text-blue-400 bg-blue-500/20';
  if (lower.includes('observability') || lower.includes('security')) return 'text-emerald-400 bg-emerald-500/20';
  if (lower.includes('blockchain') || lower.includes('web3')) return 'text-cyan-400 bg-cyan-500/20';
  if (lower.includes('leadership') || lower.includes('open source')) return 'text-amber-400 bg-amber-500/20';
  return 'text-zinc-400 bg-zinc-500/20';
};

const getSkillVariant = (skill: string, category: string): "default" | "rust" | "ai" | "infra" | "secondary" => {
  const lowerSkill = skill.toLowerCase();
  const lowerCategory = category.toLowerCase();
  
  // Category-based variants
  if (lowerCategory.includes('ai') || lowerCategory.includes('agent')) return 'ai';
  if (lowerCategory.includes('systems')) return 'rust';
  if (lowerCategory.includes('infrastructure')) return 'infra';
  
  // Skill-based overrides
  if (['rust', 'tokio', 'axum'].some(t => lowerSkill.includes(t))) return 'rust';
  if (['mcp', 'claude', 'gpt', 'gemini'].some(t => lowerSkill.includes(t))) return 'ai';
  if (['kubernetes', 'talos', 'argocd'].some(t => lowerSkill.includes(t))) return 'infra';
  
  return 'secondary';
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const cards = containerRef.current?.querySelectorAll('.skill-card');
          const badges = containerRef.current?.querySelectorAll('.skill-badge');
          
          // Animate cards with stagger from center
          anime({
            targets: cards,
            translateY: [40, 0],
            opacity: [0, 1],
            scale: [0.95, 1],
            delay: anime.stagger(100, { from: 'center' }),
            duration: 800,
            easing: 'easeOutExpo',
          });

          // Animate badges with wave effect
          anime({
            targets: badges,
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(30, { from: 'first' }),
            duration: 400,
            easing: 'easeOutElastic(1, 0.5)',
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section 
      ref={containerRef}
      style={{
        position: 'sticky',
        top: '1rem',
        zIndex: 10,
        width: '100%',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700">
          <Cpu className="w-5 h-5 text-zinc-400" />
        </div>
        <h2 className="text-2xl font-semibold text-primary">Skills</h2>
      </div>

      {skills.length === 0 ? (
        <p className="italic text-secondary">No skills data available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[1300px]">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={`skill-card bg-gradient-to-br ${getCategoryColor(skill.category)} p-5 rounded-xl border backdrop-blur-sm`}
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`p-1.5 rounded-md ${getCategoryIconColor(skill.category)}`}>
                  {getCategoryIcon(skill.category)}
                </div>
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
                  {skill.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skill.skills.map((item, i) => (
                  <div
                    key={i}
                    className="skill-badge"
                    style={{ opacity: 0 }}
                  >
                    <Badge variant={getSkillVariant(item, skill.category)}>
                      {item}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;