import React from 'react'
import { Menu, Search, Upload, Bell, User, LogOut, Settings, Moon, Sun } from "lucide-react";
import Button from '../ui/Button';

const Navbar = () => {
  return (
    <div className='bg-white flex justify-center mt-5'>
      <Button name="Sign in" onClick={() => console.log("Home clicked")} />
    </div>
  )
}

export default Navbar;
