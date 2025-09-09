import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <Link to="/">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout madi</Link>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

export default App
