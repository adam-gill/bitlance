"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getAllJobs } from '@/config/apiconfig'; // Import your getAllJobs function
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RequestAJob } from '@/config/apiconfig';
import { useAccount } from 'wagmi';
import useContract from '@/modeContracts/useContract';
import {ethers} from "ethers"
import { Status } from '@prisma/client';

// Define the structure of the job object

interface Job {
  job_id: string;
  title: string;
  description: string;
  category: string;
  client_address:string;
  client_id:string;
  price: number;
  status: string;
  created_at:string;
}

const JobsPage: React.FC = () => {
  const {address} = useAccount()
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]); // Ensure jobs is always an array
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const {RequestJob} = useContract()
 
  const router = useRouter();


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        if (res?.data && Array.isArray(res.data)) {
          setJobs(res.data);
        } else {
          setErrorMessage("Failed to fetch jobs.");
        }
      } catch (error: any) {
        console.error("Failed to fetch jobs:", error);
        setErrorMessage("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleRequestJob = async(client_id:string,job_id:string,client_address:string,price:number, status:string)=>{
    try{
      if (!address) {
        setErrorMessage("Freelancer address is required.");
        alert("Freelancer address is required")
        return;
      }
      if (!client_id && !job_id  &&  !client_address) {
        setErrorMessage("Please Retry again");
        return;
      }
      if(status !== Status.OPEN){
        alert("This job is not Open, You cannot apply!");
        return;
      }
      const res = await RequestAJob({freelancer_address:address as string,client_id:client_id,job_id:job_id,freelancer_id:session?.user.data.user_id})
      if(res.status == 202){
        alert(res.data.message);
        return; // We will not proceed from here, as the user has already applied for the job!
        }
      if (res.status == 201) {
        const tx = await RequestJob(job_id,client_address,ethers.parseEther(price.toString()))
        console.log("the tx",tx);
        alert("Transaction Successfull, Job Requested Successfully!");
      } 
      else{
        alert("Failed to Request Job!")
        setErrorMessage("Failed to request job.");
      }
    }
      catch(err){
      console.error(err);
      alert("Failed to apply for the Job!");
      setErrorMessage("An error occurred while requesting the job.");
    }
  }



  return (
    <div className="min-h-screen flex flex-col bg-primaryBitlanceDark text-white">
      <header className="bg-primaryBitlanceDark p-4 shadow-lg flex flex-col items-center space-y-4">
        <Button 
          onClick={() => router.replace("/dashboard")} 
          className="bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300 px-6 py-2"
        >
          Return to Dashboard
        </Button>
      </header>
      <main className="flex-grow p-8">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-primaryBitlanceLightGreen">Loading jobs...</p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center">
            {jobs && jobs.length > 0 ? (
              <ul className="w-full max-w-4xl space-y-4">
                {jobs.map((job: Job) => (
                  <li key={job.job_id} className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 mb-4 rounded-lg shadow-lg border border-primaryBitlanceLightGreen transition-transform transform hover:scale-105 hover:shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-primaryBitlanceLightGreen mb-2">{job.title}</h3>
                        <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Description:</span> {job.description}</p>
                        <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Category:</span> {job.category}</p>
                        <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Price:</span> ${job.price}</p>
                        <p className="text-sm text-gray-300"><span className="font-bold">Status:</span> {job.status}</p>
                        <p className="text-sm text-gray-300"><span className="font-bold">JobID:</span> {job.job_id}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4">
                        <Button onClick={()=>handleRequestJob(job.client_id,job.job_id,job.client_address as string,job.price,job.status as string)} className="bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300 px-4 py-2">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg text-primaryBitlanceLightGreen">No jobs available.</p>
            )}
            {errorMessage && (
              <p className="text-center text-lg text-red-500">{errorMessage}</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsPage;
