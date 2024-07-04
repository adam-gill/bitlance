"use client"
import React, { useState } from "react";

import { Card,CardContent,CardHeader,CardFooter,CardTitle, CardDescription } from "@/components/ui/card";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { CiUser } from "react-icons/ci";

import { signup } from "@/app/(auth)/action";
const SignupPage =()=>{
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [username,setUserName] = useState("");
        
        const handleSignUp =async()=>{
                const res = await signup({email,password,username});
                console.log(res);
        }

    return(<>
    <div className="flex justify-center items-center w-full h-screen bg-white text-black">
    
        <div className="bg-primaryBitlanceDark h-3/4 w-3/4 rounded-3xl grid grid-cols-2 text-white">
<div className="flex justify-center mt-10">
        <Card className="w-3/4 h-5/6 bg-transparent border-none   ">
                <CardHeader className="flex justify-center items-center"><span className="text-2xl text-white">CREATE ACCOUNT</span></CardHeader>
                <CardDescription className="flex justify-center items-center pb-4" >We are glad to see you being part of us</CardDescription>
                <CardContent className="flex  flex-col gap-4 justify-between items-center w-full">
                        <Input onChange={(e)=>setEmail(e.target.value)} className="w-3/4 " placeholder="Email"/>
                        <Input  onChange={(e)=>setUserName(e.target.value)}  className="w-3/4 " placeholder="username"/>
                        <Input onChange={(e)=>setPassword(e.target.value)} type="password" className="w-3/4 " placeholder="Password"/>
                        <Input type="password" className="w-3/4 " placeholder="Confirm Password"/>
                        <div className="w-3/4 flex justify-end ">
            <Button onClick={handleSignUp} className="flex justify-end">SIGNUP</Button>
          </div>
         
          <Separator className="w-3/4" />
        
        <Button className="w-3/4 h-10 border-primaryBitlanceLightGreen bg-transparent hover:bg-transparent" variant="outline"><FcGoogle className="w-10 h-8  "/><span className="text-primaryBitlanceLightGreen">Login with google</span></Button>

         
      
                        
                </CardContent>

        </Card>

</div>
<div className="bg-bitlance-hero bg-cover bg-no-repeat  grid-cols-1 w-full h-full rounded-3xl "></div>
        </div>


       
        </div></>)
}

export default SignupPage;