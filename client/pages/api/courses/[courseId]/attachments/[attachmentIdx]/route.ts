import axios from "axios"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params } : { params : { courseId : string, attachmentIdx : number}}){
    try {
         const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userId = user?._id;
        
      
        if(!userId){
            return new NextResponse("Unauthorized access denied!", {status : 401})
        }

        const {courseId, attachmentIdx} = params
        const course = await axios.delete(`${process.env.BACK_END_URL}/api/courses/${courseId}/attachments/${attachmentIdx}`)

        return new NextResponse(course.data)

    } catch (error) {
        console.log("delet attachment url", error)
        return new NextResponse("Internal Error", {status : 500} )
    }
}