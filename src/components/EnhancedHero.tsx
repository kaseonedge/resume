import { resumeData } from '../resumeData';
import { AgentNetwork, CountUp, RoleRotator, ScrollReveal, Spotlight } from './ResumeEffects';

export default function EnhancedHero() {
  const data = resumeData;

  return (
    <header className="hero" id="hero">
      <div className="hero-bg" aria-hidden>
        <div
          className="hero-grid"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(110,231,183,0.18) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="hero-radar" />
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-vignette" />
      </div>

      <Spotlight enabled color="rgba(110, 231, 183, 0.16)" />

      <div className="hero-inner">
        <div className="status-pill">
          <span className="status-dot" />
          <span className="status-label">{data.status}</span>
          <span className="status-sep">·</span>
          <span className="status-loc">{data.location}</span>
        </div>

        <div className="hero-kicker">AI infrastructure · platform leadership · self-healing systems</div>
        <h1 className="hero-name">{data.name}</h1>
        <h2 className="hero-role">
          <RoleRotator words={data.roles} enabled />
        </h2>

        <div className="hero-network-wrap">
          <AgentNetwork agents={data.agentNodes} size={380} enabled />
        </div>

        <ul className="focus-badges">
          {data.focusBadges.map((badge, i) => (
            <ScrollReveal key={badge.label} delay={i * 60} y={12}>
              <li
                className="focus-badge"
                style={{
                  color: badge.color,
                  borderColor: `${badge.color}55`,
                  boxShadow: `0 0 24px ${badge.color}1f`,
                }}
              >
                <span className="focus-badge-icon">{badge.icon}</span>
                <span>{badge.label}</span>
              </li>
            </ScrollReveal>
          ))}
        </ul>

        <div className="hero-metrics">
          {data.metrics.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={i * 80} y={16}>
              <div className="hero-metric">
                <div className="hero-metric-value">
                  <CountUp value={metric.value} prefix={metric.prefix || ''} suffix={metric.suffix || ''} enabled />
                </div>
                <div className="hero-metric-label">{metric.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="hero-summary">{data.summary}</p>

        <div className="hero-contact">
          <a href={data.contact.github} target="_blank" rel="noopener" className="contact-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.4 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3.8 0 1.7.1 2.5.3 1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V22c0 .3.2.6.7.5C19.1 20.7 22 16.8 22 12.3 22 6.6 17.5 2 12 2z" />
            </svg>
            github.com/kaseonedge
          </a>
          <a href={data.contact.linkedin} target="_blank" rel="noopener" className="contact-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.3 18.3H5.7V9.7h2.6v8.6zM7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11.3 9.8h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3h-2.6V9.7h2.5v1.2h.1c.4-.7 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4v4.8z" />
            </svg>
            jonathonfritz
          </a>
          <a href={`mailto:${data.contact.email}`} className="contact-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            {data.contact.email}
          </a>
        </div>
      </div>
    </header>
  );
}
