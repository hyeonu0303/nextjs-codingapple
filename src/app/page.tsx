import { connectDB } from "../../util/database"
//db데이터가져오는 코드 캐싱사용할려면
//1.fetch()로만들어서 캐싱가능
//2.revalidate 예약변수 쓰면 페이지단위 캐싱가능
export const revalidate = 60; //60초 지나면 다시 캐싱 => 예전엔 ISR

export default async function Home() {
  const client = await connectDB
  const db = client.db('board')
  let result= await db.collection('post').find().toArray()

  // await fetch('/url',{cache:'force-cache'}); //자원절약가능 => 자동으로 설정되어있음 실시간데이터중요하면=>no-store
  // await fetch('/url',{next:{revalidate:60}}) //60초마다 캐싱된데이터 갱신해줌 (1초마다 갱신필요없는사이트)


  return (
    <div>
      
    </div> 
  )
}
