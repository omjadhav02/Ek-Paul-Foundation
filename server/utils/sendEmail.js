import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        await transporter.sendMail({
            from: `"Ek Paul Foundation" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        })
    } catch (error) {
        console.log("Error in sendEmail utils : ",error);
    }
}
