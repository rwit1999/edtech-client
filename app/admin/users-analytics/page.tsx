'use client'
import Sidebar from '@/app/components/Admin/AdminSidebar'
import UserAnalytics from '@/app/components/Admin/Analytics/UserAnalytics'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import React, { useEffect, useState } from 'react'
type Props = {}

const Page = (props: Props) => {

  const [isLoading, setIsLoading] = useState(true); // Loading state
  
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