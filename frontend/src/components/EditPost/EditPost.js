/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Editor from '../Editor/Editor';
import '../CreatePost/CreatePost.css';

const EditPost = () => {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/post/' + id)
            .then(response => response.data)
            .then(data => {
                setTitle(data.post.title)
                setSummary(data.post.summary)
                setContent(data.post.content)
            })
    }, [])


    const updatePost = (e) => {
        e.preventDefault();
        if (!title || !summary || !content ) {
            toast.error('Enter all information!', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
            return;
        }

        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        if(files[0]){
            data.set('file', files[0])
        }
        data.set('id', id)
        axios('http://localhost:4000/post', {
            method: "put",
            data,
            withCredentials: true
        })
            .then(() => {
                toast.success('Post updated!', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
                setTimeout(() => {
                    navigate('/post/' + id)
                }, 1000)
            })
    }

    return (
        <form className='newPostContainer' onSubmit={updatePost} id="newPost">
            <input type="title" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="summary" placeholder='Summary' value={summary} onChange={(e) => setSummary(e.target.value)} />
            <input type="file"  onChange={(e) => setFiles(e.target.files)} />
            <Editor content={content} setContent={setContent} />
            <button type='submit' className='submitBtn postBtn'>Update Post</button>
            <ToastContainer />
        </form>
    )
}

export default EditPost