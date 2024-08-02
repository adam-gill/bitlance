import { Role, Category, Status, Client, Freelancer, JobFreelancer } from "@prisma/client";

export interface FreelancerData {
    bio: string;
    skills: string;
    portfolio_link: string;
    social_link: string;
}

export interface ClientData {
    company_name: string;
    company_description: string;
    websiteLink: string;
    c_id?:string;
}

export type User = {
    user_id: string;
    username: string;
    password: string;
    email: string;
    created_at: Date;
    name: string;
    discord_handle: string | null;
    role: Role;
  };

  export interface Jobs {
    job_id: string;
    title: string;
    created_at: Date;
    description: string;
    category: Category;
    u_id:string;
    client_address: string;
    freelancer_id: string | null;
    client_id: string;
    price: number | null;
    f_rating: number | null;
    c_rating: number | null;
    status: Status;
    client: Client;
    freelancer: Freelancer | null;
    freelancers: JobFreelancer[];
  }
  

  

  interface ClientDetails{
    avg_rating?:number,
    c_id: string,
    company_description:string,
    company_name:string,
    total_amount_spent?:number,
    total_jobs_posted?:number,
    user_id:string,
    websiteLink?:string
  }


  interface FreeLancerDetails{
    created_at:string,
    email:string,
    name:string,
   
    bio:string,
    skills:string,
    portfolio_link:string,
    social_link:string,
   
    role:string,
    user_id:string,
    username:string,
    user:User


  }



  interface JobDetails{
    c_rating?:number,
    category:string,
    client_address:string,
    client_id:string,
    created_at:string,
    description:string,
    f_rating?:number,
    freelancer_id?:string,
    job_id:string,
    price:number,
    status:Status,
    title:string,
    u_id:string


  }

  export interface JobRequestDetails{
    client: ClientDetails,
    client_id:string,
    freelancer:FreeLancerDetails,
    freelancer_address:string,
freelancer_id:string,
id:string,
job:JobDetails,
job_id:string
    
    
  }