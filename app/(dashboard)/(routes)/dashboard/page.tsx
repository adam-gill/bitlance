"use client"
import React from 'react';

// example route 
import { redirect } from 'next/navigation'
import { useSession,signOut } from "next-auth/react";


import { Button } from '@/components/ui/button';


const Dashboard = () => {
    const { data: session } = useSession()

    const handleSignOut = async () => {
        await signOut({ redirect: true ,callbackUrl:"/"});
        
    };
    
    
    return (
        <div>
            <h1 className='text-2xl text-primaryBitlanceLightGreen bg-primaryBitlanceDark'>This is an example page with the route of /dashboardWelcome:  {session?.user.data.email}  </h1>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
};

export default Dashboard;