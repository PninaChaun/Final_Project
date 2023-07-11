import Cookies from 'js-cookie';
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const serverSaveBuy = async (orderId) => {

    return new Promise((resolve, reject) => {
        let shopId = Cookies.get('shopId')
        console.log('shopId cookie', shopId);
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


