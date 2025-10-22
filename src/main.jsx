
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store"; 

import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx"; 
import HomePage from "./pages/HomePage/HomePage.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} /> 
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
 
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
