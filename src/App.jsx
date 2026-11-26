import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrderStatusPage from './pages/order-status/OrderStatusPage'

const CART_STORAGE_KEY = 'seruputinaja_cart_items'

function App() {

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch {

    }
  }, [cartItems])

  const handleAddItem = (item) => {
    setCartItems((currentItems) => {
      const cek_keranjang = currentItems.find((cartItem) => cartItem.id === item.id)
      if (cek_keranjang) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
      }
      return [...currentItems, { ...item, quantity: 1 }]
    })
  }

  const handleRemoveItem = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    )
  }

  const handleIncreaseItem = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      ),
    )
  }

  const handleDecreaseItem = (itemId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    )
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0,)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ink text-[#39291f] font-sans antialiased">
        <Header
          cartItems={cartItems}
          cartCount={cartCount}
          cartTotal={cartTotal}
          onRemoveItem={handleRemoveItem}
          onIncreaseItem={handleIncreaseItem}
          onDecreaseItem={handleDecreaseItem}
        />

        <Routes>
          <Route path="/" element={<Main onAddItem={handleAddItem} />} />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartItems={cartItems}
                cartTotal={cartTotal}
                onClearCart={handleClearCart}
              />
            }
          />
          <Route path="/order-status" element={<OrderStatusPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
