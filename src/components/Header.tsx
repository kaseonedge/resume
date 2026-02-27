import React, { useState, useEffect } from 'react';
import Icons from '../utils/icons';
import { LiquidGlass } from '@creativoma/liquid-glass';

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
    <header className="p-5 pb-6 md:p-6 md:pb-8 pt-8 rounded-lg relative animate-fadeIn overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(28,28,28,0.95) 0%, rgba(22,22,22,0.97) 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
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
            background: 'radial-gradient(ellipse at center, transparent 0%, #1c1c1c 70%)',
          }}
        />
      </div>

      <div
        style={{
          maxWidth: '800px',
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
              background: 'linear-gradient(45deg, rgba(74, 85, 104, 0.8), rgba(45, 55, 72, 0.8))',
              padding: '3px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(160, 174, 192, 0.3), 0 0 15px rgba(74, 85, 104, 0.3)',
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
        <div className="animate-fadeIn" style={{ textAlign: 'center', margin: '0 0 24px 0' }}>
          <h1
            style={{
              fontSize: '3.2rem',
              fontWeight: '800',
              color: '#ffffff',
              lineHeight: '1.2',
              margin: '0 0 20px 0',
              letterSpacing: '0.5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
            }}
          >
            {name}
          </h1>
          {showTitle && title && (
            <h2
              style={{
                fontSize: '1.8rem',
                color: '#c0c0c0',
                lineHeight: '1.3',
                fontWeight: '500',
                margin: 0,
                letterSpacing: '0.3px',
                textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.3)',
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
              }}
            >
              {title}
            </h2>
          )}
        </div>

        {/* Skill badges — liquid glass effect */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', margin: '0 0 28px 0' }}>
          {[
            { emoji: '🧠', label: 'Multi-Agent AI', color: '#6ee7b7', tint: 'rgba(16,185,129,0.25)' },
            { emoji: '🦀', label: 'Rust', color: '#fdba74', tint: 'rgba(249,115,22,0.25)' },
            { emoji: '☸️', label: 'Kubernetes', color: '#93c5fd', tint: 'rgba(59,130,246,0.25)' },
            { emoji: '⛓️', label: 'Blockchain', color: '#c4b5fd', tint: 'rgba(139,92,246,0.25)' },
          ].map((badge) => (
            <LiquidGlass
              key={badge.label}
              as="span"
              backdropBlur={3}
              tintColor={badge.tint}
              displacementScale={80}
              className="px-4 py-2 rounded-full text-sm text-white flex items-center transition-all duration-300 hover:scale-105 animate-fadeIn cursor-default"
              style={{ border: `1px solid ${badge.color}33` }}
            >
              <span className="mr-2">{badge.emoji}</span>
              <span style={{ color: badge.color }}>{badge.label}</span>
            </LiquidGlass>
          ))}
        </div>

        {/* Summary */}
        <div className="text-gray-300 text-base max-w-4xl mx-auto text-center mb-6 animate-fadeIn"
          style={{
            animationDelay: '0.4s',
            fontSize: '1.05rem',
            lineHeight: '1.6',
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
          }}
        >
          {summary}
        </div>

        {/* Divider */}
        <div
          className="animate-fadeIn"
          style={{
            width: '100%',
            maxWidth: '700px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #444, transparent)',
            margin: '0 0 5px 0',
            animationDelay: '0.4s'
          }}
        />

        {/* Contact and Social */}
        {contact && (
          <div className="flex flex-wrap justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: '#a0a0a0',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(45, 55, 72, 0.6)',
                  border: '1px solid #3a4a5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                {Icons.github()}
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: '#a0a0a0',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(45, 55, 72, 0.6)',
                  border: '1px solid #3a4a5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                {Icons.linkedin()}
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: '#a0a0a0',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(45, 55, 72, 0.6)',
                  border: '1px solid #3a4a5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                {Icons.envelope()}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: '#a0a0a0',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(45, 55, 72, 0.6)',
                  border: '1px solid #3a4a5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                {Icons.phone()}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: '#a0a0a0',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(45, 55, 72, 0.6)',
                  border: '1px solid #3a4a5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
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