import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Shelf({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: 'left' | 'right') => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -Math.round(el.clientWidth * 0.8) : Math.round(el.clientWidth * 0.8), behavior: 'smooth' })
  }
  return (
    <section>
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-white/60 uppercase tracking-wider">{title}</h2>
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => scrollBy('left')}
            className="h-7 w-7 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => scrollBy('right')}
            className="h-7 w-7 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto pb-3 snap-x scroll-smooth scrollbar-none"
      >
        {children}
      </div>
    </section>
  )
}
