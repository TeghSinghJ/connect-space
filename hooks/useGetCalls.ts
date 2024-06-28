import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls=()=>{
    const [calls,setCalls] = useState<Call[]>([])
    const [isLoading,setIsLoading] = useState(false)
    const client = useStreamVideoClient();
    const {user} = useUser();
    useEffect(()=>{
        const loadCalls=async()=>{
            if(!client || !user?.id)    return ;
            setIsLoading(true);
            try {
                //Getting allthe calls data
                const {calls} = await client.queryCalls({
                    //Sorting all the meetings based on the schedule time
                    sort:[{
                        field: 'starts_at', direction:-1 
                    }],
                    //Apply some more filters for the meeting calls
                    filter_conditions:{
                        starts_at :{ $exists : true},
                        $or : [{
                            created_by_user_id : user.id
                        },
                        {
                            members : {$in : [user.id]}
                        }
                        ]
                    }
                });
                setCalls(calls);
            } catch (error) {
                console.error(error);
            }
            finally{
                setIsLoading(false);
            }
        }
        loadCalls();
    },[client,user?.id])


    const now = new Date();
    //getting the ended calls -> calls that are already completed before the current
    //Time
    //Starts TIme should be < current time or already ended
    const endedCalls = calls?.filter(({state:{startsAt,endedAt}}:Call)=>{
        return startsAt && new Date(startsAt) < now || !!endedAt;
    });
    const upcomingCalls = calls?.filter(({state : {startsAt}} : Call)=>{
        return startsAt && new Date(startsAt) > now;
    })
    
    return {endedCalls , upcomingCalls,callRecordings: calls,isLoading}
}