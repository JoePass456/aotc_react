import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { axiosHelper } from './utilities/axiosHelper';
import { AppProvider } from './utilities/AppContext';
import Landing from './components/Landing';
import Posts from './components/Posts';
import Newpost from './components/Newpost';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Viewpost from './components/Viewpost';
import Editbio from './components/Editbio';
import Options from './components/Options';
import Viewprofile from './components/Viewprofile';
import Editpost from './components/Editpost';



function App() {

  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState({});
  const [name, setName] = useState("Loading");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(0);
  const [searchTag, setSearchTag] = useState("");
  const [targetUser, setTargetUser] = useState({});
  const [profileSwitch, setProfileSwitch] = useState(0);
  const [editSwitch, setEditSwitch] = useState(0);
  const [targetPost, setTargetPost] = useState({});
  // const [rating, setRating] = useState(0);
  // const [rank, setRank] = useState("");

  let myNumberOfPosts = 0;
  let myNumberOfLikes = 0;
  let myNumberOfComments = 0;
  let rating = 0;
  let rank = "";

  useEffect(() => {

    let lsToken = localStorage.getItem("token");

    if (lsToken) {
      context.setToken(lsToken);
      // console.log('logging in');

      let headers = {
        Accept: "application/json",
        Authorization: "Bearer " + lsToken
      };

      axiosHelper('get', '/api/user', {}, headers, getUser);
      
    }

  }, [])

  const getUser = (res) => {

    context.setId(res.id);
    context.setEmail(res.email);
    context.setName(res.name);
    // console.log(res);
    // console.log(context.id);
    if (res.bio) { context.setBio(res.bio) };
    // console.log('loaded data');

  };

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

    return array.sort(compare);

  };

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

  };

  function pluralOrNot(num, string) {

    if (num !== 1) {
      string += "s";
    }
    return string;

  };

  const toggleLike = (post) => {

    if (context.token) {
      let usersThatLike = [];

      // console.log(context.id);

      for (let i = 0; i < post.likes.length; i++) {
        usersThatLike.push(post.likes[i].user_id);
      }

      if (usersThatLike.includes(context.id)) {
        // console.log("sub like");

        let likeId = parseInt(post.likes[usersThatLike.indexOf(context.id)].id);

        let headers = {
          Accept: "application/json",
          Authorization: "Bearer " + context.token
        };

        let data = {
          id: likeId
        }

        axiosHelper('post', '/like/del', data, headers, setResponse);

      } else {
        // console.log("add like");

        let headers = {
          Accept: "application/json",
          Authorization: "Bearer " + context.token
        };

        let data = {
          post: post.id,
          user: context.id
        }

        axiosHelper('post', '/like/add', data, headers, setResponse);

      }

    }
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

    context.setTargetUser(user);
    context.setProfileSwitch(user.id);
    // console.log(user.id);

    // return <Redirect to="/viewpost"></Redirect>
  }

  const editPost = (post) => {

    // console.log("post:", post);
    context.setEditSwitch("post id:", post.id);
    context.setTargetPost(post);

  }


  const context = {
    secret: "tF5EW9bkleKy8lJI8yf96rJOSy9ysyweYKP6iQFu",
    loggedIn,
    setLoggedIn,
    token,
    setToken,
    newestFirst,
    reverseOrder,
    hottestOrder,
    pluralOrNot,
    toggleLike,
    formatTime,
    response,
    setResponse,
    lookAtUser,
    editPost,
    myNumberOfPosts,
    myNumberOfLikes,
    myNumberOfComments,
    name,
    setName,
    email,
    setEmail,
    id,
    setId,
    bio,
    setBio,
    rank,
    rating,
    searchTag,
    setSearchTag,
    targetUser,
    setTargetUser,
    profileSwitch,
    setProfileSwitch,
    editSwitch,
    setEditSwitch,
    setTargetPost,
    targetPost
  };

  return (
    <>
      <AppProvider value={context}>
        <Router>

          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
            <Route path="/newpost">
              <Newpost />
            </Route>
            <Route path="/viewpost">
              <Viewpost />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/editbio">
              <Editbio />
            </Route>
            <Route path="/options">
              <Options />
            </Route>
            <Route path="/viewprofile">
              <Viewprofile />
            </Route>
            <Route path="/editpost">
              <Editpost />
            </Route>
          </Switch>


        </Router>
      </AppProvider>
    </>
  );
}

export default App;
