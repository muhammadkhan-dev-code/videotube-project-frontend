import React, { useState } from "react";
import { Bell, Mic, PlusCircle, MenuIcon } from "lucide-react";
import { Button, SearchBar } from "./index.js";
import Logo from "../assets/logo.svg";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

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
        <PlusCircle className="cursor-pointer hover:text-purple-400" size={30} title="Create" />
        <Bell className="cursor-pointer hover:text-purple-400" size={30} title="Notifications" />
        <Button name="Sign In" onClick={() => console.log("Sign in clicked")} />
      </div>
    </div>
  );
};

export default Navbar;
