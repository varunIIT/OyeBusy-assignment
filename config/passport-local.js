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