import express from "express"
// import { addJob,allJobs,singleJob,deleteJob,updateJob } from "../controller/JobsController.js"
import { addJob, allJobs,singleJob,deleteJob,updateJob } from "../controllers/JobsController.js"

export const JobRoutes = express.Router()
JobRoutes.post("/add-job",addJob)
JobRoutes.get("/all-jobs",allJobs)
JobRoutes.get("/single-job",singleJob)
JobRoutes.delete("/delete-job",deleteJob)
JobRoutes.put("/update-job",updateJob)