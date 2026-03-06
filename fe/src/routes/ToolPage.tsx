import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { toolsApi } from '../features/tools/api'
import { ToolCard } from '../shared/components/ToolCard'
import { SaveButton } from '../features/saves/SaveButton'
import { RatingsList } from '../features/ratings/RatingsList'
import { RateTool } from '../features/ratings/RateTool'
import { ArrowLeft, ArrowUpRight, Star, Bookmark, Globe } from 'lucide-react'

const PRICING_BADGE: Record<string, string> = {
  free:     'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  freemium: 'bg-sky-500/15    text-sky-300    border-sky-500/25',
  paid:     'bg-violet-500/15 text-violet-300 border-violet-500/25',
}

function Stars({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star key={n} className={`h-4 w-4 ${n <= Math.round(score) ? 'fill-yellow-400 text-yellow-400' : 'text-white/15'}`} />
      ))}
    </div>
  )
}

export function ToolPage() {
  const { id = '' } = useParams()
  const nav = useNavigate()
  const [imgErr, setImgErr] = useState(false)

  const { data: tool, isLoading } = useQuery({
    queryKey: ['tool', id],
    queryFn: () => toolsApi.get(id),
    enabled: !!id,
  })
  const { data: similar } = useQuery({
    queryKey: ['tool', id, 'similar'],
    queryFn: () => toolsApi.similar(id),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-5 w-20 rounded-lg bg-white/[0.06]" />
        <div className="h-48 rounded-2xl bg-white/[0.05]" />
      </div>
    )
  }

  if (!tool) return null

  const rating = Number(tool.avg_rating) || 0
  const tags = [...(tool.tasks || []), ...(tool.roles || []), ...(tool.categories || [])]
  const pricingClass = PRICING_BADGE[tool.pricing] ?? PRICING_BADGE.free

  return (
    <div className="space-y-8 max-w-5xl">

      {/* Back */}
      <button
        onClick={() => nav(-1)}
        className="flex items-center gap-1.5 text-sm text-white/45 hover:text-white/80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Hero card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#1c1c26] overflow-hidden">
        {/* Top accent stripe */}
        <div className="h-[3px] bg-gradient-to-r from-[#F6C913] via-[#0EC6B2] to-[#F47FBE]" />

        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">

            {/* Logo */}
            {tool.logo_url && !imgErr ? (
              <img
                src={tool.logo_url}
                alt={tool.name}
                onError={() => setImgErr(true)}
                className="h-16 w-16 rounded-2xl object-cover shrink-0 ring-1 ring-white/10 bg-white/5"
              />
            ) : (
              <div className="h-16 w-16 rounded-2xl bg-white/[0.07] flex items-center justify-center text-2xl font-bold text-white/50 shrink-0 ring-1 ring-white/10">
                {tool.name?.[0]}
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">{tool.name}</h1>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-medium capitalize ${pricingClass}`}>
                  {tool.pricing}
                </span>
              </div>

              <p className="text-[15px] text-white/65 leading-relaxed mb-4 max-w-xl">
                {tool.short_description}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Stars score={rating} />
                    <span className="text-sm font-semibold text-white">{rating.toFixed(1)}</span>
                    {tool.rating_count > 0 && (
                      <span className="text-sm text-white/40">({tool.rating_count} ratings)</span>
                    )}
                  </div>
                )}
                {tool.saves_count > 0 && (
                  <div className="flex items-center gap-1.5 text-sm text-white/40">
                    <Bookmark className="h-4 w-4" />
                    <span>{tool.saves_count.toLocaleString()} saves</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 6).map(tag => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/[0.06] border border-white/[0.08] px-3 py-1 text-[12px] text-white/55 capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              {tool.website_url && (
                <a href={tool.website_url} target="_blank" rel="noreferrer">
                  <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition-colors whitespace-nowrap">
                    <Globe className="h-4 w-4" />
                    Visit tool
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </button>
                </a>
              )}
              <SaveButton toolId={id} />
            </div>
          </div>

          {/* Long description */}
          {tool.long_description && (
            <div className="mt-6 pt-6 border-t border-white/[0.07]">
              <p className="text-[14px] text-white/55 leading-[1.75]">{tool.long_description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Ratings section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-[13px] font-semibold text-white/55 uppercase tracking-wider">
            Community ratings
          </h2>
          <RatingsList toolId={id} />
        </div>
        <div className="space-y-4">
          <h2 className="text-[13px] font-semibold text-white/55 uppercase tracking-wider">
            Leave a review
          </h2>
          <RateTool toolId={id} />
        </div>
      </div>

      {/* Similar tools */}
      {similar?.data?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-[13px] font-semibold text-white/55 uppercase tracking-wider">
            Similar tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {similar.data.map((t: any) => (
              <div key={t.id || t._id} onClick={() => nav(`/tools/${t.id || t._id}`)} className="cursor-pointer">
                <ToolCard tool={t} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
