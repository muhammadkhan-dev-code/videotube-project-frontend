import React from "react";
import {HomeIcon ,Clapperboard,Library,User,Download} from 'lucide-react'

const Sidebar = () => {
  const iconClasses = "cursor-pointer hover:text-purple-400 transition-colors duration-200"
  
  return (
    <aside className="min-w-32 h-screen bg-gray-700 text-white">
      <div className="flex flex-col gap-10 pt-7 items-center  ">
        <HomeIcon
        size={30}
        className={iconClasses}/>
        <Clapperboard className={iconClasses}
        size={30}/>
        <Library className={iconClasses}
        size={30}/>
        <User className={iconClasses}
        size={30}/>
        <Download className={iconClasses}
        size={30}/>

      </div>
  
    </aside>
  );
};

export default Sidebar;
