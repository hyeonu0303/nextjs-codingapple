// users/route.ts

export async function GET(request: Request) {
  // 가상의 데이터베이스에서 사용자 데이터를 가져오는 것처럼 하드코드된 데이터 사용
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
  ];

  // JSON 형식으로 사용자 데이터를 반환
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
