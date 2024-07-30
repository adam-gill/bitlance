"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getRequestsPerJob, updateJobStatusToInProgress } from '@/config/apiconfig';
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
  const [buttonLoading, setButtonLoading] = useState<string | null>(null);
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

  const handleSelectFreelancer = async (requestId: string) => {
    setButtonLoading(requestId);
    try {
      const selectedRequest = jobRequests.find(request => request.id === requestId);
      const client_id = session?.user?.data?.user_id;
      const freelancer_id = selectedRequest?.freelancer_id;
      if (client_id && freelancer_id) {
        setLoading(true);
        const res = await updateJobStatusToInProgress(selectedRequest.job_id, client_id, freelancer_id);
        if (res && res.data.success) {
          alert("Freelancer selected successfully.");
          setLoading(false);
          // Optionally update jobRequests state here to reflect changes
        } else {
          setErrorMessage("Failed to select freelancer.");
          setLoading(false);
        }
      } else {
        setErrorMessage("Client ID or Freelancer ID is missing.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error selecting freelancer:", error);
      setErrorMessage("An error occurred while selecting the freelancer.");
    } finally {
      setButtonLoading(null);
    }
  };

  const handlePayoutFreelancer = async (requestId: string) => {
    setButtonLoading(requestId);
    try {
      setLoading(true);
      const res = await console.log("Insert payout here"); //payoutFreelancer(requestId);
      if (true) { // Placeholder
        alert("Payout successful.");
        setLoading(false);
        // Optionally update jobRequests state here to reflect changes
      } else {
        setErrorMessage("Failed to payout freelancer.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error paying out freelancer:", error);
      setErrorMessage("An error occurred while paying out the freelancer.");
      setLoading(false);
    } finally {
      setButtonLoading(null);
    }
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
            <svg
              className="animate-spin h-10 w-10 text-primaryBitlanceLightGreen"
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
            <p className="text-lg text-primaryBitlanceLightGreen ml-4">Loading job requests...</p>
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
                      <div className="mt-4">
                        <Button
                          onClick={() => request.job.status === "OPEN" ? handleSelectFreelancer(request.id) : handlePayoutFreelancer(request.id)}
                          className="bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300 px-4 py-2"
                          disabled={buttonLoading === request.id}
                        >
                          {buttonLoading === request.id ? (
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
                          ) : request.job.status === "OPEN" ? "Select" : "Payout"}
                        </Button>
                      </div>
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
