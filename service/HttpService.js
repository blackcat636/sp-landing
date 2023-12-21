import { useFetch } from '@vueuse/core'

export const HttpService = async => {

    const getData = async (url, query)=>{
        const { data, pending, error, refresh } = await useFetch(url, {
            onRequest({ request, options }) {
                // Set the request headers
                // options.headers = options.headers || {}
                // options.headers.authorization = '...'
                console.log('1');
            },
            onRequestError({ request, options, error }) {
                // Handle the request errors
                console.log('2');
            },
            onResponse({ request, response, options }) {
                // Process the response data
                // localStorage.setItem('token', response._data.token)
                console.log('3');
                return data;
            },
            onResponseError({ request, response, options }) {
                // Handle the response errors
                console.log('4')
            }
        })
    }

};
