import React from 'react';
import axios from 'axios';


export function axiosHelper(
    method,
    ext,
    data,
    headers,
    func = res => console.log(res)
    // failureFunction = error => console.log(error)
) {
    // const baseUrl = 'http://localhost:8000';
    const baseUrl = 'https://cors-anywhere.herokuapp.com/https://quoter-awesome.herokuapp.com';
    return axios({
        method,
        url: baseUrl + ext,
        data,
        headers
    })
        .then(res => func(res.data))
        .catch(e => console.log(e))
}