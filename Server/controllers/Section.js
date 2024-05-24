const Section=require("../models/Section");
const SubSection =require("../models/SubSection")
const Course =require("../models/Course");


exports.createSection = async (req, res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;
        //data validate
        if (!sectionName || !courseId) {
            return res.json(400).json({
                success:false,
                message:'All fields are required',
            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update the courseContent with section's ObjectId
        const updatedCourse = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push: {
                                                    courseContent:newSection._id,
                                                },
                                            },
                                            {new:true}
        )
        .populate({
        path:"courseContent",
        populate: {
            path: "subSection",
            },
        })
        .exec();
        //return response
        console.log("yaha puche ke nai")
        console.log("course content ", updatedCourse.courseContent);
        console.log("course content array length - ", updatedCourse.courseContent.length);
        console.log("Section response of newSection", newSection);
         res.status(200).json({
            success:true,
            message:'Section created successfully',
           updatedCourse,
        });

    } catch(error) {
         res.status(500).json({
            success:false,
            message:'Unable to create Section, please try again',
            error:error.message,
        })
    }
};
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId ,courseId} = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
        
		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
            data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

exports.deleteSection = async (req, res) => {
    try{

        
        // get ID - assumint that we are sending ID in params
        const {sectionId,courseId} = req.body;
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })
        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);
        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section not Found",
            })
        }
        //delete sub Section 
        await SubSection.deleteMany({_id: {$in: section.subSection}});

        await Section.findByIdAndDelete(sectionId);

        //find the updated course and return
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate: {
                path: "subSection",
            }
        })
        .exec();

        //return response
        return res.status(200).json({
            success:true,
            message:'Section Deleted Successfully',
            data:course,
        });

    } catch (err) {
        return res.status(500).json({
            success:false,
            message:'Unable to delete Section, please try again',
            error:err.message,
        });
    }
};