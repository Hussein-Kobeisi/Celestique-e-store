import React from "react";
import "./index.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong>${product.price}</strong>
      </div>
    </div>
  );
};

export default ProductCard;