'use client'

import { FC, useEffect, useState } from "react"
import CourseInformation from "./CourseInformation"
import CourseOptions from "./CourseOptions"
import CourseData from "./CourseData"
import CourseContent from "./CourseContent"
import CoursePreview from "./CoursePreview"
import { useCreateCourseMutation, useEditCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

type Props = {
    id: string
}

const EditCourse: FC<Props> = ({ id }) => {

    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: ""
    })
    const [benefits, setBenefits] = useState([{ title: "" }])
    const [prerequisites, setPrerequisites] = useState([{ title: "" }])

    const [editCourse,{isSuccess,error}]=useEditCourseMutation()

    const [courseContentData, setCourseContentData] = useState([{
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "Untitled Section",
        links: [
            {
                title: "",
                url: ""
            }
        ],
        suggestion: ""
    }])

    // getting all courses
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true })

    const editCourseData = data?.courses.find((i: any) => i._id === id)

    useEffect(()=>{
        if(isSuccess){
            toast.success("Course updated successfully")
            redirect("/admin/courses")
        }
        if(error){
            if("data" in error)
            {
                const errorMessage=error as any
                toast.error(errorMessage.data.message)
            }
        }
     },[isSuccess,error])

    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData.thumbnail?.url || ""
            })
            setBenefits(editCourseData.benefits || [{ title: "" }])
            setPrerequisites(editCourseData.prerequisites || [{ title: "" }])
            setCourseContentData(editCourseData.courseData || [{
                videoUrl: "",
                title: "",
                description: "",
                videoSection: "Untitled Section",
                links: [
                    {
                        title: "",
                        url: ""
                    }
                ],
                suggestion: ""
            }])
        }
    }, [editCourseData])

    const [active, setActive] = useState(2)
    const [courseData, setCourseData] = useState({}) // all the data of the course

    const handleSubmit = () => {
        // formatting benefits array
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
        // formatting prerequisites array
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }))

        // formatting courseContent array
        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoSection: courseContent.videoSection, // basically name of the video
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url
            })),
            suggestion: courseContent.suggestion
        }))

        // preparing course data object to be sent to backend
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData
        }

        setCourseData(data)
    }

    const handleCourseCreate = async (e: any) => {
        const data = courseData
        // Your logic to create/update the course
        await editCourse({id:editCourseData._id,data})
    }

    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>

            <div className="w-[80%]">
                {active === 0 && (
                    <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                )}

                {active === 1 && (
                    <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />
                )}

                {active === 2 && (
                    <CourseContent
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit}
                    />
                )}

                {active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseCreate}
                        isEdit={true}
                    />
                )}
            </div>
        </div>
    )
}

export default EditCourse
