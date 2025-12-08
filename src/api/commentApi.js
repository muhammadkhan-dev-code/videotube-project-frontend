import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});


export const fetchComments = (videoId, page = 1, limit = 15) =>
  API.get(`/comments/${videoId}?page=${page}&limit=${limit}`);


export const addComment = (videoId, data) =>
  API.post(`/comments/${videoId}`, data);

// UPDATE comment
export const updateComment = (commentId, data) =>
  API.put(`/comments/${commentId}`, data);

// DELETE comment
export const deleteComment = (commentId) =>
  API.delete(`/comments/${commentId}`);
