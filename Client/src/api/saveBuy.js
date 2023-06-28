import config from '../config.js';
import fetchAxios from './interceptor.js'

export const saveBuy = async (orderId) => {

    var configuration = {
        method: 'post',
        url: `${config.api}/shopper/${orderId}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await fetchAxios(configuration)
        .then(function (response) {
            console.log(response.data);
            return JSON.stringify(response.data);
        })
        
}


