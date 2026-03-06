import { useQuery } from '@tanstack/react-query'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toolsApi } from '../features/tools/api'
import { ToolCard } from '../shared/components/ToolCard'
import { FiltersBar } from '../features/search/FiltersBar'
import { idOf } from '../lib/id'

export function SearchPage() {
  const [params, setSearchParams] = useSearchParams()
  const nav = useNavigate()
  const q = params.get('q') || ''
  const { data, isLoading } = useQuery({
    queryKey: ['search', params.toString()],
    queryFn: () => toolsApi.list(params.toString()),
  })
  const page = Number(params.get('page') || '1')
  const limit = Number(params.get('limit') || '20')
  const total = data?.total || 0
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const setPage = (p: number) => {
    const next = new URLSearchParams(params)
    next.set('page', String(p))
    setSearchParams(next, { replace: true })
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-5 text-white">
        {q ? <>Search results for <span className="text-white/50">"{q}"</span></> : 'Discover Tools'}
      </h1>
      <FiltersBar />
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {data?.data?.map((t: any) => (
          <div key={idOf(t)} onClick={() => nav(`/tools/${idOf(t)}`)}>
            <ToolCard tool={t} />
          </div>
        ))}
      </div>
      {!isLoading && data?.data?.length === 0 && (
        <div className="rounded-xl border border-white/10 p-10 text-center text-white/40">
          No tools found. Try different filters.
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/60 hover:text-white disabled:opacity-30 transition-colors"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <span className="text-sm text-white/40">Page {page} of {totalPages}</span>
          <button
            className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/60 hover:text-white disabled:opacity-30 transition-colors"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
