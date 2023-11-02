import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './SinglePost.css'

function SinglePost() {
  const { id } = useParams();
  const location = useLocation();
  const post = location.state && location.state.post;

  const contentWithLineBreaks = post.content.replace(/\n/g, '<br>');

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className='single-post'>
      <h2>{post.title}</h2>
      <img src={`/uploads/${post.image}`} alt={post.title} />
      {/* <p>{post.content}</p> */}
      <p dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}></p>
    </div>
  );
}

export default SinglePost;
