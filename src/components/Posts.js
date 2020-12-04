import React, { useState, useEffect, useContext } from 'react';
import { axiosHelper } from '../utilities/axiosHelper';
import { Col, Row, Container } from 'reactstrap';
import Headbar from '../components/Headbar';
import Footer from '../components/Footer';
import Spacer from '../components/Spacer';
import '../App.css';
import { Redirect } from 'react-router-dom';
import AppContext from '../utilities/AppContext';

export default function Posts() {
    const context = useContext(AppContext);

    let displayPosts = [];
    const [response, setResponse] = useState(null);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    
    // const [posts, setPosts] = useState(null);
    let posts = [];
    const [postsOrder, setPostsOrder] = useState('');
    let token = (localStorage.getItem("token"));
    // let id = (localStorage.getItem("id"));

    const changePostsOrder = (newOrder) => {
        setPostsOrder(newOrder);
    }

    function newestFirst(array) {
        function compare(a, b) {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        }
        // console.log(array[0]);
        return array.sort(compare);
    }

    function reverseOrder(array) {
        function compare(a, b) {
            if (a.id > b.id) {
                return -1;
            }
            if (a.id < b.id) {
                return 1;
            }
            return 0;
        }
        // console.log(array[0]);
        return array.sort(compare);

    }

    function hottestOrder(array) {
        function compare(a, b) {
            if (a.likes.length < b.likes.length) {
                return -1;
            }
            if (a.likes.length > b.likes.length) {
                return 1;
            }
            return 0;
        }
        return array.sort(compare);

    }

    function pluralOrNot(num, string) {
        if (num !== 1) {
            string += "s";
        }

        return string;
    }

    function formatTime(timeStamp) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (timeStamp) {
            let array = timeStamp.split("-");

            return months[parseInt(array[1]) - 1] + " " + array[2].substring(0, 2) + " " + array[0];

        } else {
            return "";
        }
    }



    
    const lookAtUser = (user) => {
        console.log(user);

        // return <Redirect to="/viewpost"></Redirect>
    }

    const toggleLike = (post) => {

        console.log(post);

        if (token) {
            let usersThatLike = [];
            let id = parseInt(localStorage.getItem("id"));

            for (let i = 0; i < post.likes.length; i++) {                
                usersThatLike.push(post.likes[i].user_id);
            }
            
            if (usersThatLike.includes(id)) {
                console.log("sub like");
                
                let likeId = parseInt(post.likes[usersThatLike.indexOf(id)].id);

                let headers = {
                    Accept: "application/json",
                    Authorization: "Bearer " + token
                };
    
                let data = {
                    id: likeId                  
                }
                
                axiosHelper('post', '/like/del', data, headers, getRes); 

            } else {
                console.log("add like");

                let headers = {
                    Accept: "application/json",
                    Authorization: "Bearer " + token
                };
    
                let data = {
                    post: post.id,
                    user: id
                }
    
                axiosHelper('post', '/like/add', data, headers, getRes);   

            }            

        } else {
            setRedirectToLogin(true);
            console.log('redirect to login');
        }

    }

    const getRes = (res) => {

        if (res !== {}) {

            console.log(res);
            setResponse(res);

        } else {

            console.log('Error, no data returned!');

        }
    }

    useEffect(() => axiosHelper('get', '/posts/all', {}, {}, context.setRawPosts), [response, postsOrder]);



    if (context.rawPosts === null) {
        displayPosts = ["Loading"];
    } else {
        posts = context.rawPosts;
        if (postsOrder === "oldest") {
            posts = reverseOrder(posts);
        }
        if (postsOrder === "hottest") {
            posts = hottestOrder(posts);
        }
        if (postsOrder === "newest") {
            posts = newestFirst(posts);
        }

        for (let i = (posts.length - 1); i >= 0; i--) {
            let likeOrLikes = "like";
            let commentOrComments = "comment";
            let numberOfComments = 0;
            let replyOrNewPost = "";
            let author = "";
            posts[i].ref_parent_post ? replyOrNewPost = "Reply" : replyOrNewPost = "New Post";
            let time = formatTime(posts[i].created_at);
            let usersThatLike = [];
            let id = parseInt(localStorage.getItem("id"));
            let liker = "";

            for (let k = 0; k < posts[i].likes.length; k++) {                
                usersThatLike.push(posts[i].likes[k].user_id);
            }            
            if (usersThatLike.includes(id)) {
                liker = "/w you";
            }

            for (let j = 0; j < posts.length; j++) {
                if (posts[j].ref_parent_post === i) {
                    numberOfComments++;
                }
            }
            posts[i].author ? author = posts[i].author : author = "unknown";
            likeOrLikes = pluralOrNot(posts[i].likes.length, likeOrLikes);
            commentOrComments = pluralOrNot(numberOfComments, commentOrComments);
            displayPosts.push(
                <div key={i}>
                    <Row>
                        <Col xs="12" className="postbody text-center">
                            <p className="quotes">"{posts[i].post}"<br></br><strong className="smallfont">- {author}</strong></p>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col onClick={() => toggleLike(posts[i])} xs="3">
                            <p className="smallfont">{posts[i].likes.length} {likeOrLikes} {liker}</p>
                        </Col>
                        <Col onClick={() => lookAtUser(posts[i].user)} xs="6">
                            {/* <p className="smallfont">{time.substring(0, 6)}<br></br>{time.substring(6, 11)}</p> */}
                            <p className="smallfont">Posted by<br></br>{posts[i].user.name}</p>
                        </Col>
                        <Col xs="3">
                            <p className="smallfont">{numberOfComments}<br></br>{commentOrComments}</p>
                        </Col>
                    </Row>
                </div>
            )
        };
    }
    return (
        <Container className="postsbg">
            <Headbar changePostsOrder={changePostsOrder} />
            <Spacer spaces="3" />
            <Container className="">
                {displayPosts}
            </Container>
            <Spacer spaces="1" />
            <Footer />
        </Container>
    )
} 