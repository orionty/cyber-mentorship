import express from "express"
// import { JobApplication } from "../controller/JobApplicationController.js"
import { uploadMultiple } from "../middleware/fileUpload.js"
import { JobApplication } from "../controllers/JobApplicationController.js"



export const applicationRouter = express.Router()

applicationRouter.post("/application",uploadMultiple,JobApplication)
