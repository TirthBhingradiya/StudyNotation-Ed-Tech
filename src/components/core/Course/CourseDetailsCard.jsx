import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
 import {ACCOUNT_TYPE} from"../../../utils/constant";
 import { addToCart } from "../../../slices/cartslice";
import copy from 'copy-to-clipboard'
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"



function CourseDetailsCard({course,setConfirmationModal,handleBuyCourse}){


    const{
        thumbnail:ThumbnailImage,
        price:CurrentPrice,
    }=course;

    const {user} =useSelector((state) =>state.profile);
    const {token} =useSelector((state) =>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();


   const hanldeAddToCart =() =>{
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){

            toast.error("You are an instructor you cant buy a course");
            return;
        }
    
    if(token){
 console.log("dispatching Add to cart");
 dispatch(addToCart(course));
 return;
    }
    setConfirmationModal({
        text1:"you are not logged in",
        text2:"Please login to add to cart",
        btn1text:"login",
        btn2Text:"cancel",
        btn1Handler:()=>navigate("/login"),
        btn2Handler: ()=> setConfirmationModal(null),
    })

}

    const handleShare =() =>{
        copy(window.location.href);       
          toast.success("Link Copied to Clipboard")
    }
    console.log("yaha puche ke nai")
    return(
        <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
         > 
            <img src={ThumbnailImage}
        alt="Thumbnail img"
        className="mx-h-[300px] min-h-[180px] w-[400px] rounded-xl"/>
        <div className="space-x-3 pb-4 text-3xl font-semibold">Rs.{CurrentPrice}</div>
        <div className='flex flex-col gap-4'>

             <button className="bg-yellow-50 w-fit text-richblack-900" onClick={
                user && course?.studentsEnrolled.includes(user?._id)?() =>navigate("/dashboard/enrolled-courses")
                :handleBuyCourse
            }>
            {
                user && course?.studentsEnrolled.includes(user?._id) ?"Go to Course" :"Buy Now"

            }

            </button>

            {
                (
                 !course?.studentsEnrolled.includes(user?._id)) && (
                    <button onClick={hanldeAddToCart}
                    className="bg-yellow-50 w-fit text-richblack-900">
                        Add To Cart
                    </button>
                 )
                
            } 
        </div>
         
        <div className={``}>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                30 Day Money-Back Gurantee
            </p>
            <p className={`my-2 text-xl font-semibold `}> This Courses Includes:</p>

{ <div className="flex flex-col gap-y-3">
    {
        course?.instructions?.map((item,index) =>(
            <p key={index} className="flex gap-2">
                                    <BsFillCaretRightFill />

                <span>{item}</span>
            </p>
            
        ))
        
    }
    <button className="mx-auto flex items-center text-yellow-50" onClick={handleShare}>
    <FaShareSquare size={15} /> Share

        </button>

</div>/*
        </div>
        <div>
        
        </div> */}
        </div>
        </div>
    )
}
export default CourseDetailsCard