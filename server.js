const express=require('express')
const app=express()
const port=5000
require('./config/db')//db connection

// ejs config
const expressLayouts=require('express-ejs-layouts')
app.set('view engine','ejs')
app.use(expressLayouts)

//body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'/assets'))

app.use('/',require('./routes/index'))

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})   