import React from "react";


import { useWriteContract,useReadContract } from "wagmi";
import BITLANCEABI from "../abi/bitlance.json"
import { BITLANCECONTRACT } from "@/constant/contracts";
import { CHAINLINKERC20 } from "@/constant/contracts";
import IERC20ABI from "../abi/IERC20.json"



const useContract =()=>{
    const {writeContractAsync:bitlanceContract} = useWriteContract()
    const {writeContractAsync:chainlinkERC20} = useWriteContract()
    //approve function

    const  approveLink = async(amount:bigint)=>{
        const tx = await chainlinkERC20({
            address:CHAINLINKERC20,
            abi:IERC20ABI.abi,
            functionName:"approve",
            args:[BITLANCECONTRACT,amount]
        })
        return tx;

    }

    //request job
    // string memory _jobid,address client,uint256 amount
    const RequestJob = async(userAddress:string,clientAddress:string,amount:bigint) =>{
        const tx = await bitlanceContract({
            address:BITLANCECONTRACT,
            abi:BITLANCEABI.abi,
            functionName:"requestJob",
            args:[userAddress,clientAddress,amount]
        })
        return tx
            
    }
    
    //initi job
    //string memory _jobid,address freelancer,address stabletoken

    const InitJob = async(jobId:string,freelancerAddress:string)=>{
        const tx = await bitlanceContract({
            address:BITLANCECONTRACT,
            abi:BITLANCEABI.abi,
            functionName:"initializeJob",
            args:[jobId,freelancerAddress,chainlinkERC20]
            })
            return tx
    }

    //release payment
    //takes jobid
    const ReleasePayment = async(jobId:string)=>{
        const tx = await bitlanceContract({
            address:BITLANCECONTRACT,
            abi:BITLANCEABI.abi,
            functionName:"releasePayament",
            args:[jobId]
            })
            return tx
    }


    //raise a dispute
    //takes jobid
    const RaiseDispute = async(jobId:string)=>{
        const tx = await bitlanceContract({
            address:BITLANCECONTRACT,
            abi:BITLANCEABI.abi,
            functionName:"raiseConflict",
            args:[jobId]
            })
            return tx

    }



    //solve a dispute (refund)
    //takes jobid and address
    const SolveDispute = async(jobId:string,address:string)=>{
        const tx = await bitlanceContract({
            address:BITLANCECONTRACT,
            abi:BITLANCEABI.abi,
            functionName:"refund",
            args:[jobId,address]
            })
            return tx}


    //allow tokens
    //takes token address
    const AddTokens = async(token:string)=>{
        const tx = await bitlanceContract({
            address:BITLANCECONTRACT,
            abi:BITLANCEABI.abi,
            functionName:"addToken",
            args:[token]
            })
            return tx
            }
//add manager
//takes address
const AddManager = async(address:string)=>{
    const tx = await bitlanceContract({
        address:BITLANCECONTRACT,
        abi:BITLANCEABI.abi,
        functionName:"addManager",
        args:[address]
        })
        return tx
        }



    return{AddManager,AddTokens,RaiseDispute,RequestJob,ReleasePayment,SolveDispute,InitJob,approveLink}
}

export default useContract;