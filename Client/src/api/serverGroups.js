import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const ServerGroups = async () => {
  return new Promise((resolve, reject) => {
   
    var configuration = {
      method: 'get',
      url: `${config.api}/groups`,
      headers: { 
        'Content-Type': 'application/json'
      }
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

export const ServerGroupsMembers = async (group_id) => {

return new Promise((resolve, reject) => {
   
    var configuration = {
      method: 'get',
      url: `${config.api}/groups/${group_id}`,
      headers: { 
        'Content-Type': 'application/json'
      }
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