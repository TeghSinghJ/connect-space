"use server"

import { Token, currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_SECRET_KEY;
export const tokenProvider= async()=>{
    const user = await currentUser();
    if(!user)   throw new Error('User is not logged in!');
    if(!apiKey) throw new Error('API key is not valid!');
    if(!secret) throw new Error('Secret key is not valid!');
    const client = new StreamClient(apiKey,secret);
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const token = client.createToken(user.id,exp);
    return token;
}