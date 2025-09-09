import React, { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext()

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] }
    }
    case 'REMOVE': {
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    }
    case 'DECREMENT': {
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i))
          .filter((i) => i.quantity > 0),
      }
    }
    case 'CLEAR': {
      return { items: [] }
    }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const total = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items],
  )
  const value = useMemo(
    () => ({
      items: state.items,
      total,
      addToCart: (item) => dispatch({ type: 'ADD', item }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      decrement: (id) => dispatch({ type: 'DECREMENT', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.items, total],
  )
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


