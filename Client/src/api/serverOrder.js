import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'
import { useNavigate } from "react-router-dom";

//   HELP///TODO  אם מוחקים את העוגיות - יחזור שגיאת אין גישה וצריך לעבור ללוגין
export const ServerOrder = (order) => {
  return new Promise((resolve, reject) => {
    var data = JSON.stringify(order);

    var configuration = {
      method: 'post',
      url: `${config.api}/orders`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
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

export const ServerOrderDetails = (orderId) => {
  return new Promise((resolve, reject) => {

    var configuration = {
      method: 'post',
      url: `${config.api}/orders/${orderId}`,
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

export const ServerMyOrders = () => {
  return new Promise((resolve, reject) => {

    var configuration = {
      method: 'get',
      url: `${config.api}/orders`,
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

export const ServerDeleteOrder = (orderId) => {
  return new Promise((resolve, reject) => {

    var configuration = {
      method: 'delete',
      url: `${config.api}/orders/${orderId}`,
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
