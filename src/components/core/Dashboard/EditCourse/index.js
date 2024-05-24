import React from 'react'
import RenderSteps from '../AddCourse/RenderSteps'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setCourse, setEditCourse } from '../../../../slices/courseslice'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'


export default function EditCourse() {
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { courseId } = useParams()

    useEffect(() =>{
        ;(async () =>{
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token)
            console.log("result yaha hai babe",result);
            if(result?.courseDetails) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
         console.log(result?.courseDetails);
            }
            console.log("hii",course);

            setLoading(true)
        })()
    },[])
  
  return (
    <div>
        <h1 className='mb-14 text-3xl font-medium text-white'>
            Edit Course
        </h1>
        <div className='mx-auto max-w-[600px]'>
            {course? (
            <RenderSteps />
            ) :(
                <p  className="mt-14 text-center text-3xl font-semibold text-richblack-100">Course Not Found</p>
            )}
        </div>
    </div>
  )
}
