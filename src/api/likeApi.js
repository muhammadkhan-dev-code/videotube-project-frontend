import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});

// Toggle like on video
export const toggleVideoLike = (videoId) =>
  API.post(`/likes/toggle/video/${videoId}`);

// Toggle like on comment
export const toggleCommentLike = (commentId) =>
  API.post(`/likes/toggle/comment/${commentId}`);

// Toggle like on tweet
export const toggleTweetLike = (tweetId) =>
  API.post(`/likes/toggle/tweet/${tweetId}`);

// Get all liked videos
export const getLikedVideos = () =>
  API.get("/likes/videos");
