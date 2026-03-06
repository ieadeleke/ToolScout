import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const roles = [
  { key: 'designer', label: 'Design' },
  { key: 'developer', label: 'Code' },
  { key: 'marketer', label: 'Marketing' },
  { key: 'writer', label: 'Writing' },
]
const tasks = [
  { key: 'writing', label: 'Writing Faster' },
  { key: 'images', label: 'Images' },
  { key: 'summarize', label: 'Summarize' },
]
const pricing = [
  { key: 'free', label: 'Free' },
  { key: 'freemium', label: 'Freemium' },
  { key: 'paid', label: 'Paid' },
]

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'bg-white text-black'
          : 'border border-white/20 text-white/60 hover:text-white hover:border-white/40'
      }`}
    >
      {children}
    </button>
  )
}

export function FiltersBar() {
  const [params, setParams] = useSearchParams()

  const toggleMulti = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    const values = next.getAll(key)
    const idx = values.indexOf(value)
    if (idx >= 0) {
      next.delete(key)
      values.filter(v => v !== value).forEach(v => next.append(key, v))
    } else {
      next.append(key, value)
    }
    next.set('page', '1')
    setParams(next, { replace: true })
  }

  const clearKey = (key: string) => {
    const next = new URLSearchParams(params)
    next.delete(key)
    next.set('page', '1')
    setParams(next, { replace: true })
  }

  const active = useMemo(() => ({
    roles: params.getAll('role'),
    tasks: params.getAll('task'),
    pricing: params.getAll('pricing'),
    rating_gte: params.get('rating_gte') || '',
  }), [params])

  return (
    <div className="mb-5 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-white/30 mr-1">Roles</span>
        {roles.map(r => (
          <FilterPill key={r.key} active={active.roles.includes(r.key)} onClick={() => toggleMulti('role', r.key)}>
            {r.label}
          </FilterPill>
        ))}
        <span className="text-xs text-white/30 mx-1">Tasks</span>
        {tasks.map(t => (
          <FilterPill key={t.key} active={active.tasks.includes(t.key)} onClick={() => toggleMulti('task', t.key)}>
            {t.label}
          </FilterPill>
        ))}
        <span className="text-xs text-white/30 mx-1">Pricing</span>
        {pricing.map(p => (
          <FilterPill key={p.key} active={active.pricing.includes(p.key)} onClick={() => toggleMulti('pricing', p.key)}>
            {p.label}
          </FilterPill>
        ))}
        <span className="text-xs text-white/30 mx-1">Rating</span>
        {[4, 4.5].map(r => (
          <FilterPill key={r} active={active.rating_gte === String(r)} onClick={() => toggleMulti('rating_gte', String(r))}>
            {r}+
          </FilterPill>
        ))}
        {params.toString() && (
          <button
            className="text-xs text-white/40 hover:text-white/70 transition-colors ml-1"
            onClick={() => setParams(new URLSearchParams({ q: params.get('q') || '' }))}
          >
            Clear all
          </button>
        )}
      </div>
      {(active.roles.length || active.tasks.length || active.pricing.length || active.rating_gte) ? (
        <div className="flex flex-wrap items-center gap-2">
          {active.roles.map(v => (
            <span key={'r-' + v} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/50">
              Role: {v}
              <button onClick={() => toggleMulti('role', v)} className="hover:text-white">×</button>
            </span>
          ))}
          {active.tasks.map(v => (
            <span key={'t-' + v} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/50">
              Task: {v}
              <button onClick={() => toggleMulti('task', v)} className="hover:text-white">×</button>
            </span>
          ))}
          {active.pricing.map(v => (
            <span key={'p-' + v} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/50">
              {v}
              <button onClick={() => toggleMulti('pricing', v)} className="hover:text-white">×</button>
            </span>
          ))}
          {active.rating_gte && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/50">
              Rating: {active.rating_gte}+
              <button onClick={() => clearKey('rating_gte')} className="hover:text-white">×</button>
            </span>
          )}
        </div>
      ) : null}
    </div>
  )
}
