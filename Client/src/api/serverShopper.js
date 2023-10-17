import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const ServerShopper = async (shopper) => {
  return new Promise((resolve, reject) => {
    var data = JSON.stringify(shopper);
    
    var configuration = {
      method: 'post',
      url: `${config.api}/shopper`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
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

export const serverInShop = async (shopper) => {
  return new Promise((resolve, reject) => {
    var data = JSON.stringify(shopper);
    
    var configuration = {
      method: 'get',
      url: `${config.api}/shopper`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
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


export const serverLeaveShop = async () => {
  return new Promise((resolve, reject) => {
    
    var configuration = {
      method: 'put',
      url: `${config.api}/shopper`,
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