import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppProvider } from './utilities/AppContext';
import Landing from './components/Landing';
import Posts from './components/Posts';
import Newpost from './components/Newpost';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Viewpost from './components/Viewpost';


function App() {

  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [rawPosts, setRawPosts] = useState(null);

  useEffect(() => {

    let lsToken = localStorage.getItem("token");

    if (lsToken) {
      setToken(lsToken);

    }

  }, [])

  const context = {
    secret: "79O8m2z2hQ7Di0K2JTQzeBZ265jnPtJHo5sPE0n5",
    loggedIn,
    setLoggedIn,
    token,
    setToken,
    rawPosts, 
    setRawPosts
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
          </Switch>


        </Router>
      </AppProvider>
    </>
  );
}

export default App;
