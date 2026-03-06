import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { SearchBar } from '../../features/search/SearchBar'
import { useMe } from '../../features/auth/useMe'
import { authApi } from '../../features/auth/api'
import { Menu } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '../../components/ui/sheet'
import logo from '../../assets/logo.png'

function LogoIcon() {
  return (
    <div className="h-7 w-7 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden">
      <img src={logo} alt="Scout logo" className="h-[15px] w-[15px] object-contain" />
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
            <span className="text-[15px] tracking-tight">Scout</span>
          </Link>

          <div className="flex-1 max-w-sm">
            {!isHome && (
              <SearchBar onSubmit={(q) => nav(`/search?q=${encodeURIComponent(q)}`)} />
            )}
          </div>

          {/* Desktop nav */}
          <nav className="ml-auto hidden sm:flex items-center gap-1">
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

          {/* Mobile menu */}
          <div className="ml-auto sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="rounded-full p-2 text-white/70 hover:text-white hover:bg-white/[0.07] transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent className="bg-[#13131a] text-white w-72 border-l border-white/[0.08] p-5">
                <div className="flex items-center gap-2.5 font-bold mb-4">
                  <LogoIcon />
                  <span className="text-[15px] tracking-tight">Scout</span>
                </div>
                <div className="h-px w-full bg-white/10 mb-3" />
                <div className="flex flex-col">
                  <SheetClose asChild>
                    <button
                      onClick={() => nav('/search')}
                      className="w-full text-left rounded-lg px-3 py-2 text-[14px] text-white/80 hover:bg-white/[0.06]"
                    >
                      Discover
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      onClick={() => nav('/my-list')}
                      className="w-full text-left rounded-lg px-3 py-2 text-[14px] text-white/80 hover:bg-white/[0.06]"
                    >
                      Favorites
                    </button>
                  </SheetClose>

                  <div className="h-px w-full bg-white/10 my-3" />

                  {me?.user ? (
                    <>
                      <div className="px-3 py-2 text-[13px] text-white/50">
                        Signed in as <span className="text-white/80">{me.user.name?.split(' ')[0]}</span>
                      </div>
                      <SheetClose asChild>
                        <button
                          onClick={logout}
                          className="w-full text-left rounded-lg border border-white/15 px-3 py-2 text-[14px] text-white/80 hover:text-white hover:border-white/30"
                        >
                          Logout
                        </button>
                      </SheetClose>
                    </>
                  ) : (
                    <div className="flex gap-2 px-1">
                      <SheetClose asChild>
                        <button
                          onClick={() => nav('/login')}
                          className="flex-1 rounded-lg px-3 py-2 text-[14px] text-white/80 hover:bg-white/[0.06]"
                        >
                          Sign in
                        </button>
                      </SheetClose>
                      <SheetClose asChild>
                        <button
                          onClick={() => nav('/register')}
                          className="flex-1 rounded-lg bg-white px-3 py-2 text-[14px] font-semibold text-black hover:bg-white/90"
                        >
                          Sign up
                        </button>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        <Outlet />
      </main>
    </div>
  )
}
