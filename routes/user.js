const route=require('express').Router()
const passport = require('passport')
const userController=require('../controllers/users_controller')

route.post('/sign-up',userController.signUp)
route.get('/sign-in',userController.signIn)
route.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/login'}),userController.createSession)
route.get('/logout',userController.logout)
route.get('/bands',passport.checkAuthentication, userController.displayBands)

module.exports=route