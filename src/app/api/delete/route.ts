import { NextResponse } from "next/server"
import { connectDB } from "@/util/database";
import { Db, DeleteResult, ObjectId } from 'mongodb';


export async function POST(request:Request){
  const body = await request.json()
  const id = body.id
  console.log('body:',body)
  const db:Db = (await connectDB).db('board');
  await db.collection('post').deleteOne({_id:new ObjectId(id)})
  return NextResponse.json({message:"삭제성공"},{status:200})
}