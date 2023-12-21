import { defineStore } from 'pinia'
import {ref, computed, Ref, UnwrapRef} from 'vue';
import {fetchAuth,useMyFetch, useBackendFetch} from "../composables/fetchAuth";
import User from '@/types/User';


export const useUserStore = defineStore('user', () => {
    const user  = ref<User>(null);
    async function get_user() {

        // const { isFetching, error, data } = await useFetch('/api/customers' + queryParams);
        // let res = fetch('/api/customers' + queryParams).then((res) => res.json());

        const { isFetching, error, data } = await useMyFetch('account/me');
        // const { isFetching, error, data } = await useMyFetch('data/customers?' + queryParams);
        // const { isFetching, error, data } = await useMyFetch('status/404' + queryParams);
        let res = JSON.parse(data?.value);
        user.value =  res?.data;
    }

    async function uvtmCheck(breakeven,transfer_to_mel,cabinet){

        const { isFetching, error, data } = await useMyFetch('balance/uvtm').post({
            'breakeven':breakeven,
            'cabinet':cabinet,
            'transfer_to_mel':transfer_to_mel,
        });
        if(data.value){
            let res = JSON.parse(data.value);
            if(res.status == 'error_validate'){
                return res.data;
                token.value = res.access_token;
                const tokenCookie = useCookie('token'); // useCookie new hook in nuxt 3
                tokenCookie.value = res.access_token; // set token to cookie
                authenticated.value = true;
                userStore.get_user();
            }else if(res.status=='success'){
                let res = JSON.parse(data.value);
                user.value.uvtm = res.data.uvtm;
                // return navigateTo('/');
            }
        }
        return false
    }

    return { get_user, user }
})
