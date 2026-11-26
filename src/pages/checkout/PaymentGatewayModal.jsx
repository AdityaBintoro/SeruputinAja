import { formatRupiah } from '../../utils/formatCurrency'

function PaymentGatewayModal({ order, onConfirmPaid, onCancel }) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-xl items-center px-6 py-14">
      <section className="w-full rounded-xl border border-[#39291f]/15 bg-[#f6efe4] p-6 shadow-sm md:p-8">
        <div className="flex items-center justify-between border-b border-[#39291f]/10 pb-4">
          <div>
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Menunggu Pembayaran
            </span>
            <h1 className="mt-2 text-2xl font-bold text-[#39291f]">
              Selesaikan Pembayaran
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#665547]">ID Invoice</p>
            <p className="font-mono text-sm font-semibold text-[#39291f]">
              {order.invoiceId}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-[#39291f]/10 bg-[#e9dfd1]/70 p-4 text-center">
          <p className="text-xs text-[#665547]">Total yang harus dibayar</p>
          <p className="mt-1 text-3xl font-bold text-tan">
            {formatRupiah(order.total)}
          </p>
          <p className="mt-1 text-xs text-[#665547]">
            Atas nama <span className="font-semibold">{order.customerName}</span> (
            {order.fulfillment === 'dine-in' ? 'Dine In' : 'Take Away'})
          </p>
        </div>

        {/* Slot integrasi Payment Gateway (Midtrans Snap / Xendit / QRIS) */}
        <div className="mt-6 rounded-lg border-2 border-dashed border-[#39291f]/25 bg-white p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-tan">
            Payment Gateway Template
          </p>
          <div className="mx-auto mt-4 flex h-40 w-40 flex-col items-center justify-center rounded-lg border border-[#39291f]/15 bg-[#f5efe6] p-3 text-xs text-[#665547]">
            <span className="font-semibold text-[#39291f]">[ QRIS / VA / Snap ]</span>
            <span className="mt-1">Area integrasi gateway</span>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#665547]">
            Pesanan belum diteruskan ke antrean kasir sebelum pembayaran terverifikasi.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onConfirmPaid}
            className="w-full rounded-md bg-tan px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:brightness-110"
          >
            Simulasi: Konfirmasi Pembayaran Berhasil
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-md border border-[#39291f]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#665547] transition hover:bg-[#e9dfd1]/50"
          >
            Ubah Metode / Batalkan
          </button>
        </div>
      </section>
    </main>
  )
}

export default PaymentGatewayModal