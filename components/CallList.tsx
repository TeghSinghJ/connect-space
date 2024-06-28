// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { useGetCalls } from '../hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import { toast } from '@/components/ui/use-toast';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { upcomingCalls, endedCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  const router = useRouter();
  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'upcoming':
        return upcomingCalls;
      case 'recordings':
        return recordings;
      default: return []
    }
  }
  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No ended calls';
      case 'upcoming':
        return 'No upcoming calls';
      case 'recordings':
        return 'No recordings';
      default: return '';
    }
  }
  useEffect(()=>{
    const fetchRecordings = async()=>{
      try{
      const callData = await Promise.all(callRecordings.map((meeting)=>meeting.queryRecordings()));
      const recordings = callData.filter(call=>call.recordings.length > 0).flatMap(call=>call.recordings)
      setRecordings(recordings)
      }
      catch(e){
        console.error(e);
        toast({title:'Error in fetching recordings'})
      }
    } 

    if(type==='recordings') fetchRecordings();
  },[type,callRecordings])
  const calls = getCalls();
  const noCallMessages = getNoCallsMessage();
  if(isLoading) return <Loader/>;
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ?
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type==='ended'?'/icons/previous.svg' :
              type==='recordings'?'/icons/recordings.svg' :
              '/icons/upcoming.svg'
            }
            title={(meeting as Call).state?.custom?.description?.substring(0,30) || meeting?.filename|| 'Personal Meeting'}
            date={meeting.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
            isPreviousMeeting={type==='ended'}
            buttonIcon1={type==='recordings'?'icons/play.svg' : undefined}
            handleClick={type==='recordings'?(()=>router.push(`/meeting/${meeting.url}`)): ()=>router.push(`/meeting/${meeting.id}`)}
            link={type==="recordings"?meeting.url:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}}`}
            buttonText={type==="recordings"?'Play':'Start'}
          />
        )) : <h1>{noCallMessages}</h1>
      }
    </div>
  )
}

export default CallList