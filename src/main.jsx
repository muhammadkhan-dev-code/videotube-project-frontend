
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store"; 

import "./index.css";
import App from "./App.jsx";
import { HomePage, Login } from "./components/index.js";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
       <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
      </Route>
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
