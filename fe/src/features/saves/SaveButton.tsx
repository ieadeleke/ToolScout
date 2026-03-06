import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { savesApi } from './api'
import { useMe } from '../auth/useMe'
import { toast } from 'sonner'
import { Bookmark, BookmarkCheck } from 'lucide-react'

export function SaveButton({ toolId }: { toolId: string }) {
  const nav = useNavigate()
  const qc = useQueryClient()
  const { data: me } = useMe()
  const { data: saves } = useQuery({ queryKey: ['saves'], queryFn: savesApi.list, enabled: !!me?.user })
  const saved = !!(saves?.data || []).find((t: any) => t.id === toolId)

  const add = useMutation({
    mutationFn: () => savesApi.add(toolId),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['saves'] }); toast.success('Saved to your list') },
    onError: () => toast.error('Failed to save'),
  })
  const remove = useMutation({
    mutationFn: () => savesApi.remove(toolId),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['saves'] }); toast.success('Removed from list') },
    onError: () => toast.error('Failed to remove'),
  })

  if (!me?.user) {
    return (
      <button
        onClick={() => nav('/login')}
        className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all"
      >
        <Bookmark className="h-4 w-4" />
        Sign in to save
      </button>
    )
  }

  return saved ? (
    <button
      onClick={() => remove.mutate()}
      disabled={remove.isPending}
      className="flex items-center gap-2 rounded-xl border border-[#0EC6B2]/40 bg-[#0EC6B2]/10 px-4 py-2.5 text-sm text-[#0EC6B2] hover:bg-[#0EC6B2]/15 transition-all disabled:opacity-50"
    >
      <BookmarkCheck className="h-4 w-4" />
      Saved
    </button>
  ) : (
    <button
      onClick={() => add.mutate()}
      disabled={add.isPending}
      className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:border-white/30 transition-all disabled:opacity-50"
    >
      <Bookmark className="h-4 w-4" />
      Save
    </button>
  )
}
