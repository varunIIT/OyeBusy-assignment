var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '2019ucs0103@iitjammu.ac.in',
        pass: '31-11-2000'
    }
});
const genOtp=()=>{
    let otp=parseInt(Math.random()*10)+4000
    return otp;
}
const sendOtp = (target) => {

    var mailOptions = {
        from: '2019ucs0103@iitjammu.ac.in',
        to: target,
        subject: 'My Bands-Reset Password OTP',
        text: JSON.stringify(genOtp())
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return mailOptions.text
}
module.exports=sendOtp