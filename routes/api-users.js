const route=require('express').Router()
const apiUserController=require('../controllers/api-users_controller')

route.get('/user/:uid',apiUserController.getUser)
route.get('/:uid/bands',apiUserController.userBands)

route.post('/:uid/bands',apiUserController.createBands)
route.post('/',apiUserController.createUser)
route.post('/verify-otp',apiUserController.verifyOtp)

route.put('/reset-pswd',apiUserController.resetPass)
route.put('/send-otp',apiUserController.sendOtp)
module.exports=route