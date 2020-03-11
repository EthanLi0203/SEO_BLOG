require('es6-promise').polyfill();
require('isomorphic-fetch');
import { API } from '../config';
import cookie from 'js-cookie'

export const signup = user => {
     return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        })
        .then(function(response){
            return response.json();
        })
        .catch(err => console.log(err));
        
};

export const signin = user => {
    return fetch(`${API}/signin`, {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(user)
       })
       .then(function(response){
           return response.json();
       })
       .catch(err => console.log(err));
       
};
// set cookie
export const setCookie = (key, value) => {
    if(process.browser){
        cookie.set(key, value, {
            expires: 1
        })
    }
}
// get cookie
export const getCookie = (key) => {
    if(process.browser){
       return cookie.get(key)
    }
}

// remove cookie
export const removeCookie = (key) => {
    if(process.browser){
        cookie.remove(key, {
            expires:1
        })
    }
}

// local storage
export const setLocalStorage = (key, value) => {
    if(process.browser){
        localStorage.setItem(key, JSON.stringify(value))
    }
}
export const removeLocalStorage = (key) => {
    if(process.browser){
        localStorage.removeItem(key);
    }
}

// authenticate
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next()
}

export const isAuth = () => {
    if(process.browser){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false;
            }
        }
    }
}

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    return fetch(`${API}/signout`, {
        method: 'GET'
    }).then(response => {
        console.log(response);
    }).catch(error => console.log(error))
}















