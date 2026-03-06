import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toolsApi } from '../features/tools/api'
import { ToolCard } from '../shared/components/ToolCard'
import { Shelf } from '../shared/components/Shelf'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from '../shared/ui/skeleton'
import { idOf } from '../lib/id'
import { useMe } from '../features/auth/useMe'
import { recommendationsApi } from '../features/recommendations/api'
import {
  ArrowUpRight, Search, Palette, Code2, PenLine,
  Megaphone, Video, Mic, BookOpen, Sparkles, Star, TrendingUp,
} from 'lucide-react'

const ACCENT_COLORS = ['#F6C913', '#0EC6B2', '#F47FBE', '#a78bfa', '#60a5fa']

const CATEGORIES = [
  { label: 'All Tools',  icon: Sparkles,  href: '/search' },
  { label: 'Design',     icon: Palette,   href: '/search?role=designer' },
  { label: 'Code',       icon: Code2,     href: '/search?role=developer' },
  { label: 'Writing',    icon: PenLine,   href: '/search?task=writing' },
  { label: 'Marketing',  icon: Megaphone, href: '/search?role=marketer' },
  { label: 'Video',      icon: Video,     href: '/search?task=video' },
  { label: 'Audio',      icon: Mic,       href: '/search?task=audio' },
  { label: 'Research',   icon: BookOpen,  href: '/search?task=research' },
]

const POPULAR = ['ChatGPT', 'Midjourney', 'Cursor', 'Grammarly', 'ElevenLabs']

function ConcentricCircles() {
  return (
    <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
      {Array.from({ length: 16 }, (_, i) => (
        <circle
          key={i}
          cx="150" cy="150"
          r={(i + 1) * 11}
          stroke="black"
          strokeWidth="1.1"
          opacity={0.5 - i * 0.02}
        />
      ))}
    </svg>
  )
}

function HeroSearch() {
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    nav(`/search${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`)
  }
  return (
    <form onSubmit={submit} className="w-full max-w-xl mx-auto">
      <div className="relative">
        {/* Ambient glow */}
        <div className="absolute -inset-px rounded-2xl bg-white/10 opacity-60 pointer-events-none" />
        <div className="relative flex items-center rounded-2xl border border-white/[0.12] bg-[#1c1c26] overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <Search className="ml-4 h-4.5 w-4.5 text-white/70 shrink-0 ml-5" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search 20+ AI tools..."
            className="flex-1 bg-transparent py-4 pl-3 pr-4 text-sm text-white placeholder:text-white/65 focus:outline-none"
          />
          <button
            type="submit"
            className="mr-2 rounded-xl bg-white px-5 py-2.5 text-[13px] font-semibold text-black hover:bg-white/90 transition-colors shrink-0"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

export function HomePage() {
  const nav = useNavigate()
  const { data, isLoading } = useQuery({ queryKey: ['shelves'], queryFn: toolsApi.shelves })
  const { data: me } = useMe()
  const { data: recos } = useQuery({
    queryKey: ['reco-home'],
    queryFn: recommendationsApi.home,
    enabled: !!me?.user,
  })
  const shelves = data?.data
  const r = recos?.data
  const trending: any[] = shelves?.trending || []

  return (
    <div className="space-y-12">

      {/* ── Hero ── */}
      <section className="pt-10 pb-2 flex flex-col items-center text-center gap-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs text-white/65">
          <TrendingUp className="h-3.5 w-3.5 text-[#0EC6B2]" />
          20+ curated AI tools and counting
        </div>

        <h1 className="text-5xl md:text-[64px] font-bold tracking-tight text-white leading-[1.07]">
          Discover the<br />best AI tools
        </h1>

        <p className="text-white/60 text-[15px] max-w-md leading-relaxed">
          Curated and ranked by the community. Find the right AI tool for every workflow.
        </p>

        <HeroSearch />

        <div className="flex items-center gap-x-3 gap-y-1.5 flex-wrap justify-center mt-1">
          <span className="text-[12px] text-white/65">Popular:</span>
          {POPULAR.map(name => (
            <button
              key={name}
              onClick={() => nav(`/search?q=${encodeURIComponent(name)}`)}
              className="text-[12px] text-white/60 hover:text-white/65 transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* ── Category chips ── */}
      <section className="flex gap-2 overflow-x-auto scrollbar-none -mx-1 px-1 pb-0.5">
        {CATEGORIES.map(({ label, icon: Icon, href }) => (
          <button
            key={label}
            onClick={() => nav(href)}
            className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] text-white/70 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.06] transition-all shrink-0"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </section>

      {/* ── Bento feature grid ── */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-3">

        {/* Yellow — featured tool */}
        <div
          className="md:col-span-5 relative rounded-[22px] bg-[#F6C913] p-7 min-h-[360px] flex flex-col justify-between overflow-hidden cursor-pointer"
          onClick={() => trending[0] && nav(`/tools/${idOf(trending[0])}`)}
        >
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1 text-[11px] font-semibold text-black/50 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-black/40 animate-pulse" />
              Featured
            </span>
            <h2 className="text-[2.1rem] font-bold text-black leading-[1.1] tracking-tight">
              Introducing<br />
              {isLoading
                ? <span className="inline-block h-9 w-36 rounded-xl bg-black/10 mt-1 align-middle" />
                : (trending[0]?.name || 'Scout')}
            </h2>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[310px] h-[310px] opacity-65">
              <ConcentricCircles />
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-2 text-[13px] text-black/55">
            <div className="h-1.5 w-1.5 rounded-full bg-black/40 shrink-0" />
            <span className="font-semibold text-black">{trending[0]?.name || 'Scout'}</span>
            <span className="text-black/35">—</span>
            <span className="capitalize">{trending[0]?.tasks?.[0] || trending[0]?.roles?.[0] || 'AI Discovery'}</span>
          </div>
        </div>

        {/* Middle column */}
        <div className="md:col-span-4 flex flex-col gap-3">
          {/* Teal */}
          <div className="flex-1 rounded-[22px] bg-[#0EC6B2] p-6 text-black flex flex-col justify-between">
            <div>
              <div className="text-[3.2rem] font-bold leading-none tracking-tight">20+</div>
              <p className="mt-3 text-[13px] text-black/65 leading-relaxed">
                Curated AI tools across design, code, writing, video, and more.
              </p>
            </div>
            <div>
              <div className="h-px w-full bg-black/12 mb-3" />
              <button
                onClick={() => nav('/search')}
                className="inline-flex items-center gap-1 text-[13px] font-bold hover:gap-2 transition-all"
              >
                Explore all <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Pink */}
          <div className="flex-1 rounded-[22px] bg-[#F47FBE] p-6 text-black">
            <span className="inline-flex items-center rounded-full border border-black/20 bg-white/25 px-3 py-1 text-[11px] font-semibold">
              What's new?
            </span>
            <p className="mt-3 text-[1.2rem] font-bold leading-snug tracking-tight">
              Can AI really be protected from text‑based attacks?
            </p>
          </div>
        </div>

        {/* Right — dark showcase */}
        <div className="md:col-span-3 rounded-[22px] bg-[#1c1c26] border border-white/[0.07] overflow-hidden flex flex-col">
          <div className="relative flex-1 min-h-[180px] flex flex-col items-center justify-center gap-3 p-5 bg-white/[0.04] overflow-hidden">
            {trending[1]?.logo_url ? (
              <img
                src={trending[1].logo_url}
                alt=""
                className="h-14 w-14 rounded-2xl object-cover ring-1 ring-white/10"
              />
            ) : (
              <div className="h-14 w-14 rounded-2xl bg-white/[0.07] flex items-center justify-center text-xl font-bold text-white/55">
                {(trending[1]?.name || 'D')[0]}
              </div>
            )}
            <span className="text-[15px] font-bold text-white/80 text-center px-2">
              {trending[1]?.name || 'DALL·E 2'}
            </span>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {(trending.slice(0, 3).length
              ? trending.slice(0, 3)
              : [
                  { name: 'ChatGPT', tasks: ['search engine'] },
                  { name: 'DALL·E', tasks: ['image generator'] },
                  { name: 'Whisper', tasks: ['speech recognition'] },
                ]
            ).map((t: any, i: number) => (
              <button
                key={t.name || i}
                onClick={() => (t.id || t._id) ? nav(`/tools/${idOf(t)}`) : undefined}
                className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/[0.03] transition-colors group"
              >
                <div className="text-[12.5px] min-w-0">
                  <span className="font-semibold text-white">{t.name}</span>
                  {'  '}
                  <span className="text-white/55">/ {t.tasks?.[0] || t.roles?.[0] || 'tool'}</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/65 shrink-0 ml-2 group-hover:text-white/70 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending numbered list ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-[#0EC6B2]" />
            Trending Now
          </h2>
          <button
            onClick={() => nav('/search')}
            className="text-[12px] text-white/55 hover:text-white/60 transition-colors"
          >
            View all →
          </button>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#18181f] overflow-hidden divide-y divide-white/[0.05]">
          {isLoading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-[14px]">
                  <Skeleton className="h-4 w-5 rounded bg-white/[0.07]" />
                  <Skeleton className="h-10 w-10 rounded-xl bg-white/[0.07]" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-32 rounded bg-white/[0.07]" />
                    <Skeleton className="h-3 w-20 rounded bg-white/[0.07]" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full bg-white/[0.07]" />
                </div>
              ))
            : trending.slice(0, 5).map((t: any, idx: number) => (
                <div
                  key={idOf(t)}
                  className="flex items-center gap-4 px-5 py-[14px] cursor-pointer hover:bg-white/[0.02] transition-colors group"
                  onClick={() => nav(`/tools/${idOf(t)}`)}
                >
                  <div className="w-5 text-[11px] font-mono text-white/65 shrink-0 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {t.logo_url ? (
                    <img
                      src={t.logo_url}
                      alt=""
                      className="h-10 w-10 rounded-xl object-cover shrink-0 bg-white/5 ring-1 ring-white/[0.06]"
                      onError={(e) => {
                        const el = e.currentTarget
                        el.style.display = 'none'
                        const fb = el.nextElementSibling as HTMLElement | null
                        if (fb) fb.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div
                    className="h-10 w-10 rounded-xl shrink-0 items-center justify-center text-sm font-bold"
                    style={{
                      display: t.logo_url ? 'none' : 'flex',
                      backgroundColor: ACCENT_COLORS[idx] + '18',
                      color: ACCENT_COLORS[idx],
                    }}
                  >
                    {t.name?.[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-white">{t.name}</div>
                    <div className="text-[11.5px] text-white/60 mt-0.5 capitalize">
                      {t.tasks?.[0] || t.roles?.[0] || 'AI Tool'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {t.avg_rating > 0 && (
                      <div className="hidden sm:flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[11px] text-white/65">{Number(t.avg_rating).toFixed(1)}</span>
                      </div>
                    )}
                    {t.pricing && (
                      <span className="hidden sm:inline-flex rounded-full border border-white/[0.1] px-2.5 py-1 text-[11px] text-white/65 capitalize">
                        {t.pricing}
                      </span>
                    )}
                    {(t.tasks || []).slice(0, 1).map((x: string) => (
                      <span key={x} className="hidden lg:inline-flex rounded-full border border-white/[0.08] px-2.5 py-1 text-[11px] text-white/55">
                        {x}
                      </span>
                    ))}
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/15 group-hover:text-white/65 transition-colors" />
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* ── Horizontal shelves ── */}
      <div className="space-y-9">
        {isLoading ? (
          <Shelf title="Trending Tools">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="min-w-[278px] snap-start">
                <Skeleton className="h-[160px] rounded-2xl bg-white/[0.05]" />
              </div>
            ))}
          </Shelf>
        ) : shelves?.trending ? (
          <Shelf title="Trending Tools">
            {shelves.trending.map((t: any) => (
              <div key={idOf(t)} className="snap-start" onClick={() => nav(`/tools/${idOf(t)}`)}>
                <ToolCard tool={t} />
              </div>
            ))}
          </Shelf>
        ) : null}

        {r?.roleShelf?.length ? (
          <Shelf title="Recommended For You">
            {r.roleShelf.map((t: any) => (
              <div key={idOf(t)} className="snap-start" onClick={() => nav(`/tools/${idOf(t)}`)}>
                <ToolCard tool={t} />
              </div>
            ))}
          </Shelf>
        ) : null}

        {r?.taskShelf?.length ? (
          <Shelf title="Based on Your Tasks">
            {r.taskShelf.map((t: any) => (
              <div key={idOf(t)} className="snap-start" onClick={() => nav(`/tools/${idOf(t)}`)}>
                <ToolCard tool={t} />
              </div>
            ))}
          </Shelf>
        ) : null}

        {!isLoading && shelves?.curated?.map((s: any) => (
          <Shelf key={s.key} title={s.title}>
            {s.data.map((t: any) => (
              <div key={idOf(t)} className="snap-start" onClick={() => nav(`/tools/${idOf(t)}`)}>
                <ToolCard tool={t} />
              </div>
            ))}
          </Shelf>
        ))}

        {!isLoading && shelves?.roles?.map((s: any) => (
          <Shelf key={s.key} title={s.title}>
            {s.data.map((t: any) => (
              <div key={idOf(t)} className="snap-start" onClick={() => nav(`/tools/${idOf(t)}`)}>
                <ToolCard tool={t} />
              </div>
            ))}
          </Shelf>
        ))}

        {!isLoading && shelves?.tasks?.map((s: any) => (
          <Shelf key={s.key} title={s.title}>
            {s.data.map((t: any) => (
              <div key={idOf(t)} className="snap-start" onClick={() => nav(`/tools/${idOf(t)}`)}>
                <ToolCard tool={t} />
              </div>
            ))}
          </Shelf>
        ))}
      </div>
    </div>
  )
}
