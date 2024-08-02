import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {};

const ChangePassword: FC<Props> = (props: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword,{isSuccess,error} ]=useUpdatePasswordMutation()

  const passwordChangeHandler = async(e: React.FormEvent) => {
    e.preventDefault();
    if(newPassword!==confirmPassword){
        toast.error("Passwords do not match")
    }
    else{
        await updatePassword({oldPassword,newPassword})
    }
  };

  useEffect(()=>{
    if(isSuccess){
        toast.success("Password changed successfully")
    }
    if(error){
        if("data" in error){
            const errorData=error as any
            toast.error(errorData.data.message)
        }
    }
  },[isSuccess,error])

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4">Change your password</h1>
      <form onSubmit={passwordChangeHandler} className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Your current password
          </label>
          <input
            type="password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Your new password
          </label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm new password
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg focus:outline-none"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
