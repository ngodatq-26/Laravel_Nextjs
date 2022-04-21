import axios from 'axios';
import React from 'react';

export const fethAPI = async (url,method,data,auth = true) =>{
    const headers = {
        'Content-Type': 'aplication/json',
        "Access-Control-Allow-Origin": "*"
    };
    if(method === "POST") {
        return await axios.post(url,data,true,headers).then((data) =>{
            return data;
        })
    }
    if(method === "GET") {
        return await axios.post(url,data,true,headers).then((data) =>{
            return data;
        })
    }
}
