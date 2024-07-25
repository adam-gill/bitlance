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
import BrowseJobs from "@/components/pages/browseJobs";
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
  const [canSwitch, setCanSwitch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userId = session?.user.data.user_id;

      if (userId) {
        try {
          const freelancerRes = await freelancerDetails(userId);
          const clientRes = await clientDetails(userId);

          if (freelancerRes?.data) {
            setFreelancerData(freelancerRes.data);
          }

          if (clientRes?.data) {
            setClientData(clientRes.data);
          }

          setCanSwitch(freelancerRes?.data && clientRes?.data);
          setIsFreelancer(freelancerRes?.data ? true : false);

          const jobs = await getUserJobs(userId, freelancerRes?.data ? true : false);
          setUserJobs(jobs);
          setErrorMessage(null);

        } catch (error: any) {
          console.error("Failed to fetch data:", error);
          setErrorMessage("An error occurred. Please try again.");
        }
      }
    };

    fetchData();
  }, [session?.user.data.user_id]);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleSwitchChange = (checked: boolean) => {
    if (canSwitch) {
      setIsFreelancer(checked);
    }
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
          <Switch checked={isFreelancer} onChange={handleSwitchChange} disabled={!canSwitch} />
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
        <main className="flex-grow p-0">
          {selectedTab === "Browse Jobs" && (
            <div className="flex flex-col min-h-screen">
              <div className="max-h-[80vh] overflow-y-auto w-full">
                <BrowseJobs />
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
            <div className="p-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-primaryBitlanceLightGreen mb-6 text-center">User Profile</h2>
              {errorMessage && <p className="text-center text-red-500 mb-4">{errorMessage}</p>}
              <div className="flex justify-center">
                {isFreelancer && freelancerData ? (
                  <div className="bg-primaryBitlanceDark p-6 rounded-lg shadow-lg border border-primaryBitlanceLightGreen mb-6 w-full max-w-lg">
                    <h3 className="text-2xl md:text-3xl font-semibold text-primaryBitlanceLightGreen mb-4 text-center">Freelancer Profile</h3>
                    <p className="text-lg mb-2"><strong>Bio:</strong> {freelancerData.bio}</p>
                    <p className="text-lg mb-2"><strong>Skills:</strong> {freelancerData.skills}</p>
                    <p className="text-lg mb-2"><strong>Portfolio:</strong> <a href={freelancerData.portfolio_link} className="text-primaryBitlanceLightGreen underline" target="_blank" rel="noopener noreferrer">{freelancerData.portfolio_link}</a></p>
                    <p className="text-lg mb-2"><strong>Social:</strong> <a href={freelancerData.social_link} className="text-primaryBitlanceLightGreen underline" target="_blank" rel="noopener noreferrer">{freelancerData.social_link}</a></p>
                  </div>
                ) : (
                  clientData && (
                    <div className="bg-primaryBitlanceDark p-6 rounded-lg shadow-lg border border-primaryBitlanceLightGreen mb-6 w-full max-w-lg">
                      <h3 className="text-2xl md:text-3xl font-semibold text-primaryBitlanceLightGreen mb-4 text-center">Client Profile</h3>
                      <p className="text-lg mb-2"><strong>Name:</strong> {clientData.company_name}</p>
                      <p className="text-lg mb-2"><strong>Description:</strong> {clientData.company_description}</p>
                      <p className="text-lg mb-2"><strong>Website:</strong> <a href={clientData.websiteLink} className="text-primaryBitlanceLightGreen underline" target="_blank" rel="noopener noreferrer">{clientData.websiteLink}</a></p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      <footer className="bg-primaryBitlanceDark p-4 shadow-lg">
        <Button variant="outline" onClick={handleSignOut} className="text-primaryBitlanceLightGreen bg-transparent border-primaryBitlanceLightGreen">Sign Out</Button>
      </footer>
      <CreateJobModal user_id={session?.user.data.user_id || ""} clientId={clientData?.c_id || ""} isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
