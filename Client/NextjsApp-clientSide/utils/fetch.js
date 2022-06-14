import axios from 'axios';
import React from 'react';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from './constant';

const token = Cookies.get(ACCESS_TOKEN_KEY);
const authchek = "Bearer " + token;
export const fetchAPI = async (url,method,data,auth = true) =>{
    const headers = {
        'Content-Type': 'aplication/json',
        "Access-Control-Allow-Origin": "*",
        Authorization : authchek || ''
    };
    if(method === "POST") {
        return await axios.post(url,data,{headers :headers}).then((data) =>{
            return data;
        })
    }
    if(method === "GET") {
        return await axios.get(url,data,{headers :headers}).then((data) =>{
            return data;
        })
    }
}
