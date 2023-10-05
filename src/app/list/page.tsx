import Link from "next/link"
import { connectDB } from "../../../util/database"
import DetailLink from "./DetailLink"
export default async function List() {

  const db = (await connectDB).db('board')
  let result = await db.collection('post').find().toArray()
  console.log(result)
  return (
    <div className="list-bg">
      {
        result.map((item,idx)=>{
          return(
            <div className="list-item" key={idx}>
              <Link href={`/detail/${item._id.toString()}`}>
                <h4>{item.title}</h4>
              </Link>
                <p>{item.content}</p>
            </div>
            )
        })
      }
    </div>
  )
}