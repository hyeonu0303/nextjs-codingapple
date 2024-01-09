import { NextResponse } from "next/server"
import { connectDB } from "../../../../../util/database"
import { ObjectId } from "mongodb"

export async function GET(request:Request,{params}:{params:{id:string}}){
  const id = params.id
  const db = (await connectDB).db('board')
  let result = await db.collection('post').findOne({_id:new ObjectId(id)})
  return NextResponse.json(result,{status:200})
}

export async function POST(request: Request,{params}:{params:{id:string}}) {
  const id = params.id
  const requestJson = await request.json()
  let postData = requestJson.postData;
  const {_id,title,content} = postData;
  const db = (await connectDB).db('board') 
  let updateResult = await db.collection('post').updateOne(
    {_id:new ObjectId(id)},
    {$set: {title: title, content: content}}
  )
  
  if(updateResult.modifiedCount == 0)
    return NextResponse.json({error: "update 실패"},{status:500});
  
  const updatedPost = await db.collection('post').findOne({_id:new Object(id)});
  return NextResponse.json(updatedPost,{status:200})
}

