import { CONTENT } from '../content'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--bg-border)',
      padding: '1.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.5rem',
    }}>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        © {new Date().getFullYear()} {CONTENT.name}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
      }}>
        Built with React + Vite
      </span>
    </footer>
  )
}
