const route=require('express').Router()
const passport = require('passport')
const mainController=require('./../controllers/main_controller')
route.get('/main',passport.checkAuthentication, mainController.display)
module.exports=route