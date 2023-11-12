import { connectDB } from "../../../../util/database";
import { ObjectId } from "mongodb";

type detailProps = {
  params: {
    id:number | string
  }
}

const Detail = async ({params}:detailProps)=>{
  const client = await connectDB;
  const db = client.db('board')
  let result = await db.collection('post').findOne(
    {_id:new ObjectId(params.id)}
  )
  console.log(result);
  return(
    <div>
      <h4>상세페이지</h4>
      <h4>글제목</h4>
      <p>글내용</p>
    </div>
  )
}

export default Detail;
