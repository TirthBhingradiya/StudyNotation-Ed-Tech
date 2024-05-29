const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailsender=require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mail/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/paymentSuccessEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress=require("../models/CourseProgress")


//capture the payment and initiate the razorpay order

exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try{
           
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Could not Initiate Order"});
    }

}

exports.verifyPayment = async(req, res) => {
    console.log("hey dude");
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(400).json({success:"false", message:"Payment Failed"});

}


const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }
        const courseProgress = await CourseProgress.create({
            courseID:courseId,
            userId:userId,
            completedVideos: [],
        })

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress: courseProgress._id,

            }},{new:true})
            
        ///bachhe ko mail send kardo
        const emailResponse = await mailsender(
            enrollStudents.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailsender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}
console.log("payment will be receieved");
 
// exports.capturePayment=async(req,res) =>{
//     //get courseId and userid
//     const{course_id}=req.body;
//     const userId=req.user.id;
//     //validation
//     //valid courseId
//     if(!course_id){
//         return res.json({
//             success:false,
//             message:"please select a vlaid course id",
//         })
//     };

//     //valid couserdetails

//     let course;
//     try{
//         course=await Course.findById(course_id);
//         if(!course){
//             return res.json({
//                 success:false,
//                 message:"could not find the course",
//             });
//         }

//         //user already pay for the same course
//         const uid=new mongoose.Types.ObjectId(userId);
//         //ye user id hame string format mili hai is liye ham ise object form me translate kar rahe hai
//         if(course.studentEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"Student is already enrolled",
//             });
//         }
//     }
//     catch(error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }

//     //order create


//     const amount=course.price;
//     const currency="INR";

//     const options={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId,
//         }
        
        
//     };
//     try{
//         //initate the payment using razorpay
//         const paymentResponse=await instance.orders.create(options);
//         console.log(paymentResponse);
//         //return a reponse
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });
//     }
//     catch(error){
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order"
//         });
//     }
// };

// //verify signature of razorpay and server
// exports.verifySignature=async(req,res)=>{
//     const webhookSecret="12345678";
//     const signature=req.headers["x-razorpay-signature"];
//     const shasum=crypto.createhmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");


//     if(signature==digest){
//         console.log("payment authorised");
//         const{courseId,userId}=req.body.payload.payment.entity.notes;

//         try{
//             //fulfill the section
//             //find the course and enroll the student in it
//             const enrolledCourse=await Course .findOneAndUpdate({_id: courseId},
//                                                                  {$push:{studentsEnrolled:userId}},
//                                                                  {new:true},);
//                                                                  if(!enrolledCourse) {
//                                                                     return res.status(500).json({
//                                                                         success:false,
//                                                                         message:'Course not Found',
//                                                                     }   );
                                                                 
//                                                                 }
//                            console.log(enrolledCourse);
                           
//                            //find the student andded the course to their list enrolled courses me
//                            const enrolledStudent=await User.findOneAndUpdate({_id:userId},
//                                                                             {$push:{courses:courseId}},{new:true},
//                            );

//                     console.log(enrolledStudent);

//                     const emailresponse=await mailsender(
//                                        enrolledStudent.email,
//                                        "congratulations from Codehelp",
//                                        "Congrulations ,you are onboarderd into new codehelp Course"
//                     );
//                     console.log(emailresponse);
//                     return res.status(200).json({
//                         success:false,
//                         message:"Signature Verified and COurse Added"

//                     });

//                }
//                catch(error) {
//                 console.log(error);
//                 return res.status(500).json({
//                     success:false,
//                     message:error.message,
//                 });
//             }
//         }
//         else {
//             return res.status(400).json({
//                 success:false,
//                 message:'Invalid request',
//             });
//         }
//     }
