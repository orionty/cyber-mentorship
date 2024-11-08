import { jobModel } from "../models/Jobs.js"

export const addJob = async (req,res)=>{
    try{
        const job = req.body
        const userModel = new jobModel(job)
        userModel.save()
        res.status(200).json({sucess:true})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }


}

export const allJobs = async(req,res)=>{
    try{
        const allJobs = await jobModel.find({})
        return res.json({success:true,allJobs})



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }
}

export const singleJob = async (req,res)=>{
    try{
        const {id}= req.body
        const oneJob= await jobModel.findById(id)
        return res.status(200).json({success:true,oneJob})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }
}

export const deleteJob = async(req,res)=>{
    try{
        const {id}= req.body
        await jobModel.findByIdAndDelete(id)
        return res.json({success:true})



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }
}

export const updateJob = async(req,res)=>{
    try{
        const {id} = req.body
        delete req.body.id
        const updated = await jobModel.findByIdAndUpdate(id,req.body, {new:true})
        return res.json({success:true,updated})



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }
}