// import {fetchAuth,useMyFetch,useBackendFetch} from "../../composables/fetchAuth";
// import { useFetch } from '@vueuse/core'
export default defineEventHandler(async(event) => {
    const cookies = parseCookies(event);
    const token = cookies.token??false;

    const config = useRuntimeConfig()
    let url = config.public.BACKEND_URL

    let cookieLang = await getCookie(event,'i18n_lang');
    if(!cookieLang){
        cookieLang = 'en'
    }
    url = url + cookieLang + '/'
    if(!token){
        setResponseStatus(event, 401)
    }

    return  $fetch(url+'finance',{
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
})
