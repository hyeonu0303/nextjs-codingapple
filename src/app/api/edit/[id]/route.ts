import { NextResponse } from "next/server"
import { connectDB } from "../../../../../util/database"
import { ObjectId } from "mongodb"

export async function GET(request:Request,{params}:{params:{id:string}}){
  const id = params.id
  const db = (await connectDB).db('board')
  let result = await db.collection('post').findOne({_id:new ObjectId(id)})
  return NextResponse.json(result,{status:200})
}``

export async function POST(request: Request,{params}:{params:{id:string}}) {
  const id = params.id
  const body = await request.json()
  const {title,content} = body;
  console.log(title,content)
  const db = (await connectDB).db('board') 
  await db.collection('post').updateOne(
    {_id:new ObjectId(id)},
    {$set: {title: title, content: content}}
  )
  return NextResponse.json(body,{status:200})
}

