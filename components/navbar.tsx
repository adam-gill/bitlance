"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Import icons for the hamburger menu
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="w-full h-20 flex flex-col sm:flex-row justify-between items-center bg-primaryBitlanceDark text-primaryBitlanceGray border-b-2 border-gray-800 py-4 px-[56px] relative">
      {/* Mobile menu button */}
      <div className="sm:hidden absolute right-4 top-4">
        <Button 
          onClick={toggleMenu}
          className="text-black hover:text-white transition duration-300"
        >
          {isOpen ? <XMarkIcon className="w-6 h-6"/> : <Bars3Icon className="w-6 h-6"/>}
        </Button>
      </div>

      {/* Logo */}
      <div
        onClick={() => router.replace("/")}
        className="text-3xl font-bold text-primaryBitlanceLightGreen cursor-pointer hover:text-white transition duration-300 flex-shrink-0"
      >
        BITLANCE
      </div>

      {/* Desktop menu */}
      <div className={`hidden sm:flex items-center ml-auto space-x-4`}>
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
              className="text-black hover:bg-white hover:text-black transition duration-300"
            >
              Sign Up
            </Button>
          </>
        )}
        {session?.user.data && (
          <>
            <Button 
              variant="outline" 
              onClick={handleSignOut} 
              className="text-primaryBitlanceLightGreen bg-transparent border-primaryBitlanceLightGreen"
            >
              Sign Out
            </Button>
          </>
        )}
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? "block" : "hidden"} absolute top-16 left-0 right-0 bg-primaryBitlanceDark p-4 px-10 border-t border-gray-800`}>
        <div className="flex flex-col space-y-4 py-10">
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
                className="text-black hover:bg-white hover:text-black transition duration-300"
              >
                Sign Up
              </Button>
            </>
          )}
          {session?.user.data && (
            <>
              <Button 
                variant="outline" 
                onClick={handleSignOut} 
                className="text-primaryBitlanceLightGreen bg-transparent border-primaryBitlanceLightGreen"
              >
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
