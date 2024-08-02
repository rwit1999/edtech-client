'use client'
import CourseContent from '@/app/components/Course/CourseContent'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import React from 'react'

type Props = {
    params:any
}

const page = ({params}: Props) => {
    const id=params.id
 

  return (
    <div>
        <CourseContent id={id} />
    </div>
  )
}

export default page