import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ReviewCard from '../Review/ReviewCard';
import { useGetAllCoursesQuery, useGetCoursesQuery } from '@/redux/features/courses/coursesApi';

type Props = {}

const reviews = [
    {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      comment: "This course was amazing! It really helped me understand the concepts thoroughly.",
      ratings: 4.5
    },
    {
      name: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      comment: "Highly recommend this course to anyone looking to get into web development.",
      ratings: 3.8
    },
    {
      name: "Sam Wilson",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      comment: "The instructors were very knowledgeable and the content was very well structured.",
      ratings: 4
    },
    {
      name: "Emily Johnson",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      comment: "I enjoyed every part of this course. It was both informative and engaging.",
      ratings: 5
    },
    {
      name: "Michael Brown",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      comment: "This course exceeded my expectations. The hands-on projects were particularly helpful.",
      ratings: 4.5
    }
  ];


const Reviews = (props: Props) => {


  return (
    <div className='w-[90%] 800px:w-[85%] m-auto mb-20'>
      <div className='w-full 800px:flex items-center'>
        <div className='800px:w-[50%] w-full'>
          <Image
            src={require('../../../public/hero-head.svg')}
            width={500}
            height={500}
            alt="Hero Head"
          />
        </div>
        <div className='800px:w-[50%] w-full p-4'>
          <h3 className='800px:text-[40px] text-[30px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800'>
            Structured Training + <span className='text-blue-500'>Your Dedication</span> = <span className='text-black text-[20px] font-cursive italic'>Sure shot way of Success</span>
          </h3>
        </div>
      </div>
      <div className=' mt-10 grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0'>
        {reviews && reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  )
}

export default Reviews
