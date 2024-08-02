import CoursePlayer from "@/app/utils/CoursePlayer";
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation, useAddReviewMutation, useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { MdVerifiedUser } from "react-icons/md";
import { format } from "timeago.js";
import { MdVerified } from "react-icons/md";
import Ratings from "@/app/utils/Ratings";

import socketIO from 'socket.io-client'
import { useRadioGroup } from "@mui/material";
const ENDPOINT=process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || ""
const socketId=socketIO(ENDPOINT,{transports:["websocket"]}) 


type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user:any,
  refetch:any
};

const CourseContentMedia: FC<Props> = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch
}) => {
    const [activeBar, setActiveBar] = useState(0);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [questionId, setQuestionId] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [addNewQuestion,{isSuccess,error,isLoading:questionCreationLoading}] = useAddNewQuestionMutation()
    const [addAnswerInQuestion,{isSuccess:answerSucess,error:answerError,isLoading:answerCreationLoading}] = useAddAnswerInQuestionMutation()
    const [addReview,{isSuccess:reviewSuccess,error:reviewError,isLoading:reviewCreationLoading}]=useAddReviewMutation()
    const {data:courseData,refetch:courseRefetch}=useGetCourseDetailsQuery(id,{refetchOnMountOrArgChange:true})

    // console.log(courseData);
    // console.log(user);
    
    
    
    const course=courseData?.course

    const reviewExists = course?.reviews?.find((item:any)=>item.user._id===user._id) // one can give only one review


    const handleQuestion=async()=>{
      if(question.length===0){
        toast.error("Question can't be empty!")
      }
      else{
        // question is video specific
        await addNewQuestion({question,courseId:id,contentId:data[activeVideo]._id})
        toast.success("Question posted")
      }
    }
    
    const handleAnswer=()=>{
      addAnswerInQuestion({answer,courseId:id,contentId:data[activeVideo]._id,questionId:questionId})
    }

    const handleReview=async()=>{
      if(review.length===0){
        toast.error("Review can't be empty! ")
      }
      else{
        addReview({review,rating,courseId:id})
      }
    }


    useEffect(()=>{
      if(isSuccess){
        setQuestion("")
        refetch() // refetch course content
        socketId.emit('notification',{
          title:'New question received',
          message:`You have a new question in ${data[activeVideo].title}`,
          userId:user._id
        })
      }
      if(error){
        if("data" in error){
          const errorMessage=error as any
          toast.error(errorMessage.data.message)
        }
      }
      if(answerSucess){
        setAnswer("")
        refetch()
        toast.success("Answer added")
        if(user.role!=='admin'){
          socketId.emit('notification',{
            title:'New reply received',
            message:`You have a new question reply in ${data[activeVideo].title}`,
            userId:user._id
          })
        }
      }
      if(answerError){
        if("data" in answerError){
          const errorMessage=error as any
          toast.error(errorMessage.data.message)
        }
      }
      if(reviewSuccess){
        setReview("")
        courseRefetch()
        toast.success("Review added")
        socketId.emit('notification',{
          title:'New review ',
          message:`You have a new review in ${data[activeVideo].title}`,
          userId:user._id
        })
      }
      if(reviewError){
        if("data" in reviewError){
          const errorMessage=error as any
          toast.error(errorMessage.data.message)
        }
      }

    },[isSuccess,error,answerSucess,answerError,reviewSuccess,reviewError])


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />
        <div className="flex justify-between mt-4">
          <div
            className={`flex items-center text-gray-600 cursor-pointer ${activeVideo === 0 ? 'opacity-50' : ''}`}
            onClick={() =>
              setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
            }
          >
            <AiOutlineArrowLeft className="mr-2" />
            Prev Lesson
          </div>
          <div
            className={`flex items-center text-gray-600 cursor-pointer ${activeVideo === data.length - 1 ? 'opacity-50' : ''}`}
            onClick={() =>
              setActiveVideo(
                activeVideo === data.length - 1 ? activeVideo : activeVideo + 1
              )
            }
          >
            Next Lesson <AiOutlineArrowRight className="ml-2" />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{data[activeVideo]?.title}</h1>
      </div>
      <div className="mb-6">
        <div className="flex justify-between">
          {["Overview","Resources","Q&A","Reviews"].map((text,index)=>(
              <h5
                  key={index}
                  className={`cursor-pointer ${activeBar===index ? "text-red-500" : "text-gray-600"}`}
                  onClick={()=>setActiveBar(index)}
              >
                  {text}
              </h5>
          ))}
        </div>
      </div>
      <div className="mb-6">
        {activeBar===0 && (
          <p className="text-gray-600">{data[activeVideo]?.description}</p>
        )}
        {activeBar===1 && (
          <div>
              {data[activeVideo]?.links.map((item:any,index:number)=>(
                  <div key={index} className="mb-2">
                      <h2 className="text-lg font-semibold text-gray-800">{item.title && item.title + " :"}</h2>
                      <a href={item.url} className="text-blue-600 hover:underline">{item.url}</a>
                  </div>
              ))}
          </div>
        )}
        {
          activeBar===2 && (
            <div className="p-4 pb-16 rounded-lg shadow-lg relative">
              <div className="flex items-center mb-4">
                <Image src={user.avatar?.url} alt="" width={50} height={50} className="-mt-20 w-[40px] h-[40px] rounded-full mr-4"/>
                <textarea 
                  name=""
                  value={question}
                  onChange={(e)=>setQuestion(e.target.value)}
                  id=""
                  cols={40}
                  rows={5}
                  placeholder="Write your doubt..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <button onClick={questionCreationLoading?()=>{}:handleQuestion} className="bg-blue-500 absolute right-6 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ">
                Submit
              </button>
              <br /><br />
              <QuestionReply
                data={data}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                user={user}
                handleAnswer={handleAnswer}
                setQuestionId={setQuestionId}
              />
            </div>
          )
        }
        {
  activeBar === 3 && (
    <div className=" p-4 pb-16 rounded-lg shadow-lg relative">
      {
        !reviewExists && ( // a user can only add one review
          <div className="flex flex-col items-center">
            <Image 
              src={user.avatar?.url} 
              alt="" 
              width={50} 
              height={50} 
              className="w-[60px] h-[60px] rounded-full mb-4"
            />
            <div className="text-center w-full">
              <h5 className="text-lg font-semibold text-gray-800 mb-2">Give a rating</h5>
              <div className="flex justify-center mb-4">
                {
                  [1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        size={25}
                        className="text-yellow-500 cursor-pointer"
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        size={25}
                        className="text-gray-400 cursor-pointer"
                        onClick={() => setRating(i)}
                      />
                    )
                  )
                }
              </div>
              <textarea 
                name=""
                value={review}
                onChange={(e) => setReview(e.target.value)}
                id=""
                cols={40}
                rows={5}
                placeholder="Write your review..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
              ></textarea>
              <button onClick={reviewCreationLoading ? ()=>{} : handleReview} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 absolute right-6 bottom-6">
                Submit
              </button>
            </div>
            <br />
            <div>
            </div>
          </div>
        )
      }
      {
        course?.reviews && [...course.reviews].reverse().map((item:any, index:number) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-start space-x-4">
              <Image src={item.user.avatar?.url} alt="" width={50} height={50} className="object-contain w-[40px] h-[40px] rounded-full mb-4"/>
              <div>
                <h1 className="text-lg font-semibold">{item?.user.name}</h1>
                <Ratings rating={item.rating} />
                <p className="text-gray-600 mt-2">{item.comment}</p>
                <small className="text-gray-400">{format(item.createdAt)}</small>
              </div>
            </div>
          </div>
        ))
    }
    </div>
  )
}

      </div>
    </div>
  );
};



const QuestionReply=({data,activeVideo,answer,setAnswer,setQuestionId,user,handleAnswer}:any)=>{
  return (
    <>
      <div>
        {
          data[activeVideo].questions.map((item:any,index:number)=>(
            <CommentItem
              key={index}
              data={data}
              activeVideo={activeVideo}
              item={item}
              index={index}
              answer={answer}
              setAnswer={setAnswer}
              setQuestionId={setQuestionId}
              handleAnswer={handleAnswer}
            />
          ))
        }
      </div>
    </>
  )
}

const CommentItem=({key,data,activeVideo,item,index,answer,setQuestionId,setAnswer,handleAnswer}:any)=>{

  const [replyActive,setReplyActive]=useState(false)

  return (
    <>
      <div className="flex space-x-4 p-4 border-b border-gray-200">
        <div className="flex-shrink-0">
          {item.user.avatar?.url ? (
            <Image
              src={item.user.avatar.url}
              alt={`${item.user.name}'s avatar`}
              width={50}
              height={50}
              className="w-[40px] h-[40px] rounded-full mr-4 object-cover"
            />
          ) : (
            <div className="w-[40px] h-[40px] rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              <h1>{item.user.name.slice(0, 2)}</h1>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h5 className="text-lg font-semibold">{item?.user.name}</h5>
            <small className="text-gray-500">{format(new Date(item?.createdAt), 'PPpp')}</small>
          </div>
          <p className="text-gray-700">{item?.question}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 p-4">
        <span 
          className="cursor-pointer text-blue-500" 
          onClick={() => {
            setReplyActive(!replyActive),
            setQuestionId(item._id)
            }
          }
        >
          {!replyActive ? (item.questionReplies.length > 0 ? "All replies" : "Add reply") : "Hide replies"}
        </span>
        <BiMessage size={20} /> 
        <span>{item.questionReplies.length}</span>
      </div>

      {replyActive && (
        <div className="ml-12">
          {item.questionReplies.map((reply: any, index: number) => (
            <div key={index} className="flex space-x-4 p-4 border-b border-gray-200">
              <div className="flex-shrink-0">
                {reply.user.avatar?.url ? (
                  <Image
                    src={reply.user.avatar.url}
                    alt={`${reply.user.name}'s avatar`}
                    width={50}
                    height={50}
                    className="w-[40px] h-[40px] rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="w-[40px] h-[40px] rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    <h1>{reply.user.name.slice(0, 2)}</h1>
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <h5 className="text-lg font-semibold flex items-center">
                  {reply.user.name} 
                  {reply.user.role==='admin' && <MdVerified className="ml-1 text-green-500" size={18} />}
                </h5>
                <p className="text-gray-700">{reply.answer}</p>
                <small className="text-gray-500">{format(new Date(reply.createdAt), 'PPpp')}</small>
              </div>
            </div>
          ))}

          <div className="flex items-center space-x-4 p-4">
            <input
              type="text"
              placeholder="Enter your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="flex-grow border rounded p-2"
            />
            <button
              type="submit"
              onClick={handleAnswer}
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseContentMedia;
