"use client";

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { freelancerDetails, clientDetails, getUserJobs } from "@/config/apiconfig";
import { FreelancerData, ClientData } from '@/types/data-types';
import { useRouter } from 'next/navigation';
import { ConnectBtn } from '@/components/Connect';
import CreateJobModal from '@/components/ui/CreateJobModal';
import { Category, Status } from '@prisma/client';
import Link from 'next/link';

export interface JobFreelancer {
  id: string;
  job_id: string;
  client_id: string;
  freelancer_id: string;
  freelancer_address: string;
  
  job: {
    job_id: string;
    title: string | undefined;
    created_at: Date;
    description: string | undefined;
    category: Category;
    client_address: string;
    freelancer_id: string | null;
    client_id: string;
    price: number;
    f_rating: number | null;
    c_rating: number | null;
    u_id: string;
    status: Status;
  };
}

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const [isFreelancer, setIsFreelancer] = useState(true);
  const [freelancerData, setFreelancerData] = useState<FreelancerData | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [userJobs, setUserJobs] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("My Jobs");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userId = session?.user.data.user_id;

      if (userId) {
        try {
          if (isFreelancer) {
            const res = await freelancerDetails(userId);
            if (res?.data) {
              setFreelancerData(res.data);
              setErrorMessage(null);
            } else {
              setErrorMessage("User doesn't have a freelancer profile.");
            }
          } else {
            const res = await clientDetails(userId);
            if (res?.data) {
              setClientData(res.data);
              setErrorMessage(null);
            } else {
              setErrorMessage("User doesn't have a client profile.");
            }
          }
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            setErrorMessage(isFreelancer ? "User doesn't have a freelancer profile." : "User doesn't have a client profile.");
          } else {
            console.error("Failed to fetch data:", error);
            setErrorMessage("An error occurred. Please try again.");
          }
        }

        try {
          const jobs = await getUserJobs(userId, isFreelancer);
          console.log("User Jobs:", jobs);
          setUserJobs(jobs);
        } catch (error) {
          console.error("Failed to fetch user jobs:", error);
          setErrorMessage("Failed to fetch user jobs. Please try again.");
        }
      }
    };

    fetchData();
  }, [isFreelancer, session?.user.data.user_id]);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsFreelancer(checked);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-primaryBitlanceDark text-white">
      <header className="bg-primaryBitlanceDark p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl text-primaryBitlanceLightGreen font-bold">
          Welcome: {session?.user.data.email}
        </h1>
        <div className='w-1/4'><ConnectBtn /></div>

        <div className="flex items-center space-x-4">
          <span className="text-primaryBitlanceLightGreen">Client</span>
          <Switch checked={isFreelancer} onChange={handleSwitchChange} />
          <span className="text-primaryBitlanceLightGreen">Freelancer</span>
        </div>
      </header>
      <div className="flex-grow flex">
        <nav className="bg-primaryBitlanceDark p-4 w-1/4 shadow-lg border-r border-primaryBitlanceLightGreen flex flex-col justify-evenly">
          <ul className="space-y-4">
            <li>
              <Button variant="outline" className="w-full text-left text-primaryBitlanceLightGreen bg-transparent border-primaryBitlanceLightGreen" onClick={() => handleTabChange("Browse Jobs")}>Browse Jobs</Button>
            </li>
            <li>
              <Button variant="outline" className="w-full text-left text-primaryBitlanceLightGreen bg-transparent border-primaryBitlanceLightGreen" onClick={() => handleTabChange("My Jobs")}>My Jobs</Button>
            </li>
            <li>
              <Button variant="outline" className="w-full text-left text-primaryBitlanceLightGreen bg-transparent border-primaryBitlanceLightGreen" onClick={() => handleTabChange("Completed Jobs")}>Completed Jobs</Button>
            </li>
            <li>
              <Button variant="outline" className="w-full text-left text-primaryBitlanceLightGreen bg-transparent border-primaryBitlanceLightGreen" onClick={() => handleTabChange("User Profile")}>User Profile</Button>
            </li>
            {!isFreelancer && (
              <li>
                <Button variant="outline" className="w-full text-left text-primaryBitlanceLightGreen bg-transparent border-primaryBitlanceLightGreen" onClick={() => setIsJobModalOpen(true)}>Create Job</Button>
              </li>
            )}
          </ul>
        </nav>
        <main className="flex-grow p-8 overflow-y-auto">
          {selectedTab === "Browse Jobs" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-primaryBitlanceLightGreen mb-4 text-center">Browse Jobs</h2>
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() => router.replace("/job")}
                  className="border border-primaryBitlanceLightGreen bg-transparent text-primaryBitlanceLightGreen font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300 px-6 py-2"
                >
                  Browse Jobs
                </Button>
              </div>
            </div>
          )}
          {selectedTab === "My Jobs" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-primaryBitlanceLightGreen mb-4 text-center">My Jobs</h2>
              {Array.isArray(userJobs) && userJobs.length === 0 ? (
                <p className="text-center">No jobs found.</p>
              ) : (
                <div className="flex flex-col items-center">
                  {isFreelancer
                    ? <div className="max-h-[200px] overflow-y-auto w-full">
                        {userJobs.map((job: JobFreelancer, index: number) => (
                          <Link key={index} href={`/requests/${job.job_id}`} className="bg-primaryBitlanceDark p-4 rounded-lg shadow-lg border border-primaryBitlanceLightGreen mb-4 block">
                            <h3 className="text-lg text-center font-semibold text-primaryBitlanceLightGreen">
                              {job.job.title ?? "Untitled Job"}
                            </h3>
                            <p className="text-center">
                              {job.job.description ?? "No description available"}
                            </p>
                          </Link>
                        ))}
                      </div>
                    : <div className="max-h-[200px] overflow-y-auto w-full">
                        {userJobs.map((job: any, index: number) => (
                          <Link key={index} href={`/requests/${job.job_id}`} className="bg-primaryBitlanceDark p-4 rounded-lg shadow-lg border border-primaryBitlanceLightGreen mb-4 block">
                            <h3 className="text-lg text-center font-semibold text-primaryBitlanceLightGreen">
                              {job.title ?? "Untitled Job"}
                            </h3>
                            <p className="text-center">
                              {job.description ?? "No description available"}
                            </p>
                          </Link>
                        ))}
                      </div>}
                </div>
              )}
            </div>
          )}
          {selectedTab === "Completed Jobs" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-primaryBitlanceLightGreen mb-4 text-center">Completed Jobs</h2>
              <p className="text-center">Completed jobs content goes here.</p>
            </div>
          )}
          {selectedTab === "User Profile" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-primaryBitlanceLightGreen mb-4 text-center">User Profile</h2>
              {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
              <section className="bg-primaryBitlanceDark p-4 rounded-lg shadow-lg border border-primaryBitlanceLightGreen">
                {isFreelancer ? (
                  freelancerData ? (
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-semibold text-primaryBitlanceLightGreen mb-4">Freelancer Profile</h2>
                      <p className="text-lg mb-2">Bio: {freelancerData.bio}</p>
                      <p className="text-lg mb-2">Skills: {freelancerData.skills}</p>
                      <p className="text-lg mb-2">Portfolio: {freelancerData.portfolio_link}</p>
                      <p className="text-lg mb-2">Social: {freelancerData.social_link}</p>
                    </div>
                  ) : (
                    <p className="text-center">No freelancer profile found.</p>
                  )
                ) : (
                  clientData ? (
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-semibold text-primaryBitlanceLightGreen mb-4">Client Profile</h2>
                      <p className="text-lg mb-2">Name: {clientData.company_name}</p>
                      <p className="text-lg mb-2">Description: {clientData.company_description}</p>
                      <p className="text-lg mb-2">Website: {clientData.websiteLink}</p>
                    </div>
                  ) : (
                    <p className="text-center">No client profile found.</p>
                  )
                )}
              </section>
            </div>
          )}
        </main>
      </div>
      <footer className="bg-primaryBitlanceDark p-4 text-center shadow-lg border-t border-primaryBitlanceLightGreen">
        <Button variant="outline" className="w-full border-primaryBitlanceLightGreen" onClick={handleSignOut}>Sign Out</Button>
      </footer>
        <CreateJobModal user_id={session?.user.data.user_id || ""} clientId={clientData?.c_id || ""} isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
