import React from "react";
import {
  Bell, 
  Mic,
  PlusCircle,
  MenuIcon
} from "lucide-react";
import { Button, SearchBar } from "./index.js";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="bg-gray-700 flex items-center justify-between px-6 py-3 w-full gap-6  ">
       <MenuIcon className="w-10 h-8 text-white hover:text-purple-400 hover:cursor-pointer mx-5" />
      {/* logo and Title */}
      <div className="flex items-center gap-4 ">
        <img src={Logo} alt="MyTube Logo" className="w-10 h-10" />
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#7B61FF] via-[#C06CF4] to-[#FF8A65] bg-clip-text text-transparent">
          MyTube
        </h2>
      </div>

      <div className="flex-grow flex justify-center px-36 items-center">
        <SearchBar />
        <Mic
          className="text-white cursor-pointer hover:text-purple-400"
          size={30}
        />
      </div>

      <div className="flex items-center gap-6 text-white ">
        <PlusCircle
          className="cursor-pointer hover:text-purple-400"
          size={30}
          title="Create"
        />
        <Bell
          className="cursor-pointer hover:text-purple-400"
          size={30}
          title="Notifications"
        />
        <Button name="Sign In" onClick={() => console.log("Sign in clicked")} />
      </div>
    </div>
  );
};

export default Navbar;
