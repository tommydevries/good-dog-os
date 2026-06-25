import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Button, ProgressRing, Tag } from '../index'

describe('design primitives', () => {
  it('Button fires onClick and respects disabled', async () => {
    const onClick = vi.fn()
    const { rerender } = render(<Button onClick={onClick}>Go</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Go' }))
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(
      <Button onClick={onClick} disabled>
        Go
      </Button>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Go' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('ProgressRing exposes an accessible percentage label', () => {
    render(<ProgressRing value={0.5} />)
    expect(screen.getByRole('img', { name: '50 percent complete' })).toBeInTheDocument()
  })

  it('Tag renders its content', () => {
    render(<Tag tone="forest">Recall</Tag>)
    expect(screen.getByText('Recall')).toBeInTheDocument()
  })
})
