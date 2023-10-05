import { ObjectId } from "mongodb"
import { connectDB } from "../../../../util/database"
type GetData = {
  _id:ObjectId,
  title:string,
  content:string
}
export default async function Detail(props){
  console.log(props)

  const db = (await connectDB).db('board')
  let result= await db.collection('post').findOne({_id: new ObjectId(props.params.id)})
  console.log(result);
  return(
    <div>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  )
}