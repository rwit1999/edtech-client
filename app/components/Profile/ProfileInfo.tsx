import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AvatarIcon from '../../../public/person-flat.png';
import { AiOutlineCalendar, AiOutlineCamera } from 'react-icons/ai';
import { useUpdateAvatarMutation, useUpdateUserMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: React.FC<Props> = ({user,avatar}) => {
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [showTooltip, setShowTooltip] = useState(false);
  const [updateAvatar,{isSuccess,error}] = useUpdateAvatarMutation()
  const [loadUser,setLoadUser]=useState(false)

  const {} = useLoadUserQuery(undefined,{skip: loadUser ? true :false})
  // undefined means nothing is passed (to get user info, we don't pass anything to backend)
//   skip determines whether the query should be skipped or not


  const [updateUser,{isSuccess:success,error:updateError}] =useUpdateUserMutation()

  const handleUpdate = async(e:any) => {
    e.preventDefault()
    if(name!==""){
      await updateUser({name:name})
    }
  };

  const imageHandler = async (e:any) => {
    const fileReader = new FileReader()
    fileReader.onload=()=>{
        if(fileReader.readyState===2){ // when file reading operation is complete
            const avatar = fileReader.result
            updateAvatar(avatar)
        }
    }
    fileReader.readAsDataURL(e.target.files[0])
  };

  useEffect(()=>{
    if(isSuccess || success){
        setLoadUser(true)
    }
    if(error || updateError){
        console.log('error');
    }
    if(success){
      toast.success("Profile updated succesfully")
    }
  },[isSuccess,error,success,updateError])



  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Profile Information</h2>
      <form>
        <div className="flex justify-center items-center mb-4 relative">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4">
            <Image
              src={user.avatar || avatar ? user.avatar.url || avatar : AvatarIcon}
              alt=""
              width={120}
              height={120}
            />
          </div>
          <label
            htmlFor="avatar"
            className="cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <AiOutlineCamera size={20} className="z-10" />
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={(e)=>imageHandler(e)}
              accept="image/png,image/jpg,image/jpeg,image/webp"
            />
          </label>
          {showTooltip && (
            <div className="absolute top-0 left-full ml-2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded">
              Click to update photo
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg focus:outline-none"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
