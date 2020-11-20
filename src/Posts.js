import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


export default function Posts() {
    let displayPosts = [];
    const [posts, setPosts] = useState(null)
    const getPosts = () => {
        axios.get("http://127.0.0.1:8000/posts/all")
            .then(res => setPosts(res))
            .catch(e => console.log(e))
    }
    useEffect(getPosts, [])
    if (posts !== null) {
        console.log(posts.data[0].user.name);
        for (let i = 0; i < posts.data.length; i++) {
            displayPosts.push(<li 
            key={i}><p>{posts.data[i].post}</p>
            <p>Posted by {posts.data[i].user.name}</p>
            </li>)
        }
        // console.log(displayPosts);
    }
    return (
        <ul>
            {displayPosts}
        </ul>
    )
} 