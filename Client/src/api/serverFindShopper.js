import Cookies from 'js-cookie';
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const FindShopper = async (orderId) => {

    var configuration = {
        method: 'get',
        url: `${config.api}/orders/${orderId}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await fetchAxios(configuration)
        .then(function (response) {
            if(response.status == 404){
                return {}
            }
            return JSON.stringify(response.data);
        })     
}


