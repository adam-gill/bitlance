"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { UserLogin } from "@/config/apiconfig";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await UserLogin({ email, password });
    console.log("res res response", res);
    if (res?.ok) {
      router.replace('/dashboard');
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-white text-black">
        <div className="bg-primaryBitlanceDark h-auto md:h-3/4 w-11/12 md:w-3/4 rounded-3xl grid grid-cols-1 md:grid-cols-2 text-white shadow-lg">
          <div className="flex flex-col justify-center items-center h-full p-8">
            <Card className="w-full h-full bg-transparent border-none">
              <CardHeader className="flex justify-center items-center">
                <span className="text-3xl font-bold text-white">WELCOME</span>
              </CardHeader>
              <CardDescription className="flex justify-center items-center text-center pb-4 text-lg">
                We are glad to see you back with us!
              </CardDescription>
              <CardContent className="flex flex-col gap-4 justify-center items-center w-full">
                <Input onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-md" placeholder="Email" />
                <Input onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-3 rounded-md" placeholder="Password" />
                <div className="w-full flex justify-end">
                  <Button onClick={handleLogin} className="flex justify-center w-full py-3 bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300">
                    LOGIN
                  </Button>
                </div>
                <Separator className="w-full my-4" />
                <Button className="w-full h-12 border-primaryBitlanceLightGreen bg-transparent text-primaryBitlanceLightGreen hover:bg-primaryBitlanceLightGreen hover:text-black transition duration-300 flex items-center justify-center gap-2" variant="outline">
                  <FcGoogle className="w-6 h-6" />
                  <span>Login with Google</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="bg-bitlance-hero bg-cover bg-no-repeat w-full h-full rounded-3xl hidden md:block"></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
