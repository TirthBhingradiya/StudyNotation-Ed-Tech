import React from 'react'
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { VscAdd } from "react-icons/vsc"
import { useState } from 'react'
import CoursesTable from "./InstructorCourses/CoursesTable"
import { useEffect } from 'react'
import {fetchInstructorCourses} from"../../../services/operations/courseDetailsAPI"

const MyCourses = () => {

  const  navigate=useNavigate()
  const[courses,setCourses]=useState([])
  const {token}=useSelector((state) =>state.auth)

  useEffect (() =>{
    const fetchCourses =async() =>{
      const result=await fetchInstructorCourses(token)
      if(result)
      {
        setCourses(result)
      }
    }
    fetchCourses()
  },[])
  return (
    <div> 
    <div className='mb-14 flex items-center justify-between'>
     
            <h1 className='text-3xl font-medium text-richblack-5'> My Courses</h1>
       <IconBtn text="Add Course"
       onclick={() => navigate("/dashboard/add-course")}>
       <VscAdd/>

</IconBtn>
</div>
 {courses && <CoursesTable courses={courses} setCourses={setCourses} />}

    </div>
  )
}

export default MyCourses