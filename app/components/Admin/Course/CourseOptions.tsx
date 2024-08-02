import React, { FC } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

type Props = {
    active: number;
    setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ];

    return (
        <div className='flex flex-col space-y-4 m-8'>
            {options.map((option, index) => (
                <div
                    key={index}
                    className={`flex items-center space-x-3 cursor-pointer ${active === index ? 'bg-gray-100' : ''} py-2 px-4 rounded-md`}
                    onClick={() => setActive(index)}
                >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${active >= index ? "bg-blue-500" : "bg-gray-200"} relative`}>
                        <IoMdCheckmark className='text-white'/>
                    </div>
                    <h5 className={`font-sans ${active === index ? 'text-blue-500' : 'text-gray-700'}`}>
                        {option}
                    </h5>
                </div>
            ))}
        </div>
    );
};

export default CourseOptions;
