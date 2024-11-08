import mongoose from "mongoose"

const users = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    Role:{
        type:String
    },
    initial_password:{
        type:String
    }
},{timestamps:true})

export const userSchema = mongoose.model("user",users)