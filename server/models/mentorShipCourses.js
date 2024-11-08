import mongoose from "mongoose";


const mentorShipCourse = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    tutor:{
        type:String,
        required:true
    },
    date_of_Mentorship:{
        type: Date,
        required:true
    },
    time:{
        type: String,
        required:true

    }




},{timestamps:true})


export const mentorShipSchema = mongoose.model("mentorship_course",mentorShipCourse)