'use client'
import { useUser } from '@clerk/nextjs';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
import { tokenProvider } from '../actions/stream.actions';
import Loader from '../components/Loader';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  
  const VideoServerProvider = ({children} : {children: ReactNode}) => {
    const {user,isLoaded} = useUser();
    const [videoClient,setVideoClient] =useState<StreamVideoClient>();
    useEffect(()=>{
        //If the user is not loggedin we will stop the creating meeting
        if(!user || !isLoaded)  return ;
        //If the API key is missing then we throw an error
        if(!apiKey)    throw new Error('Stream API key is missing');
        const client = new StreamVideoClient({
            apiKey,
            user:{
                id : user?.id ,
                name : user?.username || user?.id ,
                image : user?.imageUrl
            },
            tokenProvider: tokenProvider
        })
        setVideoClient(client);
    },[user,isLoaded]);

    if(!videoClient)    return <Loader/>;
    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };
  export default VideoServerProvider;