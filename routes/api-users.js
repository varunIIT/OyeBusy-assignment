const route=require('express').Router()
const apiUserController=require('../controllers/api-users_controller')

route.get('/user/:uid',apiUserController.getUser)
route.get('/:uid/bands',apiUserController.userBands)

route.post('/:uid/bands',apiUserController.createBands)
route.post('/',apiUserController.createUser)

module.exports=route