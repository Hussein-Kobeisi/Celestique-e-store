import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import image from "../../assets/image 10.png";
import CartItem from "../../components/CartItem";
import Navbar from "../../components/Shared/Usernavbar";

const CartPage = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const [cartItems, setCartItems] = useState([]);

  const fetchCartProducts = () => {
    const localcartItems = JSON.parse(localStorage.getItem("cart")) || []

    const fetchPromises = localcartItems.map(item => 
      axios.get(`http://localhost:8000/api/products/${item.productId}`)    
    )

    Promise.all(fetchPromises)
      .then(responses => {
        const fullCartData = responses.map((response, index) => ({
          ...response.data.payload, // The product data from the API
          quantity: localcartItems[index].quantity // The quantity from local storage
        }));
        console.log(fullCartData)
        setCartItems(fullCartData);
      })
      .catch(error => {console.error("Error fetching cart items:", error)});

  }

  useEffect(fetchCartProducts, [])

  const increment = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const remove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const formattedOrderItems = cartItems.map(item => ({
      product_id: item.id, // Maps item.id to product_id
      quantity: item.quantity,
    }));
    const requestBody = {
      total_amount: total, // Ensure 'total' is correctly calculated
      order_items: formattedOrderItems,
    };
    axios.post('http://localhost:8000/api/add_order',
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
  }

  return (
    <>
    <Navbar />
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
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
        <img src={image} alt="Jewelry" className="right-image" />
      </div>
    </div>
    </>
  );
};

export default CartPage;