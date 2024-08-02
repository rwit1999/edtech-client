import CoursePlayer from '@/app/utils/CoursePlayer'
import React, { FC } from 'react'
import CourseData from './CourseData'
import Ratings from '@/app/utils/Ratings'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

type Props = {
    active:number,
    setActive:(active:number)=>void
    courseData:any
    handleCourseCreate:any
    isEdit:boolean
}

const CoursePreview:FC<Props> = ({active,setActive,courseData,handleCourseCreate,isEdit}) => {
  // console.log(courseData);

  const prevButton=()=>{
    setActive(active-1)
  }
  const createCourse=()=>{
    handleCourseCreate()
  }
  
  return (
    <div className='w-[90%] 800px:w-[90%] m-auto py-5 mb-5'>
      <div className='w-full relative'>
        <div className='w-full mt-10'>
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] p-2  rounded-md text-white my-3 bg-[#ff4646f5] cursor-not-allowed'>
            Buy Now Rs {courseData.price}
          </div>
        </div>
        <div className='flex items-center'>
          <input 
            type="text" 
            name=''
            id=''
            placeholder='Discount code...'
            className='w-[30%] mt-0 mr-2 p-2 bg-gray-100'
          />
          <div className="px-5">
            <div className="bg-blue-500 text-white font-semibold w-[120px] my-3 py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center">
              Apply
            </div>
          </div>  
        </div>
        <div>
          <p className='pb-1'>• Lifetime Access</p>
          <p className='pb-1'>• Source code included</p>
          <p className='pb-1 800px:pb-1'>• Premium Support</p>
        </div>
        <div className='w-full'>
          <div className='w-full 800px:pr-5'>
            <h1 className='text-[25px]'>{courseData.name}</h1>
            <div className='flex items-center justify-between pt-3'>
              <div className='flex items-center'>
                <Ratings rating={0}/>
                <h5>0 Reviews</h5>
              </div>
              <h5>0 Students</h5>
            </div>
          </div>
          <br />
          <h1 className='text-[25px] font-[600]'>
              What will you learn from this course?
          </h1>
          {courseData?.benefits?.map((item:any,index:number)=>(
            <div className='w-full flex 800px:items-center py-2' key={index}>
              <div className='w-[15px] mr-1'>
                <IoCheckmarkDoneOutline size={20}/>
              </div>
              <p className='pl-2'>{item.title}</p>
            </div>
          ))}
          <br />
          <br />
          <h1 className='text-[25px] font-[600]'>
              What are the prerequisites for this course?
          </h1>
          {courseData?.prerequisites?.map((item:any,index:number)=>(
            <div className='w-full flex 800px:items-center py-2' key={index}>
              <div className='w-[15px] mr-1'>
                <IoCheckmarkDoneOutline size={20}/>
              </div>
              <p className='pl-2'>{item.title}</p>
            </div>
          ))}
          <div className='w-full'>
            <h1 className='text-[25px]'>
              Course Details
            </h1>
            
              <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden'>{courseData?.description}</p>
              
            
          </div>
        </div>
        <div className='w-full flex items-center justify-around'>
                <div className='w-1/4 800px:-[180px] flex items-center justify-center h-[40px] bg-blue-500
                    text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={()=>prevButton()}
                >Prev</div>
                <div className='w-1/4 800px:-[180px] flex items-center justify-center h-[40px] bg-blue-500
                    text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={()=>createCourse()}
               > {isEdit ?  'Update' : 'Create'}</div>
               </div>
               
      </div>
    </div>
  )
}

export default CoursePreview