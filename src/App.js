import Landing from './components/Landing'
import Posts from './components/Posts';


import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import './App.css';
// import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { AppProvider } from './utilities/AppContext';
// import { axiosHelper } from './utilities/axiosHelper';


function App() {


  // console.log(name, email, password);


  return (
    <>
      
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
            <div>
              <Posts />
            </div>

          </Route>
        </Switch>
        

      </Router>
    </>
  );
}

export default App;
