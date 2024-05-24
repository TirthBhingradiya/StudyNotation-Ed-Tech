import React, { useEffect, useState } from 'react'
import IconBtn from '../../../../common/IconBtn'
import {useForm} from "react-hook-form"
import { useDispatch, useSelector, } from 'react-redux';
import {COURSE_STATUS} from "../../../../../utils/constant"
import { resetCourseState,setStep} from '../../../../../slices/courseslice';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

export default function PublishCourse() {

    const{register,handleSubmit,setValue,getValues}=useForm();
    const[loading,setLoading]=useState(false)
    const {course} =useSelector((state) =>state.course)
    const{token} =useSelector((state) =>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(() =>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true)
        }
    }, [])

    const goBack=() =>{
        dispatch(setStep(2))
    }
    const goToCourses=() =>{
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish=async() =>{
        if(
            (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") ===false)
        ){
             // form has not been updated
      // no need to make api call
            goToCourses()
            return
        }
        const formData=new FormData();
        formData.append("courseId",course._id)
        const courseStatus=getValues("public")
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFT
        formData.append("status",courseStatus)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        console.log("result",result)
        if(result){
            goToCourses()
        }
        setLoading(false)
    }

    const onSubmit=(data) =>{
        handleCoursePublish()
    }
  return (
    <div>
        <p className='text-white'>Publish Settings</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="public" className="inline-flex items-center text-lg">
                    <input 
                    type="checkbox"
                    id="public"
                    {...register("public")}
                    className='border-gray-300 h-4 w-4 '/>
                    <span className=' text-white'>
                        Make this Course as public
                    </span>
                </label>
            </div>
            <div className=''>
                <button disabled={loading}
                      type="button"
                      onClick={goBack}
                      className=' text-white'>
                        Back
                      </button>
                      <IconBtn disabled={loading} text="Save Changes"/>
            </div>
        </form>
    </div>
  )
}
