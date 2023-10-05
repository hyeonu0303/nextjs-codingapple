import { redirect } from "next/navigation";
import { connectDB } from "../../../../util/database";

export async function POST(request:Request){
  const formData = await request.formData()
  const title = formData.get('title')
  const content = formData.get('content')
  console.log(formData);
  
  const responseBody = {
    message:'post전송성공',
    status:200,
    data:{title,content}
  }

  const db = (await connectDB).db('board')
  if(title == '' && content=='')
    return new Response('빈칸은 안됩니다!',{status:500})
  
  await db.collection('post').insertOne({title:title,content:content})
  return new Response(JSON.stringify(responseBody),{
    headers:{'Content-Type':'application/json'},
  })

}