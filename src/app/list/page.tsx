import { connectDB } from "@/util/database"
import ListItem from './ListItem';
import { PostType } from "@/types/index.type";

//dynamic rendering으로 만듬
export const dynamic = 'force-dynamic' //서버/DB부담 up => 캐싱(데이터저장해두고 재사용)기능 사용 , GET요청결과를 잠깐 이용가능
// export const dynamic = 'force-static'

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
  