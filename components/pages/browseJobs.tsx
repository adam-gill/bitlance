"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getAllJobs, RequestAJob } from '@/config/apiconfig';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAccount } from 'wagmi';
import useContract from '@/modeContracts/useContract';
import { ethers } from "ethers";
import { Status } from '@prisma/client';

interface Job {
  job_id: string;
  title: string;
  description: string;
  category: string;
  client_address: string;
  client_id: string;
  price: number;
  status: string;
  created_at: string;
}

const JobsPage: React.FC = () => {
  const { address } = useAccount();
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingJobId, setLoadingJobId] = useState<string | null>(null); // State to track loading status for a specific job
  const { RequestJob } = useContract();
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        if (res?.data && Array.isArray(res.data)) {
          const openJobs = res.data.filter((job: Job) => job.status === "OPEN");
          setJobs(openJobs);
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

  const handleRequestJob = async (client_id: string, job_id: string, client_address: string, price: number, status: string) => {
    setLoadingJobId(job_id); // Set the loading job ID to indicate loading
    try {
      if (!address) {
        setErrorMessage("Freelancer address is required.");
        alert("Freelancer address is required");
        setLoadingJobId(null); // Reset loading job ID
        return;
      }
      if (!client_id || !job_id || !client_address) {
        setErrorMessage("Please retry again.");
        setLoadingJobId(null); // Reset loading job ID
        return;
      }
      if (status !== "OPEN") {
        alert("This job is not open, you cannot apply!");
        setLoadingJobId(null); // Reset loading job ID
        return;
      }
      const res = await RequestAJob({
        freelancer_address: address as string,
        client_id: client_id,
        job_id: job_id,
        freelancer_id: session?.user.data.user_id,
      });
      if (res.status === 202 || res.status === 203) {
        alert(res.data.message);
        setLoadingJobId(null); // Reset loading job ID
        return;
      }
      if (res.status === 201) {
        const tx = await RequestJob(job_id, client_address, ethers.parseEther(price.toString()));
        console.log("Transaction:", tx);
        alert("Transaction successful, job requested successfully!");
      } else {
        alert("Failed to request job!");
        setErrorMessage("Failed to request job.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to apply for the job!");
      setErrorMessage("An error occurred while requesting the job.");
    } finally {
      setLoadingJobId(null); // Reset loading job ID
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-primaryBitlanceDark text-white">
      <main className="flex-grow p-8 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-primaryBitlanceLightGreen">Loading jobs...</p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center">
            {jobs.length > 0 ? (
              <ul className="w-full max-w-4xl space-y-4">
                {jobs.map((job: Job) => (
                  <li
                    key={job.job_id}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 mb-4 rounded-lg shadow-lg border border-primaryBitlanceLightGreen transition-transform transform hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-primaryBitlanceLightGreen mb-2">{job.title}</h3>
                        <p className="text-sm text-gray-300 mb-1">
                          <span className="font-bold">Description:</span> {job.description}
                        </p>
                        <p className="text-sm text-gray-300 mb-1">
                          <span className="font-bold">Category:</span> {job.category}
                        </p>
                        <p className="text-sm text-gray-300 mb-1">
                          <span className="font-bold">Price:</span> ${job.price}
                        </p>
                        <p className="text-sm text-gray-300 mb-1">
                          <span className="font-bold">Status:</span> {job.status}
                        </p>
                        <p className="text-sm text-gray-300">
                          <span className="font-bold">JobID:</span> {job.job_id}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4">
                        <Button
                          onClick={() => handleRequestJob(job.client_id, job.job_id, job.client_address, job.price, job.status)}
                          className="bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300 px-4 py-2"
                          disabled={loadingJobId === job.job_id} // Disable button while loading
                        >
                          {loadingJobId === job.job_id ? (
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            "Apply Now"
                          )}
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg text-primaryBitlanceLightGreen">No jobs available.</p>
            )}
            {errorMessage && <p className="text-center text-lg text-red-500">{errorMessage}</p>}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsPage;
