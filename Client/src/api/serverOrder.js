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