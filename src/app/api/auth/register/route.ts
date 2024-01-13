import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';
export async function POST(request:Request){
  const formData = await request.formData();
  const name = formData.get("name")
  const email = formData.get("email");
  const password = formData.get("password") as string;
  let hash = await bcrypt.hash(password,10);
  if(name != "" && email != "" && password != ""){
    let db = (await connectDB).db('board');
    db.collection('user').insertOne({name,email,hash})
    return Response.redirect("http://localhost:3000/list")
  }
  else{
    return Response.redirect("https://localhost:3000/register")
  }
}