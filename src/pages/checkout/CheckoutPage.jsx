import { useState } from 'react'
import { useNavigate } from 'react-router'
import CheckoutForm from './CheckoutForm'
import OrderSummarySidebar from './OrderSummarySidebar'
import PaymentGatewayModal from './PaymentGatewayModal'
import OrderSuccessView from './OrderSuccessView'
import { saveOrderToStorage } from '../../utils/orderStorage'

function CheckoutPage({ cartItems, cartTotal, onClearCart }) {
  const navigate = useNavigate()
  const [customerName, setCustomerName] = useState('')
  const [fulfillment, setFulfillment] = useState('dine-in')
  const [notes, setNotes] = useState('')
  const [payment, setPayment] = useState('gateway')

  const [pendingOrder, setPendingOrder] = useState(null)
  const [completedOrder, setCompletedOrder] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const baseOrder = {
      id: `ORD-${Date.now().toString().slice(-4)}`,
      invoiceId: `INV-${Date.now().toString().slice(-6)}`,
      customerName: customerName.trim(),
      fulfillment,
      notes: notes.trim(),
      paymentMethod: payment === 'gateway' ? 'Payment Gateway' : 'Tunai di Kasir',
      items: cartItems,
      total: cartTotal,
      createdAt: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    if (payment === 'gateway') {
      setPendingOrder({
        ...baseOrder,
        paymentStatus: 'Menunggu Pembayaran',
        status: 'Menunggu Pembayaran',
      })
      return
    }

    const cashOrder = {
      ...baseOrder,
      paymentStatus: 'Belum Bayar (Kasir)',
      status: 'Menunggu',
    }
    saveOrderToStorage(cashOrder)
    onClearCart()
    setCompletedOrder(cashOrder)
  }

  const handlePaymentSuccess = () => {
    if (!pendingOrder) return

    const paidOrder = {
      ...pendingOrder,
      paymentStatus: 'Lunas',
      status: 'Menunggu',
    }
    saveOrderToStorage(paidOrder)
    onClearCart()
    setPendingOrder(null)
    setCompletedOrder(paidOrder)
  }

  if (pendingOrder) {
    return (
      <PaymentGatewayModal
        order={pendingOrder}
        onConfirmPaid={handlePaymentSuccess}
        onCancel={() => setPendingOrder(null)}
      />
    )
  }

  if (completedOrder) {
    return <OrderSuccessView order={completedOrder} />
  }

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-2xl items-center px-6 py-16">
        <section className="w-full rounded-xl border border-[#39291f]/10 bg-[#f6efe4] p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold">Keranjang Anda Kosong</h1>
          <p className="mt-3 text-sm text-[#665547]">
            Tambahkan menu favorit Anda sebelum melanjutkan checkout.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 rounded-md bg-tan px-6 py-3 text-sm font-medium text-white hover:brightness-110"
          >
            Pilih Menu
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-10rem)] bg-[#f5efe6]">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-6 text-sm font-medium text-[#665547] hover:text-tan"
        >
          ← Kembali ke menu
        </button>

        <div className="mb-8">
          <p className="text-sm font-medium text-tan">Selesaikan Pesanan</p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <CheckoutForm
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            fulfillment={fulfillment}
            onFulfillmentChange={setFulfillment}
            notes={notes}
            onNotesChange={setNotes}
            payment={payment}
            onPaymentChange={setPayment}
          />

          <OrderSummarySidebar
            cartItems={cartItems}
            cartTotal={cartTotal}
            fulfillment={fulfillment}
            payment={payment}
          />
        </form>
      </div>
    </main>
  )
}

export default CheckoutPage