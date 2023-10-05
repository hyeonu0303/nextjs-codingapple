import { connectDB } from "../../../../util/database";

export async function GET(request: Request) {
  const db = (await connectDB).db('board');
  let result = await db.collection('post').find().toArray();
  const data = JSON.stringify(result);
  
  return new Response(data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
