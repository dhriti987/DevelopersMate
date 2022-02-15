import React from 'react'
import "../../style/home/CommentSection.css";
import ProfileHead from './ProfileHead';

function CommentSection() {
  return (
    <main className='comments'>
        <ProfileHead/>
        <h4 style={{fontWeight:"400",color:"rgba(243, 243, 243, 0.8)"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis error ullam blanditiis sequi necessitatibus, est nesciunt omnis ut iure quis, esse voluptatem fuga reiciendis illo quidem? Laborum nulla illo quam.</h4>
    </main>
  )
}

export default CommentSection