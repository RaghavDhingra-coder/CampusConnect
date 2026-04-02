import mongoose  from "mongoose";
import Registration from "./Registeration.model.js";

const eventSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    fee:{
        type:String,
        required:true
    },
    club:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Club",
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        red:"User",
        required:true
    },
    RegisteredUsers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Registration'
    }]
},{timeStamps:true})


const Event = mongoose.model("Event",eventSchema)

export default Event