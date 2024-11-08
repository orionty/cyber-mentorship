import express from "express"
// import { addUser,allUsers,singleUser, deleteUser,updateUser } from "../controller/userController.js"
import { addUser,allUsers,singleUser,deleteUser,updateUser } from "../controllers/userController.js"

export const userRouter = express.Router()

userRouter.post("/add-user",addUser)
userRouter.get("/all-user",allUsers)
userRouter.get("/single-user",singleUser)
userRouter.delete("/delete-user",deleteUser)
userRouter.put("/update-user",updateUser)
