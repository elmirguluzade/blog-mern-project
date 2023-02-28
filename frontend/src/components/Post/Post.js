import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../Loading/Loading'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { userContext } from '../../Context'
import './Post.css'

const Post = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)
    const { userInfo } = useContext(userContext)

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:4000/post/${params.id}`)
            .then(response => response.data)
            .then(data => {
                setPost(data.post)
                setLoading(false)
            })
            .catch(err => {
                if (err.response.message === "Email or password is incorrect") {
                    toast.error("Post doesn't exist", { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
                }
            })
    }, [])


    return (loading ? <Loading /> :
        <div className='post-container'>
            <div className="post-header">
                <h1>{post.title}</h1>
            </div>
            <div className="post-details">
                <div className="post-time"><time>{Object.keys(post).length !== 0 ? format(new Date(post.createdAt), 'MMM d, yyyy  HH:mm') : ''}</time></div>
                <div className="post-by"><p>by @{post?.author?.name}</p></div>
            </div>
            {userInfo.toString() === post?.author?._id?.toString() &&
                <div className="edit-btn">
                    <Link to={`/edit/${post._id}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg> Edit Post</Link>
                </div>}
            <div className="post-content">
                <div className="post-photo">
                    <img src={`http://localhost:4000/` + post.cover} alt="postPhoto" />
                </div>
                <div className="post-text" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            <ToastContainer />
        </div>
    )
}

export default Post