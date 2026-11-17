
import { useEffect } from 'react'

function Header() {
    useEffect(() => {
        const toggle = document.getElementById('menu-toggle')
        const mobileNav = document.getElementById('mobile-nav')
        if (!toggle || !mobileNav) return
        const handleToggle = () => {
            const open = mobileNav.classList.toggle('hidden') === false
            mobileNav.classList.toggle('flex', open)
            toggle.setAttribute('aria-expanded', String(open))
        }
        toggle.addEventListener('click', handleToggle)
        return () => toggle.removeEventListener('click', handleToggle)
    }, [])
    return (

        <header class="bg-[#e9dfd1] border-y border-[#39291f]/15 sticky top-0 z-20">
            <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between ">
                <a href="#home" class="text-2xl font-bold italic tracking-tight ">Seruputin<span class="text-tan">aja</span></a>

                <nav class="hidden md:flex items-center gap-10 text-[15px] font-medium" aria-label="Navigasi utama">
                    <a href="#home" class="hover:text-tan transition-colors">Home</a>
                    <a href="#tentang" class="hover:text-tan transition-colors">Tentang Kami</a>
                    <a href="#menu" class="hover:text-tan transition-colors">Menu</a>
                    <a href="#kontak" class="hover:text-tan transition-colors">Kontak</a>
                </nav>

                <div class="flex items-center gap-5">
                    <button type="button" aria-label="Cari" class="hover:text-tan transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" stroke-linecap="round" />
                        </svg>
                    </button>
                    <button type="button" aria-label="Keranjang" class="relative hover:text-tan transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <circle cx="9" cy="20" r="1.2" />
                            <circle cx="17" cy="20" r="1.2" />
                        </svg>
                        <span id="cart-count"
                            class="hidden absolute -top-2 -right-2 bg-tan text-ink text-[10px] font-bold w-4 h-4 rounded-full items-center justify-center">0</span>
                    </button>
                    <button id="menu-toggle" type="button" aria-label="Buka menu" aria-expanded="false" class="md:hidden">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <nav id="mobile-nav" class="hidden md:hidden px-6 pb-5 flex-col gap-4 text-[15px] font-medium"
                aria-label="Navigasi mobile">
                <a href="#home">Home</a><a href="#tentang">Tentang Kami</a><a href="#menu">Menu</a><a href="#kontak">Kontak</a>
            </nav>
        </header>
    )
}

export default Header