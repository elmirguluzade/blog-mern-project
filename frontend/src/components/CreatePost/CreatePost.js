import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import './CreatePost.css'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')


    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

    return (
        <form className='newPostContainer'>
            <input type="title" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="summary" placeholder='Summary'value={summary} onChange={(e) => setSummary(e.target.value)}/>
            <input type="file" />
            <ReactQuill modules={modules} formats={formats} value={content} onChange={(val) => setContent(val)}/>
            <button type='submit' className='postBtn'>Create Post</button>
        </form>
    )
}

export default CreatePost