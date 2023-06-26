import Cookies from 'js-cookie';
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const FindCustomer = async () => {
    console.log(Cookies.get('prevRequest') ?? new Date(1970,1));
    // let prevTime = Cookies.get('prevRequest') ?? new Date(1970,1)

    var data = JSON.stringify({
        "prevTime": prevTime
      });

      console.log(data,'dataaaaaaaaaaaaaaaaaaaaaaaaa');
      
    var configuration = {
        method: 'get',
        url: `${config.api}/shopper`,
        headers: {
            'Content-Type': 'application/json'
        },
        data:data
    };

    return await fetchAxios(configuration)
        .then(function (response) {
            console.log(JSON.stringify(response.data),'resposneeeeeeeee');
            Cookies.set('prevRequest', response.data.newPrevDate)
            return JSON.stringify(response.data);

        })
        
}


