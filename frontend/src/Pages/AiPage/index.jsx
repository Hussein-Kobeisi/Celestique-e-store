import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import ProductCard from "../../components/ProductCard";
import { getProductsApi } from "../../apis/apis";
import Navbar from "../../components/Shared/Usernavbar";
import { useUser} from "../../components/Context/userContext";
import { Navigate} from "react-router-dom";

const placeholderImage = "https://via.placeholder.com/150";

const Products = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [error, setError] = useState(null);
  const [page, setpage] = useState(1);
  const [filters, setFilters] = useState(
    {
      search: "",
      category:"",
      sort:"",
    }
  );
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/api/products', {
  //         headers: {
  //           Authorization: ⁠ Bearer ${user?.token} ⁠,
  //         },
  //       });

  //       const data = response.data;

  //       if (Array.isArray(data.payload)) {
  //         // Map to add fallback image if image_url is null
  //         const productsWithImages = data.payload.map((product) => ({
  //           ...product,
  //           image_url: product.image_url || placeholderImage,
  //         }));

  //         setProducts(productsWithImages);
  //         setError(null);
  //       } else {
  //         setProducts([]);
  //         setError("No products found.");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //       setError("Could not load products.");
  //     }
  //   };

  //   if (user?.token) {
  //     fetchProducts();
  //   }
  // }, [user?.token]);


  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/api/products")
      
  //     console.log(response.data.payload.data);
  //     const data = response.data.payload.data;

  //     if (Array.isArray(data)) {
  //       const productsWithImages = data.map((product) => ({
  //         ...product,
  //         image_url: product.image_url || placeholderImage,
  //       }));

  //       setProducts(productsWithImages);
  //       setError(data.length === 0 ? "No matching products found." : null);
  //     } else {
  //       setProducts([]);
  //       setError("No matching products found.");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching filtered products:", err);
  //     setError("Could not load filtered products.");
  //   }
  // };

  //this is initial fetch , no filters here . 
  useEffect(() => {
    handleFilter();
  }, [page]);

  const handleFilter = async () => {
    try {
      setError(null); // Clear previous errors
      setProducts([]); // Clear previous products
  
      const response = await axios.post(
        "http://localhost:8000/api/products/search",
        {
          prompt: search.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = response.data;
  
      if (Array.isArray(data)) {
        const productsWithImages = data.map((product) => ({
          ...product,
          image_url: product.image_url || placeholderImage,
        }));
  
        setProducts(productsWithImages);
        setError(productsWithImages.length === 0 ? "No matching products found." : null);
      } else {
        setProducts([]);
        setError("Invalid response from server.");
      }
    } catch (err) {
      console.error("Error fetching products:", err.response?.data || err.message);
      setError("Could not load products.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="products-page products-page-ai">
      
      <div className="filters">
        <div className="filters-left">
          <div className="select-wrapper">
            
          </div>

          
        </div>
        <div className="search-bar-container">
            <input
              type="text"
              placeholder="Ask AI ..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        <button className="filter-btn" onClick={handleFilter}>
            Ask 
        </button>

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
      
    </div>
    </>
  );
};

export default Products;