import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/options"

export async function POST(request:Request,{params}:{params:{id:string}}){
  let session = await getServerSession(authOptions)
  
  let body = await request.json()
  let {comment} = body
  if(session){
    let db = (await connectDB).db('board')
    await db.collection('comment').insertOne({author:session.user.email,comment,parent:new ObjectId(params.id)})
    
    let findComment = await db.collection('comment').findOne({comment})
    return Response.json(findComment,{status:200})
  }
}

export async function GET(){
  let db = (await connectDB).db('board')
  let commentData = await db.collection('comment').find().toArray()
  console.log(commentData);
  return NextResponse.json(commentData,{status:200})
}