import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contact from '../Contact'
import { CONTENT } from '../../../content'

describe('Contact', () => {
  it('renders the section heading', () => {
    render(<Contact />)
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
  })

  it('renders the section label', () => {
    render(<Contact />)
    expect(screen.getByText('// contact')).toBeInTheDocument()
  })

  it('renders the GitHub link', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('href', CONTENT.github)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders the LinkedIn link', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: /linkedin/i })
    expect(link).toHaveAttribute('href', CONTENT.linkedin)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders the Email link', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: /email/i })
    expect(link).toHaveAttribute('href', `mailto:${CONTENT.email}`)
  })

  it('renders the email address as a description', () => {
    render(<Contact />)
    expect(screen.getByText(CONTENT.email)).toBeInTheDocument()
  })

  it('renders the contact section element', () => {
    render(<Contact />)
    expect(document.getElementById('contact')).toBeInTheDocument()
  })
})
