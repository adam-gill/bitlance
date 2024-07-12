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

export const createJob = async (jobDetails: jobData) => {
  try {
    const { description, category, user_id } = jobDetails;
    const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/job`, 
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, category, user_id })
      }
    );
    return res;
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

export const getAllJobs = async () => {
  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/job`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res;
}

export const updateJob = async (job_id: string, user_id: string) => {
  const res = await axios.put(`${process.env.NEXTAUTH_URL}/api/job`,
    {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id, user_id })
    }
  );
  return res;
}

export const getAccess = async (user_id: string) => {
  try {
    const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/user/access`,
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id })
      }
    );
    return res;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

export const freelancerDetails = async (user_id: string) => {
  try {
    const url = new URL(`${process.env.NEXTAUTH_URL}/api/user/freelancer`);
    url.searchParams.append("user_id", user_id);
    const res = await axios.get(url.toString(),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("R", res);
    return res;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

export const clientDetails = async (user_id: string) => {
  try {
    const url = new URL(`${process.env.NEXTAUTH_URL}/api/user/client`);
    url.searchParams.append("user_id", user_id);
    const res = await axios.get(url.toString(),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}
