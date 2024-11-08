import mongoose from "mongoose"

const applications = new mongoose.Schema({
    Job_Id:{
        type: String
    },
    firstName:{
        type:String
    },
    lastName:{
        type: String
    },
    phoneNumber:{
        type:String
    },
    email:{
        type: String
    },
    experience:{
        type:Number
    },
    Cover_Letter:{
        type: String
    },
    CV:{
        type: String
    },
    Salary_Range:{
        type: String
    },
    earliest_Start_Date:{
        type: Date
    }


},{timestamps: true})



export const applications_Model = mongoose.model("applications",applications)