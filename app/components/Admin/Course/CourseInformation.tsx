import React, { FC, useState } from 'react';

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: any) => void;
};

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {

    const courseCategories = [
        "Algorithms and Data Structures",
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Software Engineering",
        "Web Development",
        "Mobile Development",
        "Cybersecurity"
    ];
    
    const [dragging, setDragging] = useState(false); // for dragging and dropping images

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    };

    const handleFileChange=(e:any)=>{
        const file=e.target.files?.[0]
        if(file){
            const reader=new FileReader()
            reader.onload=(e:any)=>{
                if(reader.readyState===2){
                    setCourseInfo({...courseInfo,thumbnail:reader.result})
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver=(e:any)=>{
        e.preventDefault()
        setDragging(true)
    }
    const handleDragLeave=(e:any)=>{
        e.preventDefault()
        setDragging(false)
    }
    const handleDrop=(e:any)=>{
        e.preventDefault()
        setDragging(false)
        const file=e.dataTransfer.files?.[0]
        if(file){
            const reader=new FileReader()
            reader.onload=(e:any)=>{
                setCourseInfo({...courseInfo,thumbnail:reader.result})
            }   
            reader.readAsDataURL(file)
        }
    }
    

    return (
        <div className='w-4/5 mx-auto mt-12 p-6'>
            <h1 className='text-[35px] mb-8'>Course Options</h1>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <label htmlFor="name" className='block text-lg font-medium text-gray-700'>
                        Course Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={courseInfo?.name || ''}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        placeholder='Ex: Calculus'
                        className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                </div>
        
                <div className='mb-5 '>
                    <label className='block text-lg font-medium text-gray-700'>Description</label>
                    <textarea 
                        className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                        name="description" 
                        id="description" 
                        cols={30} 
                        rows={10} 
                        placeholder='Write something amazing...'
                        value={courseInfo.description}
                        onChange={(e:any)=>setCourseInfo({...courseInfo,description:e.target.value})}
                    ></textarea>
                </div>
                <div className='w-full justify-between'>
                <label htmlFor="name" className='block text-lg font-medium text-gray-700'>
                        Course Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        required
                        value={courseInfo?.price || ''}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                        placeholder='Ex: 1500'
                        className='mt-2 block w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                </div>
                <div>
                    <label htmlFor="email" className='block text-lg font-medium text-gray-700'>
                        Course Tags
                    </label>
                    <input
                        type="text"
                        required
                        value={courseInfo.tags}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                        placeholder='Ex: Socket IO, RTQ query...'
                        className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                </div>
                <div>
                    <label htmlFor="email" className='block text-lg font-medium mb-3 text-gray-700'>
                        Category
                    </label>
                    <select 
                        value={courseInfo.category} 
                        onChange={(e:any)=>setCourseInfo({...courseInfo,categories:e.target.value})}
                    >
                        <option value="">Select category</option>
                        {
                            courseCategories.map((item:any,index:number)=>(
                                <option value={item} key={index}>
                                    {item}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className='flex space-x-10 w-full'>
                    <div>
                        <label htmlFor="email" className='block text-lg font-medium text-gray-700'>
                            Course Level
                        </label>
                        <input
                            type="text"
                            required
                            id='level'
                            value={courseInfo.level}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                            placeholder='Ex: Beginner/Intermediate/Advance'
                            className='mt-2 block w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className='block text-lg font-medium text-gray-700'>
                            Demo Url
                        </label>
                        <input
                            type="text"
                            id='demoUrls'
                            required
                            value={courseInfo.demoUrl}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                    
                            className='mt-2 block w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                    </div>
                </div>
                <div className='w-full'>
                    <input 
                        type="file" 
                        accept='image/*'
                        id='file'
                        className='hidden'
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file"
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border 
                            flex items-center justify-center ${dragging?"bg-blue-500":"bg-transparent"}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrag={handleDrop}
                    >
                        {courseInfo.thumbnail ? (
                            <img src={courseInfo.thumbnail} className='max-h-96 w-96 object-contain' alt="" />
                        ):(
                            <span className='cursor-pointer block text-lg font-medium text-gray-700'>
                                Drag and drop your thumbnail here or click to browse
                            </span>
                        )}
                    </label>
                </div>
                <div className='w-full flex items-center justify-end'>
                    <input 
                        type="submit"
                        value="next"
                        className='w-full 800px:w-[180px] h-[40px] bg-blue-500 text-center text-[#fff] rounded mt-8 cursor-pointer'
                    />
                </div>
                <br />
                <br />

            </form>
        </div>
    );
};

export default CourseInformation;
