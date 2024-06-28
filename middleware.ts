import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
        '/' ,
        '/upcoming' ,
        '/recordings' ,
        '/personal-room',
        '/previous',
        '/meeting(.*)'
]);

export default clerkMiddleware((auth ,req)=>{
    //Checking weather we are on a protected route or not
    if(protectedRoutes(req))    auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};