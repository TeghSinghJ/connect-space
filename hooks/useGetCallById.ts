//Customhook that finds the callID
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"

export const useGetCallById=(id:string | string[])=>{
    const [isCallLoading,setIsCallLoading] = useState(true);
    const [call,setCall] = useState<Call>();
    const client = useStreamVideoClient();
    useEffect(()=>{
        if(!client) return;
        const loadCall = async () =>{
            const {calls} = await client.queryCalls({
                filter_conditions:{
                    id
                }
            })
            if(calls.length > 0)  setCall(calls[0]);
            setIsCallLoading(false);
        }
        
        loadCall();
    },[client,id]);
    return {call,isCallLoading}
}