
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { store } from "./store/store";

import App from "./App.jsx";
import { ChangePassword, ForgotPassword, HomePage, LoginPage, ShowProfile, SignupPage } from "./components/index.js";
import "./index.css";


const router = createBrowserRouter(
  createRoutesFromElements(
  
      <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="users/login" element={<LoginPage />} />
      <Route path="users/sign-up" element={<SignupPage />} />
      <Route path="users/profile" element={<ShowProfile />} />
      <Route path="users/change-password" element={<ChangePassword />} />
      <Route path="users/forgot-password" element={<ForgotPassword />} />
    </Route>
  
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
 
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
