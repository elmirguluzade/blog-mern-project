import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Posts.css'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      axios.get('http://localhost:4000/post')
        .then(response => {
          console.log(response.data)
          return response.data
        })
        .then(data => {
          console.log(data)
          setLoading(false)
          setPosts(data.posts)
        })
    }, 500)
  }, [])

  return (
    <div className='posts'>
      {
        loading ? <Loading /> :
          posts.map((post, index) => (
            <div className="post" key={index}>
              <Link to={`post/${post._id}`}>
                <div className="post-img">
                  <img src={'http://localhost:4000/' + post.cover} alt="Post" />
                </div>
              </Link>
              <div className="post-content">
                <Link to={`post/${post._id}`}>
                  <div className="post-title"><h3>{post.title}</h3></div>
                </Link>
                <div className="post-author">
                  <p className="author">{post.author.name}</p>
                  <p className='postTime'>{format(new Date(post.createdAt), 'MMM d, yyyy  HH:mm')}</p>
                </div>
                <div className="post-details">
                  <p>{post.summary}</p>
                </div>
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default Posts