const CourseProgress = require("../models/CourseProgress");
const SubSection=require("../models/SubSection");

exports.updateCourseProgress=async(req,res) =>{
    const {courseId,subSectionId}=req.body;
    const userId=req.user.id;

    try{
        const subSection=await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                error:"Invalid SubSection"
            })
        }
            console.log("subsection done");

            let courseProgress=await CourseProgress.findOne({
                courseID:courseId,
                userId:userId,
            });
            if(!courseProgress){
                return res.status(404).json({
                    success:false,
                    message:"Course progress Does not exist"
                });

            }
            else{
                console.log("Course Progress validation done");

                if(courseProgress.completedVideos.includes(subSectionId)){
                    return res.status(400).json({
                        error:"Subsectiom already completed"
                    });
                }

                courseProgress.completedVideos.push(subSectionId);
                console.log("Course Progress Push Done");
            }
            await courseProgress.save();
            console.log("Course Progrss save call done");
            return res.status(200).json({
                success:true,
                message:"Course Progress Updated Successfully"
            })

        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                error:"Internal Error"
            })
        }
    }
