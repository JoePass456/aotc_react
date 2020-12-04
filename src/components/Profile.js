import React, { useContext } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import AppContext from '../utilities/AppContext';

function Profile() {
    const context = useContext(AppContext);
    
    
    let id = parseInt(localStorage.getItem("id"));
    let name = localStorage.getItem("name");
    let bio = localStorage.getItem("bio");
    let email = localStorage.getItem("email.com");
    let password = localStorage.getItem("password");
    let displayPosts = [];
    
    if (bio = "null") {
        bio = "Hi!  I love reading quotes from all the funniest people in the world.  It just makes my day!  Also I smoke lots of pot.";
    }

    let posts = context.rawPosts
    
    // for (let i = (posts.length - 1); i >= 0; i--) {
    //     let likeOrLikes = "like";
    //     let commentOrComments = "comment";
    //     let numberOfComments = 0;
    //     let replyOrNewPost = "";
    //     let author = "";
    //     let time = formatTime(posts[i].created_at);
    //     let usersThatLike = [];
    //     let liker = "";

    //     for (let k = 0; k < posts[i].likes.length; k++) {                
    //         usersThatLike.push(posts[i].likes[k].user_id);
    //     }            
    //     if (usersThatLike.includes(id)) {
    //         liker = "/w you";
    //     }

    //     for (let j = 0; j < posts.length; j++) {
    //         if (posts[j].ref_parent_post === i) {
    //             numberOfComments++;
    //         }
    //     }
    //     posts[i].author ? author = posts[i].author : author = "unknown";
    //     likeOrLikes = pluralOrNot(posts[i].likes.length, likeOrLikes);
    //     commentOrComments = pluralOrNot(numberOfComments, commentOrComments);
        
    //     displayPosts.push(
    //         <div key={i}>
    //             <Row>
    //                 <Col xs="12" className="postbody text-center">
    //                     <p className="quotes">"{posts[i].post}"<br></br><strong className="smallfont">- {author}</strong></p>
    //                 </Col>
    //             </Row>
    //             <Row className="text-center">
    //                 <Col onClick={() => toggleLike(posts[i])} xs="3">
    //                     <p className="smallfont">{posts[i].likes.length} {likeOrLikes} {liker}</p>
    //                 </Col>
    //                 <Col onClick={() => lookAtUser(posts[i].user)} xs="6">
    //                     {/* <p className="smallfont">{time.substring(0, 6)}<br></br>{time.substring(6, 11)}</p> */}
    //                     <p className="smallfont">Posted by<br></br>{posts[i].user.name}</p>
    //                 </Col>
    //                 <Col xs="3">
    //                     <p className="smallfont">{numberOfComments}<br></br>{commentOrComments}</p>
    //                 </Col>
    //             </Row>
    //         </div>
    //     )
    // };



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
                    <Col className="postbody text-center">
                        <p className="quotes">{bio}</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile
