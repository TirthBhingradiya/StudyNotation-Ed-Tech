import { useState } from "react";
import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast"
import {sendOtp} from"../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authslice"
import {ACCOUNT_TYPE} from"../../../utils/constant"
import { useNavigate } from "react-router-dom";
import Tab from "../../common/Tab"


function SignupForm() {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const[accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT)
     const[formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
     })


     const[showPassword,setShowPassword]=useState(false)
     const[showConfirmPassword,setShowConfirmPassword]=useState(false)

     const { firstName, lastName, email, password, confirmPassword } = formData


     const handleOnChange =(e) =>{
        setFormData((prevData) =>({
            ...prevData,
            [e.target.name]:e.target.value,
        }))
     }

     const handleOnSubmit =(e) =>{
        e.preventDefault()
        if(password!==confirmPassword){
        toast.error("Password do  not match")
        return
        }
        const signupData={
            ...formData,accountType,
        }
        dispatch(setSignupData(signupData))
        dispatch(sendOtp(formData.email,navigate))

        //Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
          setAccountType(ACCOUNT_TYPE.STUDENT)

     }
    const tabData=[
        {id:1,
        tabName:"Student",
    type:ACCOUNT_TYPE.STUDENT,},
    {
        id:2,
        tabName:"Instructor",
        type:ACCOUNT_TYPE.INSTRUCTOR,
    },
    ]
    return(
        <div>
            <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
            <div className="flex gap-x-4">
                <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input required type="text"
            name="firstName"
            value={firstName}
            onChange={handleOnChange}
            placeholder="Enter first Name"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            ></input>
                </label>
                <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span onClick={() =>setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-[38px] z-[10] cursor-pointer">
{showPassword ?(
<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>

) :(                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
)}
</span>
</label>
<label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
</div>
<button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
    Create Account
</button>
            </form>
        </div>
    )
}

export default SignupForm