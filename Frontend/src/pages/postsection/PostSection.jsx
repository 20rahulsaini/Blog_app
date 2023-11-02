
import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import './PostSection.css'


function PostSection() {
  const [data, setData] = useState([]);

  // const navigate = useNavigate();
  // const updatePost = (postId, postTitle, postContent) => {
  //   navigate(`/write?postId=${postId}&title=${postTitle}&content=${postContent}`);
  // };







  const getUserData = async () => {
    const res = await axios.get("http://localhost:7000/getdata", {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 201) {
      console.log('data get');
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };




  const dltUser = async (id) => {
    console.log(id)
    const res = await axios.delete(`http://localhost:7000/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.data.status === 201) {
        getUserData()
    } else {
        console.log("error")
    }
}



  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="post-section">
      {data.map((post) => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`/uploads/${post.image}`} alt="" />
          </div>
          <div className="post-content">
            <div className="heading">
              <h3>{post.title}</h3>
            </div>
            <p>{post.content.substring(0, 100)}...</p>
            <Link className="link" to={`/post/${post.id}`} state={{ post }}>
              Read More
            </Link>
            <div className="buttons">
           
            <button  id='delbtn' onClick={() => dltUser(post.id)}  >Delete</button>
            </div>
          
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostSection;
