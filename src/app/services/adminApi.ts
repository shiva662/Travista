const API_URL = 'http://localhost:5000/api/admin';

// Reusable fetch headers with auth token attached
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
};

export const getDashboardStats = async () => {
  const res = await fetch(`${API_URL}/dashboard`, { ...getAuthHeaders(), method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return res.json();
};

export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/users`, { ...getAuthHeaders(), method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${API_URL}/users/${id}`, { ...getAuthHeaders(), method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');
  return res.json();
};

export const getAllPlaces = async () => {
  const res = await fetch(`${API_URL}/places`, { ...getAuthHeaders(), method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch places');
  return res.json();
};

export const deletePlace = async (id: string) => {
  const res = await fetch(`${API_URL}/places/${id}`, { ...getAuthHeaders(), method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete place');
  return res.json();
};

export const getAllReviews = async () => {
  const res = await fetch(`${API_URL}/reviews`, { ...getAuthHeaders(), method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
};

export const deleteReview = async (id: string) => {
  const res = await fetch(`${API_URL}/reviews/${id}`, { ...getAuthHeaders(), method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete review');
  return res.json();
};
