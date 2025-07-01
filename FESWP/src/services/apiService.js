// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Helper function to get auth token
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.token;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Profile API functions
export const profileAPI = {
  // Get current user profile
  getCurrentProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to update profile');
    }

    return response.json();
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await fetch(`${API_BASE_URL}/profile/password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwordData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to change password');
    }

    return response.text();
  }
};

// Auth API functions
export const authAPI = {
  // Login
  login: async (loginData) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Login failed');
    }

    return response.json();
  },

  // Register
  register: async (registerData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Registration failed');
    }

    return response.text();
  },

  // Verify code
  verifyCode: async (verificationData) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(verificationData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Verification failed');
    }

    return response.text();
  },

  // Logout
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Logout failed');
    }

    return response.text();
  }
};

export default { profileAPI, authAPI };
