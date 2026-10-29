/**
 * React Hook để sử dụng Database
 * Thay thế Supabase
 */

import { useState, useEffect } from 'react';
import { apiCall } from '../server/api/routes';

// ==================== USER HOOKS ====================

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const result = await apiCall('/api/users', 'GET');
    if (result.success) {
      setUsers(result.data);
      setError(null);
    } else {
      setError(result.error || 'Failed to fetch users');
    }
    setLoading(false);
  };

  const createUser = async (userData: any) => {
    const result = await apiCall('/api/users', 'POST', userData);
    if (result.success) {
      await fetchUsers();
      return result.data;
    }
    throw new Error(result.error || 'Failed to create user');
  };

  const updateUser = async (id: string, updates: any) => {
    const result = await apiCall(`/api/users/${id}`, 'PUT', updates);
    if (result.success) {
      await fetchUsers();
      return result.data;
    }
    throw new Error(result.error || 'Failed to update user');
  };

  const deleteUser = async (id: string) => {
    const result = await apiCall(`/api/users/${id}`, 'DELETE');
    if (result.success) {
      await fetchUsers();
    } else {
      throw new Error(result.error || 'Failed to delete user');
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refresh: fetchUsers,
  };
}

// ==================== REVIEW HOOKS ====================

export function useReviews(productId?: string) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    setLoading(true);
    const endpoint = productId ? `/api/reviews?product_id=${encodeURIComponent(productId)}` : '/api/reviews';
    const result = await apiCall(endpoint, 'GET');
    if (result.success) {
      setReviews(result.data);
      setError(null);
    } else {
      setError(result.error || 'Failed to fetch reviews');
    }
    setLoading(false);
  };

  const createReview = async (reviewData: any) => {
    const result = await apiCall('/api/reviews', 'POST', reviewData);
    if (result.success) {
      await fetchReviews();
      return result.data;
    }
    throw new Error(result.error || 'Failed to create review');
  };

  const deleteReview = async (id: string) => {
    const result = await apiCall(`/api/reviews/${id}`, 'DELETE');
    if (result.success) {
      await fetchReviews();
    } else {
      throw new Error(result.error || 'Failed to delete review');
    }
  };

  return {
    reviews,
    loading,
    error,
    createReview,
    deleteReview,
    refresh: fetchReviews,
  };
}

// ==================== ORDER HOOKS ====================

export function useOrders(userId?: string) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    setLoading(true);
    const endpoint = userId ? `/api/orders?user_id=${encodeURIComponent(userId)}` : '/api/orders';
    const result = await apiCall(endpoint, 'GET');
    if (result.success) {
      setOrders(result.data);
      setError(null);
    } else {
      setError(result.error || 'Failed to fetch orders');
    }
    setLoading(false);
  };

  const createOrder = async (orderData: any) => {
    const result = await apiCall('/api/orders', 'POST', orderData);
    if (result.success) {
      await fetchOrders();
      return result.data;
    }
    throw new Error(result.error || 'Failed to create order');
  };

  const updateOrderStatus = async (id: string, status: string) => {
    const result = await apiCall(`/api/orders/${id}`, 'PUT', { status });
    if (result.success) {
      await fetchOrders();
      return result.data;
    }
    throw new Error(result.error || 'Failed to update order');
  };

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    refresh: fetchOrders,
  };
}

// ==================== MESSAGE HOOKS ====================

export function useMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const result = await apiCall('/api/messages', 'GET');
    if (result.success) {
      setMessages(result.data);
      setError(null);
    } else {
      setError(result.error || 'Failed to fetch messages');
    }
    setLoading(false);
  };

  const createMessage = async (messageData: any) => {
    const result = await apiCall('/api/messages', 'POST', messageData);
    if (result.success) {
      await fetchMessages();
      return result.data;
    }
    throw new Error(result.error || 'Failed to create message');
  };

  const updateMessageStatus = async (id: string, status: string) => {
    const result = await apiCall(`/api/messages/${id}`, 'PUT', { status });
    if (result.success) {
      await fetchMessages();
      return result.data;
    }
    throw new Error(result.error || 'Failed to update message');
  };

  return {
    messages,
    loading,
    error,
    createMessage,
    updateMessageStatus,
    refresh: fetchMessages,
  };
}

// ==================== STATS HOOK ====================

export function useStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const result = await apiCall('/api/stats', 'GET');
    if (result.success) {
      setStats(result.data);
      setError(null);
    } else {
      setError(result.error || 'Failed to fetch stats');
    }
    setLoading(false);
  };

  return {
    stats,
    loading,
    error,
    refresh: fetchStats,
  };
}

// ==================== GENERIC DATABASE HOOK ====================

export function useDatabase<T = any>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = async () => {
    setLoading(true);
    const result = await apiCall(endpoint, 'GET');
    if (result.success) {
      setData(result.data);
      setError(null);
    } else {
      setError(result.error || 'Failed to fetch data');
    }
    setLoading(false);
  };

  const create = async (item: Partial<T>) => {
    const result = await apiCall(endpoint, 'POST', item);
    if (result.success) {
      await fetchData();
      return result.data;
    }
    throw new Error(result.error || 'Failed to create item');
  };

  const update = async (id: string, updates: Partial<T>) => {
    const result = await apiCall(`${endpoint}/${id}`, 'PUT', updates);
    if (result.success) {
      await fetchData();
      return result.data;
    }
    throw new Error(result.error || 'Failed to update item');
  };

  const remove = async (id: string) => {
    const result = await apiCall(`${endpoint}/${id}`, 'DELETE');
    if (result.success) {
      await fetchData();
    } else {
      throw new Error(result.error || 'Failed to delete item');
    }
  };

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    refresh: fetchData,
  };
}
