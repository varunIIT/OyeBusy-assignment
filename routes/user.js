const route=require('express').Router()
const passport = require('passport')
const userController=require('../controllers/users_controller')
//all get routes from frontend
route.get('/sign-in',userController.signIn)
route.get('/logout',userController.logout)
route.get('/bands',passport.checkAuthentication, userController.displayBands)
route.get('/new-band',passport.checkAuthentication,userController.newBand)
route.get('/reset-password',userController.resetPassDisplay)
route.get('/send-otp',userController.sendOtp)
route.get('/verify-otp',userController.verifyOtp)
route.get('/change-password',userController.changePasswordDisplay)
route.get('/profile',passport.checkAuthentication,userController.profileDisplay)

//all post routes form frontend
route.post('/update-profile',passport.checkAuthentication,userController.updateProfile)
route.post('/change-password',userController.changePassword)
route.post('/new-band',passport.checkAuthentication,userController.createNewBand)
route.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/sign-in'}),userController.createSession)
route.post('/sign-up',userController.signUp)

module.exports=route