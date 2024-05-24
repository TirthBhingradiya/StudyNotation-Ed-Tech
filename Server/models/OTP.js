const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/emailVerficationTemplate");


const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expries:5*60,}

})

// a function -->send emails
  async function sendVerificationEmail(email,otp)
  {

try{
    const mailResponse=await mailSender(email,"verification from studynotation",emailTemplate(otp));
    console.log("Email sent Successfully: ", mailResponse.response);

    
}

catch(error){
    console.log("error occured while sending mails: ", error);
        throw error;
}

  }
OTPSchema.pre("save",async function(next){

    if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
 next();

})
;
  

  const OTP=mongoose.model("OTP",OTPSchema);

  module.exports = OTP;