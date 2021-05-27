const route=require('express').Router()
const apiUserController=require('../controllers/api-users_controller')

//backend get apis
route.get('/user/:uid',apiUserController.getUser)
route.get('/:uid/bands',apiUserController.userBands)

//backend post apis
route.post('/:uid/bands',apiUserController.createBands)
route.post('/',apiUserController.createUser)
route.post('/verify-otp',apiUserController.verifyOtp)

//backend  put apis
route.put('/reset-pswd',apiUserController.resetPass)
route.put('/send-otp',apiUserController.sendOtp)
route.put('/user/:uid',apiUserController.updateProfile)

//backend api to delete a band 
route.delete('/:uid/bands/band/:bid',apiUserController.deleteBand)
module.exports=route