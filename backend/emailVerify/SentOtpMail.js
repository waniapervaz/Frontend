import nodemailer from "nodemailer";

import "dotenv/config";

export const SentOtpMail =async(email, otp)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        }
    })

    const mailOption={
        from:process.env.MAIL_USER,
        to:email,
        subject: "PASSWORD RESET OTP",
        html:`<p> your otp for password reset is <b>${otp}</b>
        it is valid for 10 min`
    }
    await transporter.sendMail(mailOption);
}