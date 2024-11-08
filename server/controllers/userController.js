import { userSchema } from "../models/userManagement.js";
import bcrypt from "bcryptjs"



export const addUser = async(req,res)=>{
    try{
        const {name,email,Role,initial_Password}=req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(initial_Password,10)
        const newUser = new userSchema({name,email,Role,initial_password:hashedPassword})
        newUser.save()
        return res.json({success:true})



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }

}

export const allUsers = async(req,res)=>{
    try{
        const allUsers= await userSchema.find({})
        return res.json({success:true,allUsers})


    }catch(error){
        console.log(error)
        return res.status(500).json({success:true})
    }
}
export const singleUser = async(req,res)=>{

    try{
        const {id}= req.body
        const singleUser= await userSchema.findById(id)
        return res.json({success:true,singleUser})



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }
}

export const deleteUser = async(req,res)=>{
    try{
        const {id} = req.body
        await userSchema.findByIdAndDelete(id)
        return res.status(200).json({success:true})


    }catch(error){
        console.log(error)
        return res.status(500).json({success:true})
    }

}

export const updateUser = async(req,res)=>{

    try{
        const {id}= req.body
        delete req.body.id
        const updated = await userSchema.findByIdAndUpdate(id,req.body, {new:true})
        return res.json({success:true, updated})
        


    }catch(error){
        console.log(error)
        return res.status(500).json({success:true})

    }
}



