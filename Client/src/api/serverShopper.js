import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const ServerShopper = async (shopper) => {
  return new Promise((resolve, reject) => {
    var data = JSON.stringify({
      "store": shopper.store
    });
    
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
            console.log(JSON.stringify(response.data));
            const y = JSON.stringify(response.data);
            resolve(y); // Resolve the Promise with the value of 'y'
          })
          .catch(function (error) {
            console.log(error);
            reject(error); // Reject the Promise with the error
          });
  });
}
