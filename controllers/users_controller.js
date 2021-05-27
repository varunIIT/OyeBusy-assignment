const fetch = require('node-fetch')

module.exports.signUp=async(req,res)=>{
    fetch('http://localhost:5000/api/users/', {//request to create new user
        method: 'post',
        body:    JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response =>response.json())
    .then(data=>{
      //console.log(data)
      if(!data){//if invalid credentials
        res.redirect('back')
      }
      res.redirect('/user/sign-in')//successfully created user
    })
    .catch(err=>{console.log(err)})

}
module.exports.signIn=(req,res)=>{
    res.render('login',{layout:'layoutA'})//render login page
}
module.exports.createSession=(req,res)=>{
  res.redirect('/user/bands')
}
module.exports.logout=(req,res)=>{
  req.logout()//logging out user
  res.redirect('/user/sign-in')//and redirecting it to login page
}
module.exports.displayBands=(req,res)=>{
  fetch(`http://localhost:5000/api/users/${req.user.id}/bands`, {//geting all bands of a user
      method: 'get',
  })
  .then(response =>response.json())
  .then(data=>{
    //console.log(data)
    res.render('bands',{layout:'layoutB',bands:data})//rendering bands of user by passing band array to ejs
  })
  .catch(err=>{console.log(err)})
}
module.exports.newBand=(req,res)=>{
  res.render('add-band',{layout:'layoutB'})
}
module.exports.createNewBand=(req,res)=>{
  fetch(`http://localhost:5000/api/users/${req.user.id}/bands`, {//req to create a new band
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
  fetch(`http://localhost:5000/api/users/send-otp`, {// req to send otp
      method: 'put',
      body:JSON.stringify(req.query),
      headers: { 'Content-Type': 'application/json' },
  })
  .then(response =>response.json())
  .then(data=>{
    //console.log(data)
    if(!data){
      return res.redirect('/user/reset-password')//if email is not registered
    }
    //successfully sent otp
    req.session.email=req.query.email//storing email as session cookie
    req.session.otp=data.otp//storing otp as session cookie
    res.redirect('/user/reset-password')
  })
  .catch(err=>{console.log(err)})
}
module.exports.verifyOtp=(req,res)=>{
  const otpMatch={realOtp:req.session.otp,inputOtp:req.query.otp}
  fetch(`http://localhost:5000/api/users/verify-otp`, {//req to veryify otp
      method: 'post',
      body:JSON.stringify(otpMatch),
      headers: { 'Content-Type': 'application/json' },
  })
  .then(response =>response.json())
  .then(data=>{
    //console.log(data)
    if(!data){// if otp is not matched
      req.session.otp=null//destroying otp cookie
      return res.redirect('/user/reset-password')// redirect back to reset password page
    }
    req.session.otp=null
    res.redirect('/user/change-password')
  })
  .catch(err=>{console.log(err)})
}
module.exports.changePasswordDisplay=(req,res)=>{
  res.render('change-password',{layout:'layoutA',fixedEmail:req.session.fixedEmail})// render change password page
}
module.exports.changePassword=(req,res)=>{
  fetch(`http://localhost:5000/api/users/reset-pswd `, {//updating password
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
    res.redirect('/user/sign-in')// redirecting back to login page after successfully updating password
  })
  .catch(err=>{console.log(err)})
}
module.exports.profileDisplay=(req,res)=>{
  res.render('profile',{layout:'layoutB'})//render profile page
}
module.exports.updateProfile=(req,res)=>{
  fetch(`http://localhost:5000/api/users/user/${req.user.id}`, {//req to update profile
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
    res.redirect('/user/bands')// redirecting back to bands page of user
  })
  .catch(err=>{console.log(err)})
}