import { useState } from 'react'
import { useNavigate } from 'react-router'
import { formatRupiah } from '../utils/formatCurrency'

function Header({ cartItems, cartCount, cartTotal, onRemoveItem, onIncreaseItem,
  onDecreaseItem }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-20 border-y border-[#39291f]/15 bg-[#e9dfd1]">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-2xl font-bold italic tracking-tight">
          Seruputin<span className="text-tan">aja</span>
        </a>

        <nav className="hidden items-center gap-10 text-[15px] font-medium md:flex" aria-label="Navigasi utama">
          <a href="#home" className="transition-colors hover:text-tan">Home</a>
          <a href="#tentang" className="transition-colors hover:text-tan">Tentang Kami</a>
          <a href="#menu" className="transition-colors hover:text-tan">Menu</a>
          <a href="#kontak" className="transition-colors hover:text-tan">Kontak</a>
        </nav>

        <div className="flex items-center gap-5">
          <button type="button" aria-label="Cari" className="transition-colors hover:text-tan">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative">
            <button
              type="button"
              aria-label={`Keranjang, ${cartCount} item`}
              aria-expanded={isCartOpen}
              aria-controls="cart-panel"
              onClick={() => setIsCartOpen((open) => !open)}
              className="relative transition-colors hover:text-tan"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="20" r="1.2" />
                <circle cx="17" cy="20" r="1.2" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-tan px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {isCartOpen && (
              <section
                id="cart-panel"
                aria-label="Pesanan dalam keranjang"
                className="fixed inset-x-4 top-20 z-50 mx-auto max-w-sm rounded-lg border border-[#39291f]/15 bg-[#f6efe4] p-4 text-[#39291f] shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mx-0 sm:mt-4 sm:w-80"
              >
                <div className="flex items-center justify-between border-b border-[#39291f]/10 pb-2.5">
                  <h2 className="text-lg font-semibold">Pesanan Anda</h2>
                  <span className="text-xs text-[#665547]">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} item
                  </span>
                </div>

                {cartItems.length === 0 ? (
                  <p className="py-6 text-center text-sm text-[#665547]">
                    Keranjang masih kosong.
                  </p>
                ) : (
                  <>
                    <ul className="mt-3 max-h-64 space-y-3 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between gap-3 border-b border-[#39291f]/10 pb-3 last:border-b-0 last:pb-0"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-sm sm:text-base">
                              {item.name}
                            </p>
                            <p className="text-xs sm:text-sm text-[#665547]">
                              {item.quantity} × {formatRupiah(item.price)}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            {/* Kontrol - dan + */}
                            <div className="flex items-center rounded-md border border-[#39291f]/20 bg-[#e9dfd1]/60">
                              <button
                                type="button"
                                onClick={() => onDecreaseItem(item.id)}
                                aria-label={`Kurangi jumlah ${item.name}`}
                                className="flex h-7 w-7 items-center justify-center text-sm font-semibold text-[#39291f] transition hover:bg-[#39291f]/10"
                              >
                                −
                              </button>
                              <span className="min-w-[1.5rem] text-center text-xs sm:text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onIncreaseItem(item.id)}
                                aria-label={`Tambah jumlah ${item.name}`}
                                className="flex h-7 w-7 items-center justify-center text-sm font-semibold text-[#39291f] transition hover:bg-[#39291f]/10"
                              >
                                +
                              </button>
                            </div>

                            {/* Tombol Hapus langsung */}
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              aria-label={`Hapus ${item.name} dari keranjang`}
                              className="px-1 text-xs sm:text-sm text-[#8b5e3c] hover:underline"
                            >
                              Hapus
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex items-center justify-between border-t border-[#39291f]/15 pt-3 font-semibold">
                      <span>Total</span>
                      <span className="text-[#B98F5E]">{formatRupiah(cartTotal)}</span>
                    </div>

                    {/* Tombol Checkout */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsCartOpen(false)
                        navigate('/checkout')
                      }}
                      className="mt-4 w-full rounded-md bg-tan px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-110"
                    >
                      Checkout
                    </button>
                  </>
                )}
              </section>
            )}
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="md:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col gap-4 px-6 pb-5 text-[15px] font-medium md:hidden`}
        aria-label="Navigasi mobile"
      >
        <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
        <a href="#tentang" onClick={() => setIsMobileMenuOpen(false)}>Tentang Kami</a>
        <a href="#menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</a>
        <a href="#kontak" onClick={() => setIsMobileMenuOpen(false)}>Kontak</a>
      </nav>
    </header>
  )
}

export default Header
