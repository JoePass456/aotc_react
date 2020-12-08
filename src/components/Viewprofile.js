import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { axiosHelper } from '../utilities/axiosHelper';
import AppContext from '../utilities/AppContext';
import Spacer from '../components/Spacer';
import Backfooter from '../components/Backfooter';

function Viewprofile() {
    const context = useContext(AppContext);

    const [profileOrder, setProfileOrder] = useState('newest');
    const [profilePosts, setProfilePosts] = useState([]);
    const [displayProfile, setDisplayProfile] = useState(["Loading"]);

    useEffect(() => axiosHelper('get', '/posts/all', {}, {}, setProfilePosts), [context.response, context.bio]);
    useEffect(() => {

        context.setProfileSwitch(0);

        context.myNumberOfPosts = 0;
        context.myNumberOfLikes = 0;
        context.myNumberOfComments = 0;
        

        let posts = [...profilePosts];
        // console.log(posts);

        if (posts.length > 0) {
            console.log(posts);

            posts = profilePosts;
            if (profileOrder === "oldest") {
                posts = context.reverseOrder(posts);
            }
            if (profileOrder === "hottest") {
                posts = context.hottestOrder(posts);
            }
            if (profileOrder === "newest") {
                posts = context.newestFirst(posts);
            }

            let temp = [];


            for (let i = (posts.length - 1); i >= 0; i--) {
                let likeOrLikes = "like";
                let commentOrComments = "comment";
                let numberOfComments = 0;
                let replyOrNewPost = "";
                let author = "";
                posts[i].ref_parent_post ? replyOrNewPost = "Reply" : replyOrNewPost = "New Post";
                // let time = context.formatTime(posts[i].created_at);
                let usersThatLike = [];
                let liker = "";

                for (let k = 0; k < posts[i].likes.length; k++) {
                    usersThatLike.push(posts[i].likes[k].user_id);
                }
                if (usersThatLike.includes(context.id)) {
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

                if (context.targetUser.id == posts[i].user.id) {
                    context.myNumberOfPosts++;
                    context.myNumberOfLikes += posts[i].likes.length;
                    context.myNumberOfComments += numberOfComments;
                    context.rating = (context.myNumberOfPosts * 5 + context.myNumberOfLikes);
                    switch (true) {
                        case (context.rating >= 100):
                            context.rank = "Human Wiki";
                            break;
                        case (context.rating >= 50):
                            context.rank = "Veteran Quoter"
                            break;
                        case (context.rating >= 20):
                            context.rank = "Beginner Quoter";
                            break;
                        case (context.rating >= 10):
                            context.rank = "Noob Quoter";
                            break;
                        default:
                            context.rank = "Wallflower";
                    }
                    temp.push(
                        <div key={i}>
                            <Row>
                                <Col xs="12" className="postbody text-center">
                                    <p className="quotes">"{posts[i].post}"<br></br><strong className="smallfont">- {author}</strong></p>
                                </Col>
                            </Row>
                            <Row className="text-center">
                                <Col className="clip" onClick={() => context.toggleLike(posts[i])} xs="3">
                                    <p className="smallfont">{posts[i].likes.length} {likeOrLikes} {liker}</p>
                                </Col>
                                <Col className="clip" onClick={() => context.lookAtUser(posts[i].user)} xs="6">
                                    {/* <p className="smallfont">{time.substring(0, 6)}<br></br>{time.substring(6, 11)}</p> */}
                                    <p className="smallfont">Posted by<br></br>{posts[i].user.name}</p>
                                </Col>
                                <Col className="clip" xs="3">
                                    <p className="smallfont">{posts[i].tag}</p>
                                </Col>
                            </Row>
                        </div>
                    )
                } else {
                    // console.log('nope', context.id);
                }
            }
            setDisplayProfile(temp);
        }
    }, [profileOrder, profilePosts])

    return (
        <>
            
            <Container className="postsbg">
                <Row>
                    <Col className="text-center col-12">
                        <h4 className="name">{context.targetUser.name}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center col-12">
                        <p className="bio">{context.targetUser.bio}</p>
                            
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">

                        <h5 className="orb">Stats:</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-6">
                        <Row className="">
                            <Col className="col-12">
                                <p className="orb">Total Quotes: {context.myNumberOfPosts}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12">
                                <p className="orb">Total Likes: {context.myNumberOfLikes}</p>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col className="col-12">
                                <p className="orb">Total Comments: {context.myNumberOfComments}</p>
                            </Col>
                        </Row> */}
                    </Col>
                    <Col className="col-6">
                        <Row>
                            <Col className="bio text-center">
                                <p>"Rating"</p>
                                <p>{context.rating}</p>
                                <p>{context.rank}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className="orb">{(displayProfile.length > 0) ? `Latest ${context.pluralOrNot(context.myNumberOfPosts, 'quote')}` : 'Quote your first quote!'}</h5>
                    </Col>
                </Row>
                <Row>
                    <Container>
                        {displayProfile}
                    </Container>
                </Row>
                <Backfooter link="/posts" />
                <Spacer spaces="15" />
            </Container>
        </>
    )
}


export default Viewprofile
