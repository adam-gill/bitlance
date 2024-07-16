"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getAllJobs } from '@/config/apiconfig'; // Import your getAllJobs function
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const JobsPage: React.FC = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // New loading state
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        if (res?.data) {
          setJobs(res.data.data);
        } else {
          setErrorMessage("Failed to fetch jobs.");
        }
      } catch (error: any) {
        console.error("Failed to fetch jobs:", error);
        setErrorMessage("An error occurred. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchJobs();
  }, []);

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
            <p className="text-lg text-primaryBitlanceLightGreen">Loading jobs...</p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center">
            {jobs.length > 0 ? (
              <ul className="w-full max-w-4xl space-y-4">
                {jobs.map((job: any) => (
                  <li key={job.id} className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 mb-4 rounded-lg shadow-lg border border-primaryBitlanceLightGreen transition-transform transform hover:scale-105 hover:shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-primaryBitlanceLightGreen mb-2">{job.title}</h3>
                        <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Description:</span> {job.description}</p>
                        <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Category:</span> {job.category}</p>
                        <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Price:</span> ${job.price}</p>
                        <p className="text-sm text-gray-300"><span className="font-bold">Status:</span> {job.status}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4">
                        <Button className="bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300 px-4 py-2">
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
