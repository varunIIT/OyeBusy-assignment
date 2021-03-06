const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User=require('../models/user')

passport.use(new LocalStrategy({
    usernameField: 'email',//username feild as email
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {//if no user with this email exists
                return done(null, false);
            }
            if (user.password != password) {//matching password
                return done(null, false);
            }
            return done(null, user);// if everything is correct
        });
    }
));
passport.serializeUser(function (user, done) {// storing userId to express session cookie
    //console.log(user)
    done(null, user._id)
})

passport.deserializeUser(async function (userId, done){// populating user from userId and make is as property 'req.user'
    try {
        const user = await User.findById(userId)
        if (user)
            return done(null, user)
        else
            throw new Error('Could not deserialise User')
    } catch (err) {
        done(err)
    }
})
passport.checkAuthentication=(req,res,next)=>{//protecting routes if user is not signed in
    if(req.isAuthenticated()){
        return next()
    }
    
    res.redirect('/user/sign-in')// redirecting to sign-in page if user is not authenticated and trying to request other endpoints
    
}
passport.setAuthenticatedUser=(req,res,next)=>{
    //console.log(req.session)
    res.locals.email=''
    if(req.isAuthenticated()){
        res.locals.user=req.user//setting res.locals for access of user data for views
    }
    res.locals.otpStatus='Send OTP'
    if(req.session.otp){
        res.locals.otpBool=1;
        res.locals.otpStatus='Verify-OTP'
    }
    if(req.session.email){
        res.locals.email=req.session.email
        req.session.fixedEmail=req.session.email
        req.session.email=null
    }
    next()
}