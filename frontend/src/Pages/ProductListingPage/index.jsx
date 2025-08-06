import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import ProductCard from "../../components/ProductCard";
import { getProductsApi } from "../../apis/apis";
import Navbar from "../../components/Shared/Usernavbar";
import { useUser } from "../../components/Context/userContext";
import { Navigate } from "react-router-dom";

const placeholderImage = "https://via.placeholder.com/150";

const Products = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [error, setError] = useState(null);
  const [page, setpage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = response.data;

        if (Array.isArray(data.payload)) {
          // Map to add fallback image if image_url is null
          const productsWithImages = data.payload.map((product) => ({
            ...product,
            image_url: product.image_url || placeholderImage,
          }));

          setProducts(productsWithImages);
          setError(null);
        } else {
          setProducts([]);
          setError("No products found.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Could not load products.");
      }
    };

    if (user?.token) {
      fetchProducts();
    }
  }, [user?.token]);

  //this is initial fetch , no filters here . 
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleFilter = () => {
    const filters = {
      search: search.trim(),
      category,
      sort,
    };
    fetchProducts(filters);
  };

  return (
    <>
    <Navbar />
    <div className="products-page">
      
      <div className="filters">
        <div className="filters-left">
          <div className="select-wrapper">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Sort by</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A-Z</option>
            </select>
          </div>

          <div className="select-wrapper">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Category</option>
              <option value="Ring">Rings</option>
              <option value="Necklace">Necklaces</option>
              <option value="Bracelet">Bracelets</option>
              <option value="Earring">Earrings</option>
            </select>
          </div>

          <button className="filter-btn" onClick={handleFilter}>
            Filter
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            !error && <div className="no-products">No products available.</div>
          )}
        </div>
      </div>
      <div className="products-page-footer">
        <button className="products-page-btn" onClick={() => setpage((prev) => Math.max(prev - 1, 1))}> &lt; Prev </button>
        <p className="products-page-number">{page}</p>
        <button className="products-page-btn" onClick={() => setpage((prev) => prev + 1)}> Next &gt;</button>
      </div>
    </div>
    </>
  );
};

export default Products;