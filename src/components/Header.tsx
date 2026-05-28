import React, { useState, useEffect } from 'react';
import Icons from '../utils/icons';

interface HeaderProps {
  name: string;
  title: string;
  profileImage: string;
  summary: string;
  showTitle?: boolean;
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

const focusBadges = [
  { icon: '🧠', label: 'AI infrastructure', color: '#6ee7b7', bg: 'rgba(16, 185, 129, 0.18)' },
  { icon: '☸️', label: 'Kubernetes / GitOps', color: '#93c5fd', bg: 'rgba(59, 130, 246, 0.18)' },
  { icon: '🦀', label: 'Rust + Solana systems', color: '#fdba74', bg: 'rgba(249, 115, 22, 0.16)' },
  { icon: '📡', label: 'MCP + agent ops', color: '#c4b5fd', bg: 'rgba(139, 92, 246, 0.16)' },
  { icon: '🛡️', label: 'Infra leadership', color: '#fde68a', bg: 'rgba(245, 158, 11, 0.16)' },
];

const metrics = [
  ['20+', 'years infrastructure'],
  ['1B+', 'daily requests led'],
  ['13+', 'infrastructure roles'],
  ['60–80%', 'cost target'],
];

const Header: React.FC<HeaderProps> = ({
  name,
  title,
  profileImage,
  summary,
  showTitle = false,
  contact
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [profileImage]);

  return (
    <header className="hero-shell p-5 pb-6 md:p-8 md:pb-9 pt-8 rounded-lg bg-gradient-to-br from-[#101513] via-[#171a1f] to-[#20242b] border border-emerald-500/20 relative animate-fadeIn">
      {/* Animated background pattern */}
      <div className="hero-grid absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="hero-radar" />
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(16, 21, 19, 0.86) 70%)',
          }}
        />
      </div>

      <div
        style={{
          maxWidth: '980px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Profile Image */}
        {profileImage && (
          <div
            className="transition-all duration-300 hover:scale-105"
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.8), rgba(45, 55, 72, 0.8))',
              padding: '3px',
              boxShadow: '0 6px 28px rgba(16, 185, 129, 0.20), 0 0 0 1px rgba(160, 174, 192, 0.3)',
              backgroundColor: '#1a1a1a',
              margin: '0 auto 10px auto',
              position: 'relative'
            }}
          >
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              {imageError ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(75, 85, 99, 0.2)',
                    color: '#e2e8f0',
                    fontSize: '2.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {name.charAt(0)}
                </div>
              ) : (
                <img
                  src={profileImage}
                  alt={name}
                  className="profile-image transition-all duration-300 hover:brightness-110"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                width: '14px',
                height: '14px',
                backgroundColor: '#c0c0c0',
                borderRadius: '50%',
                border: '1px solid #1e1e1e',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {Icons.info('xxs')}
            </div>
          </div>
        )}

        {/* Name and Title */}
        <div className="animate-fadeIn" style={{ textAlign: 'center', margin: '0 0 16px 0' }}>
          <div className="hero-kicker">AI infrastructure · platform leadership · self-healing systems</div>
          <h1 className="hero-title">
            {name}
          </h1>
          {showTitle && title && (
            <h2 className="hero-subtitle">
              {title}
            </h2>
          )}
        </div>

        {/* Skill badges */}
        <div className="hero-badges">
          {focusBadges.map((badge, index) => (
            <span
              key={badge.label}
              className="hero-badge animate-fadeIn"
              style={{
                backgroundColor: badge.bg,
                borderColor: `${badge.color}55`,
                animationDelay: `${0.1 + index * 0.06}s`,
                boxShadow: `0 0 20px ${badge.color}22`
              }}
            >
              <span className="mr-2">{badge.icon}</span>
              <span style={{ color: badge.color }}>{badge.label}</span>
            </span>
          ))}
        </div>

        <div className="hero-metrics animate-fadeIn" style={{ animationDelay: '0.35s' }}>
          {metrics.map(([value, label]) => (
            <div className="hero-metric" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="hero-summary text-gray-300 text-base max-w-5xl mx-auto text-center mb-4 animate-fadeIn"
          style={{ animationDelay: '0.42s' }}
        >
          {summary}
        </div>

        {/* Divider */}
        <div className="hero-divider animate-fadeIn" style={{ animationDelay: '0.44s' }} />

        {/* Contact and Social */}
        {contact && (
          <div className="flex flex-wrap justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-orb transition-all duration-300 hover:scale-110"
                aria-label="GitHub profile"
              >
                {Icons.github()}
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-orb transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn profile"
              >
                {Icons.linkedin()}
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="social-orb transition-all duration-300 hover:scale-110"
                aria-label="Email Jonathon"
              >
                {Icons.envelope()}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="social-orb transition-all duration-300 hover:scale-110"
                aria-label="Phone Jonathon"
              >
                {Icons.phone()}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="social-orb transition-all duration-300 hover:scale-110"
                aria-label="Website"
              >
                {Icons.globe()}
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
