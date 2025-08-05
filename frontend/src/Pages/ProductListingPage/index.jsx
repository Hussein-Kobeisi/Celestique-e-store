import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import goldenRingImage from "../../assets/Goldenrings.png";
import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/Shared/Usernavbar";

const dummyProducts = new Array(8).fill({
  name: "HEXA GOLD RING",
  description: "18k yellow gold",
  price: "$450",
  image: goldenRingImage,
});

const Products = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [error, setError] = useState(null);
  const [page, setpage] = useState(1);

  // here fetching the products if there  is a filters or not . if there is a filter this request will be sent another time after the first request 
  const fetchProducts = async (filters = {}) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/filtered_products?"
                                          +"page="+page
                                          +"&category="+(filters.category??'')
                                          +"&sort="+(filters.sort??'')
                                          +"&search="+(filters.search??''));

      console.log(response.data.payload.data);
      const data = response.data.payload.data;

      if (data && Array.isArray(data) && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(dummyProducts);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts(dummyProducts);
      setError("Could not load products. Showing sample items.");
    }
  };

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
        </div>

        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="filter-btn" onClick={handleFilter}>
          Filter
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="product-grid">
      {products.map((product, id) => (
  <ProductCard key={id} product={product} />
))}
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