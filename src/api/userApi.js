import axios from "axios";

const API_URL = `${import.meta.env.VITE_USER_baseURL}`;

const API = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true,
});

// ============ AUTHENTICATION ENDPOINTS ============

export const registerUser = async (formData) => {
  return await API.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const loginUser = async (credentials) => {
  return await API.post("/login", credentials);
};

export const logoutUser = async () => {
  return await API.post("/logout");
};

export const refreshAccessToken = async () => {
  return await API.post("/refresh-token");
};

export const getCurrentUser = async () => {
  return await API.get("/current-user");
};

export const changePassword = async (data) => {
  return await API.post("/change-password", data);
};

export const forgotPassword = async (email) => {
  return await API.post("/forgot-password", { email });
};

// ============ PROFILE ENDPOINTS ============

export const getUserProfile = async () => {
  return await API.get("/profile");
};

export const getChannelProfile = async (username) => {
  return await API.get(`/channel/${username}`);
};

export const getWatchHistory = async () => {
  return await API.get("/watch-history");
};

export const updateAccount = async (data) => {
  return await API.put("/update-account", data);
};

export const updateAvatar = async (formData) => {
  return await API.patch("/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateCoverImage = async (formData) => {
  return await API.patch("/cover-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ============ VIDEO ENDPOINTS ============

export const getUserVideos = async (userId) => {
  return await API.get(`/${userId}/videos`);
};

export const deleteVideo = async (videoId) => {
  return await API.delete(`/videos/${videoId}`);
};

// ============ AXIOS INTERCEPTORS ============

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        return API(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;