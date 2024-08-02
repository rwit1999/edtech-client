'use client'

import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage"

type Props={
    id:string
}

const page=({params}:any)=>{
    return (
        <div>
            <CourseDetailsPage id={params.id}/>
        </div>
    )
}

export default page
