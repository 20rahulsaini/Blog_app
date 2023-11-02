import React, { useEffect, useState } from 'react';
import './text.css';
import axios from "axios"
import {useLocation, useNavigate, useParams} from "react-router-dom"
import PostSection from '../postsection/PostSection';

function RichTextEditor() {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState( "");
  const [file,setFile] = useState(null);
  const [fileInputText, setFileInputText] = useState("");

  const history = useNavigate();
  

 
  
  const handleTitle = (e)=>{
      setTitle(e.target.value)
  }

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleImgFile = (e)=>{
      // setFile(e.target.files[0])
      const selectedFile = e.target.files[0];
      setFile(selectedFile); // Set the selected file
      setFileInputText(selectedFile ? selectedFile.name : "");
  }



  
  





  const addUserData = async(e)=>{
      e.preventDefault();

      var formData = new FormData();
   
      formData.append("title",title);
      formData.append("content",content);
      formData.append("photo",file)


      

      const config = {
          headers:{
              "Content-Type":"multipart/form-data"
          }
      }

     
     

     
      const res = await axios.post("http://localhost:7000/register",formData,config);
  
      if (res.status === 201) {
        history("/");
      } else {
        console.log("Server returned an unexpected status:", res.status);
      }


      
   
    
  }

  return (
    <div className="write-page">
      <h1>Create a New Blog Post</h1>
      <div className="section">
        <label>Title:</label>
        <input type="text" name='title' onChange={handleTitle}     value={title} />
    
      </div>
      <div className="section">
        <label>Content:</label>
        <textarea
         name='content'
          onChange={handleContent}
          rows="8"
          value={content}
        ></textarea>
      </div>
      <div className="section">
          <label htmlFor="image">Select Your Image:</label>
          <input
            type="file"
            id="image"
            name="photo"
            onChange={handleImgFile}
          />
        </div>
      <button type='submit' onClick={addUserData}>Submit</button>
    </div>
  );
}

export default RichTextEditor;

