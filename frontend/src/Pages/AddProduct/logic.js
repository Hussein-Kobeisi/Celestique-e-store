import { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAddProductLogic = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: 1,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError(null);
    if (successMessage) setSuccessMessage(null);
  }, [error, successMessage]);

  const handleQuantityChange = useCallback((newQuantity) => {
    if (newQuantity >= 1) {
      setFormData(prev => ({
        ...prev,
        quantity: newQuantity
      }));
    }
  }, []);

  const processImageFile = useCallback((file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    setFormData(prev => ({
      ...prev,
      image: file
    }));

    setError(null);
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    processImageFile(file);
  }, [processImageFile]);

  const handleRemoveImage = useCallback(() => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processImageFile(files[0]);
    }
  }, [processImageFile]);

  const validateForm = useCallback(() => {
    if (!formData.name.trim()) {
      setError('Product name is required.');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Product description is required.');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price.');
      return false;
    }
    if (formData.quantity < 1) {
      setError('Quantity must be at least 1.');
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setError('Please log in to create products.');
        navigate('/auth');
        return;
      }

      const submitData = new FormData();
      submitData.append('name', formData.name.trim());
      submitData.append('description', formData.description.trim());
      submitData.append('price', parseFloat(formData.price));
      submitData.append('quantity', formData.quantity);
      submitData.append('userId', userId);
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      const response = await axios.post(
        'http://localhost:8000/api/v0.1/products/create',
        submitData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage('Product created successfully!');

        setFormData({
          name: '',
          description: '',
          price: '',
          quantity: 1,
          image: null,
        });
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        setTimeout(() => {
          navigate('/products');
        }, 2000);
      }
    } catch (err) {
      console.error('Product creation error:', err);
      
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        navigate('/auth');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create product. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, navigate]);

  return {
    formData,
    isLoading,
    error,
    successMessage,
    imagePreview,
    isDragOver,
    fileInputRef,
    handleChange,
    handleImageUpload,
    handleRemoveImage,
    handleQuantityChange,
    handleSubmit,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};