import React from 'react';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Code2, 
  Server, 
  Shield, 
  Sparkles,
  Bot,
  Cpu,
  Terminal,
  Zap,
  Eye
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
  if (lower.includes('ai engineering')) return <Brain className="w-4 h-4" />;
  if (lower.includes('llm')) return <Sparkles className="w-4 h-4" />;
  if (lower.includes('ai infrastructure')) return <Bot className="w-4 h-4" />;
  if (lower.includes('systems') || lower.includes('programming')) return <Terminal className="w-4 h-4" />;
  if (lower.includes('platform')) return <Server className="w-4 h-4" />;
  if (lower.includes('observability')) return <Eye className="w-4 h-4" />;
  return <Code2 className="w-4 h-4" />;
};

const getCategoryColor = (category: string): string => {
  const lower = category.toLowerCase();
  // AI categories get vibrant emerald/green (the CTO brand color)
  if (lower.includes('ai engineering')) return 'from-emerald-500/25 to-emerald-900/15 border-emerald-400/40';
  if (lower.includes('llm')) return 'from-purple-500/25 to-purple-900/15 border-purple-400/40';
  if (lower.includes('ai infrastructure')) return 'from-cyan-500/25 to-cyan-900/15 border-cyan-400/40';
  if (lower.includes('systems') || lower.includes('programming')) return 'from-orange-500/20 to-orange-900/10 border-orange-500/30';
  if (lower.includes('platform')) return 'from-blue-500/20 to-blue-900/10 border-blue-500/30';
  if (lower.includes('observability')) return 'from-amber-500/20 to-amber-900/10 border-amber-500/30';
  return 'from-zinc-500/20 to-zinc-900/10 border-zinc-500/30';
};

const getCategoryIconColor = (category: string): string => {
  const lower = category.toLowerCase();
  if (lower.includes('ai engineering')) return 'text-emerald-400 bg-emerald-500/25';
  if (lower.includes('llm')) return 'text-purple-400 bg-purple-500/25';
  if (lower.includes('ai infrastructure')) return 'text-cyan-400 bg-cyan-500/25';
  if (lower.includes('systems') || lower.includes('programming')) return 'text-orange-400 bg-orange-500/20';
  if (lower.includes('platform')) return 'text-blue-400 bg-blue-500/20';
  if (lower.includes('observability')) return 'text-amber-400 bg-amber-500/20';
  return 'text-zinc-400 bg-zinc-500/20';
};

const getSkillVariant = (skill: string, category: string): "default" | "rust" | "ai" | "infra" | "secondary" => {
  const lowerSkill = skill.toLowerCase();
  const lowerCategory = category.toLowerCase();
  
  // AI-related categories get the AI variant
  if (lowerCategory.includes('ai') || lowerCategory.includes('llm')) return 'ai';
  if (lowerCategory.includes('systems')) return 'rust';
  if (lowerCategory.includes('platform') || lowerCategory.includes('infrastructure')) return 'infra';
  
  // Skill-based overrides
  if (['rust', 'tokio', 'axum'].some(t => lowerSkill.includes(t))) return 'rust';
  if (['mcp', 'claude', 'gpt', 'gemini', 'agent'].some(t => lowerSkill.includes(t))) return 'ai';
  if (['kubernetes', 'talos', 'argocd'].some(t => lowerSkill.includes(t))) return 'infra';
  
  return 'secondary';
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section 
      style={{
        position: 'sticky',
        top: '1rem',
        zIndex: 10,
        width: '100%',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
          <Zap className="w-5 h-5 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-semibold text-primary">Technical Skills</h2>
      </div>

      {skills.length === 0 ? (
        <p className="italic text-secondary">No skills data available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[1300px]">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={`skill-card bg-gradient-to-br ${getCategoryColor(skill.category)} p-5 rounded-xl border backdrop-blur-sm animate-fadeIn`}
              style={{ animationDelay: `${index * 0.1}s` }}
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
                    className="skill-badge animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1 + i * 0.03}s` }}
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