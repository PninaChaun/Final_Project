import axios from "axios";
import config from '../config.js';
import fetchAxios from './interceptor.js'

export const Serverlogin = async (user) => {
    var data = JSON.stringify(
        user
    );

    var configuration = {
        method: 'post',
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