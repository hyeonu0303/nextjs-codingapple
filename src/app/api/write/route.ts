import { redirect } from "next/navigation";
import { connectDB } from "../../../../util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request:Request){
  let session = await getServerSession(authOptions) //이런건 클라이언트가 보내면위험함

  if(session){
    let userEmail = session.user?.email
    const formData = await request.formData()
    const title = formData.get('title')
    const content = formData.get('content')
    console.log(formData);

    const db = (await connectDB).db('board')
    if(title == '' && content=='')
      return new Response('빈칸은 안됩니다!',{status:500})
    
    await db.collection('post').insertOne({title,content,userEmail})
    return Response.redirect('http://localhost:3000/list')
  }
  else
    return Response.redirect('http://localhost:3000/')
}