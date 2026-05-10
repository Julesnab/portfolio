import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '../Navbar'
import { CONTENT } from '../../content'

describe('Navbar', () => {
  it('renders the developer name as a home link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: CONTENT.name })).toHaveAttribute('href', '#hero')
  })

  it('renders desktop nav links for About, Projects, Contact', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  })

  it('renders the hamburger button with aria-label', () => {
    render(<Navbar />)
    // button is visually hidden via CSS media query; query directly by class
    const btn = document.querySelector('.nav-hamburger')
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('aria-label', 'Toggle menu')
  })

  it('mobile menu is hidden by default', () => {
    render(<Navbar />)
    expect(screen.queryByRole('navigation')).toBeInTheDocument()
    expect(document.querySelector('.nav-mobile-menu')).not.toBeInTheDocument()
  })

  it('mobile menu opens when hamburger is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    await user.click(document.querySelector('.nav-hamburger'))
    expect(document.querySelector('.nav-mobile-menu')).toBeInTheDocument()
  })

  it('mobile menu closes when a link is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    await user.click(document.querySelector('.nav-hamburger'))
    expect(document.querySelector('.nav-mobile-menu')).toBeInTheDocument()
    await user.click(document.querySelectorAll('.nav-mobile-menu a')[0])
    expect(document.querySelector('.nav-mobile-menu')).not.toBeInTheDocument()
  })

  it('hamburger toggles icon between open and close states', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const hamburger = document.querySelector('.nav-hamburger')
    expect(hamburger.textContent).toBe('☰')
    await user.click(hamburger)
    expect(hamburger.textContent).toBe('✕')
    await user.click(hamburger)
    expect(hamburger.textContent).toBe('☰')
  })
})
