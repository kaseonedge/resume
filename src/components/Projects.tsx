import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { AgentVisualizer } from './ui/agent-visualizer';
import { ExternalLink, Github, Cpu, Shield, Server, Workflow } from 'lucide-react';

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
}

interface ProjectsProps {
  projects: ProjectItem[];
}

const getProjectIcon = (title: string) => {
  if (title.includes('CTO') || title.includes('Orchestrator')) return <Workflow className="w-5 h-5" />;
  if (title.includes('Agent')) return <Cpu className="w-5 h-5" />;
  if (title.includes('Healer')) return <Shield className="w-5 h-5" />;
  if (title.includes('Metal') || title.includes('Provisioning')) return <Server className="w-5 h-5" />;
  return <Server className="w-5 h-5" />;
};

const getTechVariant = (tech: string): "default" | "rust" | "ai" | "infra" | "secondary" => {
  const lowerTech = tech.toLowerCase();
  if (['rust', 'tokio', 'axum', 'serde'].some(t => lowerTech.includes(t))) return 'rust';
  if (['mcp', 'ai', 'agent', 'claude', 'linear'].some(t => lowerTech.includes(t))) return 'ai';
  if (['kubernetes', 'helm', 'argo', 'talos', 'cilium', 'cloudflare'].some(t => lowerTech.includes(t))) return 'infra';
  return 'secondary';
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const cards = containerRef.current?.querySelectorAll('.project-card-item');
          const badges = containerRef.current?.querySelectorAll('.project-badge');
          
          // Animate cards with dramatic reveal
          anime({
            targets: cards,
            translateY: [60, 0],
            opacity: [0, 1],
            scale: [0.9, 1],
            rotateX: [15, 0],
            delay: anime.stagger(150),
            duration: 1000,
            easing: 'easeOutExpo',
          });

          // Animate badges with bounce
          anime({
            targets: badges,
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(40, { start: 400 }),
            duration: 500,
            easing: 'easeOutElastic(1, 0.5)',
          });
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  if (!projects || projects.length === 0) {
    return null;
  }

  const isCTOProject = (title: string) => title.includes('CTO') || title.includes('Cognitive');

  return (
    <section ref={containerRef} className="project-card" style={{ perspective: '1000px' }}>
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Workflow className="w-5 h-5 text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold">Open Source Projects</h2>
      </div>

      <div className="grid gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card-item"
            style={{ opacity: 0, transformStyle: 'preserve-3d' }}
          >
            <Card className={isCTOProject(project.title) ? 'border-emerald-500/30 bg-gradient-to-br from-zinc-900/80 to-emerald-950/20' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isCTOProject(project.title) ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
                      {getProjectIcon(project.title)}
                    </div>
                    <div>
                      <CardTitle className={isCTOProject(project.title) ? 'text-emerald-400' : 'text-zinc-200'}>
                        {project.title}
                      </CardTitle>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-400 transition-colors mt-1"
                        >
                          <Github className="w-3 h-3" />
                          <span>View on GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Agent Visualizer for CTO project */}
                  {isCTOProject(project.title) && (
                    <div className="hidden md:block">
                      <AgentVisualizer />
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4 text-sm leading-relaxed">
                  {project.description}
                </CardDescription>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, i) => (
                    <div key={i} className="project-badge" style={{ opacity: 0 }}>
                      <Badge variant={getTechVariant(tech)}>
                        {tech}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;