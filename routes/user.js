const route=require('express').Router()
const passport = require('passport')
const userController=require('../controllers/users_controller')

route.post('/sign-up',userController.signUp)
route.get('/sign-in',userController.signIn)
route.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/login'}),userController.createSession)
route.get('/logout',userController.logout)
route.get('/bands',passport.checkAuthentication, userController.displayBands)
route.get('/new-band',passport.checkAuthentication,userController.newBand)
route.post('/new-band',passport.checkAuthentication,userController.createNewBand)
module.exports=route