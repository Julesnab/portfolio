import { CONTENT } from '../content'

const LINKS = [
  { label: 'GitHub', href: CONTENT.github, desc: 'See my code' },
  { label: 'LinkedIn', href: CONTENT.linkedin, desc: 'Connect with me' },
  { label: 'Email', href: `mailto:${CONTENT.email}`, desc: CONTENT.email },
]

export default function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--bg-border)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <span className="section-label">// contact</span>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
          lineHeight: 1.2,
        }}>
          Get in touch
        </h2>
        <p style={{
          color: 'var(--text-muted)',
          marginBottom: '2.5rem',
          lineHeight: 1.65,
        }}>
          I'm open to new opportunities and collaborations. Feel free to reach out through any of the channels below.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {LINKS.map(link => (
            <ContactRow key={link.label} {...link} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactRow({ label, href, desc }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.25rem',
        background: 'var(--bg)',
        border: '1px solid var(--bg-border)',
        borderRadius: 'var(--radius)',
        textDecoration: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.boxShadow = '0 0 14px var(--accent-glow)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--bg-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--text-primary)',
          display: 'block',
        }}>
          {label}
        </span>
        <span style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
        }}>
          {desc}
        </span>
      </div>
      <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>→</span>
    </a>
  )
}
