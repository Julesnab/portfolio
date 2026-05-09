import { useState, useEffect } from 'react'
import { CONTENT } from '../content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Projects', 'Contact']

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'var(--bg-surface)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--bg-border)',
    boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
    transition: 'box-shadow 0.2s ease',
  }

  const innerStyle = {
    maxWidth: 'var(--max-w)',
    margin: '0 auto',
    padding: '0 2rem',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const nameStyle = {
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    textDecoration: 'none',
  }

  const linkStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    textDecoration: 'none',
    letterSpacing: '0.05em',
    transition: 'color 0.15s',
    padding: '0.25rem 0',
  }

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>
        <a href="#hero" style={nameStyle}>
          {CONTENT.name}
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
          className="nav-links-desktop">
          {links.map(link => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                style={linkStyle}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '1.4rem',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'none',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--bg-border)',
          padding: '1rem 2rem',
        }} className="nav-mobile-menu">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                padding: '0.6rem 0',
                borderBottom: '1px solid var(--bg-border)',
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
