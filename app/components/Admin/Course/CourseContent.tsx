import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData?.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleDelete = (index: number) => {
    if (index > 0) {
      const updatedData = [...courseContentData];
      updatedData.splice(index, 1);
      setCourseContentData(updatedData);
      const updatedCollapsed = [...isCollapsed];
      updatedCollapsed.splice(index, 1);
      setIsCollapsed(updatedCollapsed);
    }
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) newVideoSection = lastVideoSection;
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can't be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-10 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection; // videoSection is video name
          return (
            <div
              key={index}
              className={`w-full bg-[#fffdfd] p-4 rounded-lg  ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
            >
              {showSectionInput && (
                <>
                  <div className="flex w-full items-center mb-10">
                    <input
                      type="text"
                      className={`text-[35px] ${
                        item.videoSection === "Untitled Section"
                          ? "w-[300px]"
                          : "w-full"
                      } cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                      value={item.videoSection}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoSection = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                    <BsPencil className="cursor-pointer dark:text-white text-black ml-2" />
                  </div>
                </>
              )}
              <div className="flex w-full items-center justify-between mb-4">
                {isCollapsed[index] ? (
                    <p className="dark:text-white text-black">
                        {index + 1}. {item.title}
                    </p>
                    ) : null
                }

                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] mr-2 text-black ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => handleDelete(index)}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize={"large"}
                    className="dark:text-white text-black cursor-pointer"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>
              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <label htmlFor="" className="block mb-2">
                      Video Title
                    </label>
                    <input
                      type="text"
                      placeholder="Project Plan..."
                      value={item.title}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].title = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="" className="block mb-2">
                      Video Url
                    </label>
                    <input
                      type="text"
                      placeholder="..."
                      value={item.videoUrl}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoUrl = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="my-3">
                    <label className="block mb-2">
                      Video length (in mins)
                    </label>
                    <input
                      type="number"
                      placeholder="25"
                      value={item.videoLength}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoLength = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="" className="block mb-2">
                      Video Description
                    </label>
                    <textarea
                      rows={8}
                      placeholder="..."
                      className="w-full p-2 border rounded"
                      value={item.description}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].description = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  {item?.links.map((link: any, linkIndex: number) => (
                    <div key={linkIndex} className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="" className="block">
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`${
                            linkIndex === 0
                              ? "cursor-no-drop"
                              : "cursor-pointer"
                          } text-black dark:text-white text-[20px]`}
                          onClick={() =>
                            linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)
                          }
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Source code...(Link title)"
                        value={link.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].title =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                        className="w-full p-2 border rounded mb-2"
                      />
                      <input
                        type="url"
                        placeholder="Source code...(Link Url)"
                        value={link.url}
                        className="w-full p-2 border rounded"
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].url = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}
                  <br />
                  <div className="inline-block mb-4">
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className="mr-2" />
                      Add link
                    </p>
                  </div>
                </>
              )}
              {index === courseContentData.length - 1 && (
                <div>
                  <p
                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                    onClick={(e: any) => newContentHandler(item)}
                  >
                    <AiOutlinePlusCircle className="mr-2" />
                    Add new content
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer mt-8"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" />
          Add new section
        </div>
      </form>
      <div className="w-full flex items-center justify-around mt-8">
        <div
          className="w-1/4 flex items-center justify-center h-[40px] bg-blue-500 text-center text-[#fff] rounded cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-1/4 flex items-center justify-center h-[40px] bg-blue-500 text-center text-[#fff] rounded cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
