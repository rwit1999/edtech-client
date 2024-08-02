'use client'
import Sidebar from '@/app/components/Admin/AdminSidebar'
import UserAnalytics from '@/app/components/Admin/Analytics/UserAnalytics'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import React, { useEffect, useState } from 'react'
type Props = {}

const Page = (props: Props) => {

  const [isLoading, setIsLoading] = useState(true); // Loading state

  // useEffect(() => {
  //   // Simulate a delay for demonstration (replace with actual fetch or data loading logic)
  //   const timer = setTimeout(() => {
  //     setIsLoading(false); // Set loading to false after timeout
  //   },500); // Adjust timeout as per your needs or remove if not needed

  //   return () => clearTimeout(timer); // Cleanup timer on unmount or dependency change
  // }, []);
  
  return (
    <div>
      <div className='flex'>
        <div className='1500px:w-[16%] w-[1/5]'>
          <Sidebar/>
        </div>
        <div className='w-[85%]'>
          <DashboardHeader/>
          <UserAnalytics/>
        </div>
      </div>
    </div>
  )
}

export default Page