import { useState } from 'react'

export default function QuantityPicker({ start = 1, max = 10, onChange }) {
  const [quantity, setQuantity] = useState(start)

  function change(by) {
    const next = Math.min(max, Math.max(1, quantity + by))
    setQuantity(next)
    onChange?.(next)
  }

  return (
    <div className="quantity-picker">
      <button data-test="decrease" disabled={quantity <= 1}
        onClick={() => change(-1)}>-</button>
      <span data-test="quantity">{quantity}</span>
      <button data-test="increase" disabled={quantity >= max}
        onClick={() => change(1)}>+</button>
    </div>
  )
}