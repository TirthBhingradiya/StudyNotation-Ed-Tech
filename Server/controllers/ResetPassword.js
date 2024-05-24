const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto = require("crypto");


//reset password token
exports.resetPasswordToken=async(req,res) =>{
    try{

    //get email from req body
    const email=req.body.email;

    //check user for this email,email verfication
    const user=await User.findOne({email:email});
    if(!user)
    {
        return res.status({
            success:false,
            message:"youe email is not registerd with us"
        })
    }

    //generate token
    const token = crypto.randomBytes(20).toString("hex");
    //update user by adding token and expiration time

        const updatedDetails=await User.findOneAndUpdate({email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+ 5*60*1000,

            },
            {new:true});
            console.log("DETAILS", updatedDetails);

            //create url
            const url=`http://localhost:3000/update-password/${token}`
            //send email containing the url
            await mailSender(email,"password reset link",
            `password reset link:${url}`);


            //reset response
            return res.json({
                success:true,
                message:"email sent SUCCESSfully please check email and change password"
            });
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong while sending response pwd mail'
        })
    }
}


//reset password
exports.resetPassword=async(req,res) =>{
    try{
        const{password,confirmPassword,token}=req.body;
        //validation
        if(confirmPassword!==password){
            return res.json({
                success:false,
                message:"password does not match"
            });
        }
        //get userdetails from db using token
        const userDetails=await User.findOne({token:token});
        //if no entry -invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid"
            });

        }
        //tken time check
        if(userDetails.resetPasswordExpires  > Date.now()){
            return res.status(403).json({
                success:false,
                message:"Token is exprised ,please regenerate your token"
            });
        }
        //hash pwd
		const encryptedPassword = await bcrypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:encryptedPassword},
            {new:true}
        );
    
        res.json({
			success: true,
			message: `Password Reset Successful`,
		});
    }
    catch(error) {
        console.log(error);
        return res.json({
            error:error.message,
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        });
    }
};