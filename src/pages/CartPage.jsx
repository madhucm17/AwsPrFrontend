import { Link } from 'react-router-dom'
import { useCart } from '../state/CartContext.jsx'

export default function CartPage() {
  const { items, total, removeFromCart, decrement, addToCart, clear } = useCart()
  if (items.length === 0)
    return (
      <div>
        <p>Your cart is empty.</p>
        <Link to="/">Go shopping</Link>
      </div>
    )

  return (
    <div>
      {items.map((i) => (
        <div key={i.id} className="cart-row">
          <span>{i.name}</span>
          <div className="qty">
            <button onClick={() => decrement(i.id)}>-</button>
            <span>{i.quantity}</span>
            <button onClick={() => addToCart(i)}>+</button>
          </div>
          <span>${(i.price * i.quantity).toFixed(2)}</span>
          <button onClick={() => removeFromCart(i.id)}>Remove</button>
        </div>
      ))}
      <hr />
      <div className="cart-total">Total: ${total.toFixed(2)}</div>
      <div className="actions">
        <button onClick={clear}>Clear</button>
        <Link to="/checkout" className="btn">
          Checkout
        </Link>
      </div>
    </div>
  )
}


