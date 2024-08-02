'use client'
import React, { Suspense } from 'react';
import AdminProtected from '@/app/hooks/adminProtected';
import LoadingSpinner from '../components/LoadingSpinner'; // Create a loading spinner component
import DashboardHeader from '../components/Admin/DashboardHeader';
import { useLogoutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import AllUsers from '../components/Admin/Users/AllUsers';

const Sidebar = React.lazy(() => import('@/app/components/Admin/AdminSidebar'));
// const DashboardHero = React.lazy(() => import('@/app/components/Admin/DashboardHero'));

const AdminPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminProtected>
        <div className="flex flex-col md:flex-row flex-1">
          <div className="md:w-1/5 w-full md:h-full overflow-hidden">
            {/* Suspense for lazy-loading Sidebar */}
            <Suspense fallback={<LoadingSpinner />}>
              <Sidebar />
            </Suspense>
          </div>
          <div className="md:w-4/5 w-full">
            {/* DashboardHeader and AllUsers components */}
            <Suspense fallback={<LoadingSpinner />}>
              <div className="h-full flex flex-col">
                <DashboardHeader />
                <div className="flex-1 overflow-y-auto">
                  <AllUsers isTeam={false} />
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default AdminPage;
