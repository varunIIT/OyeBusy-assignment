const fetch = require('node-fetch')
module.exports.signUp=async(req,res)=>{
    fetch('http://localhost:5000/api/users/', {
        method: 'post',
        body:    JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response =>response.json())
    .then(data=>{
      //console.log(data)
      if(!data){
        res.redirect('back')
      }
      res.redirect('/user/sign-in')
    })
    .catch(err=>{console.log(err)})

}
module.exports.signIn=(req,res)=>{
    res.render('login',{layout:'layoutA'})
}
module.exports.createSession=(req,res)=>{
  res.redirect('/user/bands')
}
module.exports.logout=(req,res)=>{
  req.logout()
  res.redirect('/user/sign-in')
}
module.exports.displayBands=(req,res)=>{
  fetch(`http://localhost:5000/api/users/${req.user.id}/bands`, {
      method: 'get',
  })
  .then(response =>response.json())
  .then(data=>{
    //console.log(data)
    res.render('bands',{layout:'layoutB',bands:data})
  })
  .catch(err=>{console.log(err)})
}
module.exports.newBand=(req,res)=>{
  res.render('add-band',{layout:'layoutB'})
}
module.exports.createNewBand=(req,res)=>{
  fetch(`http://localhost:5000/api/users/${req.user.id}/bands`, {
      method: 'post',
      body:JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
  })
  .then(response =>response.json())
  .then(data=>{
    //console.log(data)
    res.redirect('/user/bands')
  })
  .catch(err=>{console.log(err)})
}
module.exports.resetPassDisplay=(req,res)=>{
  res.render('reset-pass',{layout:'layoutA'})
}
module.exports.sendOtp=(req,res)=>{
  //console.log(req.query)
  fetch(`http://localhost:5000/api/users/send-otp`, {
      method: 'put',
      body:JSON.stringify(req.query),
      headers: { 'Content-Type': 'application/json' },
  })
  .then(response =>response.json())
  .then(data=>{
    //console.log(data)
    if(!data){
      return res.redirect('/user/reset-password')
    }
    req.session.email=req.query.email
    req.session.otp=data.otp
    res.redirect('/user/reset-password')
  })
  .catch(err=>{console.log(err)})
}
module.exports.verifyOtp=(req,res)=>{
  const otpMatch={realOtp:req.session.otp,inputOtp:req.query.otp}
  fetch(`http://localhost:5000/api/users/verify-otp`, {
      method: 'post',
      body:JSON.stringify(otpMatch),
      headers: { 'Content-Type': 'application/json' },
  })
  .then(response =>response.json())
  .then(data=>{
    //console.log(data)
    if(!data){
      req.session.otp=null
      return res.redirect('/user/reset-password')
    }
    req.session.otp=null
    res.redirect('/user/change-password')
  })
  .catch(err=>{console.log(err)})
}
module.exports.changePasswordDisplay=(req,res)=>{
  res.render('change-password',{layout:'layoutA',fixedEmail:req.session.fixedEmail})
}
module.exports.changePassword=(req,res)=>{
  fetch(`http://localhost:5000/api/users/reset-pswd `, {
      method: 'put',
      body:JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
  })
  .then(response =>response.json())
  .then(data=>{
    //console.log(data)
    if(!data){
      return res.redirect('/user/change-password')
    }
    res.redirect('/user/sign-in')
  })
  .catch(err=>{console.log(err)})
}
module.exports.profileDisplay=(req,res)=>{
  res.render('profile',{layout:'layoutB'})
}
module.exports.updateProfile=(req,res)=>{
  fetch(`http://localhost:5000/api/users/user/${req.user.id}`, {
      method: 'put',
      body:JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
  })
  .then(response =>response.json())
  .then(data=>{
    //console.log(data)
    if(!data){
     return res.json(null)
    }
    res.redirect('/user/bands')
  })
  .catch(err=>{console.log(err)})
}