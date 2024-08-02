import React, { FC } from 'react';
import toast from 'react-hot-toast';
import { RiAddCircleLine } from 'react-icons/ri';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {

    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = benefits.map((benefit, i) => 
            i === index ? { ...benefit, title: value } : benefit
        );
        setBenefits(updatedBenefits);
    };

    const handleAddBenefits = () => {
        setBenefits([...benefits, { title: "" }]);
    };

    const handlePrerequisiteChange = (index: number, value: any) => {
        const updatedPrerequisites = prerequisites.map((prerequisite, i) =>
            i === index ? { ...prerequisite, title: value } : prerequisite
        );
        setPrerequisites(updatedPrerequisites);
    };

    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    };

    const prevButton = () => {
        setActive(active - 1)
    }

    const handleOptions = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(active + 1)
        }
        else {
            toast.error("Please fill all the fields to proceed")
        }
    }

    return (
        <div className='w-4/5 mx-auto mt-12'>
            <h1 className='text-[35px] mb-12'>Course Options</h1>
            <div className='mb-8'>
                <label htmlFor="email" className='text-lg block mb-4'>
                    What are the benefits for students in this course?
                </label>
                {benefits.map((benefit: any, index: number) => (
                    <input
                        type="text"
                        name="Benefit"
                        className='block w-full my-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                        key={index}
                        placeholder='You will be able to create your own designs...'
                    />
                ))}
                <div className='flex items-center mt-4'>
                    <RiAddCircleLine
                        className='text-blue-500 cursor-pointer w-6 h-6'
                        onClick={handleAddBenefits}
                    />
                    <span className='ml-2 text-blue-600 cursor-pointer' onClick={handleAddBenefits}>
                        Add Benefit
                    </span>
                </div>
            </div>
            <div className='mb-8'>
                <label htmlFor="email" className='text-lg block mb-4'>
                    What are the prerequisites for this course?
                </label>
                {prerequisites.map((prerequisite: any, index: number) => (
                    <input
                        type="text"
                        name="prerequisites"
                        className='block w-full my-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={prerequisite.title}
                        onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                        key={index}
                        placeholder='You will be able to create your own designs...'
                    />
                ))}
                <div className='flex items-center mt-4'>
                    <RiAddCircleLine
                        className='text-blue-500 cursor-pointer w-6 h-6'
                        onClick={handleAddPrerequisite}
                    />
                    <span className='ml-2 text-blue-600 cursor-pointer' onClick={handleAddPrerequisite}>
                        Add Prequisite
                    </span>
                </div>
            </div>
            <div className='w-full flex items-center justify-around'>
                <div className='w-1/4 800px:-[180px] flex items-center justify-center h-[40px] bg-blue-500
                    text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={() => prevButton()}
                >Prev</div>
                <div className='w-1/4 800px:-[180px] flex items-center justify-center h-[40px] bg-blue-500
                    text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={() => handleOptions()}
                >Next</div>
            </div>
        </div>
    );
};

export default CourseData;
