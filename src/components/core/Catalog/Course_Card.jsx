import React from 'react'
import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
import { useState } from 'react';
import { useEffect } from 'react';
import GetAvgRating from "../../../utils/avgRating"

const Course_Card=({course,Height}) =>{


    const[avgReviewCount,setAvgReviewCount]=useState(0);


    useEffect(() =>{
        const count=GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])
    return(
        <div>
            <Link to={`/courses/${course._id}`}>
                <div>
                    <div className='rounded-lg'>
                        <img src={course?.thumbnail}
                        alt='course ka thumbnail'
                        className={`${Height} w-full rounded-xl object-cover`}
                        />
                        </div>
                        <div className='flex flex-col gap-2 px-1 py-3'>
                            <p className="text-xl text-richblack-5">{course?.courseName}</p>
                            <p className="text-xl text-richblack-5">{course?.instructor?.firstName}{course?.instructor?.lastName}</p>
                             <div className='flex gap-x-3 items-center'>
                                <span className='text-yellow-5'>
                                {avgReviewCount || 0}
                                </span>
                                <RatingStars Review_Count={avgReviewCount} />
                        <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
                                

                             </div>
                             <p className='"text-xl text-richblack-5'>{course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}


export default Course_Card