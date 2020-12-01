import Header from '../components/Header';
import React, { useState } from 'react'
// import AppContext from '../utilities/AppContext';
import { Button } from 'reactstrap';
import { axiosHelper } from '../utilities/axiosHelper';

function Register() {

    // const [regRes, setRegRes] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onNameChange = (e) => {
        setName(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };



    const signUp = (res) => {

        // setRegRes(res);

        if (res !== {}) {

            console.log(res);

            localStorage.setItem("token", res.data.token);
            // localStorage.setItem("name", name);
            // localStorage.setItem("email", email);

        } else {
            console.log('Error, no data returned!');
        }
    }
    const loginInfo = {
        name: name,
        email: email,
        password: password
    }


    return (
        <>
            <Header heading="QWITTER" />
            <div>Input Name: </div>
            <input value={name} onChange={onNameChange} />
            <div>Input Password: </div>
            <input type="password" value={password} onChange={onPasswordChange} />
            <div>Input Email: </div>
            <input type="email" value={email} onChange={onEmailChange} />
            <Button onClick={() => axiosHelper('post', '/register', loginInfo, {}, signUp)}>SignUp</Button>
        </>
    )
}

export default Register
