import { formatRupiah } from '../../utils/formatCurrency'

function OrderSummarySidebar({ cartItems, cartTotal, fulfillment, payment }) {
  return (
    <aside className="h-fit rounded-xl border border-[#39291f]/10 bg-[#f6efe4] p-5 shadow-sm md:p-6 lg:sticky lg:top-28">
      <h2 className="text-lg font-semibold">Ringkasan Pesanan</h2>
      <ul className="mt-4 max-h-72 space-y-4 overflow-y-auto pr-1">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.name}</p>
              <p className="mt-1 text-xs text-[#665547]">
                {item.quantity} × {formatRupiah(item.price)}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold">
              {formatRupiah(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2 border-t border-[#39291f]/15 pt-4 text-sm">
        <div className="flex justify-between text-[#665547]">
          <span>Tipe</span>
          <span className="font-medium text-[#39291f]">
            {fulfillment === 'dine-in' ? 'Dine In' : 'Take Away'}
          </span>
        </div>
        <div className="flex justify-between border-t border-[#39291f]/15 pt-3 text-base font-bold">
          <span>Total</span>
          <span className="text-tan">{formatRupiah(cartTotal)}</span>
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-md bg-tan px-4 py-3 text-sm font-medium text-white shadow-sm hover:brightness-110"
      >
        {payment === 'gateway' ? 'Lanjut ke Pembayaran' : 'Buat Pesanan'}
      </button>
    </aside>
  )
}

export default OrderSummarySidebar