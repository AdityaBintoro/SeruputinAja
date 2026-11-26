import { useState } from 'react'
import { Link } from 'react-router'
import { MENU_ITEMS } from '../../data/menuData'
import { formatRupiah } from '../../utils/formatCurrency'

function DaftarMenu() {
  const [search, setSearch] = useState('')
  const query = search.trim().toLocaleLowerCase('id-ID')
  const visibleItems = MENU_ITEMS.filter((item) =>
    item.name.toLocaleLowerCase('id-ID').includes(query),
  )

  return (
    <main className="flex-1 bg-[#f5efe6] px-4 py-8 text-[#39291f] md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-tan">Operasional</p>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">Daftar Menu</h1>
            <p className="mt-2 text-sm text-[#665547]">
              Lihat menu dan harga untuk membantu melayani pelanggan.
            </p>
          </div>
          <Link
            to="/kasir/buat-pesanan"
            className="w-fit rounded-lg bg-[#39291f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#574233]"
          >
            Buat Pesanan
          </Link>
        </div>

        <label className="mt-7 block sm:max-w-sm">
          <span className="sr-only">Cari menu</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama menu"
            className="w-full rounded-lg border border-[#39291f]/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-tan"
          />
        </label>

        {visibleItems.length === 0 ? (
          <section className="mt-5 rounded-xl border border-dashed border-[#39291f]/20 bg-white px-6 py-14 text-center">
            <p className="font-semibold">Menu tidak ditemukan</p>
            <p className="mt-2 text-sm text-[#665547]">
              Coba gunakan kata kunci pencarian yang berbeda.
            </p>
          </section>
        ) : (
          <section className="mt-5 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-row overflow-hidden rounded-lg border border-[#39291f]/10 bg-[#f6efe4] shadow-sm sm:flex-col"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-28 shrink-0 bg-[#d9c9b2] object-cover sm:h-auto sm:aspect-[4/3] sm:w-full"
                />
                <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-5">
                  <h2 className="text-base font-semibold text-[#39291f] sm:text-lg">
                    {item.name}
                  </h2>
                  <p className="mt-0.5 flex-1 text-xs font-light text-[#665547] line-clamp-2 sm:mt-1 sm:text-sm">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2 sm:mt-5">
                    <span className="text-sm font-semibold text-[#B98F5E] sm:text-base">
                      {formatRupiah(item.price)}
                    </span>
                    <Link
                      to="/kasir/buat-pesanan"
                      state={{ preselectItemId: item.id }}
                      className="rounded-md bg-[#B98F5E] px-3.5 py-2 text-xs font-medium text-white transition hover:brightness-110 sm:px-4 sm:text-sm"
                    >
                      Pesan
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}

export default DaftarMenu