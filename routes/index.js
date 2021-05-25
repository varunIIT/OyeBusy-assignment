const route=require('express').Router()
const homeController=require('../controllers/home_controller')

route.get('/',homeController.home)
route.use('/api/users',require('./users'))
module.exports=route