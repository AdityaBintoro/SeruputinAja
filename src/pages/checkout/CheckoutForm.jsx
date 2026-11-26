const PAYMENT_OPTIONS = [
  ['gateway', 'Payment Gateway', 'QRIS, E-Wallet, atau Virtual Account'],
  ['cash', 'Bayar di Kasir', 'Tunai langsung saat pemesanan'],
]

function CheckoutForm({
  customerName,
  onCustomerNameChange,
  fulfillment,
  onFulfillmentChange,
  notes,
  onNotesChange,
  payment,
  onPaymentChange,
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-[#39291f]/10 bg-[#f6efe4] p-5 md:p-6">
        <h2 className="text-lg font-semibold">Detail Pesanan</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Atas nama siapa
            <input
              type="text"
              name="customerName"
              required
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              className="mt-2 w-full rounded-md border border-[#39291f]/20 bg-white px-4 py-3 font-normal outline-none focus:border-tan"
              placeholder="Contoh: Adit"
            />
          </label>

          <label className="text-sm font-medium">
            Tipe pesanan
            <select
              value={fulfillment}
              onChange={(e) => onFulfillmentChange(e.target.value)}
              className="mt-2 w-full rounded-md border border-[#39291f]/20 bg-white px-4 py-3 font-normal outline-none focus:border-tan"
            >
              <option value="dine-in">Dine In (Makan di Tempat)</option>
              <option value="take-away">Take Away (Bawa Pulang)</option>
            </select>
          </label>

          <label className="text-sm font-medium sm:col-span-2">
            Catatan pesanan (opsional)
            <input
              type="text"
              name="notes"
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              className="mt-2 w-full rounded-md border border-[#39291f]/20 bg-white px-4 py-3 font-normal outline-none focus:border-tan"
              placeholder="Contoh: Less sugar, es dipisah"
            />
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-[#39291f]/10 bg-[#f6efe4] p-5 md:p-6">
        <h2 className="text-lg font-semibold">Metode Pembayaran</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {PAYMENT_OPTIONS.map(([value, title, description]) => (
            <label
              key={value}
              className={`cursor-pointer rounded-lg border p-4 transition ${
                payment === value
                  ? 'border-tan bg-tan/5'
                  : 'border-[#39291f]/15 bg-white'
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={value}
                checked={payment === value}
                onChange={() => onPaymentChange(value)}
                className="mr-2 accent-[#8b5e3c]"
              />
              <span className="font-semibold">{title}</span>
              <span className="mt-1 block pl-6 text-xs text-[#665547]">{description}</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CheckoutForm