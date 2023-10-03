import React, { useEffect } from 'react';

function Cart({ cart, removeFromCart, increaseQuantity, decreaseQuantity }) {
  useEffect(() => {
    cart.forEach((item) => {
      if (item.quantity > item.stock) {
        alert('Stokta yeterli ürün yok.');
        removeFromCart(item);
      }
    });
  }, [cart]);

  return (
    <div className="cart-container">
      <h2 className="cart-header">Sepet</h2>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-title">{item.title}</div>
            <div className="cart-item-price">${item.price}</div>
            <div className="cart-item-buttons">
              <button
                className="cart-item-button"
                onClick={() => decreaseQuantity(item)}
                disabled={item.quantity === 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="cart-item-button"
                onClick={() => increaseQuantity(item)}
                disabled={item.quantity === item.stock}
              >
                +
              </button>
              <button
                className="cart-item-button"
                onClick={() => removeFromCart(item)}
              >
                Kaldır
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        Toplam: $
        {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
      </div>
    </div>
  );
}

export default Cart;

