const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");
const {mongo,default:mongoose}=require("mongoose");
const { findOne } = require("../models/Category");

//createRating
exports.createRating=async(req,res) =>{
    try{
        //get userId
        const userId=req.user.id;
        //fetchdata from req body
        const{rating,review,courseId}=req.body;
        //check if user is not enrolled or not
        const courseDetails=await Course.findOne({_id:courseId,studentsenrolled: {$elemMatch:{$eq:userId}},
        });

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course",
            })
        }

        //check if user already reviewed the course
        const alreadyViewed=await RatingAndReview.findOne({
                                              user:userId,
                                              course:courseId                                  
        });
        if(alreadyViewed){
            return res.status(403).json({
                success:false,
                mesaage:"Course is already reviewed",
            });
        }

        //creating rating and review
        const ratingReview=await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId,
        });

        //update course with rating and review
        const updatedCourseDetails=await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id,
                }
            },{new:true},);
            console.log(updatedCourseDetails);
    
    //return a response
    return res.status(200).json({
        success:false,
        message:"rating and review Created Successfully",
        ratingReview
    })
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.mesaage,
            })
        }

}

//getAverageRating

exports.getAverageRating=async(req,res) =>{
    try{
        //get courseId
        const courseId=req.body.courseId;
        //calculate avg rating

        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                       _id:null,
                       averageRating:{$avg:"$rating"},
                }
            }
        ])
        //return rating
        if(result.length >0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        //if no rating /review exist
        return res.status(200).json({
            succes:true,
            message:'Average Rating is O ,no rating given till now',
            averageRating:0,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



exports.getAllRating =async(req,res) =>{
    try{
            const allReviews=await RatingAndReview.find({})
                                    .sort({rating:"desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select:"courseName",
                                    }).exec();
                                    return res.status(200).json({
                                        success:true,
                                        message:"All review fetched successfully",
                                        data:allReviews,
                                    });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}