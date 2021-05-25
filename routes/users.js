const route=require('express').Router()
const userController=require('../controllers/users_controller')
route.post('/create',userController.create)

module.exports=route