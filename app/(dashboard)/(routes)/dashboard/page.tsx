import React from 'react';

// example route 
import { redirect } from 'next/navigation'



const Dashboard = async() => {
    
    return (
        <div>
            <h1 className='text-2xl text-primaryBitlanceLightGreen bg-primaryBitlanceDark'>This is an example page with the route of /dashboardWelcome:   </h1>
        </div>
    );
};

export default Dashboard;