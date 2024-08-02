'use client'
import { ThemeSwitcher } from '@/app/utils/ThemeSwitcher';
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from '@/redux/features/notifications/notificationApi';

import React, { FC, useEffect, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';

import socketIO from 'socket.io-client';
import { format } from 'timeago.js';
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

type Props = {
  
};

const DashboardHeader= () => {
  const [open,setOpen]=useState(false)
  const { data, refetch } = useGetAllNotificationsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [updateNotificationStatus, { isSuccess }] = useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  

  useEffect(() => {
    if (data) {
      setNotifications(data.notifications.filter((item: any) => item.status === 'unread'));
    }
    if (isSuccess) {
      refetch();
    }
    
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on('newNotification', (data) => {
      refetch();
      
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className='w-full flex items-center justify-end p-6 fixed top-5 right-0'>
      <ThemeSwitcher />
      <div className='relative cursor-pointer m-2' onClick={() => setOpen(!open)}>
        <IoMdNotificationsOutline className='text-2xl cursor-pointer dark:text-white text-black' />
        <span className='absolute -top-2 -right-2 bg-[#cb3c3c] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
          {notifications && notifications.length}
        </span>
      </div>
      {open && ( // notification pop up
        <div className='w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded-lg overflow-hidden'>
          <h5 className='text-center text-[20px] text-black dark:text-white p-3 border-b dark:border-b-[#ffffff47] border-b-[#e4e3e3f1]'>
            Notifications
          </h5>
          <div className='h-[calc(100%-56px)] overflow-y-auto'>
            {notifications && notifications.map((item: any, index: number) => (
              <div key={index} className='dark:bg-[#2d3a4ea1] bg-white border-b dark:border-b-[#ffffff47] border-b-[#e4e3e3f1] transition duration-300 hover:bg-gray-100 dark:hover:bg-[#3b4a68]'>
                <div className='w-full items-center flex justify-between p-4'>
                  <div>
                    <p className='text-black dark:text-white font-semibold'>
                      {item.title}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {format(item.createdAt)}
                    </p>
                  </div>
                  <button onClick={() => handleNotificationStatusChange(item._id)} className='text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'>
                    Mark as read
                  </button>
                </div>
                <p className='px-4 pb-4 text-black dark:text-white'>
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
