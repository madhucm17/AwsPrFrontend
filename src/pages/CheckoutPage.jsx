import axios from 'axios'
import { useState } from 'react'
import { useCart } from '../state/CartContext.jsx'

export default function CheckoutPage() {
  const { items, total, clear } = useCart()
  const [status, setStatus] = useState('idle')

  async function placeOrder(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const base = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
      const res = await axios.post(`${base}/api/orders`, {
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        customer: null,
      })
      setStatus('success')
      clear()
      alert(`Order placed! #${res.data.id} Total: $${res.data.total.toFixed(2)}`)
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  if (items.length === 0) return <p>Add items to cart before checkout.</p>

  return (
    <form onSubmit={placeOrder} className="checkout">
      <h2>Checkout</h2>
      <div>Items: {items.length}</div>
      <div>Total: ${total.toFixed(2)}</div>
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Placing...' : 'Place order'}
      </button>
      {status === 'error' && <p>Something went wrong. Try again.</p>}
    </form>
  )
}


