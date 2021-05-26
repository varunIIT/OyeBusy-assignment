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