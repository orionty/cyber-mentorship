import express from "express"
// import { addMentorshipCourses,allCourses,singleCourse,deleteCourse,updateCourse } from "../controller/mentorship_Courses.js"
import { addMentorshipCourses,allCourses,singleCourse,deleteCourse,updateCourse } from "../controllers/mentorship_Courses.js"

export const mentorShipRoutes= express.Router()

mentorShipRoutes.post("/add-course",addMentorshipCourses)
mentorShipRoutes.get("/all-courses",allCourses)
mentorShipRoutes.get("/course-information",singleCourse)
mentorShipRoutes.delete("/delete-course",deleteCourse)
mentorShipRoutes.put("/update-course",updateCourse)