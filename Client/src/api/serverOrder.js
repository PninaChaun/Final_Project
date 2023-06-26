import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'
import { useNavigate } from "react-router-dom";

export const ServerOrder=  (order) => {
  ///TODO  אם מוחקים את העוגיות - יחזור שגיאת אין גישה וצריך לעבור ללוגין
 
    var data = JSON.stringify(order);
    
    var configuration = {
      method: 'post',
      url: `${config.api}/orders`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    fetchAxios(configuration)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}