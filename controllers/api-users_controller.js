const User=require('../models/user')
const Band=require('../models/band')
const sendOtp=require('../config/nodemailer-setup')// function to generate otp and send it by email 

module.exports.userBands=async (req,res)=>{
  try{
    const user=await User.findById(req.params.uid).populate('bands')//finding user and populating its bands feild 
    res.status(200).json(user.bands)

  }
  catch(err){
    console.log(err)
  }
}   
module.exports.createBands=async (req,res)=>{
  try{
    const band=await Band.create(req.body)// creating new band
    const user=await User.findById(req.params.uid)//finding the user who added new band
    user.bands.push(band._id)//pushing a new value band's id to user's bands feild also
    user.save()// saving user document after updating
    res.status(201).json(band)
  }
  catch(err){
    console.log(err)
  }
}
module.exports.getUser=async (req,res)=>{
  try{
    const user=await User.findById(req.params.uid)
    res.status(200).json(user)
  }   
  catch(err){
    console.log(err)
  }
}
module.exports.createUser=async(req,res)=>{
  try{
    if(req.body.password!=req.body.confirmPassword){//matching password and confirm password
        return res.json(null)
    }
    let user=await User.findOne({email:req.body.email})//checking if email is already registered or not
    if(user){
     return res.json(null)
    }
    user=await User.create(req.body)//if everything is fine,creat user with this credentials
    res.status(201).json(user)
  }
  catch(err){
      console.log(err)
  }

}
module.exports.resetPass=async(req,res)=>{
  try{
    if(req.body.password!=req.body.confirmPassword){//matching password and confirm password
      return res.json(null)
    }
      const user=await User.findOne({email:req.body.email})//finding user form db to update his password
      user.password=req.body.password// updating password
      user.save()//saving after updating password
      res.status(200).json(user)
  }
  catch(err){
    console.log(err)
  }
}
module.exports.sendOtp=async(req,res)=>{
  try{
    //console.log(req.body.email)
    const user=await User.findOne({email:req.body.email})//finding registerd email
    if(!user){
      return res.json(null)
    }
    const otp=sendOtp(req.body.email)//function to generate otp and send it by email required form nodemail set-up file
    res.json({otp:otp})//sending same otp as response
  }
  catch(err){
    console.log(err)
  }
}
module.exports.verifyOtp=async(req,res)=>{
  try{
    if(req.body.realOtp==req.body.inputOtp){//verifying otp
      return res.json(true)
    }
    return res.json(false)
  }
  catch(err){
    console.log(err)
  }
}
module.exports.updateProfile=async (req,res)=>{
  try{
    const user=await User.findByIdAndUpdate(req.params.uid,req.body)//updating user profile
    return res.json(user)
  }
  catch(err){
    console.log(err)
  }
}
module.exports.deleteBand=async(req,res)=>{
  try{
    const band=await Band.findByIdAndDelete(req.params.bid)//deleting band by find it by id
    const user=await User.findByIdAndUpdate(req.params.uid,{$pull:{bands:band._id}})//also deleting it form bands array in user 
    res.json({band,user})
  }
  catch(err){
    console.log(err)
  }
}