import { useState, useEffect } from 'react'

const CART_STORAGE_KEY = 'seruputinaja_cart_items'

export function useCart() {
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
      // Abaikan jika storage penuh/diblokir
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
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return {
    cartItems,
    cartCount,
    cartTotal,
    handleAddItem,
    handleRemoveItem,
    handleIncreaseItem,
    handleDecreaseItem,
    handleClearCart,
  }
}