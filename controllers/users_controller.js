const User=require('../models/user')
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
    res.render('login')
}