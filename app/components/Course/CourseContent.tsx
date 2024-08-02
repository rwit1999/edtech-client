import React, { FC, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import CourseContentMedia from './CourseContentMedia';
import { Header } from '../Header';
import CourseContentList from './CourseContentList';
import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

type Props = {
    id: string;
};

const CourseContent: FC<Props> = ({ id }) => {
    const [activeVideo, setActiveVideo] = useState(0);
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("login");
    const { data, isLoading,refetch} = useGetCourseContentQuery(id,{refetchOnMountOrArgChange:true});
    const {error,data:user}=useLoadUserQuery({})
    // console.log(user.user);
    

    useEffect(() => {
        if (data && data.content.length > 0) {
            setActiveVideo(0); // Reset active video index when content changes
        }
    }, [data]);

    if (isLoading) {
        return <Loader />;
    }

    if (!data || !data.content || data.content.length === 0) {
        return <div>No content available</div>; // Handle case where content is empty or undefined
    }

    const handleSetActiveVideo = (index: number) => {
        setActiveVideo(index);
    };

    return (
        <>
            <Header
                activeItem={1}
                open={open}
                setOpen={setOpen}
                route={route}
                setRoute={setRoute}
            />
            <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <CourseContentMedia
                            user={user.user}
                            data={data.content}
                            id={id}
                            activeVideo={activeVideo}
                            setActiveVideo={setActiveVideo}
                            refetch={refetch}
                        />
                    </div>
                    <div >
                        <CourseContentList
                            data={data.content}
                            activeVideo={activeVideo}
                            setActiveVideo={handleSetActiveVideo}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseContent;
