import React from "react";
import "./index.css";

const CartItem = ({ product, increment, decrement, remove }) => {
  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} className="product-img" />
      <div className="cart-details">
        <h4>{product.name}</h4>
        <strong>${product.price}</strong>
      </div>
      <div className="cart-actions">
        <button onClick={() => decrement(product.id)}>-</button>
        <span>{product.quantity}</span>
        <button onClick={() => increment(product.id)}>+</button>
      </div>
      <button className="remove-btn" onClick={() => remove(product.id)}>×</button>
    </div>
  );
};

export default CartItem;