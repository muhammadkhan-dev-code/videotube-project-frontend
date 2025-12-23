import { Bell, LayoutDashboard, MenuIcon, MessageSquare, Mic, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth";
import { Button, SearchBar } from "./index.js";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setQuery(e.target.value);

  const handleSearch = () => {
    if (onSearch && typeof onSearch === "function") {
      onSearch(query);
    } else {
      console.error("onSearch is not a function");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-gray-700 flex items-center justify-between px-6 py-3 w-full gap-6">
      <MenuIcon className="w-10 h-8 text-white hover:text-purple-400 hover:cursor-pointer mx-5" />

      <div className="flex items-center gap-4">
        <img src={Logo} alt="MyTube Logo" className="w-10 h-10" />
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#7B61FF] via-[#C06CF4] to-[#FF8A65] bg-clip-text text-transparent">
          MyTube
        </h2>
      </div>

      <div className="flex-grow flex justify-center px-36 items-center">
        {/* ✅ Pass handleSearch & handleKeyDown */}
        <SearchBar
          value={query}
          onChange={handleChange}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <Mic className="text-white cursor-pointer hover:text-purple-400" size={30} />
      </div>

      <div className="flex items-center gap-6 text-white">
        {user ? (
          <>
            <Upload 
              className="cursor-pointer hover:text-purple-400" 
              size={28} 
              title="Upload Video"
              onClick={() => navigate("/upload")}
            />
            <LayoutDashboard 
              className="cursor-pointer hover:text-purple-400" 
              size={28} 
              title="Dashboard"
              onClick={() => navigate("/dashboard")}
            />
            <MessageSquare 
              className="cursor-pointer hover:text-purple-400" 
              size={28} 
              title="Community"
              onClick={() => navigate("/tweets")}
            />
            <Bell className="cursor-pointer hover:text-purple-400" size={28} title="Notifications" />
            <div className="relative group">
              <img 
                src={user.avatar} 
                alt={user.fullName}
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-purple-400"
                onClick={() => navigate("/users/profile")}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                <button 
                  onClick={() => navigate("/users/profile")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <Button name="Sign In" onClick={() => navigate("/users/login")} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
