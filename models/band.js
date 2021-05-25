const mongoose=require('mongoose')
const Schema=mongoose.Schema

const bandSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    origin:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Band=mongoose.model('Band',bandSchema)
module.exports=Band