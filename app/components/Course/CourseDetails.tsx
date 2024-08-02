import React, { FC, useState } from 'react';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Ratings from '@/app/utils/Ratings';
import CourseContentList from './CourseContentList';
import CheckOutForm from '../Payment/CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { redirect } from 'next/navigation';
import Link from 'next/link';

type Props = {
    data: any;
    clientSecret: any;
    stripePromise: any;
    setRoute:any
    setOpen:any
};

const CourseDetails: FC<Props> = ({ data, clientSecret, stripePromise,setOpen:openAuthModal,setRoute  }) => {
        

    const { user } = useSelector((state: any) => state.auth);
    const [open, setOpen] = useState(false);
    // console.log(data);
    console.log(user);
    
    

    const isPurchased = user && user?.courses.find((item: any) => item.courseId === data._id);

    const handleBuyNow = () => {
        if(user){
            setOpen(true)
        }
        else{
            setRoute("Login")
            openAuthModal(true)
        }
    };

    console.log('stripePromise:', stripePromise);
    console.log('clientSecret:', clientSecret);

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="col-span-2 p-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
                        <div className="flex items-center mt-2">
                            <Ratings rating={data.rating} />
                            <h5 className="ml-2 text-sm text-gray-600">{data.reviews?.length} Reviews</h5>
                            <h5 className="ml-4 text-sm text-gray-600">{data.purchased} Students Enrolled</h5>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">What will you learn?</h2>
                        <ul className="list-disc list-inside">
                            {data.benefits?.map((item: any, index: number) => (
                                <li key={index} className="text-gray-600 ml-4">
                                    <IoCheckmarkDoneOutline className="inline-block mr-2 text-green-500" />
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Prerequisites</h2>
                        <ul className="list-disc list-inside">
                            {data.prerequisites?.map((item: any, index: number) => (
                                <li key={index} className="text-gray-600 ml-4">
                                    <IoCheckmarkDoneOutline className="inline-block mr-2 text-green-500" />
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Course Overview</h1>
                        <CourseContentList data={data?.courseData} />
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Course Description</h2>
                        <p className="text-gray-600">{data.description}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Student Reviews</h2>
                        {data.reviews?.length === 0 ? (
                            <p className="text-gray-600">No reviews yet.</p>
                        ) : (
                            <div className="divide-y divide-gray-300">
                                {[...data.reviews].reverse().map((item: any, index: number) => (
                                    <div key={index} className="py-4">
                                        <div className="flex items-center">
                                            <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                                                <h1 className="text-gray-800 text-lg">{item.user.name.slice(0, 2)}</h1>
                                            </div>
                                            <div className="ml-4">
                                                <h5 className="font-semibold text-gray-800">{item.user.name}</h5>
                                                <Ratings rating={item.rating} />
                                                <small className="text-gray-600 block">{format(item.createdAt)}</small>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mt-2">{item.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:col-span-1 bg-gray-100 p-6 ">
                    <div className="flex justify-center mb-4">
                        <h2 className="text-2xl text-gray-800">Course Preview</h2>
                    </div>
                    <div className="aspect-w-16 aspect-h-9 ">
                        <CoursePlayer videoUrl={data?.videoUrl} title={data?.title} />
                        <div className="flex items-center mt-6">
                            {!isPurchased ? (
                                <button
                                    onClick={handleBuyNow}
                                    className=" bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none"
                                >
                                    Buy Now
                                </button>
                            ): (
                                <Link
                                    href={`/course-access/${data._id}`}
                                    className=" bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none"
                                >
                                    Enter course
                                </Link>
                            )}
                            {!isPurchased && (<span className="ml-4 text-xl">Rs {data.price}</span>)}   
                        </div>
                        <div className="mt-6 text-gray-900">
                            <ul>
                                <li>Doubt support</li>
                                <li>Lifetime access</li>
                                <li>Certificate on completion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex justify-end">
                            <IoCloseOutline className="text-3xl cursor-pointer text-gray-600" onClick={() => setOpen(false)} />
                        </div>
                        <div>
                            {stripePromise && clientSecret && (
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <CheckOutForm setOpen={setOpen} data={data} user={user}/>
                                </Elements>
                            )}
                            {!stripePromise && <p>Stripe is not loaded</p>}
                            {!clientSecret && <p>Client secret is missing</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
