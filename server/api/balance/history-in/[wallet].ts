// import {fetchAuth,useMyFetch,useBackendFetch} from "../../composables/fetchAuth";
// import { useFetch } from '@vueuse/core'

export default defineEventHandler(async(event) => {
    const cookies = parseCookies(event);
    const token = cookies.token??false;
    if(!token){
        setResponseStatus(event, 401)
    }
    const config = useRuntimeConfig()
    const url = config.public.BACKEND_URL
    if(!token){
        setResponseStatus(event, 401)
    }
    const wallet = getRouterParam(event, 'wallet')
    return  $fetch(url+'/finance/invoice?page=1&wallet='+wallet,{
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'GET',
    }).then( response => {
        console.log(response)
        return (response)
    }).catch(e => {
        console.log(e)
        if(e.status==401){
            setResponseStatus(event, 401)
        }else{
            setResponseStatus(event, e.status)
        }
        // throw createError({
        //     statusCode: e.status,
        //     statusMessage: '',
        // })
        return ''
    });
    // const { data, pending, error, refresh } = await useFetch('http://api.tgclient.work/finance', {
    //     onRequest({ request, options }) {
    //         // Set the request headers
    //         options.headers = options.headers || {}
    //         options.headers.authorization = '...'
    //     },
    //     onRequestError({ request, options, error }) {
    //         // Handle the request errors
    //     },
    //     onResponse({ request, response, options }) {
    //         // Process the response data
    //         localStorage.setItem('token', response._data.token)
    //     },
    //     onResponseError({ request, response, options }) {
    //         // Handle the response errors
    //     }
    // })
    // const { data } = await useFetch('http://api.tgclient.work/finance', {
    //     async beforeFetch({ url, options, cancel }) {
    //         // const myToken = await getMyToken()
    //         //
    //         // if (!myToken)
    //         //     cancel()
    //
    //         options.headers = {
    //             ...options.headers,
    //             Authorization: `Bearer 18e388d9e4dae0e59b0c36d39b79ddac17fa8fea`,
    //         }
    //
    //         return {
    //             options,
    //         }
    //     },
    // })
    // return 'sdfsdfs';
    // const { isFetching, error, data } = useBackendFetch('finance');
    // // // localStorage.setItem('token', 'asdas')
    // // // return  fetch('https://api.tgclient.work/oauth2/rest/token').then((res) => res.json());
    // console.log(event)
    // console.log('asdas1')
    // console.log(isFetching)
    // console.log('asdas2')
    // console.log(data)
    // console.log('asdas3')
    // console.log(error.value)
    // console.log('asdas4')
    // return data
})
