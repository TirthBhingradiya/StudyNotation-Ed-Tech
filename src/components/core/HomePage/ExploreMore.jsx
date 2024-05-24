import React from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import { useState } from "react";
import HighlightText from "../HomePage/HighlightText"
import CourseCard from "./CourseCard"


const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
];

const ExploreMore=() =>{

    const [currenttab,setCurrentTab]=useState(tabsName[0]);
    const[courses,setCourses]=useState(HomePageExplore[0].courses);
    const[cuurrentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    

    const setMyCards=(value) =>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)  => course.tag ===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);

    }

    return(
        <div>
            <div className="text-4xl font-semibold text-center">
                Unlock the
                <HighlightText text={"Power of Code"} />
                </div>

                <p className="text-center text-richblack-300 text-sm text-[16px] mt-3">
                Learn to build anything you can imagine
                </p>
                <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100
      px-1 py-1'>
        {
           tabsName.map((element,index) =>{
            return(
                
                <div className={`text-[16px] flex flex-row items-center gap-2 
                  ${currenttab==element
                ?"bg-richblack-900 text-richblack-5 font-medium"
            :   "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
            hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                key={index}
                onClick={ ()=> setMyCards(element)}>
                    {element}
                    </div>
            )
           })  
        }
        </div>
        <div className='lg:h-[200px]'></div>
 {/*cards Group*/}
 <div className="lg:absolute gap-10  justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
    {courses.map((ele,index)=>{
        return(
            <CourseCard
            key={index}
            cardData={ele}
            currentCard={cuurrentCard}
            setCurrentCard={setCurrentCard}
            />
        );
    })}
 </div>

            </div>
    
    )
}

export default ExploreMore