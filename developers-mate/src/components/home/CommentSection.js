import React from 'react'
import "../../style/home/CommentSection.css";
import ProfileHead from './ProfileHead';

function CommentSection({item}) {
  return (
    <main className='comments'>
        <ProfileHead isEdit={false} isPost={false} item={item}/>
        <h4 style={{fontWeight:"400",color:"rgba(243, 243, 243, 0.8)"}}>{item.text}</h4>
    </main>
  )
}

export default CommentSection