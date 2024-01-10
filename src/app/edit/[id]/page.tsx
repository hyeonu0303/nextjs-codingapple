/* 'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostType } from "@/types/index.type";

const EditContent = ({params}:{params:{id:string}}) => {
  let [data,setData] = useState<PostType>({_id:"",title:"", content:""}); //data를 가져오면 
  const router = useRouter();
  useEffect(()=>{
    const fetchData = async () => {
      const response= await fetch(`/api/edit/${params.id}`)
      try{
        const responseJson = await response.json();
        console.log(responseJson);
        setData(prev=>({...prev,...responseJson}))
        console.log(data);
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])
  
  const handleEditContent = async() => {
    const postData = {...data}
    try{
      const response = await fetch(`/api/edit/${params.id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          postData
        })
      })
      if(response.ok){
        router.push('/list')
      }
    }catch(error){
      console.log(error);
    }    
  }    
    return(
      <div>
        {
          data && (
            <>
            <input 
              type='text' 
              placeholder='수정' 
              defaultValue={data.title} 
              onChange={e=>setData((prev:PostType)=>({...prev,title:e.target.value}))}/><br/> 
            <input 
              type='text' 
              placeholder="수정내용" 
              defaultValue={data.content} 
              onChange={(e)=>{setData((prev:PostType)=>({...prev,content:e.target.value}))}}/>
            <button onClick={handleEditContent}>수정하기</button>
            </>
          )
        }
      </div>
    )
}

export default EditContent; */

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
const EditContent = async({params}:{params:{id:string}}) => {
  const db = (await connectDB).db('board');
  let result = (await db.collection('post').findOne({_id:new ObjectId(params.id)})); 
  return(
    <>
    {
      result && (
        <div className="write">
          <form action="/api/edit" method="POST">
            <input type="hidden" name="id" defaultValue={params.id}/>
            <input name="title" defaultValue={result.title}/>
            <input name="content" defaultValue={result.content}/>
            <button type="submit">전송</button>
          </form>
        </div> 
      )
    }
    </>
  )
}
export default EditContent;

