/**
 * PrintResume — PDF-focused resume layout.
 *
 * Rendered into a hidden off-screen div and captured by html2pdf.js. It imports
 * the shared resumeData module so the download path stays aligned with the
 * animated site copy instead of drifting into a stale parallel resume.
 */
import type { ReactNode } from 'react';
import { actualCtoAgents, resumeData } from '../resumeData';

const s = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    fontSize: '8.2px',
    lineHeight: '1.28',
    color: '#161616',
    background: '#ffffff',
    width: '816px',
    minHeight: '1056px',
    padding: '24px 30px 22px 30px',
    boxSizing: 'border-box' as const,
  },
  header: {
    borderBottom: '2px solid #0d1f18',
    paddingBottom: '8px',
    marginBottom: '8px',
  },
  name: {
    fontSize: '21px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    color: '#07130f',
    margin: '0 0 1px 0',
  },
  title: {
    fontSize: '10.5px',
    fontWeight: '700',
    color: '#176b4d',
    margin: '0 0 5px 0',
    letterSpacing: '0.25px',
  },
  contactRow: {
    display: 'flex' as const,
    flexWrap: 'wrap' as const,
    gap: '0 12px',
    fontSize: '7.8px',
    color: '#3d3d3d',
  },
  columns: {
    display: 'flex' as const,
    gap: '16px',
    alignItems: 'flex-start' as const,
  },
  leftCol: {
    width: '198px',
    flexShrink: '0' as const,
  },
  rightCol: {
    flex: '1',
    minWidth: '0',
  },
  sectionTitle: {
    fontSize: '7.4px',
    fontWeight: '800',
    letterSpacing: '0.85px',
    textTransform: 'uppercase' as const,
    color: '#0f241c',
    borderBottom: '1px solid #cfd8d4',
    paddingBottom: '2px',
    marginBottom: '5px',
    marginTop: '8px',
  },
  sectionTitleFirst: {
    fontSize: '7.4px',
    fontWeight: '800',
    letterSpacing: '0.85px',
    textTransform: 'uppercase' as const,
    color: '#0f241c',
    borderBottom: '1px solid #cfd8d4',
    paddingBottom: '2px',
    marginBottom: '5px',
    marginTop: '0',
  },
  summary: {
    fontSize: '8px',
    color: '#2f2f2f',
    lineHeight: '1.34',
    margin: '0',
  },
  jobBlock: {
    marginBottom: '7px',
  },
  jobHeader: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'baseline' as const,
    gap: '8px',
    marginBottom: '1px',
  },
  jobTitle: {
    fontSize: '8.9px',
    fontWeight: '800',
    color: '#0e0e0e',
  },
  jobDate: {
    fontSize: '7.4px',
    color: '#676767',
    whiteSpace: 'nowrap' as const,
  },
  jobCompany: {
    fontSize: '7.9px',
    color: '#3d3d3d',
    marginBottom: '2px',
  },
  bullet: {
    fontSize: '7.7px',
    color: '#2c2c2c',
    paddingLeft: '8px',
    lineHeight: '1.25',
    marginBottom: '1.8px',
  },
  mini: {
    fontSize: '7.25px',
    color: '#424242',
    lineHeight: '1.25',
    marginBottom: '2px',
  },
  skillCategory: {
    fontSize: '7.5px',
    fontWeight: '800',
    color: '#242424',
    marginBottom: '2px',
    marginTop: '5px',
  },
  skillCategoryFirst: {
    fontSize: '7.5px',
    fontWeight: '800',
    color: '#242424',
    marginBottom: '2px',
    marginTop: '0',
  },
  skillTags: {
    display: 'flex' as const,
    flexWrap: 'wrap' as const,
    gap: '2px',
  },
  skillTag: {
    fontSize: '6.9px',
    background: '#eef5f1',
    color: '#1e4234',
    borderRadius: '2px',
    padding: '1px 3.5px',
  },
  metricBar: {
    marginTop: '7px',
    padding: '6px 8px',
    background: '#f2f7f4',
    border: '1px solid #dce8e2',
    borderRadius: '4px',
    display: 'flex' as const,
    flexWrap: 'wrap' as const,
    gap: '0 12px',
  },
  metric: {
    fontSize: '7.25px',
    color: '#3b3b3b',
  },
};

const selectedSkillGroups = [
  resumeData.skills[0],
  resumeData.skills[1],
  resumeData.skills[2],
  resumeData.skills[3],
  resumeData.skills[4],
  resumeData.skills[5],
  resumeData.skills[6],
];

const topExperiences = resumeData.experiences.filter((experience) =>
  ['5D Labs', 'Blocknative', 'Pocket Network Inc.', 'Coinmiles', 'TELUS'].includes(experience.company),
);

const agentNames = actualCtoAgents.map((agent) => agent.name).join(', ');

function Bullet({ children }: { children: ReactNode }) {
  return <div style={s.bullet}>• {children}</div>;
}

export default function PrintResume() {
  const fiveDLabs = resumeData.experiences[0];
  const projects = resumeData.projects.slice(0, 4);

  return (
    <div id="resume-pdf-page" style={s.page}>
      <div style={s.header}>
        <h1 style={s.name}>{resumeData.name}</h1>
        <p style={s.title}>{resumeData.title}</p>
        <div style={s.contactRow}>
          <span>{resumeData.contact.location}</span>
          <span>{resumeData.contact.email}</span>
          <span>github.com/kaseonedge</span>
          <span>linkedin.com/in/jonathonfritz</span>
          <span>resume.jonathonfritz.com</span>
        </div>
      </div>

      <div style={s.columns}>
        <div style={s.leftCol}>
          <div style={s.sectionTitleFirst}>Summary</div>
          <p style={s.summary}>{resumeData.summary}</p>

          <div style={s.sectionTitle}>CTO Agent Bench</div>
          <p style={s.mini}>
            Actual repo-backed agents: {agentNames}. Placeholder personas are intentionally excluded until implemented.
          </p>

          <div style={s.sectionTitle}>Core Skills</div>
          {selectedSkillGroups.map((group, index) => (
            <div key={group.category}>
              <div style={index === 0 ? s.skillCategoryFirst : s.skillCategory}>{group.category}</div>
              <div style={s.skillTags}>
                {group.skills.slice(0, group.category === 'Platform Engineering' ? 11 : 9).map((skill) => (
                  <span key={`${group.category}-${skill}`} style={s.skillTag}>{skill}</span>
                ))}
              </div>
            </div>
          ))}

          <div style={s.sectionTitle}>Media / Avatar Stack</div>
          <p style={s.mini}>
            Morgan voice/avatar UX: FastAPI WebSocket voice bridge, ElevenLabs STT/TTS, browser MediaRecorder/WebAudio analyzers, reactive canvas avatar state, Scenario P-Video, and Pruna workflows.
          </p>

          <div style={s.sectionTitle}>Education</div>
          {resumeData.educations.map((education) => (
            <div key={`${education.institution}-${education.startDate}`} style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '7.8px', fontWeight: 700, color: '#111' }}>{education.institution}</div>
              <div style={{ fontSize: '7.3px', color: '#555' }}>{education.field} · {education.startDate}{education.endDate !== education.startDate ? `–${education.endDate}` : ''}</div>
            </div>
          ))}
        </div>

        <div style={s.rightCol}>
          <div style={s.sectionTitleFirst}>Experience</div>

          <div style={s.jobBlock}>
            <div style={s.jobHeader}>
              <span style={s.jobTitle}>{fiveDLabs.position}</span>
              <span style={s.jobDate}>{fiveDLabs.startDate} – {fiveDLabs.endDate}</span>
            </div>
            <div style={s.jobCompany}>{fiveDLabs.company} · Victoria, BC</div>
            <Bullet>Building CTO Desktop and the Cognitive Task Orchestrator: desktop-to-Kubernetes AI infrastructure for agentic delivery, Morgan voice/avatar UX, local GitOps, model/provider routing, and self-healing operations.</Bullet>
            <Bullet>Defined the repo-backed CTO agent bench: {agentNames}; kept non-implemented placeholder personas out of the public story.</Bullet>
            <Bullet>Built OpenClaw / Hermes / MCP tooling with dynamic skills, tool routing, NATS-style eventing, CLI/provider abstraction, and commercial/self-hosted model support.</Bullet>
            <Bullet>Built Morgan setup media/runtime: FastAPI WebSockets, ElevenLabs STT/TTS, MediaRecorder/WebAudio, Scenario P-Video/Pruna workflows, and reactive avatar state.</Bullet>
            <Bullet>Developed low-latency Rust/gRPC and HFT-adjacent trading-data infrastructure: Yellowstone gRPC, QuestDB/PostgreSQL time-series storage, streaming price APIs, MEV-aware dashboards, and Solana node/RPC operations.</Bullet>
            <Bullet>Validated ZeroEdge beta and Provider Abstraction paths across bare metal, AWS/EKS, and cloud providers; targets 60-80% lower cost using Kubernetes operators such as CloudNative-PG, Strimzi Kafka, SeaweedFS, Redis, OpenSearch, and ClickHouse.</Bullet>
          </div>

          {topExperiences.slice(1).map((experience) => {
            const bullets = experience.company === 'Pocket Network Inc.' && experience.position === 'Head of Infrastructure Engineering'
              ? experience.achievements.slice(0, 3)
              : experience.achievements.slice(0, experience.company === 'TELUS' ? 1 : 2);
            return (
              <div key={`${experience.company}-${experience.position}`} style={s.jobBlock}>
                <div style={s.jobHeader}>
                  <span style={s.jobTitle}>{experience.position}</span>
                  <span style={s.jobDate}>{experience.startDate} – {experience.endDate}</span>
                </div>
                <div style={s.jobCompany}>{experience.company}</div>
                {bullets.map((achievement) => <Bullet key={achievement}>{achievement}</Bullet>)}
              </div>
            );
          })}

          <div style={s.sectionTitle}>Selected Systems</div>
          {projects.map((project) => (
            <div key={project.title} style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '7.8px', fontWeight: 800, color: '#111' }}>{project.title}</div>
              <div style={s.mini}>{project.description}</div>
            </div>
          ))}

          <div style={s.metricBar}>
            {[
              ['20+ yrs', 'production infra'],
              ['1B+', 'daily requests managed'],
              ['16', 'actual CTO agents'],
              ['60-80%', 'targeted cost reduction'],
              ['ZeroEdge beta', 'provider validation'],
            ].map(([value, label]) => (
              <span key={value} style={s.metric}>
                <strong style={{ color: '#10291f' }}>{value}</strong> {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
