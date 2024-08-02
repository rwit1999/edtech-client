import { apiSlice } from "../api/apiSlice";
export const courseApi =apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCourse:builder.mutation({
            query:(data)=>({
                url:"create-course",
                method:"POST",
                body:data,
                credentials:"include" as const
            })
        }),
        getAllCourses:builder.query({
            query:()=>({
                url:"get-all-courses-admin",
                method:"GET",
                credentials:"include" as const
            })
        }),
        getCourses:builder.query({
            query:()=>({
                url:"get-all-courses",
                method:"GET",
                credentials:"include" as const
            })
        }),
        getCoursesUserBought:builder.query({
            query:()=>({
                url:"get-user-courses",
                method:"GET",
                credentials:"include" as const
            })
        }),
        deleteCourse:builder.mutation({
            query:(id)=>({
                url:`delete-course/${id}`,
                method:"DELETE",
                credentials:"include" as const
            })
        }),
        editCourse:builder.mutation({
            query:({id,data})=>({
                url:`edit-course/${id}`,
                method:"PUT",
                body:data, 
                credentials:"include" as const
            })
        }),
        getCourseDetails:builder.query({
            query:(id)=>({
                url:`get-course/${id}`,
                method:"GET",
                credentials:"include" as const
            })
        }),
        getCourseContent:builder.query({
            query:(id)=>({
                url:`get-course-content/${id}`,
                method:"GET",
                credentials:"include" as const
            })
        }),
        addNewQuestion:builder.mutation({
            query:({question,courseId,contentId})=>({
                url:'add-question',
                method:"POST",
                body:{question,courseId,contentId},
                credentials:"include" as const
            })
        }),
        addAnswerInQuestion:builder.mutation({
            query:({answer,courseId,contentId,questionId})=>({
                url:'add-answer',
                method:"POST",
                body:{answer,questionId,courseId,contentId},
                credentials:"include" as const
            })
        }),
        addReview:builder.mutation({
            query:({review,rating,courseId})=>({
                url:`add-review/${courseId}`,
                method:"POST",
                body:{review,rating},
                credentials:"include" as const
            })
        })
    })
})

export const {useGetCoursesUserBoughtQuery,useAddReviewMutation,useAddAnswerInQuestionMutation,useAddNewQuestionMutation,useCreateCourseMutation,useGetCourseContentQuery, useGetAllCoursesQuery,useDeleteCourseMutation,useEditCourseMutation,useGetCoursesQuery,useGetCourseDetailsQuery}=courseApi
