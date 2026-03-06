import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { SearchBar } from '../../features/search/SearchBar'
import { useMe } from '../../features/auth/useMe'
import { authApi } from '../../features/auth/api'

function LogoIcon() {
  return (
    <div className="h-7 w-7 rounded-lg bg-white flex items-center justify-center shrink-0">
      <svg viewBox="0 0 16 16" fill="none" className="h-[15px] w-[15px]">
        <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" fill="#13131a" />
        <rect x="9"   y="1.5" width="5.5" height="5.5" rx="1.5" fill="#13131a" />
        <rect x="1.5" y="9"   width="5.5" height="5.5" rx="1.5" fill="#13131a" />
        <rect x="9"   y="9"   width="5.5" height="5.5" rx="1.5" fill="#13131a" />
      </svg>
    </div>
  )
}

export function AppShell() {
  const nav = useNavigate()
  const loc = useLocation()
  const isHome = loc.pathname === '/'
  const { data: me, refetch } = useMe()
  const logout = async () => { await authApi.logout(); refetch(); nav('/') }

  return (
    <div className="min-h-screen bg-[#13131a] text-white">
      {/* Gradient top accent */}
      <div className="h-[2px] bg-gradient-to-r from-[#F6C913] via-[#0EC6B2] to-[#F47FBE]" />

      <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#13131a]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 h-14 flex items-center gap-4">

          <Link to="/" className="flex items-center gap-2.5 font-bold text-white shrink-0 hover:opacity-80 transition-opacity">
            <LogoIcon />
            <span className="text-[15px] tracking-tight">ToolScout</span>
          </Link>

          <div className="flex-1 max-w-sm">
            {!isHome && (
              <SearchBar onSubmit={(q) => nav(`/search?q=${encodeURIComponent(q)}`)} />
            )}
          </div>

          <nav className="ml-auto flex items-center gap-1">
            <button
              onClick={() => nav('/search')}
              className="rounded-full px-3.5 py-1.5 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.07] transition-all"
            >
              Discover
            </button>
            <button
              onClick={() => nav('/my-list')}
              className="rounded-full px-3.5 py-1.5 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.07] transition-all"
            >
              Favorites
            </button>

            <div className="w-px h-4 bg-white/15 mx-1" />

            {me?.user ? (
              <>
                <span className="text-[13px] text-white/50 px-1.5 hidden sm:inline">
                  {me.user.name?.split(' ')[0]}
                </span>
                <button
                  onClick={logout}
                  className="rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] text-white/70 hover:text-white hover:border-white/30 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => nav('/login')}
                  className="rounded-full px-3.5 py-1.5 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.07] transition-all"
                >
                  Sign in
                </button>
                <button
                  onClick={() => nav('/register')}
                  className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-black hover:bg-white/90 transition-colors"
                >
                  Sign up
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        <Outlet />
      </main>
    </div>
  )
}
