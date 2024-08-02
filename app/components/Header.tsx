"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { NavItems } from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from '../../public/person-flat.png'
import { useSession } from "next-auth/react";
import { useLogoutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route:string,
  setRoute:(route:string)=>void
};

export const Header: FC<Props> = ({activeItem,setOpen,open,route,setRoute}) => {
  const [active, setActive] = useState(false); // active will be true after scrolling down
  const [openSidebar, setOpenSidebar] = useState(false);
  const {user}=useSelector((state:any)=>state.auth)
  const {data}=useSession() //for social auth (contains the user data , who signed in with google)
  const [socialAuth,{isSuccess,error}] = useSocialAuthMutation()

  // const [logout,setLogout]=useState(false)

  // const {} = useLogoutQuery(undefined,{ 
  //   skip:!logout ? true : false
  // })

  useEffect(()=>{
    if(!user){
      if(data){
        socialAuth({email:data?.user?.email,name:data?.user?.name,avatar:data?.user?.image})
      }
    }
    if(data===null){ 
      if(isSuccess){
        toast.success("Logged in successfully")
        }
    }
    
  },[data,user])

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else setActive(false);
    });
  }


  const handleClose=(e:any)=>{
    if(e.target.id==='screen'){
      setOpenSidebar(false)
    }
  }  

  return (
    <div className="w-full relative">
      <div
        className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 ":"w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className="text-[25px] font-[500] text-black dark:text-white "
              >
                Wiser
              </Link>
            </div>
            <div className="flex items-center">
                <NavItems activeItem={activeItem} isMobile={false}/>
                {/* <ThemeSwitcher/> */}

                {/* only for mobile */}
                <div className="md:hidden">
                  <HiOutlineMenuAlt3 size={25} className="cursor-pointer dark:text-white text-black"
                  onClick={()=>setOpenSidebar(true)}/>
                </div>

                { user ? (
                  <>
                    <Link href={'/profile'}>
                      <Image 
                        src={user.avatar ? user.avatar.url : avatar} 
                        className="cursor-pointer w-[30px] h-[30px] rounded-full" 
                        alt=""
                        width={20}
                        height={20}
                      />
                    </Link>
                  </>
                ) : (
                  <HiOutlineUserCircle size={25} className="cursor-pointer hidden 800px:block" onClick={()=>setOpen(true)}/>
                )}
                
            </div>

          </div>
        </div>
          {/* mobile sidebar */}
          { openSidebar && (
            <div className="fixed w-full h-screen top-0 right-0 z-[99999] dark:bg-[unset] bg-[#00000024]" onClick={handleClose} id="screen">
              <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                  <NavItems activeItem={activeItem} isMobile={true}/>
                  <div className="flex justify-center items-center mt-5">
                    <HiOutlineUserCircle size={25} className="ml-5 my-2 text-black cursor-pointer" onClick={()=>setOpen(true)}/>
                  </div>
              </div>
              <br />
              <br />
            </div>
          )}
      </div>

      {
        route==='Login' && (
          <>
            {
              open && (
                <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Login} />
              )
            }
          </>
        )
      }

      {
        route==='SignUp' && (
          <>
            {
              open && (
                <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Signup} />
              )
            }
          </>
        )
      }

      {
        route==='Verification' && (
          <>
            {
              open && (
                <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Verification} />
              )
            }
          </>
        )
      }

    </div>
  );
};
