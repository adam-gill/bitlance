"use client"
// app/(job)/routes/requests/[id]/page.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation'; // Use useParams instead of useRouter
import { getRequestsPerJob } from '@/config/apiconfig'; // Import your getRequestsPerJob function
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { JobFreelancer } from '@/app/(dashboard)/(routes)/dashboard/page';
import { updateJobStatusToInProgress,updateJobStatusToCompleted,updateJobStatusToClose } from '@/config/apiconfig';
import useContract from '@/modeContracts/useContract';
import { ethers } from 'ethers';
import { useSimulateContract } from 'wagmi';
import { BITLANCECONTRACT, CHAINLINKERC20 } from '@/constant/contracts';
import BITLANCEABI from "../../../../../../abi/bitlance.json"
import InitTheJob from '@/modeContracts/simulates';
import { Status } from '@prisma/client';

interface JobRequest {
  request_id: string;
  freelancer_id: string;
  job_id: string;
  status: string;
  created_at: string;
}

const JobRequestsPage: React.FC = () => {
  
  const { id,bool } = useParams(); // Get the job ID from the URL using useParams
  const { data: session } = useSession();
  
  const [requests, setRequests] = useState<JobFreelancer[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null >(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { approveLink,InitJob,ReleasePayment} = useContract();
  //console.log("the role is role",role)
  


  //make payment to freelancer

  const handleReleasePayment = async(job_id:string,freelancer_id:string)=>{
    try{
      const res = await updateJobStatusToClose(job_id,session?.user.data.user_id,freelancer_id)
      if(res?.status == 200){
        const tx = await ReleasePayment(job_id)
        if( !tx){
          //setErrorMessage("Payment Already released")
          console.log("payement released")
        }

      }

     

    }catch(err){
      console.log(err)
    }
  }

  //handle job to done

  const handleJobComplete = async(job_id:string)=>{
    try{
      const res = await updateJobStatusToCompleted(job_id,session?.user.data.user_id)
      if(res?.status ==200){
        //setErrorMessage("Job completed successfully")
        console.log("res update is ",res)
      }



    }catch(err){
      console.log(err)
    }
  }



  const handleSelectFreelancer =async (client_id: string, job_id: string, price: number, freelancerAddress: string, freelancer_id:string, job_status:Status) => {
    try {
      if(job_status!== Status.OPEN){
        alert("You cannot select a freelancer for a Job thats not OPEN");
        return;
      }
      const res = await updateJobStatusToInProgress(job_id,session?.user.data.user_id, freelancer_id);
      if (res?.status ==200) {
        //console.log("Response from updateJobStatusToInProgress:", res);
        const app = await approveLink(ethers.parseEther(price.toString()));
        if (app) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          console.log("user address",freelancerAddress)
          const init = await InitJob(job_id,freelancerAddress as `0x${string}`);
          
          console.log("Init transaction:", init);
        }
      }
    } catch (error:any) {
      console.error("Error in handleSelectFreelancer:", error.shortMessage!);
    }
  };
  useEffect(() => {
    const fetchRequests = async () => {
      if (id) {
        try {
          const res = await getRequestsPerJob(id as string);
          console.log("the res is ressing",res.jobFreelancers)
          if (res?.jobFreelancers && Array.isArray(res.jobFreelancers)) {
            setRequests(res.jobFreelancers);
          } else {
            setErrorMessage("Failed to fetch job requests.");
          }
        } catch (error) {
          console.error("Failed to fetch job requests:", error);
          setErrorMessage("An error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRequests();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-primaryBitlanceDark text-white">
      <header className="bg-primaryBitlanceDark p-4 shadow-lg flex justify-between items-center">
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
            <p className="text-lg text-primaryBitlanceLightGreen">Loading requests...</p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center">
            {requests.length > 0 ? (
              <ul className="w-full max-w-4xl space-y-4">
                {requests.map((request) => (
                  <li key={request.id} className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 mb-4 rounded-lg shadow-lg border border-primaryBitlanceLightGreen">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-primaryBitlanceLightGreen mb-2">Request ID: {request.id}</h3>
                      <p className="text-sm text-gray-300 mb-1"><span className="font-bold text-sm">Freelancer Address:</span> {request.freelancer_address}</p>
                      <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Job ID:</span> {request.job_id}</p>
                      <p className="text-sm text-gray-300 mb-1"><span className="font-bold">Status:</span> {request.job.status}</p>
                      
                      <p className="text-sm text-gray-300"><span className="font-bold">Created At:</span> {new Date(request.job.created_at).toLocaleDateString()}</p>
                      {bool == "false" && 
                      <div className='flex  justify-end items-end'>{request.job.status == "INPROGRESS"?<Button className='bg-green-800' disabled ={true}>WAITING</Button>:request.job.status == "COMPLETED"?<Button onClick={()=>handleReleasePayment(request.job_id,request.freelancer_id)} >PAY OUT</Button>:request.job.status == "CLOSED"?<Button disabled={true}>PAID</Button>:<Button onClick={()=>handleSelectFreelancer(request.client_id,request.job_id,request.job.price,request.freelancer_address, request.freelancer_id, request.job.status )}>Select</Button>}</div>
                      }
                      {bool == "true" && 
                      <div className='flex  justify-end items-end'>{request.job.status == "INPROGRESS"?<Button onClick={()=>handleJobComplete(request.job.job_id)} className='bg-green-800' >COMPLETE</Button>:request.job.status == "COMPLETED"?<Button disabled={true} >WAITING FOR PAYMENT</Button>:request.job.status == "OPEN"?<Button disabled={true}>PENDING</Button>:<Button disabled={true}>JOB CLOSED</Button>}</div>
                      }
                      
                        </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg text-primaryBitlanceLightGreen">No requests available for this job.</p>
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
