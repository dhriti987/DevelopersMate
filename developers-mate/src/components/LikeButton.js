import {React,useEffect,useState} from 'react'
import "../style/LikeButton.css"
import { usePostRequestMutation,useDeleteRequestMutation } from "../redux/PrivateApi";

function LikeButton({item}) {
  // post-details/

  const [postLike] = usePostRequestMutation();
  const [deleteLike] = useDeleteRequestMutation();
  const [isLiked,setIsLiked]= useState(item.is_liked);
  const [numberOfLikes,setNumberOfLikes] = useState(item.total_likes);
  useEffect(()=>{
    setIsLiked(item.is_liked)
    setNumberOfLikes(item.total_likes)
  },[item])
  const handleLike=()=>{
    if(!isLiked){
      postLike({data:{},url:`post-details/like/${item.post_id}`})
      .then(()=>{
        setIsLiked(true);
        setNumberOfLikes(numberOfLikes+1)
      })
      .catch(err=>{
        console.log(err.message);
      })
    }
    else{
      deleteLike(`post-details/like/${item.post_id}`)
      .then(()=>{
        setIsLiked(false);
        setNumberOfLikes(numberOfLikes-1)
      })
      .catch(err=>{
        console.log(err.message);
      })
    }
  }

  return (
    <div className='heartBtn'>
        <div className="content">
            <div className={`heart ${isLiked ? "liked" : "notLiked"}`} onClick={handleLike}></div>
            <div className='Number'><h5 style={{color:"rgb(156 145 145 / 80%)"}}>{numberOfLikes}</h5></div>
        </div>
    </div>
  )
}

export default LikeButton