import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    USN:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","clubHead"],
        required:true,
        default:"student"
    },
    profile:{
        Name:{type:String},
        year:{type:Number},
        Branch:{type:String}
    }
},{timestamps:true})


const User = mongoose.model('User',userSchema)

export default User