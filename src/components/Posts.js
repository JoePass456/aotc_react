import React, { useState, useEffect } from 'react';
import { axiosHelper } from '../utilities/axiosHelper';
import Headbar from '../components/Headbar';
import Footer from '../components/Footer';
import Spacer from '../components/Spacer';
import { Col, Row, Container } from 'reactstrap';
// import Header from '../components/Header';
import '../App.css';


export default function Posts() {

    let displayPosts = [];
    const [rawPosts, setRawPosts] = useState(null)
    // const [posts, setPosts] = useState(null);
    let posts = [];
    const [postsOrder, setPostsOrder] = useState('');

    const changePostsOrder = (newOrder) => {
        setPostsOrder(newOrder);
    }
    
    function reverseOrder(array) {
        let newArray = [];
        for (let i = (posts.length - 1); i >= 0; i--) {
            newArray.push(array[i]);
        }
        return newArray;
    }
    
    function hottestOrder(array) {
        function compare ( a, b ) {
            if ( a.likes.length < b.likes.length) {
                return -1;
            }
            if ( a.likes.length > b.likes.length) {
                return 1;
            }
            return 0;
        }
        return array.sort( compare );

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


    useEffect(() => axiosHelper('get', '/posts/all', {}, {}, setRawPosts), []);



    if (rawPosts === null) {
        displayPosts = ["Loading"];
    } else {
        posts = rawPosts;
        if (postsOrder === "oldest") {
            posts = reverseOrder(posts);
        } 
        if (postsOrder === "hottest") {
            posts = hottestOrder(posts);
        }
       
        for (let i = (posts.length - 1); i >= 0; i--) {
            let likeOrLikes = "like";
            let commentOrComments = "comment";
            let numberOfComments = 0;
            let replyOrNewPost = "";
            let author = "";
            posts[i].ref_parent_post ? replyOrNewPost = "Reply" : replyOrNewPost = "New Post";
            let time = formatTime(posts[i].created_at);

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
                        <Col xs="4">
                            <p className="smallfont">{time.substring(0, 6)}<br></br>{time.substring(6, 11)}</p>
                        </Col>
                        <Col xs="4">
                            <p className="smallfont">{posts[i].likes.length}<br></br>{likeOrLikes}</p>
                        </Col>
                        <Col xs="4">
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