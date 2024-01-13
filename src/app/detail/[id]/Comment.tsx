'use client'

import { useEffect, useState } from "react";

interface Comment{
  _id:string,
  author:string,
  comment:string,
  parent:string
}


const Comment = ({params}:{params:{id:string}}) => {
  let [comment, setComment] = useState("")
  let [commentDbData, setCommentDbData] = useState<Comment[]>([]);
  useEffect(()=>{
    const getCommentData = async() => {
      let response = await fetch(`/api/comment/${params.id}`)
      let result:Comment[] = await response.json()
      setCommentDbData(result);
    }
    getCommentData();
  },[params.id])
  
  const fetchComment = async() => {
    try{
      const response = await fetch(`/api/comment/${params.id}`,{
        method:"POST",
        body:JSON.stringify({comment})
      });
      if(response.ok){
        const newComment:Comment = await response.json();
        console.log('newComment',newComment)
        setCommentDbData(prev=>[...prev,newComment])
        setComment("");
      }
    }catch(error){
      console.log(error)
    }
  }
  

  return(
    <div>
      <div>
        {
          commentDbData.map((el:Comment,idx:number)=>(
            <div key={idx}>
              {el.comment}
            </div>
          ))
        }
      </div>
      <input value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
      <button onClick={fetchComment}>댓글전송</button>
    </div>
  )

}

export default Comment;