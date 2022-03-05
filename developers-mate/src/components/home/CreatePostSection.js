import React from 'react'
import "../../style/home/CreatePostSection.css"

function CreatePostSection() {
  return (
    <main className="createPostContainer popUp"> 
      <h1>Create Post</h1>
      <textarea name="createPost"  cols="30" rows="10" className='postContent' placeholder="What's in your mind?"></textarea>
      
    </main>
  )
}

export default CreatePostSection