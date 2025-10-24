
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store"; 

import "./index.css";
import App from "./App.jsx";
import { HomePage, LoginPage,SignupPage ,ProfilePage} from "./components/index.js";


const router = createBrowserRouter(
  createRoutesFromElements(
  
      <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="users/login" element={<LoginPage />} />
      <Route path="users/sign-up" element={<SignupPage />} />
      <Route path="users/profile" element={<ProfilePage />} />
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
