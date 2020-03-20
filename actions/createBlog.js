import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createBlog = (blog, token) => {
    return fetch(`${API}/blog`, {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Authorization': `Bearer ${token}`
       },
       body: blog
       })
       .then(function(response){
           return response.json();
       })
       .catch(error => console.log(error));       
};