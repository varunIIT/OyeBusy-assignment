const express=require('express')
const app=express()
const port=5000
require('./config/db')//db connection
app.set('view engine','ejs')// ejs config

app.use('/',require('./routes/index'))

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})   