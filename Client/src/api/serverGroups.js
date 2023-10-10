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
            const y = JSON.stringify(response.data);
            resolve(y); // Resolve the Promise with the value of 'y'
          })
          .catch(function (error) {
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
            const y = JSON.stringify(response.data);
            resolve(y); // Resolve the Promise with the value of 'y'
          })
          .catch(function (error) {
            reject(error); // Reject the Promise with the error
          });
  });

}

export const ServerInvite = async (group_id, email, name) => {

  return new Promise((resolve, reject) => {
    var data = JSON.stringify(
      {
        "name":name,
        "email":email
      }
      );
     
      var configuration = {
        method: 'post',
        url: `${config.api}/groups/${group_id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data:data
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

  export const ServerCreateGroup = async (name) => {

    return new Promise((resolve, reject) => {
      var data = JSON.stringify(
        {
          "name":name
        }
        );
       
        var configuration = {
          method: 'post',
          url: `${config.api}/groups`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data:data
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
  
    export const ServerRemoveMember = async (group_id) => {

      return new Promise((resolve, reject) => {
        var data = JSON.stringify(
          {
            "group_id":group_id
          }
          );
         
          var configuration = {
            method: 'put',
            url: `${config.api}/groups`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data:data
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