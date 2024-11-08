import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    title:{
        type:String
    },
    Job_Description:{
        type:String
    },
    Location:{
        type:String
    },
    Requirements:{
        type:Array
    },
    Employment_Type:{
        type:String
    },
    Salary_Range:{
        type: String
    },
    Application_Deadline:{
        type: Date
    },
    Applicant_Details:{
        type: String
    }

})

export const jobModel = mongoose.model("job", jobSchema)


