'use client'

import { useEffect, useState } from "react"
import CourseInformation from "./CourseInformation"
import CourseOptions from "./CourseOptions"
import CourseData from "./CourseData"
import CourseContent from "./CourseContent"
import CoursePreview from "./CoursePreview"
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

type Props = {}

const CreateCourse = (props: Props) => {
     const [createCourse,{isLoading,isSuccess,error}]=useCreateCourseMutation() 

     useEffect(()=>{
        if(isSuccess){
            toast.success("Course created successfully")
            redirect("/admin/courses")
        }
        if(error){
            if("data" in error)
            {
                const errorMessage=error as any
                toast.error(errorMessage.data.message)
            }
        }
     },[isLoading,isSuccess,error])

    const [active,setActive]=useState(0)
    const [courseInfo,setCourseInfo]=useState({
        name:"",
        description:"",
        price:"",
        estimatedPrice:"",
        tags:"",
        level:"",
        categories:"",
        demoUrl:"",
        thumbnail:""
    })

    const [benefits,setBenefits]=useState([{title:""}])
    const [prerequisites,setprerequisites]=useState([{title:""}])
    
    const [courseContentData,setCourseContentData]=useState([{
        videoUrl:"",
        videoLength:"",
        title:"",
        description:"",
        videoSection:"Untitled Section",
        links:[
            {
                title:"",
                url:""
            }
        ],
        suggestion:""
    }]) 

    const [courseData,setCourseData]=useState({}) //all the data of course

    const handleSubmit=()=>{
        //formatting benefits array
        const formattedBenefits=benefits.map((benefit)=>({title:benefit.title}))
        //formatting prerequisites array
        const formattedPrerequisites=prerequisites.map((prerequisite)=>({title:prerequisite.title}))

        //formatting courseContent array
        const formattedCourseContentData=courseContentData.map((courseContent)=>({
            videoUrl:courseContent.videoUrl,
            title:courseContent.title,
            description:courseContent.description,
            videoSection:courseContent.videoSection, // basically name of the video
            videoLength:courseContent.videoLength,
            links:courseContent.links.map((link)=>({
                title:link.title,
                url:link.url
            })),
            suggestion:courseContent.suggestion
        }))

        //preparing course data object to be sent to backend
        const data={
            name:courseInfo.name,
            description:courseInfo.description,
            price:courseInfo.price,
            tags:courseInfo.tags,
            categories:courseInfo.categories,
            thumbnail:courseInfo.thumbnail,
            level:courseInfo.level,
            demoUrl:courseInfo.demoUrl,
            benefits:formattedBenefits,
            prerequisites:formattedPrerequisites,
            courseData:formattedCourseContentData
        }

        setCourseData(data)
        // console.log(data);
        
    }

    const handleCourseCreate=async(e:any)=>{
        const data=courseData
        if(!isLoading){
            await createCourse(data)
        }
    }

  return (
    <div className="w-full flex  min-h-screen">
        <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
            <CourseOptions active={active} setActive={setActive}/>
        </div>

        <div className="w-[80%]">
            {
                active===0 && (
                    <CourseInformation 
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                        
                    />
                )
            }

            {
                active===1 && (
                    <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setprerequisites}
                        active={active}
                        setActive={setActive}
                        
                    />
                )
            }
            {
                active===2 && (
                    <CourseContent 
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit}
                    />
                )
            }
            {
                active===3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseCreate}
                        isEdit={false}
                    />
                )
            }
        </div>
    </div>
  )
}

export default CreateCourse