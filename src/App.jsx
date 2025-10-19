import React from "react";

import { Outlet } from "react-router";

import { Navbar, Sidebar } from "./index";

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
