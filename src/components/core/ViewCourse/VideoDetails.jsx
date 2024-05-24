import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react'
import { BigPlayButton, Player } from "video-react"
import IconBtn from "../../common/IconBtn";
import {AiFillPlayCircle} from "react-icons/ai"
import 'video-react/dist/video-react.css';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';

const VideoDetails = ()=>{

    const {courseId,sectionId,subSectionId}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const playerRef=useRef();
    const [videoData,setVideoData]=useState();

    const {courseSectionData, courseEntireData,  completedLectures} = useSelector((state)=>state.viewCourse);

    const {token} = useSelector((state)=>state.auth);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);




    useEffect(() =>{
         
          const setVideoSpecificDetails=async() =>{
            if(!courseSectionData.length)
            return;
        if(!courseId && !sectionId && !subSectionId){
            navigate("/dashboard/enrolled-courses");
        }
        else{
            const filteredData=courseSectionData.filter(
                (course) =>course._id ===sectionId
            )
            const filteredVideoData=filteredData?.[0].subSection    .filter(
                (data)=>data._id ===subSectionId

            )

            setVideoData(filteredVideoData[0]);
            setVideoEnded(false);
        }
          }
          setVideoSpecificDetails();

    },[courseSectionData,courseEntireData,location.pathname])

    const isFirstVideo=() =>{
        const currentSectionIndex=courseSectionData.findIndex(
            (data) =>data._id===sectionId
        )

        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )
        if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
            return true;

        }
        else{
            return false;
        }
    }

    const isLastVideo =() =>{
        const currentSectionIndex=courseSectionData.findIndex(
            (data) =>data._id===sectionId
        )
        const noOfSubSections= courseSectionData[currentSectionIndex].subSection.length;
        

        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )
        if(currentSectionIndex === courseSectionData.length-1 && currentSubSectionIndex === noOfSubSections-1) 
        {
            return true;
        }
        else{
            return false;

        }
    }

    const goToNextVideo =() =>{
        const currentSectionIndex=courseSectionData.findIndex(
            (data) =>data._id===sectionId
        )
        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) =>data._id===subSectionId
        )

        if(currentSubSectionIndex !==noOfSubSections-1){
            const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex+1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-Section/${nextSubSectionId}`)
        }
        else{
            const nextSectionId=courseSectionData[currentSectionIndex+1]._id;
            const nextSubSectionId=courseSectionData[currentSubSectionIndex+1].subSection[0]._id;

            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }

    const goToPrevVideo =() =>{

        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
    
        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )
    
    

        if(!currentSubSectionIndex!= 0){
            const prevSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1];

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else{
            //differnt Section ,last video
           const prevSectionId=courseSectionData[currentSectionIndex-1]._id;
           const prevSubSectionLength=courseSectionData[currentSectionIndex-1].subSection.length;
           const prevSubSectionId=courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id;
           //iss video par chale jao
           navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

        }
    }


    const handleLectureCompletion =async() =>{
        setLoading(true);
        //PENDING - > Course Progress PENDING
        const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
        //state update
        if(res) {
            dispatch(updateCompletedLectures(subSectionId)); 
        }
        setLoading(false);
    
    }

    return(
        <div className="flex flex-col gap-5 text-white">
            {
                !videoData ? (<div>
                    NO Data Found
            </div>):(
                <Player
                ref={playerRef}
        
                aspectRatio="16.9"
                playsInline
                onEnded={() =>setVideoEnded(true)}
                src={videoData?.videoUrl}
            >


<BigPlayButton position="center" />


{
    videoEnded && (
        <div
        style={{
          backgroundImage:
            "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
        }}
        className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
      >            {
                !completedLectures.includes(subSectionId) && (
                    <IconBtn
                    disabled={loading}
                    onclick={() =>handleLectureCompletion()}
                    text={!loading ? "Mark AS COmpleted ":"Loading...."}
                    customClasses="text-xl max-w-max px-4 mx-auto"
                    />
                )
            }
            <IconBtn
            disabled={loading}
            onclick={() =>{
                if(playerRef?.current){
                    playerRef.current?.seek(0);
                    setVideoEnded(false);
                }
            }}
            text="ReWatch"
            customClasses="text-xl max-w-max px-4 mx-auto mt-2"
            />
            <div>
                {!isFirstVideo() & (
                    <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
>
    Prev
</button>                )}
{!isLastVideo() && (
    <button
    disabled={loading}
    onClick={goToNextVideo}
    className="Black-button">
        Next
    </button>
)}
            </div>
        </div>
    )
}

            </Player>)
            }
 <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
        </div>
    )
}

export default VideoDetails