import Cookies from 'js-cookie';
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const FindCustomer = async () => {
    let prevTime = Cookies.get('prevRequest') ?? new Date(1970,1)

    var configuration = {
        method: 'get',
        url: `${config.api}/shopper/${prevTime}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await fetchAxios(configuration)
        .then(function (response) {
            Cookies.set('prevRequest',new Date(response.data.newPrevDate))
            return JSON.stringify(response.data);
        })
        
}


