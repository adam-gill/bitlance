import { signIn } from "next-auth/react";
import axios from 'axios';

type Data = {
  username?: string;
  password: string;
  email: string;
};

type jobData = {
  description: string;
  category: string;
  user_id: string;
}

export const UserSignUp = async (userDetails: Data) => {
  try {
    const res = await fetch(`/api/user/signup`, {
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
