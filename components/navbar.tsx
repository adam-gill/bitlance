"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Import icons for the hamburger menu
import { handleSignOut } from "@/app/(dashboard)/(routes)/dashboard/page";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full h-20 flex flex-col sm:flex-row justify-between items-center bg-primaryBitlanceDark text-primaryBitlanceGray border-b-2 border-gray-800 p-4 relative">
      {/* Mobile menu button */}
      <div className="sm:hidden absolute right-4 top-4">
        <Button 
          onClick={toggleMenu}
          className="text-black hover:text-white transition duration-300"
        >
          {isOpen ? <XMarkIcon className="w-6 h-6"/> : <Bars3Icon className="w-6 h-6"/>}
        </Button>
      </div>

      {/* Centered container */}
      <div className="flex flex-1 items-center justify-between sm:justify-center">
        {/* Logo */}
        <div
          onClick={() => router.replace("/")}
          className="text-3xl font-bold text-primaryBitlanceLightGreen mr-0 sm:mr-40 cursor-pointer hover:text-white transition duration-300 flex-shrink-0"
        >
          BITLANCE
        </div>
        
        {/* Desktop menu */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:space-x-4 ${isOpen ? "block" : "hidden"} sm:flex`}>
          <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 sm:mt-0 ml-0 sm:ml-40">
            {!session?.user.data && (
              <>
                <Button 
                onClick={() => router.replace("/login")} 
                variant="link" 
                className="text-primaryBitlanceGray hover:text-white transition duration-300"
              >
                Login
              </Button>
              <Button 
                onClick={() => router.replace("/signup")} 
                className="mt-2 sm:mt-0"
              >
                Sign Up
              </Button>
              </>
            )}
            {session?.user.data && (
              <>
                <Button variant="outline" onClick={handleSignOut} className="text-primaryBitlanceLightGreen bg-transparent border-primaryBitlanceLightGreen">Sign Out</Button>
              </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
