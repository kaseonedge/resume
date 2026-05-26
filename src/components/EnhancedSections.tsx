import { useMemo } from 'react';
import { resumeData, type EducationItem, type ExperienceItem, type ProjectItem, type SkillGroup } from '../resumeData';
import githubActivity from '../generated/githubActivity.json';
import { CountUp, ScrollReveal, useTilt } from './ResumeEffects';

const SKILL_TONES = {
  emerald: { bg: 'rgba(16,185,129,0.10)', border: 'rgba(110,231,183,0.35)', text: '#6ee7b7', chip: 'rgba(110,231,183,0.16)' },
  violet: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(196,181,253,0.30)', text: '#c4b5fd', chip: 'rgba(196,181,253,0.14)' },
  cyan: { bg: 'rgba(6,182,212,0.08)', border: 'rgba(103,232,249,0.30)', text: '#67e8f9', chip: 'rgba(103,232,249,0.14)' },
  orange: { bg: 'rgba(249,115,22,0.08)', border: 'rgba(253,186,116,0.30)', text: '#fdba74', chip: 'rgba(253,186,116,0.14)' },
  slate: { bg: 'rgba(148,163,184,0.08)', border: 'rgba(203,213,225,0.25)', text: '#cbd5e1', chip: 'rgba(203,213,225,0.12)' },
  blue: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(147,197,253,0.30)', text: '#93c5fd', chip: 'rgba(147,197,253,0.14)' },
  amber: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(253,230,138,0.30)', text: '#fde68a', chip: 'rgba(253,230,138,0.14)' },
};

export function SectionHeader({ eyebrow, title, icon }: { eyebrow: string; title: string; icon: 'briefcase' | 'bolt' | 'workflow' | 'grad' | 'github' }) {
  const icons = {
    briefcase: <path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm5-3h8a1 1 0 0 1 1 1v2H7V5a1 1 0 0 1 1-1z" />,
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
    workflow: <path d="M5 4h4v4H5zM15 4h4v4h-4zM5 16h4v4H5zM15 16h4v4h-4zM7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 1 2 2v2" fill="none" stroke="currentColor" strokeWidth="1.6" />,
    grad: <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8-7-3.8z" />,
    github: <path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.4 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3.8 0 1.7.1 2.5.3 1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V22c0 .3.2.6.7.5C19.1 20.7 22 16.8 22 12.3 22 6.6 17.5 2 12 2z" />,
  };

  return (
    <header className="section-header">
      <span className="section-icon" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{icons[icon]}</svg>
      </span>
      <div className="section-header-text">
        <div className="section-eyebrow">{eyebrow}</div>
        <h2 className="section-title">{title}</h2>
      </div>
      <span className="section-divider" />
    </header>
  );
}

function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const tiltRef = useTilt<HTMLElement>(4, true);
  return (
    <ScrollReveal delay={index * 70} y={28}>
      <article ref={tiltRef} className={`xp-card xp-tag-${exp.tag} card-sweep`}>
        <div className="xp-card-rail" />
        <div className="xp-card-head">
          <div>
            <h3 className="xp-position">{exp.position}</h3>
            <h4 className="xp-company">{exp.company}</h4>
          </div>
          <span className="xp-dates">
            {exp.startDate} <span className="xp-dates-sep">→</span> {exp.endDate}
          </span>
        </div>
        <p className="xp-desc">{exp.description}</p>
        <ul className="xp-bullets">
          {exp.achievements.map((achievement) => (
            <li key={achievement}>
              <span className="xp-bullet-marker" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </article>
    </ScrollReveal>
  );
}

export function EnhancedExperience() {
  return (
    <section className="section" id="experience" data-screen-label="Experience">
      <SectionHeader eyebrow="Career" title="Professional Experience" icon="briefcase" />
      <div className="xp-list">
        {resumeData.experiences.map((experience, i) => (
          <ExperienceCard key={`${experience.company}-${experience.position}`} exp={experience} index={i} />
        ))}
      </div>
    </section>
  );
}

export function EnhancedSkills({ skills = resumeData.skills }: { skills?: SkillGroup[] }) {
  return (
    <section className="section" id="skills" data-screen-label="Skills">
      <SectionHeader eyebrow="Stack" title="Technical Skills" icon="bolt" />
      <div className="skill-grid">
        {skills.map((skill, i) => {
          const tone = SKILL_TONES[skill.tone] || SKILL_TONES.emerald;
          return (
            <ScrollReveal key={skill.category} delay={i * 50} y={20}>
              <div className="skill-card card-sweep" style={{ background: tone.bg, borderColor: tone.border }}>
                <div className="skill-card-head">
                  <span className="skill-card-pip" style={{ background: tone.chip, color: tone.text, borderColor: tone.border }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="skill-card-title" style={{ color: tone.text }}>{skill.category}</h3>
                </div>
                <div className="skill-chip-row">
                  {skill.skills.map((item) => (
                    <span key={item} className="skill-chip" style={{ background: tone.chip, color: tone.text, borderColor: tone.border }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const tiltRef = useTilt<HTMLElement>(5, true);
  const isPrimary = project.tag === 'primary';
  return (
    <ScrollReveal delay={index * 70} y={28}>
      <article ref={tiltRef} className={`project-card ${isPrimary ? 'is-primary' : ''} card-sweep`}>
        <header className="project-head">
          <h3 className="project-title">{project.title}</h3>
          {project.link && (
            <a className="project-link" href={project.link} target="_blank" rel="noopener">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 3h7v7" />
                <path d="M10 14 21 3" />
                <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" />
              </svg>
              View on GitHub
            </a>
          )}
        </header>
        <p className="project-desc">{project.description}</p>
        <div className="project-tech">
          {project.technologies.map((tech) => <span key={tech} className="tech-chip">{tech}</span>)}
        </div>
      </article>
    </ScrollReveal>
  );
}

export function EnhancedProjects() {
  return (
    <section className="section" id="projects" data-screen-label="Projects">
      <SectionHeader eyebrow="Built" title="Open-Source Projects" icon="workflow" />
      <div className="project-grid">
        {resumeData.projects.map((project, i) => <ProjectCard key={project.title} project={project} index={i} />)}
      </div>
    </section>
  );
}

export function EnhancedEducation({ educations = resumeData.educations }: { educations?: EducationItem[] }) {
  return (
    <section className="section" id="education" data-screen-label="Education">
      <SectionHeader eyebrow="Education" title="Foundations" icon="grad" />
      <div className="edu-list">
        {educations.map((education, i) => (
          <ScrollReveal key={`${education.institution}-${education.field}`} delay={i * 60} y={20}>
            <div className="edu-card">
              <div className="edu-head">
                <h3 className="edu-field">{education.field}</h3>
                <span className="edu-dates">{education.startDate} – {education.endDate}</span>
              </div>
              <div className="edu-institution">{education.institution}</div>
              {education.description && <p className="edu-desc">{education.description}</p>}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
}

export function EnhancedGitHubHeatmap() {
  const weeks = githubActivity.weeks;
  const total = githubActivity.totalContributions;
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
  const cellSize = 11;
  const gap = 2;
  const width = weeks.length * (cellSize + gap) + 32;
  const repos = useMemo(() => githubActivity.repositories.slice(0, 3), []);

  return (
    <section className="section" id="github" data-screen-label="GitHub">
      <SectionHeader eyebrow="GitHub GraphQL" title="Verified GitHub Activity" icon="github" />
      <div className="github-card">
        <div className="github-card-head">
          <a className="github-username" href={githubActivity.profileUrl} target="_blank" rel="noopener">@{githubActivity.username}</a>
          <div className="github-total"><CountUp value={total} enabled /> contributions in the last year</div>
        </div>
        <div className="github-graph">
          <svg width={width} height={(cellSize + gap) * 7 + 20} style={{ display: 'block' }} aria-label="GitHub contribution calendar from GitHub GraphQL">
            {weeks.map((week, wi) =>
              week.contributionDays.map((day, di) => {
                const reveal = (wi / weeks.length) * 600 + di * 20;
                return (
                  <rect
                    key={`${wi}-${di}`}
                    x={wi * (cellSize + gap)}
                    y={di * (cellSize + gap) + 14}
                    width={cellSize}
                    height={cellSize}
                    rx={2}
                    fill={colors[day.level]}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: `cellPop 480ms cubic-bezier(.2,.7,.2,1) ${reveal}ms both` }}
                  >
                    <title>{day.count} contribution{day.count === 1 ? '' : 's'} on {day.date}</title>
                  </rect>
                );
              })
            )}
          </svg>
        </div>
        <div className="github-legend">
          <span>Less</span>
          {colors.map((color) => <span key={color} className="github-legend-cell" style={{ background: color }} />)}
          <span>More</span>
        </div>
        <div className="github-meta">
          Pulled from GitHub GraphQL at {formatDate(githubActivity.generatedAt)} · generated from live GitHub data
        </div>
        <div className="github-repos">
          {repos.map((repo) => (
            <a key={repo.nameWithOwner} className="github-repo" href={repo.url} target="_blank" rel="noopener">
              <span className="github-repo-name">{repo.nameWithOwner}</span>
              {repo.latestCommit && <span className="github-repo-commit">{repo.latestCommit.shortOid} · {repo.latestCommit.messageHeadline}</span>}
              <span className="github-repo-meta">
                {repo.language?.name || 'Code'} · {repo.defaultBranchCommitCount.toLocaleString()} commits · pushed {formatDate(repo.pushedAt)}
              </span>
            </a>
          ))}
        </div>
        <div className="github-orgs">
          {[
            { name: '5dlabs', avatar: 'https://avatars.githubusercontent.com/u/214808842', url: 'https://github.com/5dlabs' },
            { name: 'blocknative', avatar: 'https://avatars.githubusercontent.com/u/24852023', url: 'https://github.com/blocknative' },
            { name: 'pokt-network', avatar: 'https://avatars.githubusercontent.com/u/33689108', url: 'https://github.com/pokt-network' },
          ].map((org) => (
            <a key={org.name} className="github-org" href={org.url} target="_blank" rel="noopener">
              <img src={org.avatar} alt="" />
              <span>@{org.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
