import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const ServerAdmin = () => {
  return new Promise((resolve, reject) => {

    var configuration = {
      method: 'get',
      url: `${config.api}/admin`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetchAxios(configuration)
      .then(function (response) {
        const y = JSON.stringify(response.data);
        resolve(y); // Resolve the Promise with the value of 'y'
      })
      .catch(function (error) {
        console.log(error);
        reject(error); // Reject the Promise with the error
      });
  });
}