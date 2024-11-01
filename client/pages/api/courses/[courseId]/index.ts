import Mux from "@mux/mux-node"
import axios from "axios"
import { NextResponse } from "next/server"

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!
)

export default async function DELETE(req: Request, { params }: { params: { courseId: string}}) {
    try {
        // Check auth token from headers instead of Clerk
        const token = req.headers.get('Authorization');
        if (!token) {
            return new NextResponse("Unauthorized access denied!", { status: 401 });
        }

        const courseChapters: {_id: string, assetId: string}[] = await (
            await axios.get(
                `${process.env.BACK_END_URL}/api/chapters/${params.courseId}`,
                {
                    headers: { Authorization: token }
                }
            )
        ).data;

        if(!courseChapters) {
            return new NextResponse("Not found", { status: 404 });
        }

        for(const chapter of courseChapters) {
            if(chapter.assetId) {
               await Video.Assets.del(chapter.assetId);
            }
            await axios.delete(
                `${process.env.BACK_END_URL}/api/chapters/${chapter._id}/course/${params.courseId}`,
                {
                    headers: { Authorization: token }
                }
            );
        }

        await axios.delete(
            `${process.env.BACK_END_URL}/api/courses/${params.courseId}`,
            {
                headers: { Authorization: token }
            }
        );

        return new NextResponse("This course successfully deleted");
    } catch (error) {
        console.log("courseId delete", error);
        return new NextResponse("Internal server error courseId delete", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string }}
) {
    try {
        // Check auth token from headers instead of Clerk
        const token = req.headers.get('Authorization');
        if (!token) {
            return new NextResponse("Unauthorized user", { status: 401 });
        }

        const { courseId } = params;
        const values = await req.json();

        // Get userId from the token or request body
        const userStr = req.headers.get('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userId = user?._id;

        const course = await axios.patch(
            `${process.env.BACK_END_URL}/api/courses/${courseId}`,
            { ...values, userId },
            {
                headers: { Authorization: token }
            }
        );

        return new NextResponse(course.data);
    } catch (error) {
        console.log("error at api course courseId", error);
        return new NextResponse("Internal error at course Id ", { status: 500 });
    }
}