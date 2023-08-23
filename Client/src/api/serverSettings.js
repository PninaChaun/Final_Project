import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const ServerGetUser = async () => {

    var configuration = {
        method: 'get',
        url: `${config.api}/login`,
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return await fetchAxios(configuration)
        .then(function (response) {
            return JSON.stringify(response.data);

        })
}

export const ServerUpdateUser = async (user) =>{
     var data = JSON.stringify(
            user
        );
    
        var configuration = {
            method: 'put',
            url: `${config.api}/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        return await fetchAxios(configuration)
            .then(function (response) {
                return JSON.stringify(response.data);
    
            })
            // .catch(function (error) {
            // });
}