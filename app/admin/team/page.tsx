'use client'
import Sidebar from '@/app/components/Admin/AdminSidebar'
import AllCourses from '@/app/components/Admin/Course/AllCourses'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import AllUsers from '@/app/components/Admin/Users/AllUsers'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import AdminProtected from '@/app/hooks/adminProtected'
import React, { useEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {

    const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate a delay for demonstration (replace with actual fetch or data loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after timeout
    }, 500); // Adjust timeout as per your needs or remove if not needed

    return () => clearTimeout(timer); // Cleanup timer on unmount or dependency change
  }, []);
  return (
    <div>
      {isLoading ? ( // Conditionally render loading spinner
        <LoadingSpinner />
      ) : (
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5">
            <Sidebar/>
          </div>
          <div className="w-[85%]">
            <DashboardHeader/>
            <AllUsers isTeam={true}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page