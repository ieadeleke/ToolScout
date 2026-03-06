import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api-client'
import { Search } from 'lucide-react'

export function SearchBar({ onSubmit }: { onSubmit: (q: string) => void }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)

  const { data } = useQuery({
    queryKey: ['suggestions', q],
    queryFn: () => api.get('/search/suggestions?q=' + encodeURIComponent(q)),
    enabled: q.trim().length > 1,
  })

  const suggestions: Array<{ id: string; name: string; slug: string }> = data?.suggestions || []

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  useEffect(() => { setActive(0) }, [q])

  return (
    <div className="relative" ref={boxRef}>
      <form onSubmit={(e) => { e.preventDefault(); setOpen(false); onSubmit(q) }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (!open) return
              if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, suggestions.length - 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
              if (e.key === 'Enter' && suggestions[active]) {
                e.preventDefault(); setOpen(false); onSubmit(suggestions[active].name)
              }
              if (e.key === 'Escape') setOpen(false)
            }}
            placeholder="Search AI tools..."
            className="w-full rounded-full border border-white/15 bg-white/5 py-2 pl-9 pr-4 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
          />
        </div>
      </form>
      {open && suggestions.length > 0 && (
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-white/15 bg-[#1c1c26] shadow-xl overflow-hidden">
          {suggestions.map((s, i) => (
            <button
              key={s.id}
              className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${i === active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => { e.preventDefault(); setOpen(false); onSubmit(s.name) }}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
