// API utility functions for UnityEats
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  // Start with default headers
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  // Add authorization header if token exists
  const token = localStorage.getItem('token');
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // If sending FormData, let the browser set the Content-Type with boundary
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  if (isFormData) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete headers['Content-Type'];
  }

  const finalOptions: RequestInit = {
    ...options,
    headers,
  };

  return fetch(url, finalOptions);
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
