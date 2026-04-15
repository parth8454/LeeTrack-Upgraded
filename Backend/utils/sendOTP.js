const nodemailer = require('nodemailer');

const sendOTP = async(email,otp) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        secure:true,
        host:'smtp.gmail.com',
        port:465,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,            
        }
    });
const mailOptions = {
    to: email,
    subject: 'Leetrack Verification Code',
    html: `Bhai, tera OTP ye raha: ${otp}. Jaldi daal de!`
    };

    return await transporter.sendMail(mailOptions);
};

const send_PassRecovery_OTP = async(email,otp) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        secure:false,
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,            
        }
    });
const mailOptions = {
    to: email,
    subject: 'LeeTrack Password Recovery',
    html: `Bhai, tera OTP ye raha: ${otp}. Jaldi daal de!`
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = {sendOTP,send_PassRecovery_OTP};