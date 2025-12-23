import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});

// Get channel stats
export const getChannelStats = () =>
  API.get("/dashboard/status");

// Get channel videos
export const getChannelVideos = () =>
  API.get("/dashboard/videos");
