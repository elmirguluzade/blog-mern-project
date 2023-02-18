import React from 'react'
import './Post.css'
import photo from '../../assets/logo.webp'

const Post = () => {
    return (
        <div className='post-container'>
            <div className="post-header">
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, maiores!</h1>
            </div>
            <div className="post-details">
                <div className="post-time"><p>22.03.2023 14:33</p></div>
                <div className="post-by"><p>by Elmir</p></div>
            </div>
            <div className="post-content">
                <div className="post-photo">
                    <img src={photo} alt="postPhoto" />
                </div>
                <div className="post-text">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima aspernatur tenetur similique temporibus. Vitae nobis dolorum iusto illum veniam inventore deleniti cum accusamus, fuga distinctio iste ipsam rem aliquam ab odit animi. Accusamus ea id sapiente quia modi iusto consequuntur consequatur rem iste, quo odio aperiam, saepe tempore voluptatum?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima aspernatur tenetur similique temporibus. Vitae nobis dolorum iusto illum veniam inventore deleniti cum accusamus, fuga distinctio iste ipsam rem aliquam ab odit animi. Accusamus ea id sapiente quia modi iusto consequuntur consequatur rem iste, quo odio aperiam, saepe tempore voluptatum?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima aspernatur tenetur similique temporibus. Vitae nobis dolorum iusto illum veniam inventore deleniti cum accusamus, fuga distinctio iste ipsam rem aliquam ab odit animi. Accusamus ea id sapiente quia modi iusto consequuntur consequatur rem iste, quo odio aperiam, saepe tempore voluptatum?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima aspernatur tenetur similique temporibus. Vitae nobis dolorum iusto illum veniam inventore deleniti cum accusamus, fuga distinctio iste ipsam rem aliquam ab odit animi. Accusamus ea id sapiente quia modi iusto consequuntur consequatur rem iste, quo odio aperiam, saepe tempore voluptatum?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima aspernatur tenetur similique temporibus. Vitae nobis dolorum iusto illum veniam inventore deleniti cum accusamus, fuga distinctio iste ipsam rem aliquam ab odit animi. Accusamus ea id sapiente quia modi iusto consequuntur consequatur rem iste, quo odio aperiam, saepe tempore voluptatum?</p>
                </div>
            </div>
        </div>
    )
}

export default Post