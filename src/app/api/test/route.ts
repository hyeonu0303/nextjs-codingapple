import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
  const searchParams = request.nextUrl.searchParams
  const queryString = searchParams.toString()
  console.log({query:queryString})
  const name = searchParams.get('age');
  console.log(name);

  // let queryParams:{name:string,age:number}={name:'',age:0};
  // searchParams.forEach((value, key) => {
  //   queryParams[key] = value;
  // });

  // console.log(queryParams);
  return  NextResponse.json(name,{status:200})
}