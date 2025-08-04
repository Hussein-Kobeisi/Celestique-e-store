import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useProductsListingLogic = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const mockOrders = [
    { id: 10, user: 'John Doe', total: 100, status: 'pending' },
    { id: 15, user: 'John Doe', total: 100, status: 'pending' },
    { id: 3, user: 'John Doe', total: 100, status: 'pending' },
    { id: 23, user: 'John Doe', total: 100, status: 'pending' },
  ];

  const mockAnalytics = {
    totalRevenue: 100568,
    ordersPerHour: [120, 80, 140, 200, 180, 60],
    revenueGrowth: 25,
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setOrders(mockOrders);
        setAnalytics(mockAnalytics);
        setIsLoading(false);
        return;
      }

      try {
        const ordersResponse = await axios.get(
          'http://localhost:8000/api/v0.1/orders/admin/all',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (ordersResponse.data.success) {
          setOrders(ordersResponse.data.payload || []);
        } else {
          setOrders(mockOrders);
        }
      } catch (ordersError) {
        console.warn('Orders API not available, using mock data:', ordersError);
        setOrders(mockOrders);
      }
      
      try {
        const analyticsResponse = await axios.get(
          'http://localhost:8000/api/v0.1/analytics/dashboard',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (analyticsResponse.data.success) {
          setAnalytics(analyticsResponse.data.payload);
        } else {

          setAnalytics(mockAnalytics);
        }
      } catch (analyticsError) {
        console.warn('Analytics API not available, using mock data:', analyticsError);
        setAnalytics(mockAnalytics);
      }

    } catch (err) {
      console.error('Error fetching data:', err);

      setOrders(mockOrders);
      setAnalytics(mockAnalytics);
      
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        navigate('/auth');
      } else {
        console.warn('Using mock data due to API unavailability');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = useCallback(async (orderId, newStatus) => {
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId
              ? { ...order, status: newStatus }
              : order
          )
        );
        setSuccessMessage(`Order ${orderId} status updated to ${newStatus}`);
        return;
      }

      const response = await axios.patch(
        `http://localhost:8000/api/v0.1/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId
              ? { ...order, status: newStatus }
              : order
          )
        );
        setSuccessMessage(`Order ${orderId} status updated successfully`);
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );
      setSuccessMessage(`Order ${orderId} status updated to ${newStatus} (demo mode)`);

      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        navigate('/auth');
      } else if (err.response?.data?.message) {
        console.warn('API error:', err.response.data.message);
      }
    }
  }, [navigate]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  const derivedAnalytics = {
    ...analytics,
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'pending').length,
    completedOrders: orders.filter(order => order.status === 'delivered').length,
  };

  return {
    orders,
    analytics: derivedAnalytics,
    isLoading,
    error,
    successMessage,
    handleStatusChange,
    refreshData,
  };
};