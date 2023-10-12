import Cookies from 'js-cookie';
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const FindCustomer = async (shopId) => {
    let prevTime = Cookies.get('prevRequest') ?? new Date(1970,1)

    var data = JSON.stringify(
        {
          "shopId":shopId,
        }
        );

    var configuration = {
        method: 'put',
        url: `${config.api}/shopper/${prevTime}`,
        headers: {
            'Content-Type': 'application/json'
        }
        ,data:data
    };

    return await fetchAxios(configuration)
        .then(function (response) {
           Cookies.set('prevRequest',new Date(response.data.newPrevDate))
            return JSON.stringify(response.data);
        })
        
}


