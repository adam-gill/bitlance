"use client"
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


const Navbar =()=>{
    const router = useRouter();
    return(
        <div className="w-full h-20 flex justify-around  p-2 items-center bg-primaryBitlanceDark  text-primaryBitlanceGray border-b-2 border-gray-800">
            <div  onClick={()=>router.replace("/")}>LOGO</div>
            <div className="flex justify-around items-center w-1/4">
            <Button variant="link" className="text-primaryBitlanceGray">About</Button>
                <Button variant="link" className="text-primaryBitlanceGray">Blog</Button>
            </div>
            <div className="flex justify-around items-center w-1/4">
            <Button  onClick={()=>router.replace("/login")} variant="link" className="text-primaryBitlanceGray">Login</Button>
                
               <Button onClick={()=>router.replace("/signup")}> SignUp</Button>
                
            </div>


        </div>
    )
}

export default Navbar;