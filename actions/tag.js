import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const Create = (tag, token) => {
    return fetch(`${API}/tag`, {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
       },
       body: JSON.stringify(tag)
       })
       .then(function(response){
           return response.json();
       })
       .catch(err => console.log(err));       
};

export const Get = () => {
    return fetch(`${API}/tags`, {
       method: 'GET',
       })
       .then(function(response){
           return response.json();
       })
       .catch(err => console.log(err));       
};

export const SingleTag = (slug) => {
    return fetch(`${API}/tag/${slug}`, {
       method: 'GET',
       })
       .then(function(response){
           return response.json();
       })
       .catch(err => console.log(err));       
};

export const Remove = (slug, token) => {
    return fetch(`${API}/tag/${slug}`, {
       method: 'DELETE',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
       },
       })
       .then(function(response){
           return response.json();
       })
       .catch(err => console.log(err));       
};