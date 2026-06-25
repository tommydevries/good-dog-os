import { describe, it, expect } from 'vitest'
import { commands, drills, problems, games, breeds, teachingOrder, milestones } from './index'

const commandIds = new Set(commands.map((c) => c.id))

function expectUniqueIds(items: { id: string }[], label: string) {
  const ids = items.map((i) => i.id)
  expect(new Set(ids).size, `${label} ids should be unique`).toBe(ids.length)
}

describe('content integrity', () => {
  it('has unique ids within each collection', () => {
    expectUniqueIds(commands, 'commands')
    expectUniqueIds(drills, 'drills')
    expectUniqueIds(problems, 'problems')
    expectUniqueIds(games, 'games')
    expectUniqueIds(breeds, 'breeds')
  })

  it('every command prerequisite references a real command', () => {
    for (const c of commands) {
      for (const pre of c.prerequisites) {
        expect(commandIds.has(pre), `${c.id} prerequisite ${pre}`).toBe(true)
      }
    }
  })

  it('every problem trains real commands', () => {
    for (const p of problems) {
      expect(p.trains.length).toBeGreaterThan(0)
      for (const cmd of p.trains) {
        expect(commandIds.has(cmd), `${p.id} trains ${cmd}`).toBe(true)
      }
    }
  })

  it('every drill targets a real command', () => {
    for (const d of drills) {
      expect(commandIds.has(d.commandId), `${d.id} -> ${d.commandId}`).toBe(true)
    }
  })

  it('every milestone key references a real command', () => {
    for (const key of Object.keys(milestones)) {
      expect(commandIds.has(key), `milestone ${key}`).toBe(true)
    }
  })

  it('teachingOrder is valid and covers every core command', () => {
    for (const id of teachingOrder) {
      expect(commandIds.has(id), `teachingOrder ${id}`).toBe(true)
    }
    expect(new Set(teachingOrder).size, 'teachingOrder has no duplicates').toBe(
      teachingOrder.length,
    )
    for (const c of commands) {
      if (c.core) {
        expect(teachingOrder.includes(c.id), `core command ${c.id} in teachingOrder`).toBe(true)
      }
    }
  })

  it('commands carry the required fields', () => {
    for (const c of commands) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.meaning.length).toBeGreaterThan(0)
      expect(c.teach.length).toBeGreaterThan(0)
      expect(c.mistake.length).toBeGreaterThan(0)
    }
  })

  it('includes a mixed/unknown breed fallback', () => {
    expect(breeds.some((b) => b.id === 'mixed')).toBe(true)
  })

  it('has at least one zero-impact game for joint-safe plans', () => {
    expect(games.some((g) => g.impact === 'none')).toBe(true)
  })
})
