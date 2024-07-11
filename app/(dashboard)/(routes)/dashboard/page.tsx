"use client";
import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Dashboard: React.FC = () => {
    const { data: session } = useSession();
    const [isFreelancer, setIsFreelancer] = useState(true);

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    };

    const handleSwitchChange = (checked: boolean) => {
        setIsFreelancer(checked);
    };

    const handleBrowseJobs = () => {
        console.log("Browsing jobs...");
        // Add your browse jobs logic here
    };

    const handleCreateJob = () => {
        console.log("Creating a job...");
        // Add your create job logic here
    };

    return (
        <div className="min-h-screen flex flex-col bg-primaryBitlanceDark text-white">
            <header className="bg-primaryBitlanceDark p-4 shadow-lg flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl text-primaryBitlanceLightGreen font-bold">
                    Welcome: {session?.user.data.email}
                </h1>
                <div className="flex items-center space-x-4">
                    <span className="text-primaryBitlanceLightGreen">Client</span>
                    <Switch checked={isFreelancer} onChange={handleSwitchChange} />
                    <span className="text-primaryBitlanceLightGreen">Freelancer</span>
                </div>
            </header>
            <main className="flex-grow p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section className="bg-primaryBitlanceDark p-6 rounded-lg shadow-lg border border-primaryBitlanceLightGreen">
                        <h2 className="text-xl md:text-2xl font-semibold text-primaryBitlanceLightGreen mb-4 text-center">User Information</h2>
                        <p className="mb-2"><span className="font-bold">Username:</span> {session?.user.data.username}</p>
                        <p className="mb-2"><span className="font-bold">Email:</span> {session?.user.data.email}</p>
                        <p className="mb-2"><span className="font-bold">Name:</span> {session?.user.data.name}</p>
                        <p className="mb-2"><span className="font-bold">Role:</span> {session?.user.data.role}</p>
                    </section>
                    <section className="bg-primaryBitlanceDark p-6 rounded-lg shadow-lg border border-primaryBitlanceLightGreen">
                        <h2 className="text-xl md:text-2xl font-semibold text-primaryBitlanceLightGreen mb-4 text-center">{isFreelancer ? 'Projects' : 'Client Projects'}</h2>
                        {/* Add your project details or list here based on isFreelancer */}
                        {isFreelancer ? (
                            <p>Display freelancer projects here.</p>
                        ) : (
                            <p>Display client projects here.</p>
                        )}
                    </section>
                </div>
                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={isFreelancer ? handleBrowseJobs : handleCreateJob}
                        className="bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300 px-6 py-2"
                    >
                        {isFreelancer ? 'Browse Jobs' : 'Create Job'}
                    </Button>
                </div>
            </main>
            <footer className="bg-primaryBitlanceDark p-4 text-center shadow-t-lg">
                <Button onClick={handleSignOut} className="bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300 px-6 py-2">
                    Sign Out
                </Button>
            </footer>
        </div>
    );
};

export default Dashboard;
