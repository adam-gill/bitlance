"use client"
import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { signup } from "@/app/(auth)/action";
import { UserSignUp } from "@/config/apiconfig";
import { useRouter } from "next/navigation";
import { NotificationAuth } from "@/components/errorNotification";
import { TailSpin } from "react-loading-icons";

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null | undefined>("");

  

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !username) {
      setError("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data = {
      email: email as string,
      password: password as string,
      username:username as string,
    }
    setLoading(true)
    const res = await UserSignUp(data)
    console.log("res error",res)
    if (res) {
      setLoading(false)
    } 
    if(res?.status === 201){
      router.replace('/login')
      }else{
        const {message} =await res?.json()
        
        setError(message)  
      }
    console.log("register error",res);
  };

  const keyPress = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        handleSignUp()
      }
    },
    [email, password, confirmPassword, username]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-white text-black">
        <div className="bg-primaryBitlanceDark h-auto md:h-3/4 w-11/12 md:w-3/4 rounded-3xl grid grid-cols-1 md:grid-cols-2 text-white shadow-lg overflow-hidden">
          <div className="flex flex-col justify-center items-center h-full p-8">
            <Card className="w-full h-full bg-transparent border-none">
              <CardHeader className="flex justify-center items-center">
                <span className="text-3xl font-bold text-white">CREATE ACCOUNT</span>
              </CardHeader>
              <CardDescription className="flex justify-center items-center text-center py-4 text-lg">
                We are glad to have you as part of our community!
              </CardDescription>
              <CardContent className="flex flex-col gap-4 justify-center items-center">
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md"
                  placeholder="Email"
                  required={true}
                />
                <Input
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-3 rounded-md"
                  required={true}
                  placeholder="Username"
                />
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required={true}
                  className="w-full p-3 rounded-md"
                  placeholder="Password"
                />
                <Input
                onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required={true}
                  className="w-full p-3 rounded-md"
                  placeholder="Confirm Password"
                  id="lastInput"
                />
                <div className="w-full flex justify-end">
                  <Button
                    onClick={handleSignUp}
                    className="flex justify-center w-full py-3 bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300"
                  >
                    {loading ? <TailSpin stroke="#181818" width={32} strokeWidth={3} speed={2} /> : "SIGN UP"}
                  </Button>
                </div>
                <NotificationAuth message={error}/>
                <Separator className="w-full my-2" />
                <Button className="w-full h-12 border-primaryBitlanceLightGreen bg-transparent text-primaryBitlanceLightGreen hover:bg-primaryBitlanceLightGreen hover:text-black transition duration-300 flex items-center justify-center gap-2" variant="outline">
                  <FcGoogle className="w-6 h-6" />
                  <span>Login with Google</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="hidden md:flex justify-center items-center bg-bitlance-hero bg-cover bg-no-repeat w-full h-full rounded-3xl"></div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
