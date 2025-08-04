import React, { useState } from "react";
import "./index.css";
import image from "../../assets/image 10.png";
import CartItem from "../../components/CartItem";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Lotus Ring Gold Earrings (18KT)",
      price: 214,
      quantity: 2,
      image: require("../../assets/image 10.png"),
    },
    {
      id: 2,
      name: "Lotus Ring Gold Earrings (18KT)",
      price: 214,
      quantity: 2,
      image: require("../../assets/image 10.png"),
    },
    {
      id: 3,
      name: "Lotus Ring Gold Earrings (18KT)",
      price: 214,
      quantity: 2,
      image: require("../../assets/image 10.png"),
    },
  ]);

  const increment = (id) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  const decrement = (id) => {
    setCartItems(prev =>
      prev.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
    );
  };

  const remove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h2>Cart</h2>
        <hr />
        {cartItems.map(product => (
          <CartItem
            key={product.id}
            product={product}
            increment={increment}
            decrement={decrement}
            remove={remove}
          />
        ))}
     
      </div>

      <div className="cart-right">
      <div className="total-section">
          <h3>Total Amount:</h3>
          <hr />
          <strong>${total.toFixed(2)}</strong>
          <button className="checkout-btn">Checkout</button>
        </div>
        <img src={image} alt="Jewelry" className="right-image" />
      </div>
    </div>
  );
};

export default CartPage;