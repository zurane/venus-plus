// API client with credentials included for JWT-based auth
const API_BASE = process.env.REACT_APP_API_URL || 'https://subscription-tracker-api-e5u0.onrender.com/api/v1';

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  // attach token from localStorage (if present) so requests use Bearer auth
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const raw = localStorage.getItem('venus_auth');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.token) {
        defaultHeaders['Authorization'] = `Bearer ${parsed.token}`;
      }
    }
  } catch (e) {
    // ignore parse errors
  }

  const defaultOptions = {
    headers: defaultHeaders,
    credentials: 'include', // sends httpOnly cookie (JWT)
    ...options,
  };

  const response = await fetch(url, defaultOptions);

  // Handle unauthorized (redirect to signin)
  if (response.status === 401) {
    window.location.href = '/signin';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error' }));
    throw new Error(error.message || `API error: ${response.status}`);
  }
  return response.json();
};

// Subscription endpoints
export const subscriptionsApiEndPoints = {
  getSubData: (userId) => apiCall(`/subscriptions/user/${userId}`),
  create: (userId, data) => apiCall('/subscriptions', { method: 'POST', body: JSON.stringify(data, userId) }),
  update: (id, data) => apiCall(`/subscriptions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/subscriptions/${id}`, { method: 'DELETE' }),
};

// User endpoints
export const userAPI = {
  deleteAccount: () => apiCall('/users/me', { method: 'DELETE' }),
};
