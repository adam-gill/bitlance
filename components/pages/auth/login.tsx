import React from "react";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-white text-black">
        <div className="bg-primaryBitlanceDark h-3/4 w-3/4 rounded-3xl grid grid-cols-2 text-white shadow-lg">
          <div className="flex justify-center mt-10">
            <Card className="w-3/4 h-5/6 bg-transparent border-none">
              <CardHeader className="flex justify-center items-center">
                <span className="text-3xl font-bold text-white">WELCOME</span>
              </CardHeader>
              <CardDescription className="flex justify-center items-center pb-4 text-lg">
                We are glad to see you back with us!
              </CardDescription>
              <CardContent className="flex flex-col gap-4 justify-center items-center w-full">
                <Input className="w-3/4 p-3 rounded-md" placeholder="Email" />
                <Input type="password" className="w-3/4 p-3 rounded-md" placeholder="Password" />
                <div className="w-3/4 flex justify-end">
                  <Button className="flex justify-center w-full py-3 bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300">
                    LOGIN
                  </Button>
                </div>
                <Separator className="w-3/4 my-4" />
                <Button className="w-3/4 h-12 border-primaryBitlanceLightGreen bg-transparent text-primaryBitlanceLightGreen hover:bg-primaryBitlanceLightGreen hover:text-black transition duration-300 flex items-center justify-center gap-2" variant="outline">
                  <FcGoogle className="w-6 h-6" />
                  <span>Login with Google</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="bg-bitlance-hero bg-cover bg-no-repeat w-full h-full rounded-3xl"></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
