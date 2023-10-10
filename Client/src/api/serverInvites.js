import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const ServerGroups = async () => {
  return new Promise((resolve, reject) => {
   
    var configuration = {
      method: 'get',
      url: `${config.api}/invites`,
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
            reject(error); // Reject the Promise with the error
          });
  });
}

export const ServerJoinGroup = async (inviteId) => {
  return new Promise((resolve, reject) => {
   
    var configuration = {
      method: 'post',
      url: `${config.api}/invites/${inviteId}`,
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
            reject(error); // Reject the Promise with the error
          });
  });
}

export const ServerLeaveInvite = async (inviteId) => {
  return new Promise((resolve, reject) => {
   
    var configuration = {
      method: 'delete',
      url: `${config.api}/invites/${inviteId}`,
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
            reject(error); // Reject the Promise with the error
          });
  });
}
