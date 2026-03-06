import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { savesApi } from '../features/saves/api'
import { ToolCard } from '../shared/components/ToolCard'
import { idOf } from '../lib/id'

export function MyListPage() {
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey: ['saves'], queryFn: savesApi.list })
  const mutation = useMutation({
    mutationFn: (toolId: string) => savesApi.remove(toolId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['saves'] }),
  })
  const tools = data?.data || []
  return (
    <div>
      <h1 className="text-xl font-semibold mb-5 text-white">My List</h1>
      {tools.length === 0 && (
        <div className="rounded-xl border border-white/10 p-10 text-center text-white/40">
          No saved tools yet. Start exploring trending tools.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {tools.map((t: any) => (
          <div key={idOf(t)}>
            <ToolCard tool={t} />
            <button
              onClick={() => mutation.mutate(idOf(t))}
              className="mt-2 w-full rounded-lg border border-white/15 py-1.5 text-xs text-white/50 hover:text-white hover:border-white/30 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
