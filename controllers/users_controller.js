const User=require('../models/user')
const Band=require('../models/band')
module.exports.create=async(req,res)=>{
  try{
    if(req.body.password!=req.body.confirmPassword){
        return res.redirect('back')
    }
    let user=await User.findOne({email:req.body.email})
    if(user){
     return res.redirect('back')
    }
    user=await User.create(req.body)
    res.redirect('/api/users/login')
  }
  catch(err){
      console.log(err)
  }

}
module.exports.login=(req,res)=>{
    res.render('login',{layout:'layoutA'})
}
module.exports.createSession=(req,res)=>{
  res.redirect('/main')
}
module.exports.logout=(req,res)=>{
  req.logout()
  res.redirect('/api/users/login')
}
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