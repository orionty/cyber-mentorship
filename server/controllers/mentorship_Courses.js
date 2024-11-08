import { mentorShipSchema } from "../models/mentorShipCourses.js";


export const addMentorshipCourses = async (req,res)=>{
    try{
        const mentorShipDetails = req.body
       
        const newCourse = new mentorShipSchema(mentorShipDetails)
        newCourse.save()
        return res.status(200).json({success:true,message:"Added successfully"}) 

        
        




    }catch(error){
        console.log(error)
        return res.json({message:"error", success:false})
    }



}

export const allCourses = async(req,res)=>{
    try{
        const allMentorshipCourses = await mentorShipSchema.find({})
        return res.json({allMentorshipCourses,success:true})



    }catch(error){
        console.log(error)
        res.status(500).json({sucess:false})
    }
}

export const singleCourse = async(req,res)=>{
    try{
        const {id}= req.body
        const singleCourse = await mentorShipSchema.findById(id)
        return res.json({success:true,singleCourse})




    }catch(error){
        console.log(error)
        return res.statuss(500).json({succes:false})
    }
}

export const deleteCourse = async(req,res)=>{
    try{
        const {id}= req.body
        const deleteAction = await mentorShipSchema.findByIdAndDelete(id)
        if(deleteAction){
            return res.json({success:true})
        }



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const updateCourse = async(req,res)=>{
    try{
        const {id}= req.body
        delete req.body.id
        const updated = await mentorShipSchema.findByIdAndUpdate(id,req.body,{new:true})
        if(updated){
            return res.json({success:true,updated})
        }


    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}
