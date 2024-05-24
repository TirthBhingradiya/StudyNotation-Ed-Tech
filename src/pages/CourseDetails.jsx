import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import {fetchCourseDetails} from "../services/operations/courseDetailsAPI"
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStars"
import {formatDate} from "../services/formatDate"
import Error from "./Error"
import { BiInfoCircle } from "react-icons/bi"
//import { ReactMarkdown } from "react-markdown/lib/react-markdown"


import GetAvgRating from "../utils/avgRating"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { HiOutlineGlobeAlt } from "react-icons/hi"


const CourseDetails =() =>{
    const {user}=useSelector((state) =>state.profile);
    const {token}=useSelector((state) =>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {courseId}=useParams();
    const [courseData , setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const {loading} = useSelector((state) => state.profile);




    useEffect (() =>{
        const getCourseFullDetails=async() =>{
            try{
                const result=await fetchCourseDetails(courseId);
                console.log("Printing CourseData",result);
                setCourseData(result);
            }
            catch(error){
                console.log("Could not  fetch course Details");
            }
        }
        getCourseFullDetails();
    },[courseId]);

    const[avgReviewCount,setAverageReviewCount]=useState(0);

    useEffect(() =>{
        const count=GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAverageReviewCount(count);
    },[courseData])

    const[totalNoOfLectures,setTotalNoOfLecture]=useState(0);
    useEffect(()=>{
        let lectures=0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) =>{
            lectures+= sec.subSection.length || 0
        })
        setTotalNoOfLecture(lectures);

    },[courseData]);

    const [isActive,setIsActive]=useState(Array(0));
    const hanldeActive=(id) =>{
        setIsActive(
            !isActive.includes(id)
            ?isActive.concat(id)
            :isActive.filter((e) =>e !=id)
        )
    }
    const handleBuyCourse =() =>{
        if(token) {
            buyCourse(token,[courseId],user,navigate,dispatch);
            return;
        }
        setConfirmationModal({
            text1:"You are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() =>navigate("/login"),
            btn2Hanlder:() =>setConfirmationModal(null),
        })

    }
 if(loading || !courseData){
    return(
        <div>
            Loading.....
        </div>
    )
 }

 if(!courseData.success){
    return(
        <div>
            <Error/>
        </div>
    )
 }
    const{
         _id: course_id,
          courseName,
        courseDescription,
         thumbnail,
        price,
         whatYouWillLeran,
        courseContent,
    ratingAndReviews,
instructor,
studentsEnrolled,
createdAt,
}=courseData.data?.courseDetails;
    
    return(
        <>
        <div className={`relative w-full bg-richblack-800 `}>
                    <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative '>
                    <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                    <div className="relative block max-h-[30rem] lg:hidden">
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
              </div>
              <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
                <div>
                        <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">  {courseName}</p>
                        </div>
                        <p className={`text-richblack-200`}>{courseDescription}</p>
                        <div className='text-md flex flex-wrap items-center gap-2'>
                            <span  className="text-yellow-25"> {/*{avgReviewCount*/}4.5</span>
                            <RatingStars Review_Count={avgReviewCount} Star_size={24}/>
                            <span> {/* `(${ratingAndReviews?.length}*/  } 3 Reviews</span>
                            <span>{`(${studentsEnrolled.length} students enrolled)`}</span>

                        </div>
                        <div>
                            <p className=''>
                            <p>Created By  {`${instructor.firstName}  ${instructor.lastName}`}</p>
                            </p> </div>

                        <div className='flex gap-5 text-lg  flex-wrap'>
                            <p  className="flex items-center gap-2">
                            <BiInfoCircle /> Created At {formatDate(createdAt)}</p>
                            <p className='flex flex-row gap-x-2 items-center'>
                                {" "}
                                <HiOutlineGlobeAlt /> English
                            </p>
                            </div>
                            </div>
                            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
                        </div>
                        <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[6600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                               <CourseDetailsCard course={courseData?.data?.courseDetails}
                               setConfirmationModal={setConfirmationModal}
                               handleBuyCourse={handleBuyCourse}
                               />
                       </div>
                      </div>
            
                </div>
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
            {whatYouWillLeran}
            </div>
          </div>

            
            <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">

                    <p className="text-[28px] font-semibold">Course Content:</p>
                
                <div className='flex  flex-wrap gap-2 justify-bewtween '>
                    <div className='flex-gap-2'>
                        <span>
                            {courseContent.length} {`section(s)`} </span>
                            <span>
                                {totalNoOfLectures} lectures
                        </span>
                        <span>
                            {courseData.data?.totalDuration} total Length
                        </span>
                    </div>
                    <div>
                        <button onClick={() =>setIsActive([])}>
                            Collapse All sections

                        </button>
                    </div>
                </div>
            </div>
            

              <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg text-richblack-50">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
            
          </div>
    </div>
</div>


            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
     </>
    )
}

export default CourseDetails