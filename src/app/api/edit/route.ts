import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export async function POST(request:Request){
  const formData = await request.formData();
  const id = formData.get("id");
  const title = formData.get("title");
  const content = formData.get("content")
  const db = (await connectDB).db('board')
  let updateResult
  if (typeof id == 'string') {
    updateResult = await db.collection('post').updateOne({ _id: new ObjectId(id) }, { $set: { title, content } });
    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "post 업데이트에러" }, { status: 200 });
    }
    return Response.redirect('http://localhost:3000/list')
  }
}





