import Cookies from 'js-cookie';
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const serverSaveBuy = async (orderId,shopId) => {

    return new Promise((resolve, reject) => {
        var data = JSON.stringify({'shopId':shopId});
    
        var configuration = {
            method: 'post',
            url: `${config.api}/shopper/${orderId}`,
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


