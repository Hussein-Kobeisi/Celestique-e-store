import React from "react";
import "./index.css";

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={"http://localhost:8000/storage/"+ product.image_url} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong>${product.price}</strong>
      </div>
    </div>
  );
};

export default ProductCard;