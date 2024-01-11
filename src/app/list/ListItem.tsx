'use client'
import {redirect, useRouter} from "next/navigation"
import { PostType } from "@/types/index.type"
import Link from "next/link";


const ListItem = ({result}:{result:PostType[]}) => {
  const router = useRouter();

  const handleDelete = async(id:string,email:string,e:React.MouseEvent) => {
    try{
      const target = e.currentTarget;
      let response = await fetch('/api/delete',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id,
          email      
        })
      })
      let responseJson = await response.json()
      if(responseJson.message=="success" && target.parentElement){
        console.log(responseJson.message);
        target.parentElement.style.opacity = '0';
        setTimeout(()=>{
          if(target.parentElement)
          target.parentElement.style.display = 'none';
        },1000)
      }
      else{
        alert('해당 게시글은 삭제할 수 없습니다')
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
          <span style={{cursor:"pointer"}} onClick={(e)=>{handleDelete(item._id,item.userEmail,e)}}>
            🗑️
          </span>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ListItem;