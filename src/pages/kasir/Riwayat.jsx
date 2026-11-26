import { useEffect, useState } from 'react'
import { formatRupiah } from '../../utils/formatCurrency'
import { getOrdersFromStorage, ORDERS_UPDATED_EVENT } from '../../utils/orderStorage'

function Riwayat() {
  const [orders, setOrders] = useState(() => getOrdersFromStorage())
  const [search, setSearch] = useState('')

  useEffect(() => {
    const syncOrders = () => setOrders(getOrdersFromStorage())

    window.addEventListener(ORDERS_UPDATED_EVENT, syncOrders)
    window.addEventListener('storage', syncOrders)
    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, syncOrders)
      window.removeEventListener('storage', syncOrders)
    }
  }, [])

  const query = search.trim().toLocaleLowerCase('id-ID')
  const completedOrders = orders.filter((order) => {
    if (order.status !== 'Selesai') return false
    return (
      !query ||
      [order.id, order.customerName, order.invoiceId]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase('id-ID').includes(query))
    )
  })

  const completedTotal = completedOrders.reduce(
    (total, order) => total + (Number(order.total) || 0),
    0,
  )

  return (
    <main className="flex-1 bg-[#f5efe6] px-4 py-8 text-[#39291f] md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-tan">Operasional</p>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">Riwayat Pesanan</h1>
            <p className="mt-2 text-sm text-[#665547]">
              Daftar pesanan yang sudah selesai diproses.
            </p>
          </div>
          <label className="w-full sm:max-w-xs">
            <span className="sr-only">Cari riwayat pesanan</span>
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
            <p className="text-sm text-[#665547]">Pesanan selesai</p>
            <p className="mt-2 text-3xl font-bold">{completedOrders.length}</p>
          </div>
          <div className="rounded-xl border border-[#39291f]/10 bg-white p-5 shadow-sm">
            <p className="text-sm text-[#665547]">Total penjualan tercatat</p>
            <p className="mt-2 text-2xl font-bold text-tan">
              {formatRupiah(completedTotal)}
            </p>
          </div>
        </section>

        {completedOrders.length === 0 ? (
          <section className="mt-5 rounded-xl border border-dashed border-[#39291f]/20 bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold">
              {query ? 'Pesanan tidak ditemukan' : 'Belum ada pesanan selesai'}
            </p>
            <p className="mt-2 text-sm text-[#665547]">
              Pesanan akan tercatat di sini setelah statusnya selesai dari halaman antrean.
            </p>
          </section>
        ) : (
          <div className="mt-5 overflow-hidden rounded-xl border border-[#39291f]/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-[#e9dfd1]/60 text-xs uppercase tracking-wide text-[#665547]">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Nomor antrean</th>
                    <th className="px-5 py-3 font-semibold">Pelanggan</th>
                    <th className="px-5 py-3 font-semibold">Waktu</th>
                    <th className="px-5 py-3 font-semibold">Pembayaran</th>
                    <th className="px-5 py-3 text-right font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#39291f]/10">
                  {completedOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-5 py-4 font-mono text-xs font-semibold">
                        {order.id}
                      </td>
                      <td className="px-5 py-4 font-medium">
                        {order.customerName || 'Pelanggan'}
                      </td>
                      <td className="px-5 py-4 text-[#665547]">
                        {order.createdAt || '—'}
                      </td>
                      <td className="px-5 py-4 text-[#665547]">
                        {order.paymentStatus || '—'}
                      </td>
                      <td className="px-5 py-4 text-right font-semibold">
                        {formatRupiah(Number(order.total) || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Riwayat
