import React from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"

const Editor = ({content, setContent}) => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
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
        <div>
            <ReactQuill modules={modules} formats={formats} value={content} onChange={(val) => setContent(val)} />
        </div>
    )
}

export default Editor