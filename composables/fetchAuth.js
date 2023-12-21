import { useFetch,createFetch } from '@vueuse/core'

import {storeToRefs} from "pinia";
import { useAuthStore } from '@/stores/auth';


export const useMyFetch = createFetch({
  // baseUrl: 'https://www.primefaces.org/',
  // baseUrl: 'https://httpbin.org/',
  baseUrl: '/api',
  combination: 'overwrite',
  options: {
    // beforeFetch in pre-configured instance will only run when the newly spawned instance do not pass beforeFetch
    async beforeFetch({ options }) {
      // console.log('beforeFetch');
      // const myToken = await getMyToken()
      // options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    },
    async onFetchError({ data, response, error}) {

      const authStore = useAuthStore();

      // const { logOut } = storeToRefs(authStore);
      // console.log('FetchError');
      // console.log(data)
      // console.log(response)
      // console.log(response.status)
      if(response.status===401){
        authStore.logOut()
        // const tokenCookie = useCookie('token'); // get token from cookies
        //
        // token.value = null;
      }
      // console.log(error)
    },
  },
})
export const useNodeFetch = createFetch({
  baseUrl: 'http://localhost:8000/api',
  // baseUrl: 'https://token.untime.tech/api',
  combination: 'overwrite',
  options: {
    // beforeFetch in pre-configured instance will only run when the newly spawned instance do not pass beforeFetch
    async beforeFetch({ options }) {
      // console.log('beforeFetch');
      // const myToken = await getMyToken()
      // options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    },
    async onFetchError({ data, response, error}) {

    },
  },
})
export const useBackendFetch = createFetch({
  // baseUrl: 'https://www.primefaces.org/',
  // baseUrl: 'https://httpbin.org/',
  // baseUrl: 'https://account.untime.tech/',
  baseUrl: 'https://api.tgclient.work/',
  // combination: 'overwrite',
  updateDataOnError: true,
  options: {
    // beforeFetch in pre-configured instance will only run when the newly spawned instance do not pass beforeFetch
    async beforeFetch({ options }) {
      // console.log('beforeFetch');
      const tokenCookie = useCookie('token'); // useCookie new hook in nuxt 3
      options.headers.Authorization = `Bearer ${tokenCookie.value}`

      return { options }
    },
    // onFetchError(ctx) {
    //   // ctx.data can be null when 5xx response
    //   console.log(ctx)
    //   // if (ctx.data === null)
    //   //   ctx.data = { title: 'Hunter x Hunter' } // Modifies the response data
    //   //
    //   // ctx.error = new Error('Custom Error') // Modifies the error
    //   return ctx
    // },
  },
})
export async function fetchAuth( url ){
  const { isFetching, error, data } = useFetch(url, {
    // async beforeFetch({ url, options, cancel }) {
    //   const myToken = await getMyToken()
    //
    //   if (!myToken)
    //     cancel()
    //
    //   options.headers = {
    //     ...options.headers,
    //     Authorization: `Bearer ${myToken}`,
    //   }
    //
    //   return {
    //     options,
    //   }
    // },
  });
  // console.log(data)
  return data;
  // const {  data, pending, error, refresh,status } = await useFetch(url, {
  //   onRequest({ request, options }) {
  //     // Set the request headers
  //     // options.headers = options.headers || {}
  //     // options.headers.authorization = '...'
  //     console.log('1');
  //   },
  //   onRequestError({ request, options, error }) {
  //     // Handle the request errors
  //     console.log('2');
  //   },
  //   onResponse({ request, response, options }) {
  //     // Process the response data
  //     // localStorage.setItem('token', response._data.token)
  //     console.log('3');
  //     console.log(response.status);
  //     console.log('asas');
  //     console.log(url);
  //     return data;
  //   },
  //   onResponseError({ request, response, options }) {
  //     // Handle the response errors
  //     console.log('4')
  //   }
  // });
}
