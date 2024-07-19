"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getRequestsPerJob } from '@/config/apiconfig';
import { useSession, signOut } from "next-auth/react";

interface JobRequest {
  id: string;
  job_id: string;
  client_id: string;
  freelancer_id: string;
  freelancer_address: string;
  job: {
    title: string;
    description: string;
    category: string;
    price: number;
    status: string;
    client_address: string;
  };
}

const JobRequestsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [jobRequests, setJobRequests] = useState<JobRequest[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const jobId = searchParams.get("job_id");

  useEffect(() => {
    const fetchJobRequests = async () => {
      if (jobId) {
        try {
          const res = await getRequestsPerJob(jobId);
          if (res?.success && Array.isArray(res.jobFreelancers)) {
            setJobRequests(res.jobFreelancers);
          } else {
            setErrorMessage("Failed to fetch job requests.");
          }
        } catch (error) {
          console.error("Failed to fetch job requests:", error);
          setErrorMessage("An error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setErrorMessage("Job ID is required.");
        setLoading(false);
      }
    };

    fetchJobRequests();
  }, [jobId]);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

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
            <p className="text-lg text-primaryBitlanceLightGreen">Loading job requests...</p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center">
            {jobRequests.length > 0 ? (
              <ul className="w-full max-w-4xl space-y-4">
                {jobRequests.map((request) => (
                  <li key={request.id} className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 mb-4 rounded-lg shadow-lg border border-primaryBitlanceLightGreen">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-primaryBitlanceLightGreen mb-2">{request.job.title}</h3>
                      <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Description:</span> {request.job.description}</p>
                      <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Category:</span> {request.job.category}</p>
                      <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Price:</span> ${request.job.price}</p>
                      <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Client Address:</span> {request.job.client_address}</p>
                      <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Freelancer Address:</span> {request.freelancer_address}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg text-primaryBitlanceLightGreen">No requests found.</p>
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

export default JobRequestsPage;
