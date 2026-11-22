import { useState } from 'react'
import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'

function App() {
  const [cartItems, setCartItems] = useState([])
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

  const handleRemoveItem = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    )
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <div className="bg-ink text-[#39291f] font-sans antialiased">
      <Header
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onRemoveItem={handleRemoveItem}
        onIncreaseItem={handleIncreaseItem}
        onDecreaseItem={handleDecreaseItem}
      />

      <Main onAddItem={handleAddItem} />

      <Footer />
    </div>
  )
}

export default App