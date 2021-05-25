const route=require('express').Router()
const passport = require('passport')
const userController=require('../controllers/users_controller')

route.post('/create',userController.create)
route.get('/login',userController.login)
route.post('/create-session',passport.authenticate('local',{failureRedirect:'/api/users/login'}),userController.createSession)
route.get('/logout',userController.logout)

module.exports=route