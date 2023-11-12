'use client'
import { params } from "@/type/param";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Data{
  _id:string,
  title:string,
  content:string
}

const EditContent = ({params}:params) => {
  let [title,setTitle] = useState('');
  let [content,setContent] = useState('');
  let [data,setData] = useState<Data|null>(null);
  const router = useRouter();
  useEffect(()=>{
    const fetchData = async () => {
      const response= await fetch(`/api/edit/${params.id}`)
      if(response.ok){
        const data = await response.json();
        console.log(data)
        setData(data)
      }
    }
    fetchData()
  },[])
  
  const handleEditContent = async() => {
    const response = await fetch(`/api/edit/${params.id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        title,
        content
      })
    })
    if(response.ok){
      const data = await response.json()
      setData(data)
      router.push('/list')
      
    }
  }    
    return(
      <form action='/api/edit' method="POST">
        {
          data && (
            <>
            <input type='text' placeholder='수정' defaultValue={data.title} onChange={(e)=>{setTitle(e.target.value)}}/> 
            <input type='text' placeholder="수정내용" defaultValue={data.content} onChange={(e)=>{setContent(e.target.value)}}/>
            <button onClick={handleEditContent}>수정하기</button>
            </>
          )
        }
      </form>
    )
}

export default EditContent;