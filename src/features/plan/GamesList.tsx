import { getGame } from '../../content'
import { Card } from '../../design'

export function GamesList({ gameIds }: { gameIds: string[] }) {
  if (gameIds.length === 0) return null
  return (
    <section>
      <h2 className="mb-3 font-serif text-2xl text-forest">Brain games to tire him out</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {gameIds.map((id) => {
          const g = getGame(id)
          if (!g) return null
          return (
            <Card key={id}>
              <h3 className="text-sm font-semibold">{g.name}</h3>
              <p className="text-sm text-ink/70">{g.summary}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
