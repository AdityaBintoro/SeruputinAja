import { Link, useLocation, useNavigate } from 'react-router'

const cashierNavigation = [
  { label: 'Antrean Pesanan', path: '/kasir' },
  { label: 'Buat Pesanan', path: '/kasir/buat-pesanan' },
  { label: 'Daftar Menu', path: '/kasir/menu' },
  { label: 'Riwayat Pesanan', path: '/kasir/riwayat' },
]

function KasirHeader() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const normalizedPath = pathname.replace(/^\/kasirpage(?=\/|$)/, '/kasir')

  return (
    <header className="sticky top-0 z-30 border-b border-[#39291f]/12 bg-[#f6efe4]/95 px-4 py-3.5 text-[#39291f] backdrop-blur-xs md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/kasir"
          className="text-lg font-bold tracking-tight text-[#39291f]"
        >
          SeruputinAja
          <span className="ml-2 text-sm font-semibold text-tan">Panel Kasir</span>
        </Link>

        <nav
          aria-label="Navigasi kasir"
          className="flex flex-wrap items-center gap-2"
        >
          {cashierNavigation.map(({ label, path }) => {
            const isActive =
              path === '/kasir'
                ? normalizedPath === path
                : normalizedPath.startsWith(path)

            return (
              <Link
                key={path}
                to={path}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#39291f] text-[#f6efe4]'
                    : 'border border-[#39291f]/20 bg-white text-[#39291f] hover:bg-[#e9dfd1]/60'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <button
            type="button"
            onClick={() => navigate('/login', { replace: true })}
            className="rounded-lg px-3 py-2 text-xs font-semibold text-[#665547] transition-colors hover:bg-[#e9dfd1]/60 hover:text-[#39291f]"
          >
            Keluar Kasir
          </button>
        </nav>
      </div>
    </header>
  )
}

export default KasirHeader