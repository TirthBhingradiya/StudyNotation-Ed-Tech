import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import {fetchCourseCategories,editCourseDetails,addCourseDetails} from "../../../../../services/operations/courseDetailsAPI"
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { COURSE_STATUS } from '../../../../../utils/constant';
import IconBtn from '../../../../common/IconBtn';
import RequirementField from "./RequirementField"
import ChipInput from './ChipInput';
import Upload from"../Upload"
import { setStep,setCourse } from '../../../../../slices/courseslice';
import { MdNavigateNext } from "react-icons/md"

const  CourseInformationForm =()  =>{

    const {register,handleSubmit,setValue,getValues,
        formState:{errors},} =useForm();

        const [loading,setLoading]=useState(false);
        const {course,editCourse}= useSelector((state) => state.course)
        const{token}=useSelector((state)=>state.auth);
        const [courseCategories,setCourseCategories]=useState([]);
          const dispatch=useDispatch();

        useEffect (() =>{
            const getCategories =async() =>{
                setLoading(true);
                const categories =await fetchCourseCategories();
                if(categories.length >0){
                    setCourseCategories(categories)
                }
                setLoading(false);
            }
            if(editCourse){
                     setValue("courseTitle",course.courseName);
                     setValue("courseShortDesc",course.courseDescription);
                     setValue("coursePrice",course.price);
                     setValue("courseTags",course.tag);
                     setValue("courseBenefits",course.whatYouWillLearn)
                     setValue("courseCategory",course.category);
                     setValue("courseImage",course.thumbnail);
                     setValue("courseRequirements",course.instructions);
            }
            getCategories();
        },[])
        const isFormUpdated=() =>{
            const currentValues=getValues();
            if(currentValues.courseTitle!==course.courseName ||
                currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTitle !== course.courseName ||
            //currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            //currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
            )
            return true;
            else
            return false;
        }

        const onSubmit=async(data) =>{
            if(editCourse)
            {
                if(isFormUpdated())
                {
                    const currentValues=getValues();
                    const formData=new FormData();

                    formData.append("courseId",course._id);
                    if(currentValues.courseTitle!==course.courseName){
                        formData.append("courseName",data.courseTitle);

                    }
                    if(currentValues.courseShortDesc !== course.courseDescription) {
                        formData.append("courseDescription", data.courseShortDesc);
                    }
        
                    if(currentValues.coursePrice !== course.price) {
                        formData.append("price", data.coursePrice);
                    }
        
                    if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                        formData.append("whatYouWillLearn", data.courseBenefits);
                    }
        
                    if(currentValues.courseCategory._id !== course.category._id) {
                        formData.append("category", data.courseCategory);
                    }
        
                    if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                        formData.append("instructions", JSON.stringify(data.courseRequirements));
                    }
                    if (currentValues.courseImage !== course.thumbnail) {
                        formData.append("thumbnailImage", data.courseImage)
                      }
        

                    setLoading(true);
                    const result=await editCourseDetails(formData,token);
                    setLoading(false);
                    if(result)
                    {
                        dispatch(setStep(2));
                        dispatch(setCourse(result));
                    }

                }
                else{
                    toast.error("NO change made so far");
                }
                console.log("PRINTING FORMDATA", formData);
                console.log("PRINTING result", result);
    
                return;
            }

            const formData=new FormData();
            formData.append("courseName",data.courseTitle);
            formData.append("courseDescription", data.courseShortDesc);
            formData.append("price", data.coursePrice);
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("category", data.courseCategory);
            formData.append("instructions", JSON.stringify(data.courseRequirements));
            formData.append("status", COURSE_STATUS.DRAFT);
            formData.append("thumbnailImage", data.courseImage)

       
            setLoading(true);
            console.log("Before and course API call");
            console.log("Printing formdata",formData);
            const result=await addCourseDetails(formData,token);
            if(result){
                dispatch(setStep(2));
                dispatch(setCourse(result));

            }
            setLoading(false);
            console.log("printing formdata",formData);
            console.log("Printing result",result);
        }

    return(
        <form onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
        >
            <div  className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='courseTitle'>Course Title    <sup className="text-pink-200">*</sup>  </label>
                    <input 
                          id='courseTitle'
                          placeholder='Enter Course Title'
                          {...register("courseTitle",{required:true})}
                               className='w-full text-richblack-800 form-style w-full"'
                    
                    >
                    </input>
                    {
                        errors.courseTitle && (
                            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                                Course Title is Required
                            </span>
                        )
                    }
          
            </div>
            <div className="flex flex-col space-y-2">
                <label  className="text-sm text-richblack-5"htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
                <textarea
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc",{required:true})}
                className='min-h-[140px] w-full text-richblack-800'/>
                {errors.courseShortDesc &&navigator(          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
            </div>
            <div className='flex flex-col space-y-2'>
                <label  className="text-sm text-richblack-5" htmlFor='coursePrice'> Course Price<sup>*</sup></label>
                <input 
                id='coursePrice'
                placeholder='Enter Course price'
                {...register("coursePrice",{required:true,
                valueAsNumber:true,
                pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  }})}
                className='w-full text-richblack-800 ="form-style !pl-12"'
                />
                            <HiOutlineCurrencyRupee  className='absolute top-1/2 text-richblack-400'/>
                            {
                                errors.coursePrice && (
                                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                                        Course Price is Required **
                                    </span>
                                )
                            }


            </div>
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='courseCategory'>Course Category<sup>*</sup></label>
                <select
                 {...register("courseCategory" ,{required:true})}
                id='courseCategory'
                defaultValue=""
                className='form-style w-full'
           
               >
                    <option value=""  disabled>choose a Category</option>
                    {
                        !loading && courseCategories.map((category,index) =>(
                            <option key={index} value={category?._id} className="bg-black text-yellow-50">
                                {category?.name}
                                
                            </option>
                        ))
                    }
                </select>
                {errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200"> 
                        Course Category is Required
                    </span>
                )}
            </div>

            {/*Course Tags */}
            <ChipInput label="Tags"
            name="courseTags"
            placeholder="Enter Tags and Press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            />

            <Upload name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.thumbnail : null}
            
            />

<div className="flex flex-col space-y-2">
                <label  className="text-sm text-richblack-5" htmlFor="courseBenefits">Benefits of the course<sup>*</sup></label>
                  <textarea
                  id="coursebenefits"
                  placeholder='enter benefits of the course'
                  {...register("courseBenefits",{required:true})}
                  className='min-h-[130px] w-full text-richblack-800'
                  />
                  {errors.courseBenfits && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Benefits of the Course Are Required
                    </span>
                  )}

            </div>
                  <RequirementField name="courseRequirements"
                  label="Requirements/Instructions"
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                  />
                  <div className="flex justify-end gap-x-2">
                    {
                        editCourse && (
                            <button
                            onClick={() =>dispatch(setStep(2))}
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                          >  continue WithOut Saving
                            </button>
                        )
                    }
                    <IconBtn  disabled={loading} text={!editCourse ?"Next" :"Save Changes"}>
                    <MdNavigateNext />
        </IconBtn>
                  </div>
        </form>
    )


}
export default CourseInformationForm