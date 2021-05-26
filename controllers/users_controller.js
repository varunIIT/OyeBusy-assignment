const User=require('../models/user')
const Band=require('../models/band')
const fetch = require('node-fetch')
const { response } = require('express')
module.exports.signUp=async(req,res)=>{
    fetch('http://localhost:5000/api/users/', {
        method: 'post',
        body:    JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response =>response.json())
    .then(data=>{
      //console.log(data)
      res.redirect('/user/sign-in')
    })
    .catch(err=>{console.log(err)})

}
module.exports.signIn=(req,res)=>{
    res.render('login',{layout:'layoutA'})
}
module.exports.createSession=(req,res)=>{
  res.redirect('/main')
}
module.exports.logout=(req,res)=>{
  req.logout()
  res.redirect('/api/users/login')
}
