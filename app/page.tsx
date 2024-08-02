'use client'
import React,{FC,useState} from "react"
import Heading from "./utils/Heading"
import {Header} from "./components/Header"
import { Hero } from "./components/Route/Hero"
import { useSelector } from "react-redux"
import Courses from "./components/Course/Courses"
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/FAQ/FAQ"
import Footer from "./components/Footer/Footer"

interface Props{}

const Page:FC<Props>=()=>{
  const [open,setOpen]=useState(false)
  const [activeItem,setActiveItem]=useState(0)
  const [route,setRoute]=useState("Login")
  const {user} = useSelector((state:any)=>state.auth)
  return (
    <div>
      <Heading 
        title="Wiser"
        description="Wiser is a service enabling students to take various courses and seek help from educators."
        keywords="Programming,Development,Machine Learning"
      />
      <Header
        open={open} // for modal open or not
        activeItem={activeItem} // the item in navitem which is currently clicked
        setOpen={setOpen}
        setRoute={setRoute}
        route={route}
      />
      <Hero/>
      <Courses/>
      <Reviews/>
      <FAQ/>
      <Footer/>
    </div>
  )
}
export default Page