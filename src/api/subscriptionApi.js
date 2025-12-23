import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});

// Toggle subscription to channel
export const toggleSubscription = (channelId) =>
  API.post(`/subscriptions/channel/${channelId}`);

// Get subscribed channels
export const getSubscribedChannels = (channelId) =>
  API.get(`/subscriptions/channel/${channelId}`);

// Get channel subscribers
export const getChannelSubscribers = (subscriberId) =>
  API.get(`/subscriptions/user/${subscriberId}`);
