const route=require('express').Router()
const homeController=require('../controllers/home_controller')

route.get('/',homeController.home)
route.use('/',require('./main'))
route.use('/user',require('./user'))
route.use('/api/users',require('./api-users'))

module.exports=route