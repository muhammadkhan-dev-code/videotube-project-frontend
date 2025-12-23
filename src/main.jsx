
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { store } from "./store/store";

import App from "./App.jsx";
import {
    ChangePassword,
    ChannelPage,
    DashboardPage,
    EditProfile,
    ForgotPassword,
    HomePage,
    LoginPage,
    PlaylistPage,
    ShowProfile,
    SignupPage,
    TweetsPage,
    VideoPage,
    VideoUploadPage
} from "./components/index.js";
import "./index.css";


const router = createBrowserRouter(
  createRoutesFromElements(
  
      <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="video/:videoId" element={<VideoPage />} />
      <Route path="upload" element={<VideoUploadPage />} />
      <Route path="channel/:username" element={<ChannelPage />} />
      <Route path="playlist/:playlistId" element={<PlaylistPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="tweets" element={<TweetsPage />} />
      <Route path="users/login" element={<LoginPage />} />
      <Route path="users/sign-up" element={<SignupPage />} />
      <Route path="users/profile" element={<ShowProfile />} />
        <Route path="users/edit-profile" element={<EditProfile />} />
      <Route path="users/change-password" element={<ChangePassword />} />
      <Route path="users/forgot-password" element={<ForgotPassword />} />
    </Route>
  
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </Provider>
  </StrictMode>
);
