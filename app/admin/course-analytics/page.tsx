'use client'

import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/components/Admin/AdminSidebar';
import CourseAnalytics from '@/app/components/Admin/Analytics/CourseAnalytics';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import LoadingSpinner from '../../components/LoadingSpinner'; // Adjust the path as per your project structure

type Props = {};

const Page: React.FC<Props> = (props) => {
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
        <div className='flex'>
          <div className='1500px:w-[16%] w-[1/5]'>
            <Sidebar />
          </div>
          <div className='w-[85%]'>
            <DashboardHeader />
            <CourseAnalytics isDashBoard={true} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
