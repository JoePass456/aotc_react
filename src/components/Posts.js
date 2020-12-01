import React, { useState, useEffect } from 'react';
import { axiosHelper } from '../utilities/axiosHelper';
import Headbar from '../components/Headbar';
import Footer from '../components/Footer';
import { Col, Row, Container } from 'reactstrap';
import Header from '../components/Header';
import '../App.css';


export default function Posts() {

    let displayPosts = [];
    const [posts, setPosts] = useState(null);
    const [postsOrder, setPostsOrder] = useState('newist');
    
    
    useEffect(() => axiosHelper('get', '/posts/all', {}, {}, setPosts), []);
    // useEffect(() => axiosHelper('get', '/likes/all', {}, {}, setLikes), []);
    console.log("Posts:", posts);
    
    let peopleOrPerson = "";


    if (posts !== null && postsOrder === 'newist') {
        // console.log(posts[0]);
        for (let i = (posts.length - 1); i >= 0 ; i--) {
            if (posts[i].likes.length === 1) {
                peopleOrPerson = "person";
            } else {
                peopleOrPerson = "people";
            }
            displayPosts.push(<Row className="post"
                key={i}><p>{posts[i].post}</p>
                <p>Posted by {posts[i].user.name}</p>
                <p>Liked by {posts[i].likes.length} {peopleOrPerson}</p>
            </Row>)
        };
        // console.log(displayPosts);
    }
    return (
        <>
        <Headbar/>
        <Header subheading="-"/>
        <Container>
            {displayPosts}
        </Container>
        <Footer/>
        </>
    )
} 