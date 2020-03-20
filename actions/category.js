import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const Create = (category, token) => {
    return fetch(`${API}/category`, {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
       },
       body: JSON.stringify(category)
       })
       .then(function(response){
           return response.json();
       })
       .catch(error => console.log(error));       
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
       method: 'GET',
       })
       .then(function(response){
           return response.json();
       })
       .catch(error => console.log(error));       
};

export const SingleCategory = (slug) => {
    return fetch(`${API}/category/${slug}`, {
       method: 'GET',
       })
       .then(function(response){
           return response.json();
       })
       .catch(error => console.log(error));       
};

export const Remove = (slug, token) => {
    return fetch(`${API}/category/${slug}`, {
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
       .catch(error => console.log(error));       
};