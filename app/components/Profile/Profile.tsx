import React, { FC, useState, useEffect, useCallback, use } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { signOut } from "next-auth/react";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import ChangePassword from "./ChangePassword";
import { useGetAllCoursesQuery, useGetCoursesUserBoughtQuery } from "@/redux/features/courses/coursesApi";
import CourseCard from "../Course/CourseCard";


// Dynamically import components
const SideBarProfile = dynamic(() => import("./SideBarProfile"));
const ProfileInfo = dynamic(() => import("./ProfileInfo"));

type Props = {};

const Profile: FC<Props> = () => {
  const [scroll, setScroll] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [userCourses, setUserCourses] = useState([]);

  const {data}=useGetCoursesUserBoughtQuery({})
  

  useLogoutQuery(undefined, { skip: !logout });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY > 80) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);


  useEffect(()=>{
    if(data){
      setUserCourses(data.courses)
    }
  },[data])


  // console.log(userCourses);
  

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-[40%]">
        <div className="p-4">
          <SideBarProfile
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logOutHandler={logOutHandler}
          />
        </div>
      </div>
      
      {active === 1 && (
        <div>
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}

      {active === 2 && (
        <div>
          <ChangePassword/>
        </div>
      )}

      {active === 3 && (
        <div className="flex size-10 gap-8 m-10 -ml-16 h-64">
          {
            userCourses && userCourses.map((item:any,index:number)=>(
              <div key={index}>
                <CourseCard item={item}/>
              </div>
            ))
          }
        </div>
      )}

    </div>
  );
};

export default Profile;
