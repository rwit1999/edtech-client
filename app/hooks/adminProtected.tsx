import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import { useSelector } from "react-redux";

interface ProtectedProps{
    children:React.ReactNode 
}

export default function AdminProtected({children}:ProtectedProps){
    const {user} = useSelector((state:any)=>state.auth)
    if(user){
        const isAdmin  = user?.role==="admin"
        return isAdmin ? children : redirect("/")
    }
}