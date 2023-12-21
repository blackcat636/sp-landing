
import {useBackendFetch,useMyFetch} from "../../composables/fetchAuth";


export default defineEventHandler(async(event) => {
    // const { isFetching, error, data } = useBackendFetch('oauth2/rest/token').post();
    // localStorage.setItem('token', 'asdas')
    // return  fetch('https://api.tgclient.work/oauth2/rest/token').then((res) => res.json());
    const cookies = parseCookies(event);
    const token = cookies.token??false;
    const config = useRuntimeConfig()
    let url = config.public.BACKEND_URL
    if(!token){
        setResponseStatus(event, 401)
    }
    const body = await readBody(event);
    let cookieLang = await getCookie(event,'i18n_lang');
    if(!cookieLang){
        cookieLang = 'en'
    }
   url = url + cookieLang + '/'

    return  $fetch(url+'finance/convert-blr',{
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body:{
          'amount':        body.amount,
          'direction':     body.direction,
        },
        method: 'POST',
    }).then( response => {
        console.log(response)
        return (response)
    }).catch(e => {
        console.log(e.data)
        console.log(e.status)
        const myOptions = { status: 403, statusText: e.status };
        const myResponse = new Response(e.data, myOptions);
        // return myResponse;
        // return e.data
        // throw createError({
        //     statusCode: e.status,
        //     statusMessage: JSON.stringify(e),
        // })
         const request = new Response()
        if(e.status==401) {
            setResponseStatus(event, 401, JSON.stringify(e.data))
        }else if(e.status==403){
            setResponseStatus(event, 403)
        }else{
            setResponseStatus(event, e.status)
        }
        return ''
    });
    console.log(event)
    const client_id = 'test';
    const grant_type = 'password';
    console.log(body)
    console.log(body.username)
    console.log(body.password)
    // ,'client_id':'test','grant_type':'password'
    // console.log(data)
    // console.log(error)
    // // let res = JSON.parse(data_array.value);
    // return JSON.stringify(data_array)
})
