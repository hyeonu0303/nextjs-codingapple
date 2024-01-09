import { NextResponse } from "next/server"
import { connectDB } from "@/util/database";
import { Db, DeleteResult, ObjectId } from 'mongodb';



export async function POST(request:Request){
  const res = await request.json()
  const {_id} = res;
  console.log('res',res)
  const db:Db = (await connectDB).db('board');
  let deleteContent:DeleteResult = await db.collection('post').deleteOne({_id:new ObjectId(_id)})
  return NextResponse.json(deleteContent,{status:200})
}