import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "./components/index.js";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    console.log("Searching for:", query); // debug log
    setSearchQuery(query.trim());
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onSearch={handleSearch} /> {/* ✅ Pass handler down */}

      <div className="flex flex-2">
        <Sidebar />
        <main className="flex-1 p-4 overflow-y-auto">
          {/* ✅ Pass searchQuery to HomePage via context */}
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
}

export default App;
