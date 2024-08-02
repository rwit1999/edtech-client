import React, { FC } from 'react';
import UserAnalytics from './Analytics/UserAnalytics';
import { BiBorderLeft } from 'react-icons/bi';
import { Box, CircularProgress } from '@mui/material';
import { PiUsersFourLight } from 'react-icons/pi';
import OrderAnalytics from './Analytics/OrderAnalytics';
import AllInvoices from './Order/AllInvoices';
import CourseAnalytics from './Analytics/CourseAnalytics';

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        size={35}
        value={value}
        color={value && value > 99 ? 'info' : 'error'}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  return (
    <div className="m-5 md:m-10 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md lg:h-72">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md lg:h-72">
          <OrderAnalytics isDashboard={true} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md h-auto lg:h-screen">
          <h5 className="text-xl flex justify-center font-medium text-gray-900 dark:text-white pb-3">
            Recent transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>

        <div className="space-y-6 lg:space-y-0 lg:w-80">
          <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <BiBorderLeft className="text-green-500 text-xl" />
                <h5 className="pt-1 text-lg font-bold dark:text-white">120</h5>
                <h5 className="py-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Sales obtained
                </h5>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="pt-1 text-sm font-semibold text-green-500">
                  +120%
                </h5>
              </div>
            </div>
          </div>

          <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <PiUsersFourLight className="text-blue-500 text-xl" />
                <h5 className="pt-1 text-lg font-bold text-gray-900 dark:text-white">
                  450
                </h5>
                <h5 className="pt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  New users
                </h5>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="pt-1 text-sm font-semibold text-green-500">
                  +20%
                </h5>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
