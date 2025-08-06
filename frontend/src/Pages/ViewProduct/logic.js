import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useViewProductLogic = (productId) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:8000/api/products/${productId}`,
        );

        // if (response.data.success) {
        console.log(response.data.payload)
        setProduct(response.data.payload);
        // } else {
        //   setError('Product not found');
        // }
      } catch (err) {
        console.error('Error fetching product:', err);
        
        if (err.response?.status === 404) {
          setError('Product not found');
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Failed to load product. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);


  const handleQuantityChange = useCallback((newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 99)) {
      setQuantity(newQuantity);
      if (error) setError(null);
      if (successMessage) setSuccessMessage(null);
    }
  }, [product?.stock, error, successMessage]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    const existingProduct = cart.find(item => item.productId === productId);
    if (existingProduct)
      existingProduct.quantity += quantity;
    else 
      cart.push({ productId, quantity});
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  return {
    product,
    quantity,
    isLoading,
    isAddingToCart,
    error,
    successMessage,
    handleQuantityChange,
    handleAddToCart,
  };
};