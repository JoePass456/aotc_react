import Landing from './components/Landing';
import Posts from './components/Posts';
import Newpost from './components/Newpost';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import './App.css';
// import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppProvider } from './utilities/AppContext';
// import { axiosHelper } from './utilities/axiosHelper';


function App() {
  // const [name, setName] = useState("");
  // const [id, setId] = useState("");
  // const [email, setEmail] = useState("");
  // const [token, setToken] = useState("");

  // console.log(name, email, password);
  const context = {
    appName: "Quoter", 
    secret: "79O8m2z2hQ7Di0K2JTQzeBZ265jnPtJHo5sPE0n5",
    // name: name,
    // setName: setName,
    // id: id,
    // setId: setId,
    // email: email,
    // setEmail: setEmail,
    // token: token,
    // setToken: setToken
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
          </Switch>


        </Router>
      </AppProvider>
    </>
  );
}

export default App;
