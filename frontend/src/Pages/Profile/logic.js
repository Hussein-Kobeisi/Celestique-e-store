import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useProfileLogic = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    memberSince: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (!userId || !token) {
      navigate('/auth');
      setIsLoading(false); 
      return;
    }
    
    axios.get(`http://localhost:8000/api/v0.1/user/Profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const data = res.data.payload;
      setFormData({
        username: data.username,
        email: data.email,
        password: '', 
        phoneNumber: data.phoneNumber || '',
        memberSince: data.created_at ? new Date(data.created_at).toLocaleDateString() : '',
      });
      setIsLoading(false); 
    })
    .catch((err) => {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile data. Please try again.');
      setIsLoading(false); 
    });
  }, [userId, token, navigate]); 

  const handleChange = useCallback((e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []); 

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    setError(null); 
    setSuccessMessage(null); 

    try {
      await axios.post(`http://localhost:8000/api/v0.1/user/ProfileUpdate/${userId}`, {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        ...(formData.password && { password: formData.password }),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage('Profile updated successfully!');
      setFormData(prev => ({ ...prev, password: '' })); 
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update profile. Please check your input.');
    } finally {
      setIsLoading(false); 
    }
  }, [formData, userId, token]); 

  const handleDeleteAccount = useCallback(async () => {
    if (window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      setIsLoading(true);
      try {
        await axios.delete(`http://localhost:8000/api/v0.1/user/Delete/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        navigate('/auth');
      } catch (err) {
        console.error('Delete error:', err);
        setError('Failed to delete account. Please try again.');
        setIsLoading(false);
      }
    }
  }, [userId, token, navigate]);

  return {
    formData,
    isLoading,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    handleDeleteAccount,
  };
};