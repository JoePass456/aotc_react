import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { axiosHelper } from '../utilities/axiosHelper';

function Login() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const callLogIn = () => {

        let logInInfo = {
            grant_type: "password",
            client_id: 2,
            client_secret: "UO9tke5M8T7A3xjJD5VXQgOXpDJ7kVTMSIVtcD1x",
            password: password,
            username: email,
            scope: ""
        }

        axiosHelper('post', '/v1/oauth/token', logInInfo, {}, getLogIn);

    }


    const getLogIn = (res) => {

        if (res !== {}) {

            console.log(res.access_token);

            localStorage.setItem("token", res.access_token);
            // localStorage.setItem("name", name);
            // localStorage.setItem("email", email);

        } else {
            console.log('Error, no data returned!');
        }
    }

    return (
        <div>
            <div>Input Password: </div>
            <input type="password" value={password} onChange={onPasswordChange} />
            <div>Input Email: </div>
            <input type="email" value={email} onChange={onEmailChange} />
            <Button onClick={callLogIn}>Login</Button>
        </div>
    )
}

export default Login
