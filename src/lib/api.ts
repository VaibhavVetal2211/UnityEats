// API utility functions for UnityEats
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add authorization header if token exists
  const token = localStorage.getItem('token');
  if (token) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  return fetch(url, { ...defaultOptions, ...options });
};

export const api = {
  // Auth endpoints
  register: (data: { name: string; email: string; password: string }) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  login: (data: { email: string; password: string }) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  profile: () => apiCall('/auth/profile'),
  
  // Food endpoints
  getFoodListings: () => apiCall('/food'),
  getFoodListing: (id: string) => apiCall(`/food/${id}`),
  createFoodListing: (data: FormData) =>
    apiCall('/food', {
      method: 'POST',
      headers: {}, // Don't set Content-Type for FormData
      body: data,
    }),
  
  // Claim endpoints
  createClaim: (data: { foodListingId: string }) =>
    apiCall('/claim', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // Volunteer endpoints
  createVolunteer: (data: any) =>
    apiCall('/volunteer', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
