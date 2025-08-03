import React from "react";
import "./index.css";
import goldenRingImage from "../../assets/Goldenrings.png";
const products = new Array(8).fill({
  name: "HEXA GOLD RING",
  description: "18k yellow gold",
  price: "$450",
  image: goldenRingImage,// Replace with real
});

const Products = () => {
  return (
    <div className="products-page">
      <div className="filters">
      <div className="filters-left">
  <div className="select-wrapper">
    <select>
      <option>Sort by</option>
    </select>
  </div>
  <div className="select-wrapper">
    <select>
      <option>Category</option>
    </select>
  </div>
</div>
<div className="search-bar-container">
<input
    type="text"
    placeholder="Search..."
    className="search-input"
  />
  </div>

  <button className="filter-btn">Filter</button>
</div>

      <div className="product-grid">
        {products.map((product, idx) => (
          <div className="product-card" key={idx}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>{product.price}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;