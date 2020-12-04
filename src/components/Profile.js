import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { axiosHelper } from '../utilities/axiosHelper';
import AppContext from '../utilities/AppContext';
import Spacer from '../components/Spacer';

function Profile() {
    const context = useContext(AppContext);

    let id = parseInt(localStorage.getItem("id"));
    let name = localStorage.getItem("name");
    let bio = localStorage.getItem("bio");
    let email = localStorage.getItem("email.com");
    let password = localStorage.getItem("password");
    let displayPosts = [];
    let posts = [];
    const [postsOrder, setPostsOrder] = useState('');
    const [profilePosts, setProfilePosts] = useState(null);

    if (bio === "null") {
        bio = "Musician in the Seattle area.  I play bongos and stare at the cieling for hours at a time!";
    }

    useEffect(() => axiosHelper('get', '/posts/all', {}, {}, setProfilePosts), []);
    
    let myNumberOfPosts = 0;
    let myNumberOfLikes = 0;
    let myNumberOfComments = 0;

    if (profilePosts === null) {
        displayPosts = ["Loading"];
    } else {
        posts = profilePosts;
        if (postsOrder === "oldest") {
            posts = context.reverseOrder(posts);
        }
        if (postsOrder === "hottest") {
            posts = context.hottestOrder(posts);
        }
        if (postsOrder === "newest") {
            posts = context.newestFirst(posts);
        }


        for (let i = (posts.length - 1); i >= 0; i--) {
            let likeOrLikes = "like";
            let commentOrComments = "comment";
            let numberOfComments = 0;
            let replyOrNewPost = "";
            let author = "";
            posts[i].ref_parent_post ? replyOrNewPost = "Reply" : replyOrNewPost = "New Post";
            let time = context.formatTime(posts[i].created_at);
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
            likeOrLikes = context.pluralOrNot(posts[i].likes.length, likeOrLikes);
            commentOrComments = context.pluralOrNot(numberOfComments, commentOrComments);
            
            if (id === posts[i].user.id) {
                myNumberOfPosts++;
                myNumberOfLikes += posts[i].likes.length;
                myNumberOfComments += numberOfComments;
            
            displayPosts.push(
                    <div key={i}>
                        <Row>
                            <Col xs="12" className="postbody text-center">
                                <p className="quotes">"{posts[i].post}"<br></br><strong className="smallfont">- {author}</strong></p>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col onClick={() => context.toggleLike(posts[i])} xs="3">
                                <p className="smallfont">{posts[i].likes.length} {likeOrLikes} {liker}</p>
                            </Col>
                            <Col onClick={() => context.lookAtUser(posts[i].user)} xs="6">
                                {/* <p className="smallfont">{time.substring(0, 6)}<br></br>{time.substring(6, 11)}</p> */}
                                <p className="smallfont">Posted by<br></br>{posts[i].user.name}</p>
                            </Col>
                            <Col xs="3">
                                <p className="smallfont">{numberOfComments}<br></br>{commentOrComments}</p>
                            </Col>
                        </Row>
                    </div>
                )
            }
        };
    };

    return (
        <>
            {!context.token ? <Redirect to="/" /> : null}
            <Container className="postsbg">
                <Row>
                    <Col className="text-center">
                        <h4 className="name">{name}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p className="bio">{bio}</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <h5>Your Stats:</h5>
                    </Col>
                </Row>
                <Row className="">
                    <Col className="col-12">
                        <p className="">Total Posts:{myNumberOfPosts}</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-12">
                        <p className="">Total Likes:{myNumberOfLikes}</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-12">
                        <p className="">Total Comments:{myNumberOfComments}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>Your latest post:</h5>
                    </Col>
                </Row>
                <Row>
                    <Container>
                        {displayPosts}
                    </Container>
                </Row>
                <Spacer spaces="6"/>
            </Container>
        </>
    )
}

export default Profile
