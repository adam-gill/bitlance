import { signIn } from "next-auth/react";
import axios from 'axios';
import { Role, Category } from "@prisma/client"; // Adjust this import based on your Prisma generated types
import { DataJobRequest } from "@/app/api/jobrequest/route";

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
  title: string;
  description: string;
  category: Category;
  user_id: string;
  price: number;
  client_id:string;
  client_address:string;
}

type jobUpdateData = {
  title: string;
  description: string;
  category: Category;
  price: number;
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
    const { title, description, category, user_id, price,client_address,client_id } = jobDetails;
    const res = await axios.post(
      '/api/job',
      { title, description, category, user_id, price,client_address,client_id }, // Pass data directly
      { headers: { "Content-Type": "application/json" } } // Pass headers in the config object
    );
    return res;
  } catch (error) {
    console.log("Something went wrong", error);
    throw error; // Ensure to throw the error so it can be caught where `createJob` is called
  }
}

//request for a job

export const RequestAJob = async (jobDetails: DataJobRequest) => {
  try {
    const {freelancer_address,client_id,freelancer_id,job_id } = jobDetails;
    const res = await axios.post(
      '/api/jobrequest',
      { freelancer_address,client_id,freelancer_id,job_id }, // Pass data directly
      { headers: { "Content-Type": "application/json" } } // Pass headers in the config object
    );
    return res;
  } catch (error) {
    console.log("Something went wrong", error);
    throw error; // Ensure to throw the error so it can be caught where `createJob` is called
  }
}

export const getAllJobs = async () => {
  try {
    const res = await axios.get('/api/job',
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

//get all client jobs

export const getAllClientJobs = async (client_id: string | undefined) => {
  try {
    const res = await axios.get(`/api/clientjob`, {
      params: { client_id },
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

//get all jobs requests under the Main Job
export const getRequestsPerJob = async (job_id: string | undefined) => {
  try {
    const res = await axios.get(`/api/requestsperjob`, {
      params: { job_id },
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Something went wrong", error);
  }
};
//update job to inprogress
export const updateJobStatusToInProgress = async (job_id: string,client_id:string | undefined, freelancer_id:string|undefined) => {
  try {
    const res = await axios.patch('/api/clientjob/updatestatus', {
      job_id, client_id, freelancer_id
    }, {
      headers: { "Content-Type": "application/json" },
    });
    
    
    return res;
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

//update job to Close
export const updateJobStatusToClose = async (job_id: string,client_id:string | undefined, freelancer_id:string|undefined) => {
  try {
    const res = await axios.patch('/api/clientjob/updateclose', {
      job_id, client_id, freelancer_id
    }, {
      headers: { "Content-Type": "application/json" },
    });
    
    
    return res;
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

//update job to completed
export const updateJobStatusToCompleted = async (job_id: string, freelancer_id:string|undefined) => {
  try {
    const res = await axios.patch('/api/clientjob/updatecomplete', {
      job_id,freelancer_id
    }, {
      headers: { "Content-Type": "application/json" },
    });
    
    
    return res;
  } catch (error) {
    console.error("Something went wrong", error);
  }
};
//get all freelancer requests jobs

export const getFreelancerRequestJobs = async (freelancer_id: string | undefined) => {
  try {
    const res = await axios.get(`/api/freelancerrequestjobs`, {
      params: { freelancer_id },
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

export const updateJob = async (jobDetails: jobUpdateData, job_id: string, user_id: string) => {
  const { title, description, category, price } = jobDetails;
  try {
    const res = await axios.put('/api/job',
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id, user_id, title, description, category, price })
      }
    );
    return res;
  } catch (error) {
    console.error("Something went wrong", error);
  }
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
    const res = await axios.get('/api/user/freelancer', {
      params: { user_id },
      headers: { "Content-Type": "application/json" },
    });
    console.log("R", res);
    return res.data; // Return the response data
  } catch (error) {
    console.error("Failed to fetch freelancer details:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const clientDetails = async (user_id: string) => {
  try {
    const res = await axios.get('/api/user/client', {
      params: { user_id },
      headers: { "Content-Type": "application/json" },
    });
    return res.data; // Return the response data
  } catch (error) {
    console.error("Failed to fetch client details:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const getUserJobs = async (user_id: string, isFreelancer: boolean) => {
  try {
    const res = await axios.get('/api/job/user', {
      params: { user_id, isFreelancer },
      headers: { "Content-Type": "application/json" },
    });

    if (res.data.success) {
      return res.data.data || []; // Return the data array or an empty array if data is null/undefined
    } else {
      throw new Error("Failed to fetch user jobs: Response was not successful.");
    }
  } catch (error) {
    console.error("Failed to fetch user jobs:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
