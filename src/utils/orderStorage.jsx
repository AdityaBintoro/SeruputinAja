export const ORDERS_STORAGE_KEY = 'seruputinaja_orders'
export const ORDERS_UPDATED_EVENT = 'seruputinaja-orders-updated'

export function getOrdersFromStorage() {
  try {
    const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]')
    return Array.isArray(orders) ? orders : []
  } catch {
    return []
  }
}

export function saveOrderToStorage(orderData) {
  const existing = getOrdersFromStorage()
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([orderData, ...existing]))
  window.dispatchEvent(new Event(ORDERS_UPDATED_EVENT))
}

export function markOrderAsPaid(orderId) {
  const existing = getOrdersFromStorage()
  const updated = existing.map((item) =>
    item.id === orderId
      ? { ...item, paymentStatus: 'Lunas', status: 'Menunggu' }
      : item,
  )
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event(ORDERS_UPDATED_EVENT))
}

export function updateOrderStatus(orderId, status) {
  const existing = getOrdersFromStorage()
  const updated = existing.map((item) =>
    item.id === orderId ? { ...item, status } : item,
  )
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event(ORDERS_UPDATED_EVENT))
}