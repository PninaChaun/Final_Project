import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const ServerShopper = async (shopper) => {
    
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

    return await fetchAxios(configuration )
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return JSON.stringify(response.data);

        })
        // .catch(function (error) {
        //     console.log(error);
        // });
}

