import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userId = user?._id;
        
    if (!userId) {
      return new NextResponse("Unauthorized access denied", { status: 401 });
    }

    const { isCompleted } = await req.json();

    const chapterProgress = await axios.post(
      `${process.env.BACK_END_URL}/api/chapters/${params.chapterId}/course/${params.courseId}/progress`,
      { userId, isCompleted: isCompleted }
    );

    return NextResponse.json(chapterProgress.data)
  } catch (error) {
    console.log("coursesid chapterid progress", error);
    return new NextResponse("internal error api chapterId progress", {
      status: 500,
    });
  }
}
