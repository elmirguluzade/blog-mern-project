import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.webp'
import './Posts.css'

const Posts = () => {
  const navigate = useNavigate()


  return (
    <div className='posts'>
      <div className="post">
        <div className="post-img">
          <img src={logo} alt="Post" />
        </div>
        <div className="post-content" onClick={() => navigate('/posts/1')}>
          <div className="post-title"><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id quia quidem ducimus distinctio veritatis dignissimos expedita a corrupti aliquid.</h3></div>
          <div className="post-author">
            <p className="author">Elmir</p>
            <p>2023-01-07 11:03</p>
          </div>
          <div className="post-details">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, totam a debitis labore aliquam provident aliquid voluptate possimus blanditiis quaerat doloribus, assumenda in nisi fugiat ab! Deleniti nemo id debitis facilis, tenetur vero veritatis provident natus nostrum quam modi accusantium fugiat iste libero minus architecto, commodi dolores? Ducimus, ab ex.</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="post">
        <div className="post-img">
          <img src={logo} alt="Post" />
        </div>
        <div className="post-content">
          <div className="post-title"><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id quia quidem ducimus distinctio veritatis dignissimos expedita a corrupti aliquid.</h3></div>
          <div className="post-author">
            <p className="author">Elmir</p>
            <p>2023-01-07 11:03</p>
          </div>
          <div className="post-details">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, totam a debitis labore aliquam provident aliquid voluptate possimus blanditiis quaerat doloribus, assumenda in nisi fugiat ab! Deleniti nemo id debitis facilis, tenetur vero veritatis provident natus nostrum quam modi accusantium fugiat iste libero minus architecto, commodi dolores? Ducimus, ab ex.</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="post">
        <div className="post-img">
          <img src={logo} alt="Post" />
        </div>
        <div className="post-content">
          <div className="post-title"><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id quia quidem ducimus distinctio veritatis dignissimos expedita a corrupti aliquid.</h3></div>
          <div className="post-author">
            <p className="author">Elmir</p>
            <p>2023-01-07 11:03</p>
          </div>
          <div className="post-details">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, totam a debitis labore aliquam provident aliquid voluptate possimus blanditiis quaerat doloribus, assumenda in nisi fugiat ab! Deleniti nemo id debitis facilis, tenetur vero veritatis provident natus nostrum quam modi accusantium fugiat iste libero minus architecto, commodi dolores? Ducimus, ab ex.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts