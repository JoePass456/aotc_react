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



function App() {

  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState({});
  const [name, setName] = useState("Loading");
  const [bio, setBio] = useState("Mysterious stranger");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(0);

  let myNumberOfPosts = 0;
  let myNumberOfLikes = 0;
  let myNumberOfComments = 0;

  useEffect(() => {

    let lsToken = localStorage.getItem("token");

    if (lsToken) {
      setToken(lsToken);
    }

  }, [])

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
      
      console.log(context.id);

      for (let i = 0; i < post.likes.length; i++) {
        usersThatLike.push(post.likes[i].user_id);
      }

      if (usersThatLike.includes(context.id)) {
        console.log("sub like");

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
        console.log("add like");

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
    console.log(user);

    // return <Redirect to="/viewpost"></Redirect>
  }


  const context = {
    secret: "79O8m2z2hQ7Di0K2JTQzeBZ265jnPtJHo5sPE0n5",
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
    setBio
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
          </Switch>


        </Router>
      </AppProvider>
    </>
  );
}

export default App;
