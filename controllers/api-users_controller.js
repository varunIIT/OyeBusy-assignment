const User=require('../models/user')
const Band=require('../models/band')

module.exports.userBands=async (req,res)=>{
  try{
    const user=await User.findById(req.params.uid).populate('bands')
    res.status(200).json(user.bands)

  }
  catch(err){
    console.log(err)
  }
}   
module.exports.createBands=async (req,res)=>{
  try{
    const band=await Band.create(req.body)
    const user=await User.findById(req.params.uid)
    user.bands.push(band._id)
    user.save()
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
    if(req.body.password!=req.body.confirmPassword){
        return res.json(null)
    }
    let user=await User.findOne({email:req.body.email})
    if(user){
     return res.json(null)
    }
    user=await User.create(req.body)
    res.status(201).json(user)
  }
  catch(err){
      console.log(err)
  }

}
