import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

const Detail = async ({params}:{params:{id:string}})=>{
  const client = await connectDB;
  const db = client.db('board')
  let result = await db.collection('post').findOne(
    {_id:new ObjectId(params.id)}
  )
  if(result != null){
    console.log(result);
  }
  return(
    <div>
      <h4>상세페이지</h4>
      <h4>글제목</h4>
      <p>글내용</p>
    </div>
  )
}

export default Detail;
