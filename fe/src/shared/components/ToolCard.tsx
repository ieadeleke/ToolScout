import { useState } from 'react'
import { Star, Bookmark } from 'lucide-react'

type Tool = {
  id?: string
  _id?: string
  name: string
  short_description: string
  logo_url?: string
  pricing: 'free' | 'paid' | 'freemium'
  saves_count: number
  avg_rating: number
  is_nigerian?: boolean
  tasks?: string[]
  roles?: string[]
}

const PRICING_BADGE: Record<string, string> = {
  free:     'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  freemium: 'bg-sky-500/15    text-sky-300    border-sky-500/25',
  paid:     'bg-violet-500/15 text-violet-300 border-violet-500/25',
}

export function ToolCard({ tool, onClick }: { tool: Tool; onClick?: () => void }) {
  const [imgErr, setImgErr] = useState(false)
  const rating = Number.isFinite(tool.avg_rating) ? (tool.avg_rating as number) : 0
  const tags = [...(tool.tasks || []), ...(tool.roles || [])].slice(0, 2)
  const pricingClass = PRICING_BADGE[tool.pricing] ?? PRICING_BADGE.free

  return (
    <div
      className="group relative min-w-[278px] cursor-pointer rounded-2xl border border-white/10 bg-[#1c1c26] p-5 transition-all duration-200 hover:border-white/20 hover:bg-[#21212e] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3.5">
        {tool.logo_url && !imgErr ? (
          <img
            src={tool.logo_url}
            alt={tool.name}
            className="h-11 w-11 rounded-xl object-cover shrink-0 bg-white/5 ring-1 ring-white/10"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center text-base font-bold text-white/60 shrink-0 ring-1 ring-white/10">
            {tool.name?.[0]}
          </div>
        )}

        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[14px] font-semibold text-white leading-tight truncate">{tool.name}</span>
            {tool.is_nigerian && (
              <span className="shrink-0 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/25">NG</span>
            )}
          </div>
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize ${pricingClass}`}>
            {tool.pricing}
          </span>
        </div>

        {rating > 0 && (
          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-[12px] font-medium text-white/65">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-[12.5px] text-white/55 line-clamp-2 leading-[1.65] mb-4">
        {tool.short_description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.07] border border-white/10 px-2.5 py-[3px] text-[11px] text-white/50 capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-white/35 shrink-0">
          <Bookmark className="h-3.5 w-3.5" />
          <span className="text-[11px]">{tool.saves_count || 0}</span>
        </div>
      </div>
    </div>
  )
}
