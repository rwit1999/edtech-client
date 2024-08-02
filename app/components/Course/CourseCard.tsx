'use client'
import Ratings from '@/app/utils/Ratings'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'

type Props = {
    item:any
    isProfile?:boolean
}

const CourseCard:FC<Props> = ({item,isProfile}) => {
  return (
    <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
        <div className='w-full min-h-[35vh] backdrop-blur border border-[#00000015] p-3'>
          <Image src={item.thumbnail.url} width={500} height={300} objectFit='contain' className='rounded' alt=""/>
          <br />
          <h1 className='text-[16px] text-black'>{item.name}</h1>
          <div className='w-full flex items-center justify-between pt-2'>
            <Ratings rating={item.rating}/>
            <h5 className={`text-black ${isProfile && "hidden 800px:inline"}`}>
              {item.purchased} Students
            </h5>
          </div>
          <div className='w-full flex items-center justify-between pt-3'>
            <div className='flex'>
              <h3 className='text-black  text-[14px]'>
                {item.price===0 ? "Free" : "Rs " + item.price }
              </h3>
            </div>
            <div className='flex items-center '>
              <AiOutlineUnorderedList size={20} fill="#160000"/>
              <h5 className='pl-2 text-black'>
                {item.courseData?.length} Lectures
              </h5>
            </div>
          </div>
        </div>
    </Link>
  )
}

export default CourseCard