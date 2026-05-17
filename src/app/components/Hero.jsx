'use client'

import { CONTENT } from '../../content'

export default function Hero() {
  const btnBase = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    padding: '0.6rem 1.4rem',
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    display: 'inline-block',
  }

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem',
      background: `radial-gradient(ellipse at 30% 40%, var(--accent-glow) 0%, transparent 60%), var(--bg)`,
      paddingTop: '80px',
    }}>
      <div style={{ maxWidth: '700px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: 'var(--accent)',
          display: 'block',
          marginBottom: '1rem',
        }}>
          &gt; hello world
        </span>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
        }}>
          {CONTENT.name}
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: 'var(--text-muted)',
          marginBottom: '0.75rem',
        }}>
          {CONTENT.title}<span className="cursor">|</span>
        </p>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          marginBottom: '2.5rem',
          lineHeight: 1.6,
        }}>
          {CONTENT.tagline}
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={CONTENT.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...btnBase,
              background: 'var(--accent)',
              color: '#0d1117',
              border: 'none',
              fontWeight: 600,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'none'
            }}
          >
            GitHub
          </a>
          <a
            href={CONTENT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...btnBase,
              background: 'transparent',
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'none'
            }}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${CONTENT.email}`}
            style={{
              ...btnBase,
              background: 'transparent',
              color: 'var(--text-muted)',
              border: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            Email →
          </a>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'var(--text-muted)',
        fontSize: '1.2rem',
      }} className="scroll-chevron">
        ↓
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor {
          animation: blink 1.1s step-end infinite;
          margin-left: 2px;
          color: var(--accent);
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        .scroll-chevron {
          animation: bounce 1.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cursor { animation: none; opacity: 1; }
          .scroll-chevron { animation: none; }
        }
      `}</style>
    </section>
  )
}
