import React from 'react';
import axios from 'axios';


export function axiosHelper(method, ext, data, headers, func) {
    const baseUrl = 'http://localhost:8000';
    return axios({
        method,
        url: baseUrl + ext,
        data,
        headers
    }
    ).then(res => func(res.data)).catch(e => console.log(e))
}