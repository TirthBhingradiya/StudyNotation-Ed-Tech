import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io"
import { BsChevronDown } from "react-icons/bs"

import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const VideoDetailsSidebar=({setReviewModal}) => {

const {sectionId,subSectionId}=useParams();
const [activeStatus,setActiveStatus]=useState("");
const navigate=useNavigate();
const location=useLocation();
const [videoBarActive,setVideoBarActive]=useState("");
    const {courseSectionData,courseEntireData,totalNoOfLectures,completedLectures}=useSelector((state)=>state.viewCourse);


   
    useEffect(()=> {
        const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            //set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
            //set current sub-section here
            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])

   // const handleAddReview = () => {
     //   console.log("I am inside Add handleAddReview")
       // setReviewModal(true);
    //}


  return (
    <>
   <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
           
        <div onClick={() =>{
            navigate("/dashboard/enrolled-courses")
        }}
        className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
        >

            Back
            <IoIosArrowBack size={30} />

        </div>
        <div>
            <IconBtn text="Add Review"
            onclick={() =>setReviewModal(true)}/>
        </div>

    </div>
    {/*for headings or title*/}
    <div className="flex flex-col">
        <p>{courseEntireData?.courseName}</p>
        <p className="text-sm font-semibold text-richblack-500">
{completedLectures?.length}/{totalNoOfLectures}</p>
    </div>
</div>
{/*for sections And Subsections */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">

    {
        //yaha pe course ki jagah section aayge
        courseSectionData.map((course, index) =>(
            <div className="mt-2 cursor-pointer text-sm text-richblack-5"
            onClick={() =>setActiveStatus(course?._id)}
            key={index}>

               {/*section*/}
               < div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                    {course?.sectionName}
                </div>
                <span
                    className={`${
                      activeStatus === course?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
                
         

    
                  {  activeStatus === course?._id && (
                        <div className="transition-[height] duration-500 ease-in-out">
                            {
                                course.subSection.map((topic,index) =>(
                                    <div className={`flex gap-3 px-5 py-2${
                                        videoBarActive === topic._id?
                                        "bg-yellow-200 text-richblack-900  font-semibold"
                                        :"bg-richblack-900 text-white"
                                    }`}
                                    key={index}
                                    onClick={() =>{
                                        navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`)
                                        setVideoBarActive(topic?._id);
                                    }}
                                    >
                                        <input
                                                        type='checkbox'
                                                        checked= {completedLectures.includes(topic?._id)}
                                                        onChange={() => {}}
                                                        />
                                        <span>
                                            {topic.title}
                                        </span>
                                        </div>
                                ))
                            }
                        </div>
                    )
                        }
    
    
    </div>
  ))
}
</div>
</div>
    </>
  )
}

export default VideoDetailsSidebar

