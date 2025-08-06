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
      console.log(productId)
      if (!productId) {
        setError('Product ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          `http://localhost:8000/api/products/${productId}`,
          { headers }
        );

        if (response.data.success) {
          setProduct(response.data.payload);
        } else {
          setError('Product not found');
        }
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

  const handleAddToCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setError('Please log in to add items to cart');
      navigate('/auth');
      return;
    }

    if (!product) {
      setError('Product information is not available');
      return;
    }

    setIsAddingToCart(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v0.1/cart/add',
        {
          productId: product.id || productId,
          quantity: quantity,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage(`${quantity} item(s) added to cart successfully!`);
        
        if (response.data.updatedStock !== undefined) {
          setProduct(prev => ({
            ...prev,
            stock: response.data.updatedStock
          }));
        }

        setQuantity(1);

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        navigate('/auth');
      } else if (err.response?.status === 400) {
        setError(err.response.data?.message || 'Invalid request. Please check the quantity.');
      } else if (err.response?.status === 409) {
        setError('This item is out of stock or insufficient quantity available.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add item to cart. Please try again.');
      }
    } finally {
      setIsAddingToCart(false);
    }
  }, [product, productId, quantity, navigate]);

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