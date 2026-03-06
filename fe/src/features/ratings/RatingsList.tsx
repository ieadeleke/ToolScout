import { useQuery } from '@tanstack/react-query'
import { ratingsApi } from './api'
import { Star } from 'lucide-react'

function Stars({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= score ? 'fill-yellow-400 text-yellow-400' : 'text-white/15'}`}
        />
      ))}
    </div>
  )
}

export function RatingsList({ toolId }: { toolId: string }) {
  const { data } = useQuery({ queryKey: ['ratings', toolId], queryFn: () => ratingsApi.list(toolId) })
  const items = data?.data || []

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-[#1c1c26] px-6 py-10 text-center">
        <Star className="h-8 w-8 text-white/15 mx-auto mb-3" />
        <p className="text-sm text-white/40">No ratings yet. Be the first to rate this tool.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {items.map((r: any) => (
        <li key={r.id} className="rounded-2xl border border-white/[0.07] bg-[#1c1c26] p-4">
          <div className="flex items-center justify-between mb-2">
            <Stars score={r.score} />
            <span className="text-[11px] text-white/35">
              {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          {r.text && (
            <p className="text-sm text-white/65 leading-relaxed">{r.text}</p>
          )}
        </li>
      ))}
    </ul>
  )
}
