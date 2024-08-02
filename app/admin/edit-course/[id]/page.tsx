'use client'
import Sidebar from "@/app/components/Admin/AdminSidebar"
import CreateCourse from "@/app/components/Admin/Course/CreateCourse"
import EditCourse from "@/app/components/Admin/Course/EditCourse"
import DashboardHeader from "@/app/components/Admin/DashboardHeader"
import { useParams } from "next/navigation"

type Props = {}
type Params = {
    id: string;
  }

const Page = () => {
    const params = useParams() as unknown as Params;
  const { id } = params;
  console.log(id);
    
  return (
    <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
            <Sidebar/>
        </div>
        <div className="w-[85%]">
            <DashboardHeader/>
            <EditCourse id={id}/>
        </div>
    </div>
  )
}

export default Page