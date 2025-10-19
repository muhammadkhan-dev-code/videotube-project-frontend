import React from "react";

import { Outlet } from "react-router";
import { Navbar, Sidebar } from "./components/index.js";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Sidebar />
    </div>
  );
}

export default App;
