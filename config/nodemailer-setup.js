var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '2019ucs0103@iitjammu.ac.in',//sender email
        pass: require('./pass').pass//sender pass 
    }
});
const genOtp=()=>{
    let otp=parseInt(Math.random()*10)+4000 //random otp generate
    return otp;
}
const sendOtp = (target) => {

    var mailOptions = {
        from: '2019ucs0103@iitjammu.ac.in',
        to: target,// taret person whom otp has to be send
        subject: 'My Bands-Reset Password OTP',
        text: JSON.stringify(genOtp())//otp
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