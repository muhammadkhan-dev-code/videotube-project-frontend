import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});

// GET all videos with filters
export const getAllVideos = (params) =>
  API.get("/videos", { params });

// GET video by ID
export const getVideoById = (videoId) =>
  API.get(`/videos/${videoId}`);

// POST upload video
export const uploadVideo = (formData) =>
  API.post("/videos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// PATCH update video
export const updateVideo = (videoId, data) =>
  API.patch(`/videos/${videoId}`, data);

// DELETE video
export const deleteVideo = (videoId) =>
  API.delete(`/videos/${videoId}`);

// PATCH toggle publish status
export const togglePublishStatus = (videoId) =>
  API.patch(`/videos/toggle/publish/${videoId}`);
