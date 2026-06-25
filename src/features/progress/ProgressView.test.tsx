import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ProgressView } from './ProgressView'
import { useAppStore } from '../../store/useAppStore'
import type { DogProfile } from '../../types'

const profile: DogProfile = {
  name: 'Tracker',
  breedId: 'golden',
  ageMonths: 7,
  householdSize: 4,
  problems: ['counter-surfing'],
  minutesPerDay: 15,
  experience: 'beginner',
}

describe('ProgressView', () => {
  beforeEach(() => useAppStore.getState().reset())

  it('renders the dashboard sections from a generated plan', () => {
    useAppStore.getState().generate(profile)
    render(
      <MemoryRouter>
        <ProgressView />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /progress/i })).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Program weeks')).toBeInTheDocument()
  })

  it('toggles a program week on tap', async () => {
    useAppStore.getState().generate(profile)
    render(
      <MemoryRouter>
        <ProgressView />
      </MemoryRouter>,
    )
    await userEvent.click(screen.getByRole('button', { name: /Week 1\./ }))
    expect(useAppStore.getState().progress.completedWeeks).toContain(1)
  })

  it('redirects away when there is no plan', () => {
    render(
      <MemoryRouter>
        <ProgressView />
      </MemoryRouter>,
    )
    expect(screen.queryByText('Skills')).not.toBeInTheDocument()
  })
})
