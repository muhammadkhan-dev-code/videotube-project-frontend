import React from "react";
import {HomeIcon ,Clapperboard,Library,User,Download} from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="max-w-32 h-screen bg-gray-700 text-white">
      <div className="flex flex-col gap-10 pt-7 items-center  ">
        <HomeIcon
        size={30}
        className="cursor-pointer hover:text-purple-400"/>
        <Clapperboard className="cursor-pointer hover:text-purple-400"
        size={30}/>
        <Library className="cursor-pointer hover:text-purple-400"
        size={30}/>
        <User className="cursor-pointer hover:text-purple-400"
        size={30}/>
        <Download className="cursor-pointer hover:text-purple-400"
        size={30}/>

      </div>
  
    </aside>
  );
};

export default Sidebar;
