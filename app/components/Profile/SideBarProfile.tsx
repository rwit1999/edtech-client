import Image from 'next/image';
import React, { FC } from 'react';
import avatarDefault from '../../../public/person-flat.png';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Link from 'next/link';
import { IoBookSharp } from "react-icons/io5";

type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({ user, active, setActive, avatar, logOutHandler }) => {
    return (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 max-w-xs ml-8 mx-auto mt-10">
            
            <div className="space-y-3">
                <div 
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${active === 1 ? 'bg-blue-100 dark:bg-blue-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`} 
                    onClick={() => setActive(1)}
                >
                    <Image
                        className="rounded-full w-6 h-6"
                        src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
                        alt=""
                        width={24}
                        height={24}
                    />
                    <h5 className={`ml-2 font-semibold text-sm ${active === 1 ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        My Account
                    </h5>
                </div>
                <div 
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${active === 2 ? 'bg-blue-100 dark:bg-blue-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`} 
                    onClick={() => setActive(2)}
                >
                    <RiLockPasswordLine className="text-lg text-gray-700 dark:text-gray-300" />
                    <h5 className={`ml-2 font-semibold text-sm ${active === 2 ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        Change Your Password
                    </h5>
                </div>
                
                {/* admin dashboard */}
                {
                    user.role==='admin' && (
                        <Link className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${active === 3 ? 'bg-blue-100 dark:bg-blue-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`} 
                            onClick={() => setActive(6)} href={'/admin'}>

                            <MdOutlineSpaceDashboard className="text-lg text-gray-700 dark:text-gray-300" />
                            <h5 className={`ml-2 font-semibold text-sm ${active === 3 ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                Dashboard
                            </h5>
                            
                        </Link>
                    )
                }
                {/* enrolled courses */}
                {
                    user.role!=='admin' && (
                        <div className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${active === 3 ? 'bg-blue-100 dark:bg-blue-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`} 
                            onClick={() => setActive(3)} >

                            <IoBookSharp className="text-lg text-gray-700  dark:text-gray-300" />
                            <h5 className={`ml-2 font-semibold text-sm ${active === 3 ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                Enrolled courses
                            </h5>
                            
                        </div>
                    )
                }

                <div 
                    className="flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800" 
                    onClick={() => logOutHandler()}
                >
                    
                    <h5 className="ml-2 font-semibold text-sm text-red-500 dark:text-red-400">Logout</h5>
                </div>
            </div>
        </div>
    );
};

export default SideBarProfile;
