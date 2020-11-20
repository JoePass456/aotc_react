import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function Posts() {
    const [posts, setPosts] = useState(null)
    const getPosts = () => {
        axios.get("http://127.0.0.1:8000/posts/all")
            .then(res => setPosts(res))
            .catch(e => console.log(e))
    }
    useEffect(getPosts, [])
    // console.log(posts.data);
    return (
        <div>
            Posts go here like this
            {/* posts */}
        </div>
    )
} 