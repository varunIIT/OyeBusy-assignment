const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    organisation:{
        type:String,
    },
    dob:{
        type:Date,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bands:[{
        type:mongoose.Types.ObjectId,
        ref:'Band'//relation to Band model
    }]
},{timestamps:true})
const User=mongoose.model('User',userSchema)
module.exports=User