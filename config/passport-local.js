const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User=require('../models/user')

passport.use(new LocalStrategy({
    usernameField: 'email',
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }
            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
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
    if(req.isAuthenticated()){
        res.locals.user=req.user//setting res.locals for access of user data for views
    }
    next()
}