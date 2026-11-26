import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getOrdersFromStorage, ORDERS_UPDATED_EVENT } from '../../utils/orderStorage'

function OrderSuccessView({ order }) {
  const navigate = useNavigate()
  const [currentOrder, setCurrentOrder] = useState(order)

  useEffect(() => {
    setCurrentOrder(order)
  }, [order])

  useEffect(() => {
    const syncOrder = () => {
      const latest = getOrdersFromStorage().find((item) => item.id === order.id)
      if (latest) {
        setCurrentOrder(latest)
      }
    }

    window.addEventListener(ORDERS_UPDATED_EVENT, syncOrder)
    window.addEventListener('storage', syncOrder)

    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, syncOrder)
      window.removeEventListener('storage', syncOrder)
    }
  }, [order.id])

  const isPaid = currentOrder.paymentStatus === 'Lunas'

  return (
    <main className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-2xl items-center px-6 py-16">
      <section className="w-full rounded-xl border border-[#39291f]/10 bg-[#f6efe4] p-8 text-center shadow-sm">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
            isPaid
              ? 'bg-[#dce7d1] text-[#4f7040]'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {isPaid ? '✓' : '◷'}
        </div>
        <p className="mt-4 font-mono text-xs font-semibold text-tan">
          Nomor Antrean: {currentOrder.id}
        </p>
        <h1 className="mt-1 text-3xl font-bold">
          {isPaid ? 'Pesanan Diterima!' : 'Menunggu Pembayaran Kasir'}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#665547]">
          {isPaid
            ? 'Pembayaran berhasil dikonfirmasi. Pesanan Anda sudah masuk antrean dan segera diracik.'
            : 'Pesanan Anda sudah dicatat. Silakan selesaikan pembayaran tunai di meja kasir.'}
        </p>

        <div className="mx-auto mt-6 max-w-sm space-y-1.5 rounded-lg border border-[#39291f]/10 bg-white p-4 text-left text-xs text-[#665547]">
          <div className="flex justify-between">
            <span>Atas Nama</span>
            <span className="font-semibold text-[#39291f]">{currentOrder.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span>Tipe Pesanan</span>
            <span className="font-semibold text-[#39291f]">
              {currentOrder.fulfillment === 'dine-in' ? 'Dine In' : 'Take Away'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status Pembayaran</span>
            <span className="font-semibold text-tan">{currentOrder.paymentStatus}</span>
          </div>
        </div>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-md border border-[#39291f]/20 bg-white px-6 py-3 text-sm font-medium text-[#39291f] hover:bg-[#e9dfd1]/50"
          >
            Kembali ke Beranda
          </button>
        </div>
      </section>
    </main>
  )
}

export default OrderSuccessView