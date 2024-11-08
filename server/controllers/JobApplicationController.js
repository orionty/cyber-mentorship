import { applications_Model } from "../models/jobApplication.js";



export const JobApplication = async (req,res)=>{

    try{
        console.log(req.files)
        const {Job_Id,firstName,lastName,email,phoneNumber,experience}= req.body
        const applications = await new applications_Model({Job_Id,firstName,lastName,email,phoneNumber,experience,CV:req.files.CV[0].filename,Cover_Letter:req.files.Cover_Letter[0].filename})
        applications.save()
        return res.status(200).json({success:true})



    }catch(error){
        console.log(error)
        return res.json({error})
    }
}