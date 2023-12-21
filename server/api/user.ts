import {fetchAuth,useMyFetch,useBackendFetch} from "../../composables/fetchAuth";


export default defineEventHandler((event) => {

    const { isFetching, error, data } = useBackendFetch('oauth2/rest/token').post();
    // return  fetch('https://httpbin.org/status/401').then((res) => res.json());
    // console.log(res.customers)
    // // let res = JSON.parse(data_array.value);
    // return JSON.stringify(data_array)
})
