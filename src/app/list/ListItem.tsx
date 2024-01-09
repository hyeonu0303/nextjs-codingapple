'use client'
import {useRouter} from "next/navigation"
import { PostType } from "@/types/index.type"


const ListItem = ({result}:{result:PostType[]}) => {
  const router = useRouter();
  const handleDelete = async() => {
    let response = await fetch('/api/delete',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        result        
      })
    })
    const responseJson = await response.json()
    return responseJson
  }

  return (
    <div>
      {result.map((item:PostType) => (
        <div className="list-item" key={item._id.toString()}>
          <h4 style={{cursor:"pointer"}} onClick={()=>{router.push(`/detail/${item._id.toString()}`)}}>{item.title}</h4>
          <span style={{cursor:"pointer"}} onClick={()=>{router.push(`/edit/${item._id.toString()}`)}}>✏️</span>
          <span style={{cursor:"pointer"}} onClick={handleDelete}>
            🗑️
          </span>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ListItem;