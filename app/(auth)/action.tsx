'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from "next-auth/react";
import axios from 'axios';
import { Role } from "@prisma/client"; // Adjust this import based on your Prisma generated types

type Data = {
  username?: string;
  password: string;
  email: string;
};

type userData = {
  username?: string;
  password: string;
  email: string;
  role: Role;
  freelancer?: FreelancerData | null;
  client?: ClientData | null;
}

type FreelancerData = {
  user_id: string;
  bio: string;
  skills: string;
  portfolio_link: string;
  social_link: string;
};

type ClientData = {
  user_id: string;
  company_name: string;
  company_description: string | null;
  websiteLink: string | null; // Include websiteLink in ClientData
};

type jobData = {
  description: string;
  category: string;
  user_id: string;
}

export const UserSignUp = async (userDetails: userData) => {
  try {
    const res = await axios.post('/api/user/signup', {
      username: userDetails.username,
      password: userDetails.password,
      email: userDetails.email,
      role: userDetails.role,
      freelancer: userDetails.freelancer,
      client: userDetails.client,
    });

    return res.data; // Return the response data
  } catch (error) {
    console.error('Failed to register:', error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const UserLogin = async (userDetails: Data) => {
  try {
    const res = await signIn("credentials", {
      email: userDetails.email,
      password: userDetails.password,
      redirect: false,
    });
    console.log("weeeh", res);
    return res;
  } catch (error) {
    console.log("failed to login", error);
  }
};

interface LoginData {
  email: string;
  password: string;
  username?: string;
}

export async function login(formData: LoginData) {
  const data: Data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const res = await UserLogin(data);
  console.log("res res", res);

  if (res?.status === 200) {
    redirect('/dashboard');
  }
}

export async function signup(formData: LoginData) {
  const data: userData = {
    email: formData.email as string,
    password: formData.password as string,
    username: formData.username as string,
    role: Role.FREELANCER, // Set the default role or modify as needed
    freelancer: null, // Adjust based on your form data
    client: null, // Adjust based on your form data
  };

  const res = await UserSignUp(data);
  console.log(res);

  if (res?.status === 201) {
    redirect('/login');
  }
}
