import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";

const ContactUsForm=() =>{
const [loading,setLoading] =useState(false);
const{
    register,handleSubmit,
    reset,
    formState:{errors,isSubmitSuccessful},}=useForm()


    const submitContactForm=async(data) =>{
        try{
            setLoading(true)
            const res=await apiConnector("POST",contactusEndpoint,data
            )
            setLoading(false);
            console.log(res);
        }
        catch(error){
            console.log("ERROR MESSAGE" ,error.message);
            setLoading(false)
        }
     }
     useEffect(() =>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
                countrycode:""
            
            })
        }
     },[reset,isSubmitSuccessful])
    return(
        <form className="flex flex-col  text-richblack-800 gap-7 " onSubmit={handleSubmit(submitContactForm)}>
         <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%">
                        <label htmlFor='firstname'>First Name</label>
                           <input 
                           type="text"
                           name="firstname"
                           id="firstname"
                           placeholder="Enter First Name"
                           className="form-style "
                           {...register("firstname",{required:true})}
                           />
                           {errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter your Name.
                            </span>
                           )}    
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
<label htmlFor="lastname" className="label-style">
    Last Name
</label>
<input type="text"
name="lastname"
id="lastname"
placeholder="Enter last name"
className="form-style"
{...register("lastname")}/>
                </div>
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="email" className="label-style">
                Email Address
               </label>
               <input type="email"
               name="email"
               id="email"
               placeholder="Enter your Email Address"
               className="form-style"
               {...register("email",{required:true})}/>
               {errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    Please Enter your Email Address.
                </span>
               )}

                </div>
                <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
            <div className="flex w-[81px] flex-col gap-2">
                <select type="text"
                name="countrycode"
                id="countrycode"
                placeholder="Enter your country code"
                className="form-style"
                {...register("countrycode",{required:true})}
>

    {CountryCode.map((ele,i) =>{
        return(
            <option key={i} value={ele.code}>
                {ele.code}-{ele.country}
            </option>
        )

    })}
    </select>         
       </div>
       <div className="flex w-[calc(100%-90px)] flex-col gap-2">
<input type="number"
name="phonenumber"
id="phonenumber"
placeholder="12345 6789"
className="form-style"
{...register("phoneNo",{required:{
    value:true,
    message:"Please Enter Your Phone Number."
},
  maxLength:{value:12,message:"Invalid Phone Number"},
  minLength:{value:10 ,message:"Invalid Phone Number"}

})}/>
        </div>
</div>
{errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
        </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="label-style">
                        Mesaage
                    </label>
                    <textarea name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your Message here"
                    className="form-style"
                    {...register("message",{required:true})}
                    />
                    {errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please Enter your Message
                        </span>
                    )}
                
</div>
<button disabled={loading}
type="submit"
className={`rounded-md  bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
${

    !loading &&
    "transition-all duration-200 hover:scale-95 hover:shadow-none"
  }  disabled:bg-richblack-500 sm:text-[16px] `}
>

Send Message
</button>
        </form>
    
    )
}

export default ContactUsForm