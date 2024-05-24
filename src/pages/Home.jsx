import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import CTAButton from '../components/core/HomePage/Button';
import HighlightText from "../components/core/HomePage/HighlightText"
import Banner from "../assets/Images/banner.mp4"
import CodeBlock from '../components/core/HomePage/CodeBlock';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import TimelineSection from'../components/core/HomePage/TImelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ReviewSlider from "../components/common/ReviewSlider"
const Home=() =>{
    return(
        <div>
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
        text-white justify-between'>
            {/*section1 */}
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'> 
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future With
                <HighlightText text={"Coding Skills"} />

            </div>
            <div className='mt-4 w-[90%] ext-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}
> Learn More</CTAButton>
<CTAButton active={false} link to={"/login"}>
    Book a demo</CTAButton>           
            

            </div>

            <div className='mx-3 my-12 shadow-blue-200'>
                <video
                 muted
                loop
                autoPlay>
                    <source src={Banner} type="video/mp4" />
                </video>
            </div>

                   {/* Code Section 1 */}

<div>
    <CodeBlock
    position={"lg:flex-row"}
    heading={
        <div className='text-4xl font-semibold'>
            Unlock Your
            <HighlightText text={"codeing potential"}/>
            with our online Courses
            </div>
    }
    subheading={
        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
    }
    
    ctabtn1={
        {
            btnText:"try it yourself",
            linkto:"/signup",
            active:true,
        }
    }

    ctabtn2={
        {
            btnText:"learn more",
            linkto:"/login",
            active:false,
        }
    }

    codeblock={`<!DOCTYPE html>  
    <html>  
    <head>  
      <title>This Page Title</title>  
    </head>  
    <body>  
    <p>The body's content is displayed in the browser window.</p>  
    </body>  
    </html>  `}
    codecolor={"text-yellow-25"}
    />
    </div> 

    {/*code section2 */}
               {/* Code Section 1 */}

<div>
    <CodeBlock
    position={"lg:flex-row-reverse"}
    heading={
        <div className='text-4xl font-semibold'>
            Unlock Your
            <HighlightText text={"codeing potential"}/>
            with our online Courses
            </div>
    }
    subheading={
        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
    }
    
    ctabtn1={
        {
            btnText:"try it yourself",
            linkto:"/signup",
            active:true,
        }
    }

    ctabtn2={
        {
            btnText:"learn more",
            linkto:"/login",
            active:false,
        }
    }

    codeblock={`<!DOCTYPE html>  
    <html>  
    <head>  
      <title>This Page Title</title>  
    </head>  
    <body>  
    <p>The body's content is displayed in the browser window.</p>  
    </body>  
    </html>  `}
    codecolor={"text-yellow-25"}
    />
    </div> 
      
<ExploreMore/>

</div>
{/*section2*/}
<div className='bg-pure-greys-5 text-richblack-700'>
<div className='homepage_bg h-[310px] '>
    

    <div className='w-11/12 max-w-maxContent flex flex-col items-center justify between mx-auto'>
    <div className='h-[150px]'></div>
    <div className='flex flex-row gap-7  text-white mt-20
     '>
        <CTAButton active={true} linkto={"/signup"}>
            <div className='flex items-center gap-3 mx-auto '>
                Explore Full Catalog
                <FaArrowRight/>

            </div>
        </CTAButton>
        <CTAButton active={false} linkto={"/signup"}>
            <div>
                Learn more
            </div>
        </CTAButton>
</div>
    </div>
    </div>

<div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
<div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"} />
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <div className='text-[16px]'>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                            Learn more
                        </div>
                    </CTAButton>
                    </div>

                </div>




                <TimelineSection/>


                <LearningLanguageSection/>
        </div>

         </div>

{/*section 3*/}
<div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>


    <InstructorSection/>
    <h2 className='text-center text-4xl font-semobold mt-10'>review from Other Learners</h2>
  
</div>

       </div>

)
}
export default Home
