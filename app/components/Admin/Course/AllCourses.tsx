import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import {format} from 'timeago.js'

type Props = {}
 
const AllCourses = (props: Props) => {  
    
    const {isLoading, data, refetch} = useGetAllCoursesQuery({},{refetchOnMountOrArgChange:true})
    const [deleteCourse, {isSuccess, error}] = useDeleteCourseMutation({})
    const [open, setOpen] = useState(false)
    const [courseId, setCourseId] = useState("")

    const courses = data?.courses?.map((item: any, index: number) => ({
        id: index + 1,
        _id:item._id,
        title: item.name,
        ratings: item.rating,
        purchased: item.purchased,
        created: format(item.createdAt),
    })) || []
    
    useEffect(() => {
        if (isSuccess) {
            refetch()
            setOpen(false)
            toast.success("Course deleted successfully")
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any
                toast.error(errorMessage.data.error)
            }
        }
    }, [isSuccess, error])

    const handleEdit = (id: number) => {
        // Handle edit logic here
    };
    
    const handleDelete = async () => {
        try {
          console.log("hello");
          
            await deleteCourse(courseId)
        } catch (error) {
            console.error("Failed to delete course:", error)
        }
    };

    const closeModal = () => {
        setOpen(false)
    };

    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full bg-white dark:bg-gray-900 mt-32'>
                <thead>
                    <tr>
                        <th className='py-2 px-4 border-b border-gray-200 dark:border-gray-700'>ID</th>
                        <th className='py-2 px-4 border-b border-gray-200 dark:border-gray-700'>Course Title</th>
                        <th className='py-2 px-4 border-b border-gray-200 dark:border-gray-700'>Ratings</th>
                        <th className='py-2 px-4 border-b border-gray-200 dark:border-gray-700'>Purchased</th>
                        <th className='py-2 px-4 border-b border-gray-200 dark:border-gray-700'>Created</th>
                        <th className='py-2 px-4 border-b border-gray-200 dark:border-gray-700'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course: any) => (
                        <tr key={course.id}>
                            <td className='text-center py-2 px-4 border-b border-gray-200 dark:border-gray-700'>{course.id}</td>
                            <td className='text-center py-2 px-4 border-b border-gray-200 dark:border-gray-700'>{course.title}</td>
                            <td className='text-center py-2 px-4 border-b border-gray-200 dark:border-gray-700'>{course.ratings}</td>
                            <td className='text-center py-2 px-4 border-b border-gray-200 dark:border-gray-700'>{course.purchased}</td>
                            <td className='text-center py-2 px-4 border-b border-gray-200 dark:border-gray-700'>{course.created}</td>
                            <td className='text-center py-2 px-4 border-b border-gray-200 dark:border-gray-700'>
                              <Link href={`/admin/edit-course/${course._id}` }>
                                <button
                                    className='text-blue-500 hover:text-blue-700 mr-3'
                                    onClick={() => handleEdit(course.id)}
                                >
                                    <FaEdit />
                                </button>
                              </Link>
                                <button
                                    className='text-red-500 hover:text-red-700'
                                    onClick={() => { setOpen(true); setCourseId(course._id) }}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Delete Confirmation Modal */}
            {open && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <FaTrash className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">Delete Course</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Are you sure you want to delete this course?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={() => { handleDelete(); closeModal(); }}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Delete
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllCourses;
