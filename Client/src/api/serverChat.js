import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const ServerGetChats = (orderId) => {
    return new Promise((resolve, reject) => {
  
      var configuration = {
        method: 'get',
        url: `${config.api}/chat`,
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

export const serverAddChat = (otherId) => {
  return new Promise((resolve, reject) => {

    var configuration = {
      method: 'post',
      url: `${config.api}/chat/${otherId}`,
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
  export const serverDeleteChat = (otherId) => {
    return new Promise((resolve, reject) => {
  
      var configuration = {
        method: 'put',
        url: `${config.api}/chat/${otherId}`,
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
