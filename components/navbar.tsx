import React from "react";
import { Button } from "./ui/button";


const Navbar =()=>{
    return(
        <div className="w-full h-20 flex justify-around  p-2 items-center bg-primaryBitlanceDark  text-primaryBitlanceGray border-b-2 border-primaryBitlanceGray">
            <div>LOGO</div>
            <div className="flex justify-around items-center w-1/4">
            <Button variant="link" className="text-primaryBitlanceGray">About</Button>
                <Button variant="link" className="text-primaryBitlanceGray">Blog</Button>
            </div>
            <div className="flex justify-around items-center w-1/4">
            <Button variant="link" className="text-primaryBitlanceGray">Login</Button>
                
               <Button> SignUp</Button>
                
            </div>


        </div>
    )
}

export default Navbar;