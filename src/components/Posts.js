import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { Col, Row, Container } from 'reactstrap';
// import { Redirect } from 'react-router-dom';
import AppContext from '../utilities/AppContext';
import { axiosHelper } from '../utilities/axiosHelper';
import Headbar from '../components/Headbar';
import Footer from '../components/Footer';
import Spacer from '../components/Spacer';

export default function Posts() {
    const context = useContext(AppContext);

    const [postsOrder, setPostsOrder] = useState('');
    const [rawPosts, setRawPosts] = useState([]);
    const [displayPosts, setDisplayPosts] = useState(["loading"]);

    useEffect(() => axiosHelper('get', '/posts/all', {}, {}, setRawPosts), [context.response]);
    useEffect(() => {
        let posts = [...rawPosts];

        if (posts.length > 0) {

            // posts = rawPosts;
            if (postsOrder === "oldest") {
                posts = context.reverseOrder(rawPosts);
            }
            if (postsOrder === "hottest") {
                posts = context.hottestOrder(rawPosts);
            }
            if (postsOrder === "newest") {
                posts = context.newestFirst(rawPosts);
            }

            let temp = [];


            for (let i = (posts.length - 1); i >= 0; i--) {
                let likeOrLikes = "like";
                let commentOrComments = "comment";
                let numberOfComments = 0;
                // let replyOrNewPost = "";
                let author = "";
                // posts[i].ref_parent_post ? replyOrNewPost = "Reply" : replyOrNewPost = "New Post";
                // let time = context.formatTime(posts[i].created_at);
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
                temp.push(
                    <div key={i}>
                        <Row>
                            <Col xs="12" className="postbody text-center">
                                <p className="quotes">"{posts[i].post}"<br></br><strong className="smallfont">- {author}</strong></p>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col className="col-3" onClick={() => context.toggleLike(posts[i])}>
                                <p className="smallfont">{posts[i].likes.length} {likeOrLikes} {liker}</p>
                            </Col>
                            <Col className="col-6" onClick={() => context.lookAtUser(posts[i].user)}>
                                {/* <p className="smallfont">{time.substring(0, 6)}<br></br>{time.substring(6, 11)}</p> */}
                                <p className="smallfont">Posted by<br></br>{posts[i].user.name}</p>
                            </Col>
                            <Col className="col-3">
                                <p className="smallfont">{numberOfComments}<br></br>{commentOrComments}</p>
                            </Col>
                        </Row>
                    </div>
                )
            }
            setDisplayPosts(temp);
        }
    }, [postsOrder, rawPosts]);

    return (
        <Container className="postsbg">
            <Headbar changePostsOrder={setPostsOrder} />
            <Spacer spaces="3" />
            <Container className="">
                {displayPosts}
            </Container>
            <Spacer spaces="1" />
            <Footer />
        </Container>
    )
} 