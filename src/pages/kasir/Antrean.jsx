import { useEffect, useMemo, useState } from 'react'
import { formatRupiah } from '../../utils/formatCurrency'
import {
  getOrdersFromStorage,
  markOrderAsPaid,
  ORDERS_UPDATED_EVENT,
  updateOrderStatus,
} from '../../utils/orderStorage'

const nextStatus = {
  Menunggu: 'Diproses',
  Diproses: 'Siap Diambil',
  'Siap Diambil': 'Selesai',
}

function getOrderAction(order) {
  if (order.paymentStatus !== 'Lunas') {
    return { label: 'Konfirmasi pembayaran', next: 'paid' }
  }

  const status = order.status || 'Menunggu'
  return nextStatus[status]
    ? { label: `Pindahkan ke ${nextStatus[status]}`, next: nextStatus[status] }
    : null
}

function Antrean() {
  const [orders, setOrders] = useState(() => getOrdersFromStorage())
  const [filter, setFilter] = useState('Aktif')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const syncOrders = () => setOrders(getOrdersFromStorage())

    window.addEventListener(ORDERS_UPDATED_EVENT, syncOrders)
    window.addEventListener('storage', syncOrders)
    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, syncOrders)
      window.removeEventListener('storage', syncOrders)
    }
  }, [])

  const visibleOrders = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('id-ID')
    return orders.filter((order) => {
      const isComplete = order.status === 'Selesai'
      const matchesFilter = filter === 'Selesai' ? isComplete : !isComplete
      const matchesSearch =
        !query ||
        [order.id, order.customerName, order.invoiceId]
          .filter(Boolean)
          .some((value) => value.toLocaleLowerCase('id-ID').includes(query))

      return matchesFilter && matchesSearch
    })
  }, [filter, orders, search])

  const activeOrders = orders.filter((order) => order.status !== 'Selesai')
  const unpaidOrders = orders.filter((order) => order.paymentStatus !== 'Lunas')

  const handleAction = (order) => {
    const action = getOrderAction(order)
    if (!action) return

    try {
      if (action.next === 'paid') {
        markOrderAsPaid(order.id)
      } else {
        updateOrderStatus(order.id, action.next)
      }
      setError('')
    } catch {
      setError('Perubahan pesanan gagal disimpan. Silakan coba lagi.')
    }
  }

  return (
    <main className="flex-1 bg-[#f5efe6] px-4 py-8 text-[#39291f] md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-tan">Operasional</p>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">Antrean Pesanan</h1>
            <p className="mt-2 text-sm text-[#665547]">
              Pesanan dari halaman utama akan tampil di sini secara otomatis.
            </p>
          </div>
          <label className="w-full sm:max-w-xs">
            <span className="sr-only">Cari pesanan</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama atau nomor antrean"
              className="w-full rounded-lg border border-[#39291f]/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-tan"
            />
          </label>
        </div>

        <section className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#39291f]/10 bg-white p-5 shadow-sm">
            <p className="text-sm text-[#665547]">Pesanan aktif</p>
            <p className="mt-2 text-3xl font-bold">{activeOrders.length}</p>
          </div>
          <div className="rounded-xl border border-[#39291f]/10 bg-white p-5 shadow-sm">
            <p className="text-sm text-[#665547]">Menunggu pembayaran</p>
            <p className="mt-2 text-3xl font-bold">{unpaidOrders.length}</p>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-lg border border-[#39291f]/10 bg-white p-1">
            {['Aktif', 'Selesai'].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${filter === value
                  ? 'bg-[#39291f] text-white'
                  : 'text-[#665547] hover:bg-[#f5efe6]'
                  }`}
              >
                {value}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#665547]">
            {visibleOrders.length} pesanan ditampilkan
          </p>
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

        {visibleOrders.length === 0 ? (
          <section className="mt-4 rounded-xl border border-dashed border-[#39291f]/20 bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold">
              {search ? 'Pesanan tidak ditemukan' : `Belum ada pesanan ${filter.toLowerCase()}`}
            </p>
            <p className="mt-2 text-sm text-[#665547]">
              Pesanan baru yang dibuat di halaman utama akan muncul di daftar ini.
            </p>
          </section>
        ) : (
          <section className="mt-4 space-y-4">
            {visibleOrders.map((order) => {
              const status = order.status || 'Menunggu'
              const action = getOrderAction(order)
              const isPaid = order.paymentStatus === 'Lunas'

              return (
                <article
                  key={order.id}
                  className="rounded-xl border border-[#39291f]/10 bg-white p-5 shadow-sm md:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 border-b border-[#39291f]/10 pb-4 sm:flex-row sm:items-start">
                    <div>
                      <p className="font-mono text-xs font-bold tracking-wide text-tan">
                        {order.id}
                      </p>
                      <h2 className="mt-1 text-lg font-bold">
                        {order.customerName || 'Pelanggan'}
                      </h2>
                      <p className="mt-1 text-xs text-[#665547]">
                        {order.createdAt || 'Waktu tidak tersedia'} ·{' '}
                        {order.fulfillment === 'dine-in' ? 'Dine In' : 'Take Away'}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${isPaid
                          ? 'bg-[#e6efdf] text-[#456239]'
                          : 'bg-amber-100 text-amber-800'
                          }`}
                      >
                        {order.paymentStatus || 'Belum bayar'}
                      </span>
                      <span className="rounded-full bg-[#f5efe6] px-3 py-1 text-xs font-semibold text-[#665547]">
                        {status}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-5 pt-4 md:grid-cols-[minmax(0,1fr)_220px]">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wide text-[#665547]">
                        Detail pesanan
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {(order.items || []).map((item, index) => (
                          <li
                            key={`${order.id}-${item.id || item.name}-${index}`}
                            className="flex justify-between gap-4 text-sm"
                          >
                            <span>
                              {item.quantity} × {item.name}
                            </span>
                            <span className="shrink-0 font-medium">
                              {formatRupiah((item.price || 0) * (item.quantity || 0))}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {order.notes && (
                        <p className="mt-3 rounded-md bg-[#f5efe6] px-3 py-2 text-xs text-[#665547]">
                          Catatan: {order.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-between gap-4 border-t border-[#39291f]/10 pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                      <div>
                        <p className="text-xs text-[#665547]">Total</p>
                        <p className="mt-1 text-lg font-bold text-tan">
                          {formatRupiah(order.total || 0)}
                        </p>
                      </div>
                      {action && (
                        <button
                          type="button"
                          onClick={() => handleAction(order)}
                          className="rounded-lg bg-[#39291f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#574233]"
                        >
                          {action.label}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </section>
        )}
      </div>
    </main>
  )
}

export default Antrean
