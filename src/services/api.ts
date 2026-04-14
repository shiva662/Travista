// src/services/api.ts
// Central API client for all backend calls

const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

const parseJsonResponse = async (res: Response) => {
  const text = await res.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch (_) {
    return {
      success: false,
      message: 'Invalid JSON response from server',
      raw: text,
    };
  }
};

// Auth API calls
export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return res.json();
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  resetPassword: async (email: string, newPassword: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword })
    });
    return res.json();
  }
};

// Places API calls
export const placesAPI = {
  // Get all places with search, filter and pagination (fixed per-page)
  getAllPlaces: async (params?: {
    search?: string;
    state?: string;
    page?: number;
  }) => {
    let url = `${API_BASE_URL}/places?`;

    if (params) {
      if (params.page) url += `page=${params.page}&`;
      if (params.search) url += `search=${encodeURIComponent(params.search)}&`;
      if (params.state) url += `state=${encodeURIComponent(params.state)}&`;
    }

    url = url.endsWith('&') ? url.slice(0, -1) : url;

    const res = await fetch(url);
    return res.json();
  },

  // Get single place by ID
  getPlaceById: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/places/${id}`);
    return res.json();
  },

  // Add place (protected)
  addPlace: async (title: string, description: string, state: string, city: string, imageUrl?: string) => {
    const res = await fetch(`${API_BASE_URL}/places`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ title, description, state, city, imageUrl })
    });
    return res.json();
  },

  // Update place (protected)
  updatePlace: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/places/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Delete place (protected)
  deletePlace: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/places/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return res.json();
  },

  // -- Favorites / savedPlaces API --
  savePlace: async (placeId: string) => {
    const res = await fetch(`${API_BASE_URL}/users/save/${placeId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return res.json();
  },

  unsavePlace: async (placeId: string) => {
    const res = await fetch(`${API_BASE_URL}/users/unsave/${placeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return res.json();
  },

  getSavedPlaces: async () => {
    const res = await fetch(`${API_BASE_URL}/users/saved`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });

    // Some servers may return HTML (index.html) on errors or when target isn't available.
    // Guard against JSON parse errors and return a consistent error object instead.
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (err) {
      return { success: false, message: 'Invalid JSON response from server', raw: text, status: res.status };
    }
  }
};

// Reviews API calls
export const reviewsAPI = {
  getPlaceReviews: async (placeId: string, sort: 'newest' | 'oldest' | 'highest' | 'lowest' = 'newest') => {
    const res = await fetch(`${API_BASE_URL}/reviews/${placeId}?sort=${sort}`);
    return res.json();
  },

  addReview: async (placeId: string, rating: number, comment: string, imageUrl?: string) => {
    const res = await fetch(`${API_BASE_URL}/reviews/${placeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ rating, comment, imageUrl: imageUrl || '' })
    });
    return res.json();
  },

  deleteReview: async (reviewId: string) => {
    const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return res.json();
  }
};

// AI Planner API calls
export const aiAPI = {
  generatePlan: async (payload: {
    destination: string;
    days: number;
    budget: 'low' | 'medium' | 'high';
    travelType: 'adventure' | 'cultural' | 'relaxation' | 'mixed';
    regenerate?: boolean;
  }) => {
    const res = await fetch(`${API_BASE_URL}/ai/plan-trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      const err = new Error(data?.message || 'Failed to generate AI plan') as Error & { status?: number };
      err.status = res.status;
      throw err;
    }

    return data;
  }
};

// Saved Trips API calls (separate from saved places)
export const savedTripsAPI = {
  saveTrip: async (tripId: string) => {
    const res = await fetch(`${API_BASE_URL}/saved-trips/${encodeURIComponent(tripId)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await parseJsonResponse(res);
    return {
      status: res.status,
      success: res.ok && data?.success !== false,
      ...data,
    };
  },

  getMySavedTrips: async () => {
    const res = await fetch(`${API_BASE_URL}/saved-trips/mine`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await parseJsonResponse(res);
    return {
      status: res.status,
      success: res.ok && data?.success !== false,
      ...data,
    };
  },

  deleteTrip: async (tripId: string) => {
    const res = await fetch(`${API_BASE_URL}/saved-trips/${encodeURIComponent(tripId)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await parseJsonResponse(res);
    return {
      status: res.status,
      success: res.ok && data?.success !== false,
      ...data,
    };
  },
};
