import { NextResponse } from "next/server"
import { connectDB } from "@/util/database";
import { Db, DeleteResult, ObjectId } from 'mongodb';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(request:Request){
  let session = await getServerSession(authOptions);
  const body = await request.json()
  const {id,email} = body

  console.log(email)

  if(session && session.user?.email == email){
    let userEmail = session.user?.email
    const db:Db = (await connectDB).db('board');
    await db.collection('post').deleteOne({_id:new ObjectId(id),userEmail})
    return NextResponse.json({message:"success"},{status:200})
  }
  else{
    return NextResponse.json({message:"fail"})
  }
  //email유저가 보낸유저랑 같지않으면 삭제불가전송
}