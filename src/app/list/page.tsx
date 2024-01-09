import { connectDB } from "@/util/database"
import ListItem from './ListItem';
import { PostType } from "@/types/index.type";

export default async function List() {
  const db = (await connectDB).db('board')
  let result = (await db.collection('post').find().toArray()).map(doc => ({
    ...doc,
    _id: doc._id.toString(),
  })) as PostType[];
  return (
    <div className="list-bg">
      <ListItem result={result}/>
    </div>
  )
}
  