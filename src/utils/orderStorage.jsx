export const ORDERS_STORAGE_KEY = 'seruputinaja_orders'
export const ORDERS_UPDATED_EVENT = 'seruputinaja-orders-updated'

export function getOrdersFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveOrderToStorage(orderData) {
  try {
    const existing = getOrdersFromStorage()
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([orderData, ...existing]))
    window.dispatchEvent(new Event(ORDERS_UPDATED_EVENT))
  } catch {
    // Abaikan jika storage penuh atau diblokir browser
  }
}

export function markOrderAsPaid(orderId) {
  try {
    const existing = getOrdersFromStorage()
    const updated = existing.map((item) =>
      item.id === orderId
        ? { ...item, paymentStatus: 'Lunas', status: 'Menunggu' }
        : item,
    )
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event(ORDERS_UPDATED_EVENT))
  } catch {
    // Abaikan jika storage penuh atau diblokir browser
  }
}