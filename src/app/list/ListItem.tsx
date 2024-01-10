'use client'
import {redirect, useRouter} from "next/navigation"
import { PostType } from "@/types/index.type"
import Link from "next/link";


const ListItem = ({result}:{result:PostType[]}) => {
  const router = useRouter();

  const handleDelete = async(id:string,e:React.MouseEvent) => {
    try{
      let response = await fetch('/api/delete',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id      
        })
      })
      let responseJson = await response.json()
      if(response.ok){
        console.log(responseJson.message);
        if(e.currentTarget.parentElement)
        e.currentTarget.parentElement.style.opacity = '0';
      }
      

    }catch(error){
      console.log("삭제에러",error)
    }
  }

  return (
    <div>
      {result.map((item:PostType) => (
        <div className="list-item" key={item._id.toString()}>
          <Link href={`/detail/${item._id.toString()}`}>
            <h4 style={{cursor:"pointer"}}>{item.title}</h4>
          </Link>
          <Link href={`edit/${item._id.toString()}`}>
            <span style={{cursor:"pointer"}}>✏️</span>
          </Link>
          <span style={{cursor:"pointer"}} onClick={(e)=>{handleDelete(item._id,e)}}>
            🗑️
          </span>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ListItem;