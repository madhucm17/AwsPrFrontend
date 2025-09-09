import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../state/CartContext.jsx'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      const base = ''
      try {
        const res = await axios.get(`/api/products`, { timeout: 5000 })
        setProducts(res.data)
      } catch (e) {
        console.error('Products fetch failed', e?.message || e)
        setError('Cannot reach API. Check network/IP/firewall.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="grid">
      {products.map((p) => (
        <div key={p.id} className="card">
          <img src={`/api/assets/${p.id}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <strong>${p.price.toFixed(2)}</strong>
          <button onClick={() => addToCart(p)}>Add to cart</button>
        </div>
      ))}
    </div>
  )
}


