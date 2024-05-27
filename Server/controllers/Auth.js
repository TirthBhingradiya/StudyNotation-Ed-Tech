const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require("../mail/passwordUpdate");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");
require("dotenv").config();

//send otp

 
//sign up

exports.signUp=async(req,res) =>{
    try{


        //data fetch from request ki body

        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        }=req.body;

        //validate karo
        if(!firstName || !lastName || !email || !password
            ||!confirmPassword || !otp|| !accountType){
                return res.status(401)({
                    success:false,
                    message:"All fields are required"
                })
            }
            // password match karo
            if(password!==confirmPassword){
                return req.status(400).json({
                    success:false,
                    message:'user is already registered',
                });
            }

            const existingUser = await User.findOne({email});
            if(existingUser) {
                return res.status(400).json({
                    success:false,
                    message:'User is already registered',
                });
            }
    
            //find one most recent otp stored for the user
            const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
            console.log(recentOtp);
            //validate otp

            if(recentOtp.length===0){
                //otp not found
                return res.status(400).json({
                    success:false,
                    message:"otp found",
                })
            }
            else if(otp!==recentOtp[0].otp){
                return res.status(400).json({
                    success:false,
                    message:"invalid otp",
                });
            }

            //hash password

            const hashPassword=await bcrypt.hash(password,10);

            	// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

            //entry create in db
            const profileDetails=await Profile.create({
                gender:null,
                dateofBirth:null,
                contactNo:null,
                about:null,
                contactNumber:null,
            });

            const user=await User.create({
                firstName,
                lastName,
                email,
                contactNumber,
                password:hashPassword,
                accountType:accountType,
                approved: approved,
                additionalDetails:profileDetails._id,
                image:`https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,

            })
	    console.log(user);
            return res.status(200).json({
                success:true,
                message:'User is registered Successfully',
                user,
            });
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"User cannot be registrered. Please try again",
            })
    }
}

//login
exports.login=async(req,res) =>{

    try{
//get data from req body

const{email,password}=req.body;
//validation data
if(!email || !password){
    return res.status(400).json({
  
        success:false,
        message:'All fields are required ,please try again'
    });
}

//user check exist or not
const user=await User.findOne({email}).populate("additionalDetails");
if(!user){
    return res.status(401).json({
        success:false,
        message:"user is not registered ,please sign up first"
    });
}

//generate jwt after ,password matching
if(await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
    user.token=token;

  
    
    console.log(token);
    user.password=undefined;

    //create cookie and send reponse
    const options={
        expires:new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true,
    };
    res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user,
        message:'Logged in successfully',
        
    })
    
}

else{
    return res.status(401).json({
        success:false,
        message:"password is incorrect"
    });
}
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again',
        })
}
}


//change password code baki hai


exports.changePassword =async(req,res)=>{

    try{

        //get user data from server
        const userDetails=await User.findById(req.user.id);

        //get old password ,new password confirm password
        const{oldPassword,newPassword,confirmNewPassword}=req.body;

        //validate old password
        const isPasswordMatch=await bcrypt.compare(oldPassword,userDetails.password);

        if(!isPasswordMatch){
            //IF old password does not match return a 401(unauthorized) error
             return res
             .status(401).json({
                success:false,message:"The Password is incorrect"
             });
        }
        
        //match new password and confirm pasword
        if(newPassword!==confirmNewPassword){
            			// If new password and confirm new password do not match, return a 400 (Bad Request) error
 
                         return res.status(400).json({
                            success:false,
                            message:"The password and confirm password does not match "
                         });
        }

        //upadated pasword

        const encryptedPassword=await bcrypt.hash(newPassword,10);
        const updatedUserDetails=await User.findByIdAndUpdate(
            req.user.id,{password:encryptedPassword},{new:true}
        );

        //send notification email

        try{
            const emailResponse=await mailSender(updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`

            ));
            console.log("Email sent successfully:", emailResponse.response);

        }
        catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }
        // Return success response
		return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
} catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
    });
}
};



exports.sendOTP=async(req,res) =>{
    try{
        //fetch email from request body

        const {email}=req.body;
console.log("finally yaha aa gye hai");
        //check if user already exist
        const checkUserPresent=await User.findOne({email});

        //if user already exist then return a message 
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"user is already exist" 
            });
        }


        //generate otp
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP genretaed",otp);


        //check unique otp or not
        const result= await OTP.findOne({ otp:otp });
        console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
            
            });
        }
            const otpPayload={email,otp};

            //create entry for otp
            const otpBody=await OTP.create(otpPayload);
            console.log("otpBody",otpBody);


//return response successful
res.status(200).json({
    success:true,
    message:'otp sent successfully',
    otp,
})
        }
    
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
 };
