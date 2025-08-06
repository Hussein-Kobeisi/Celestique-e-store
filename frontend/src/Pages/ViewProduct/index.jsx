import "./index.css";
import {Plus, Minus, ShoppingCart } from 'lucide-react';
import { useViewProductLogic } from './logic';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";
import Navbar from "../../components/Shared/Usernavbar";

const ViewProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  
  const {
    product,
    quantity,
    isAddingToCart,
    error,
    successMessage,
    handleQuantityChange,
    handleAddToCart,
  } = useViewProductLogic(productId);


  return (
    <div>

    <Navbar activeLink="Products" />

 {     <main className="vp-main-content">
        <div className="vp-product-card">
          {successMessage && (
            <div className="vp-success-message">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="vp-error-message">
              {error}
            </div>
          )}

          <div className="vp-product-container">



            <div className="vp-product-details">
              <h1 className="vp-product-title">
                {product?.name || 'Lotus Ring Gold Earrings (18KT)'}
              </h1>
              
              <p className="vp-product-description">
                {product?.description || 
                  'Swedish-crafted earrings, inspired by Nordic minimalism, these 18k gold pieces blend timeless elegance with modern form. Hand-finished with meticulous attention to detail, they offer a subtle shimmer that complements any look day or night.'
                }
              </p>

              <div className="vp-product-price">
                ${product?.price || '214.00'}
              </div>

              <div className="vp-quantity-section">
                <span className="vp-quantity-label">Quantity:</span>
                
                <div className="vp-quantity-controls">
                  <button
                    type="button"
                    className="vp-quantity-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    className="vp-quantity-input"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max={product?.stock || 99}
                  />
                  <button
                    type="button"
                    className="vp-quantity-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= (product?.stock || 99)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  className="vp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !product}
                >
                  {isAddingToCart ? (
                    <>
                      <span className="vp-loading-spinner"></span>
                      <span style={{ marginLeft: '0.5rem' }}>Adding...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} style={{ marginRight: '0.5rem' }} />
                      Add To Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>}
    </div>
  );
};

export default ViewProduct;