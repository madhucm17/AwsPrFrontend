import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../state/CartContext.jsx'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const base = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
        const res = await axios.get(`${base}/api/products`)
        setProducts(res.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="grid">
      {products.map((p) => (
        <div key={p.id} className="card">
          <img src={p.imageUrl} alt={p.name} />
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <strong>${p.price.toFixed(2)}</strong>
          <button onClick={() => addToCart(p)}>Add to cart</button>
        </div>
      ))}
    </div>
  )
}


