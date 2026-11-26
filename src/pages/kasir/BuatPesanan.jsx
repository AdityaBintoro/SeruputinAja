import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { MENU_ITEMS } from '../../data/menuData'
import { formatRupiah } from '../../utils/formatCurrency'
import { saveOrderToStorage } from '../../utils/orderStorage'

function BuatPesanan() {
  const navigate = useNavigate()
  const [customerName, setCustomerName] = useState('')
  const [fulfillment, setFulfillment] = useState('dine-in')
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Tunai di Kasir')
  const [isPaid, setIsPaid] = useState(true)
  const [quantities, setQuantities] = useState({})
  const [menuSearch, setMenuSearch] = useState('')
  const [error, setError] = useState('')

  const filteredMenus = MENU_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(menuSearch.trim().toLowerCase()),
  )

  const selectedItems = MENU_ITEMS.filter((item) => quantities[item.id] > 0).map(
    (item) => ({ ...item, quantity: quantities[item.id] }),
  )
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const changeQuantity = (itemId, amount) => {
    setQuantities((current) => {
      const quantity = Math.max(0, (current[itemId] || 0) + amount)
      return { ...current, [itemId]: quantity }
    })
    setError('')
  }

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
    setIsPaid(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (selectedItems.length === 0) {
      setError('Pilih minimal satu menu untuk membuat pesanan.')
      return
    }

    const now = new Date()
    const order = {
      id: `ORD-${now.getTime().toString().slice(-6)}`,
      invoiceId: `INV-${now.getTime().toString().slice(-8)}`,
      customerName: customerName.trim(),
      fulfillment,
      notes: notes.trim(),
      paymentMethod,
      items: selectedItems.map(({ id, name, price, quantity }) => ({
        id,
        name,
        price,
        quantity,
      })),
      total,
      createdAt: now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      paymentStatus: isPaid ? 'Lunas' : 'Belum Bayar (Kasir)',
      status: 'Menunggu',
    }

    try {
      saveOrderToStorage(order)
      navigate('/kasir', { state: { createdOrderId: order.id } })
    } catch {
      setError('Pesanan gagal disimpan. Periksa penyimpanan browser lalu coba lagi.')
    }
  }

  return (
    <main className="flex-1 bg-[#f5efe6] px-4 py-8 text-[#39291f] md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7">
          <p className="text-sm font-semibold text-tan">Transaksi</p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">Buat Pesanan</h1>
          <p className="mt-2 text-sm text-[#665547]">
            Catat pesanan pelanggan langsung ke antrean kasir.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
        >
          <div className="space-y-6">
            <section className="rounded-xl border border-[#39291f]/10 bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-lg font-bold">Data Pelanggan</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Nama pelanggan
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Masukkan nama pelanggan"
                    className="mt-2 w-full rounded-lg border border-[#39291f]/15 bg-[#fdfbf8] px-4 py-3 font-normal outline-none focus:border-tan"
                  />
                </label>
                <label className="text-sm font-medium">
                  Tipe pesanan
                  <select
                    value={fulfillment}
                    onChange={(event) => setFulfillment(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-[#39291f]/15 bg-[#fdfbf8] px-4 py-3 font-normal outline-none focus:border-tan"
                  >
                    <option value="dine-in">Dine In</option>
                    <option value="take-away">Take Away</option>
                  </select>
                </label>
                <label className="text-sm font-medium sm:col-span-2">
                  Catatan pesanan <span className="font-normal text-[#665547]">(opsional)</span>
                  <input
                    type="text"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Contoh: tanpa gula, es dipisah"
                    className="mt-2 w-full rounded-lg border border-[#39291f]/15 bg-[#fdfbf8] px-4 py-3 font-normal outline-none focus:border-tan"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-xl border border-[#39291f]/10 bg-white p-5 shadow-sm md:p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold">Pilih Menu</h2>
                  <Link
                    to="/kasir/menu"
                    className="text-xs font-semibold text-tan hover:underline"
                  >
                    Lihat daftar menu
                  </Link>
                </div>
                <input
                  type="search"
                  value={menuSearch}
                  onChange={(event) => setMenuSearch(event.target.value)}
                  placeholder="Cari menu..."
                  className="w-full rounded-lg border border-[#39291f]/15 bg-[#fdfbf8] px-3.5 py-2 text-xs outline-none focus:border-tan sm:w-52"
                />
              </div>

              {filteredMenus.length === 0 ? (
                <p className="mt-5 rounded-lg bg-[#f5efe6] px-4 py-6 text-center text-sm text-[#665547]">
                  Menu tidak ditemukan.
                </p>
              ) : (
                <div className="mt-4 max-h-[460px] divide-y divide-[#39291f]/10 overflow-y-auto pr-1">
                  {filteredMenus.map((item) => {
                    const quantity = quantities[item.id] || 0

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <img
                            src={item.image}
                            alt=""
                            className="h-14 w-14 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{item.name}</p>
                            <p className="mt-1 text-xs text-[#665547]">
                              {formatRupiah(item.price)}
                            </p>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Kurangi ${item.name}`}
                            onClick={() => changeQuantity(item.id, -1)}
                            disabled={quantity === 0}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#39291f]/15 text-lg disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Tambah ${item.name}`}
                            onClick={() => changeQuantity(item.id, 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#39291f]/15 text-lg hover:bg-[#f5efe6]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          </div>

          <aside className="rounded-xl border border-[#39291f]/10 bg-white p-5 shadow-sm lg:sticky lg:top-28">
            <h2 className="text-lg font-bold">Ringkasan Pesanan</h2>
            {selectedItems.length === 0 ? (
              <p className="mt-4 text-sm text-[#665547]">
                Pilih menu untuk mulai membuat pesanan.
              </p>
            ) : (
              <ul className="mt-4 max-h-60 space-y-3 overflow-y-auto">
                {selectedItems.map((item) => (
                  <li key={item.id} className="flex justify-between gap-3 text-sm">
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span className="shrink-0 font-medium">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 space-y-4 border-t border-[#39291f]/10 pt-4">
              <label className="block text-sm font-medium">
                Metode pembayaran
                <select
                  value={paymentMethod}
                  onChange={(event) => handlePaymentMethodChange(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-[#39291f]/15 bg-[#fdfbf8] px-3 py-2.5 font-normal outline-none focus:border-tan"
                >
                  <option>Tunai di Kasir</option>
                  <option>QRIS</option>
                </select>
              </label>

              {paymentMethod === 'QRIS' && (
                <div className="rounded-xl border border-[#39291f]/15 bg-[#f5efe6] p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-tan">
                    Pembayaran QRIS
                  </p>
                  <div className="mx-auto mt-3 flex h-36 w-36 items-center justify-center rounded-lg border border-dashed border-[#39291f]/30 bg-white p-2 text-xs text-[#665547]">
                    {/* Ganti dengan <img src="/qris-kedai.png" alt="Kode QRIS" className="h-full w-full object-contain" /> */}
                    <span>Scan QRIS Kedai</span>
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#39291f]">
                    {formatRupiah(total)}
                  </p>
                  <p className="mt-1 text-[11px] text-[#665547]">
                    Pastikan dana sudah masuk sebelum centang lunas.
                  </p>
                </div>
              )}

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isPaid}
                  onChange={(event) => setIsPaid(event.target.checked)}
                  className="accent-[#8b5e3c]"
                />
                Pembayaran sudah diterima
              </label>

              <div className="flex justify-between border-t border-[#39291f]/10 pt-4 font-bold">
                <span>Total</span>
                <span className="text-tan">{formatRupiah(total)}</span>
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={selectedItems.length === 0}
              className="mt-5 w-full rounded-lg bg-[#39291f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#574233] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Simpan ke Antrean
            </button>
          </aside>
        </form>
      </div>
    </main>
  )
}

export default BuatPesanan