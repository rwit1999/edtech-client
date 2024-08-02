import React, { FC, useState } from 'react';
import { IoChevronDown, IoChevronUp, IoTimeOutline, IoPlayCircleOutline } from 'react-icons/io5';

type Props = {
    data: any[];
    activeVideo?: number;
    setActiveVideo?: (index: number) => void;
};

const CourseContentList: FC<Props> = ({ data, activeVideo, setActiveVideo }) => {
    const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set<number>());

    const toggleSectionVisibility = (index: number) => {
        setVisibleSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    // Group data by videoSection
    const groupedData: { [key: string]: any[] } = {};
    data.forEach((course, index) => {
        const { videoSection } = course;
        if (!groupedData[videoSection]) {
            groupedData[videoSection] = [];
        }
        groupedData[videoSection].push({ ...course, index });
    });

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            {Object.keys(groupedData).map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    <div
                        className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        onClick={() => toggleSectionVisibility(sectionIndex)}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <IoPlayCircleOutline className="text-2xl text-blue-500 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-800">{section}</h2>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-600">{groupedData[section].length} Videos</span>
                                {visibleSections.has(sectionIndex) ? (
                                    <IoChevronUp className="text-gray-500 ml-2" />
                                ) : (
                                    <IoChevronDown className="text-gray-500 ml-2" />
                                )}
                            </div>
                        </div>
                    </div>
                    {visibleSections.has(sectionIndex) && (
                        <div>
                            {groupedData[section].map((course, courseIndex) => (
                                <div
                                    key={courseIndex}
                                    className={`p-4 border-t border-gray-200 ${courseIndex === activeVideo ? 'bg-gray-100' : ''}`}
                                    onClick={() => setActiveVideo && setActiveVideo(course.index)}
                                >
                                    <div className="flex items-center">
                                        <IoPlayCircleOutline className="text-2xl text-blue-500 mr-2" />
                                        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <IoTimeOutline className="text-gray-500 mr-1" />
                                        <span className="text-gray-600">{course.videoLength} mins</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CourseContentList;
