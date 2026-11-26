import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'
import { useCart } from './hooks/useCart'
import CheckoutPage from './pages/checkout/CheckoutPage'
import StaffLoginPage from './pages/login/StaffLoginPage'
import KasirPage from './pages/kasir/KasirPage'


function AppLayout({
  cartItems,
  cartCount,
  cartTotal,
  handleAddItem,
  handleRemoveItem,
  handleIncreaseItem,
  handleDecreaseItem,
  handleClearCart,
}) {
  const { pathname } = useLocation()
  const isCashierPage =
    pathname === '/kasir' ||
    pathname.startsWith('/kasir/') ||
    pathname === '/kasirpage' ||
    pathname.startsWith('/kasirpage/')
  const isLoginPage = pathname === '/login'

  return (
    <div className="min-h-screen bg-ink text-[#39291f] font-sans antialiased">
      {!isCashierPage && !isLoginPage && (
        <Header
          cartItems={cartItems}
          cartCount={cartCount}
          cartTotal={cartTotal}
          onRemoveItem={handleRemoveItem}
          onIncreaseItem={handleIncreaseItem}
          onDecreaseItem={handleDecreaseItem}
        />
      )}

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
        <Route path="/login" element={<StaffLoginPage />} />
        <Route path="/kasir/*" element={<KasirPage />} />
        <Route path="/kasirpage/*" element={<KasirPage />} />
      </Routes>

      {!isCashierPage && !isLoginPage && <Footer />}
    </div>
  )
}

function App() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    handleAddItem,
    handleRemoveItem,
    handleIncreaseItem,
    handleDecreaseItem,
    handleClearCart,
  } = useCart()

  return (
    <BrowserRouter>
      <AppLayout
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleIncreaseItem={handleIncreaseItem}
        handleDecreaseItem={handleDecreaseItem}
        handleClearCart={handleClearCart}
      />
    </BrowserRouter>
  )
}

export default App
