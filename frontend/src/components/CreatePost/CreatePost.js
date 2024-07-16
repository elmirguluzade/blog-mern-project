import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import './CreatePost.css'
import Editor from '../Editor/Editor';

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const navigate = useNavigate()

  const createNewPost = (e) => {
    e.preventDefault();
    if(!title || !summary || !content || !files){
      toast.error('Enter all information!', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      return;
    }

    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', files[0])
    axios('http://localhost:4000/post/newPost', {
      method: "post",
      data,
      withCredentials: true
    })
      .then((response) => { console.log(response.data);
        toast.success('Post created!', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        setTimeout(() => {
          navigate('/')
        }, 1000)
      })
  }

  return (
    <form className='newPostContainer' onSubmit={createNewPost} id="newPost">
      <input type="title" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="summary" placeholder='Summary' value={summary} onChange={(e) => setSummary(e.target.value)} />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor content={content} setContent={setContent}/>
      <button type='submit' className='submitBtn postBtn'>Create Post</button>
      <ToastContainer />
    </form>
  )
}

export default CreatePost