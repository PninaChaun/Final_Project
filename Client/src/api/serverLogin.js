import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const Serverlogin = async (user) => {
    var data = JSON.stringify(
        user
    );

    var configuration = {
        method: 'post',
        url: `${config.api}/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await fetchAxios(configuration)
        .then(function (response) {
            return JSON.stringify(response.data);

        })
        // .catch(function (error) {
        // });
}

export const ServerForgotPassword = async (email) => {

    var configuration = {
        method: 'put',
        url: `${config.api}/login/${email}`,
    };

    fetchAxios(configuration)
          .then(function (response) {
            const y = JSON.stringify(response.data);
            resolve(y); // Resolve the Promise with the value of 'y'
          })
          .catch(function (error) {
            reject(error); // Reject the Promise with the error
          });
}

export const ServerIfCodeTrue = async (email, code) => {

    return new Promise((resolve, reject) => {
    
        var configuration = {
            method: 'post',
            url: `${config.api}/login/${email}/${code}`,
        };
    
        fetchAxios(configuration)
              .then(function (response) {
                const y = JSON.stringify(response.data);
                resolve(y); // Resolve the Promise with the value of 'y'
              })
              .catch(function (error) {
                reject(error); // Reject the Promise with the error
              });
      });

}

export const ServerResetPassword = async (email, password) => {
    return new Promise((resolve, reject) => {
    var configuration = {
        method: 'put',
        url: `${config.api}/login/${email}/${password}`,
    };

    fetchAxios(configuration)
          .then(function (response) {
            const y = JSON.stringify(response.data);
            resolve(y); // Resolve the Promise with the value of 'y'
          })
          .catch(function (error) {
            reject(error); // Reject the Promise with the error
          });
    });
}