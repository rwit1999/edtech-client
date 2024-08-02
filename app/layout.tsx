'use client'
import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from './Provider'
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";  
import Loader  from "./components/Loader/Loader";
import { useEffect } from "react";


import socketIO from 'socket.io-client'
const ENDPOINT=process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || ""
const socketId=socketIO(ENDPOINT,{transports:["websocket"]}) 


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="!bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300">
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <Custom>
                {children}
               </Custom>
              <Toaster position="top-center" reverseOrder={false}/>
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom:React.FC<{children:React.ReactNode}>=({children})=>{
  const {isLoading} = useLoadUserQuery({})

  useEffect(()=>{
    
    // console.log(socket);
    
    socketId.on("connection",()=>{
      console.log('connected ');
      
    })
  },[])


  return (
    <>
      {
        isLoading?<Loader/>:<>{children}</>
      }
    </>
  )
}