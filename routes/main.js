const route=require('express').Router()
const mainController=require('./../controllers/main_controller')
route.get('/main',mainController.display)
module.exports=route