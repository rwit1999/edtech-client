'use client'
import { useGetCoursesQuery } from "@/redux/features/courses/coursesApi"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import Loader from "../components/Loader/Loader"
import { Header } from "../components/Header"
import Courses from "../components/Course/Courses"
import CourseCard from "../components/Course/CourseCard"

type Props = {}

const Page = (props: Props) => {
    const searchParams = useSearchParams()
    const search = searchParams?.get('title')
    const { data, isLoading } = useGetCoursesQuery({})
    const categories = [
        "Algorithms and Data Structures",
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Software Engineering",
        "Web Development",
        "Mobile Development",
        "Cybersecurity"
    ]
    const [route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)
    const [courses, setCourses] = useState([])
    const [category, setCategory] = useState("All")

    useEffect(() => {
        if (category === 'All') {
            setCourses(data?.courses)
        }
        if (category !== 'All') {
            setCourses(data?.courses.filter((item: any) => item.categories === category))
        }
        if (search) {
            setCourses(data?.courses.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())))
        }
    }, [data, category, search])

    return (
        <div className="min-h-screen bg-gray-100">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header
                        route={route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                    <div className="container mx-auto py-8">
                        <div className="flex flex-wrap justify-center space-x-4 mb-8">
                            <div
                                onClick={() => setCategory("All")}
                                className={`px-4 py-2 rounded-lg cursor-pointer ${category === 'All' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                            >
                                All
                            </div>
                            {categories && categories.map((item: any, index: number) => (
                                <div key={index} className="mt-2">
                                    <div
                                        onClick={() => setCategory(item)}
                                        className={`px-4 py-2 rounded-lg cursor-pointer ${category === item ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                                    >
                                        {item}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {courses && courses.length === 0 && (
                            <p className="text-center text-gray-500">
                                {search ? "No courses found" : "No courses found in this category. Please try another one"}
                            </p>
                        )}
                        <br />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {courses && courses.map((item, index) => (
                                <CourseCard key={index} item={item} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Page
