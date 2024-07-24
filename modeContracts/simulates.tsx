import { BITLANCECONTRACT, CHAINLINKERC20 } from '@/constant/contracts'
import { useSimulateContract } from 'wagmi'
import BITLANCEABI from "../abi/bitlance.json"

interface props{
    address: string
    job_id:string
}


function InitTheJob(prop:props) {
    const result = useSimulateContract({
        address:BITLANCECONTRACT,
        abi:BITLANCEABI.abi,
        functionName:"initializeJob",
        args:[prop.job_id,prop.address,CHAINLINKERC20]
      })
      return result
  
}

export default InitTheJob;