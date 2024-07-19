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
  