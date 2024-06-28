import { Button } from '@/components/ui/button';
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = ({setIsSetupComlete}:{setIsSetupComlete:(value : boolean)=>void}) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
    const call = useCall();
    if (!call) throw new Error('Cannot connect to call')
    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.disable();
            call?.microphone.disable();
        }
        else {
            call?.microphone.enable();
            call?.camera.enable();
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone]);
    return (
        <div className='flex h-screen w-full flex-col items-center justify-center text-white'>
            <h1 className='text-2xl font-bold'>Setup</h1>
            <VideoPreview />
            <div className='flex h-16 justify-center items-center gap-3'>
                <label className='flex items-center justify-center gap-2 font-medium'>
                    <input type="checkbox" checked={isMicCamToggledOn} onClick={(e) => setIsMicCamToggledOn(e.target.checked)} className=''></input>
                    Join with Mic and Camera Off
                </label>
                <DeviceSettings />
            </div>
            <Button className="rounded-md bg-green-500 px-4 py-2.5" 
            onClick={()=>{
                call.join();
                setIsSetupComlete(true);}}
                >Join Meeting</Button>

        </div>
    )
}

export default MeetingSetup
