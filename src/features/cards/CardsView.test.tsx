import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { CardsView } from './CardsView'
import { useAppStore } from '../../store/useAppStore'

describe('CardsView', () => {
  beforeEach(() => useAppStore.getState().reset())

  it('shows a drawn card with its actions', () => {
    render(
      <MemoryRouter>
        <CardsView />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: 'Training cards' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Did it' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Draw another' })).toBeInTheDocument()
    expect(screen.getByText(/Do this:/)).toBeInTheDocument()
  })

  it('marking a card done records progress for that command', async () => {
    render(
      <MemoryRouter>
        <CardsView />
      </MemoryRouter>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Did it' }))
    const progress = useAppStore.getState().progress
    expect(Object.keys(progress.commandStatus).length).toBeGreaterThan(0)
  })
})
