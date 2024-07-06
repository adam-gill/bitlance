import { signIn } from "next-auth/react";

type Data = {
    username?: string;
    password: string;
    email: string;
  };

export const UserSignUp = async (userDetails: Data) => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userDetails.username,
          password: userDetails.password,
          email: userDetails.email,
      
        }),
      });
      return res;
    } catch (error) {
      console.log("failed to register", error);
    }
  };



  export const UserLogin = async (userDetails: Data) => {
    try {
      const res = await signIn("credentials", {
        email:userDetails.email,
        password:userDetails.password,        
        redirect: false,
      });
      console.log("weeeh",res)
     
      return res;
    } catch (error) {
      console.log("failed to register", error);
      
    }
  };