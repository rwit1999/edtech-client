import { useGetCoursesQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';

const Courses = () => {
    const { data, isLoading } = useGetCoursesQuery({});
    // console.log(data);
    
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        if (data?.courses) {
            setCourses(data.courses);
        }
    }, [data]);

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                    <span>Expand your Career Opportunity</span><br />
                    <span className="font-thin">with our courses</span>
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {courses.map((item, index) => (
                    <CourseCard key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Courses;
