import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { MyContextProvider } from './context/Context'; 
import PostSection from './pages/postsection/PostSection';
import Singlepost from './pages/singlepost/SinglePost'
import RichTextEditor from './pages/write/RichTextEditor';
// import Post from './components/post/Post'
import Navbar from './components/Navbar/Navbar'


function App() {
  return (
<>
<Navbar />  

    <Router>
      <Routes>
       
      <Route path="/" element={<PostSection />} />
      <Route path="/post/:id" element={< Singlepost />} /> 
      <Route path="/write" element={< RichTextEditor />} /> 
      </Routes>   
    </Router>
</>
  );
}

export default App;
