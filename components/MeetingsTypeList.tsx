'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { useToast } from "@/components/ui/use-toast"
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Toast } from '@/components/ui/toast'
import { Textarea } from '@/components/ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from '@/components/ui/input'

const MeetingsTypeList = () => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast()
  const client = useStreamVideoClient();
  const [callDetails, setCallDetails] = useState<Call>();
  const [values, setValues] = useState({
    dateTime: new Date,
    description: '',
    callLink: ''
  });
  const createMeeting = async () => {
    if (!values.dateTime) {
      toast({
        title: "Please select a meeting data and time",
      })
      return;
    }
    //If either the user ir client doesn't exist then we cant initaite the call
    if (!user || !client) return;
    try {
      //Generate a callId for our call
      const callId = crypto.randomUUID();
      //Initiating a call
      const call = client.call('default', callId);
      if (!call) throw new Error('Failed to create a call!');
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`meeting/${call.id}`)
      }
      toast({
        title: "Meeting created",
      })
    }
    catch (e) {
      console.error(e);
      toast({
        title: "Failed to create a call",
      })
    }

  }
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  const [meetingState, setMeetingState] = useState<'isJoining' | 'isScheduling' | 'isInstantMeeting' | undefined>();
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className="bg-orange-1"
      />
      <HomeCard img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState('isScheduling')}
        className="bg-blue-1"
      />
      <HomeCard img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push('/recordings')}
        className="bg-purple-1"
      />
      <HomeCard img="/icons/join-meeting.svg"
        title="Join a meeting"
        description="via invitation link"
        className="bg-yellow-1"
        handleClick={() => setMeetingState('isJoining')}
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduling'}
          isClose={() => setMeetingState(undefined)}
          title="Create meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className='text-base text-normal leading-[22px] text-sky-2'>Add a description</label>
            <Textarea className='border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e) => {
              setValues({ ...values, description: e.target.value })
            }} />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">Select Date and Time</label>
            <ReactDatePicker selected={values.dateTime} 
              onChange={(date)=>{setValues({...values,dateTime:date!})}} 
              showTimeSelect timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat="MMMM d,yyyy h:mm aa"
              className='w-full rounded bg-dark-2 py-2 focus-outline:none'
              />
          </div>
        </MeetingModal>
      ) : (<MeetingModal
        isOpen={meetingState === 'isScheduling'}
        isClose={() => setMeetingState(undefined)}
        className="text-center"
        title="Meeting created"
        handleClick={()=>{
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link copied successfully",
            })
        }}
        buttonText='Copy Meeting Link'
        buttonIcon='/icons/copy.svg'
        image='/icons/checked.svg'
      />)}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        isClose={() => setMeetingState(undefined)}
        className="text-center"
        title="Start an instant meeting"
        buttonText="Start meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === 'isJoining'}
        isClose={() => setMeetingState(undefined)}
        className="text-center"
        title="Type the link here"
        buttonText="Join meeting"
        handleClick={()=>{
          router.push(values.callLink)
        }}
      >
      <Input className='border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0'
      onChange={(e)=>setValues({...values,callLink:e.target.value})}
      placeholder='Meeting Link'/>
      </MeetingModal>
    </section>
  )
}

export default MeetingsTypeList
