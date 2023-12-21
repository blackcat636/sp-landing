import { defineStore } from 'pinia'
import {ref, computed} from 'vue';
import {fetchAuth,useMyFetch,useBackendFetch} from "../composables/fetchAuth";

import { storeToRefs } from 'pinia'
import { useUserStore } from './user';

interface UserPayloadInterface {
    username: string;
    password: string;
}
interface UserSignuploadInterface {
    password: string,
    username: string,
    email:string,
    repeat_password:string,
    invitation_code:string
}

export const useAuthStore = defineStore('auth', () => {
    const authenticated  = ref(false);
    const loading  = ref(false);
    const token = ref('');

    const userStore = useUserStore();

    const { user } = storeToRefs(userStore)
    getToken();


    async function authenticateUser({ username, password }: UserPayloadInterface) {

        const { isFetching, error, data } = await useMyFetch('auth').post({'username':username,'password':password});
        console.log(data.value)
        if(data.value){
            let res = JSON.parse(data.value);
            if(res.access_token){
                token.value = res.access_token;
                const tokenCookie = useCookie('token'); // useCookie new hook in nuxt 3
                tokenCookie.value = res.access_token; // set token to cookie
                authenticated.value = true;
                userStore.get_user();
                return navigateTo('/');
            }
        }
        return false
    }
    async function authenticateTgUser(user) {

        const { isFetching, error, data } = await useMyFetch('authtg').post({'tgUserData':user});
        console.log(data.value)
        if(data.value){
            let res = JSON.parse(data.value);
            if(res.access_token){
                token.value = res.access_token;
                const tokenCookie = useCookie('token'); // useCookie new hook in nuxt 3
                tokenCookie.value = res.access_token; // set token to cookie
                authenticated.value = true;
                userStore.get_user();
                return navigateTo('/');
            }
        }
        return false
    }
    function getToken(){
        const tokenCookie = useCookie('token'); // get token from cookies

        if(tokenCookie.value){
            token.value = tokenCookie.value;
            authenticated.value = true;
            console.log(user.value)
            userStore.get_user();
        }
        return null;
    }
    function logOut(){

        console.log('logOut');
        console.log(authenticated.value);
        const tokenCookie = useCookie('token'); // get token from cookies
        tokenCookie.value = null;
        token.value = '';
        authenticated.value = false;
        return navigateTo('/login');
    }

    async function registerUser({ username, password,email,repeat_password,invitation_code }: UserSignuploadInterface){

        const { isFetching, error, data } = await useMyFetch('register').post({
            'username':username,
            'password':password,
            'repeat_password':repeat_password,
            'email':email,
            'invite_code':invitation_code,
        });
        console.log(data.value)
        if(data.value){
            let res = JSON.parse(data.value);
            console.log(res.status)
            if(res.status == 'error_validate'){
                return res.data;
                token.value = res.access_token;
                const tokenCookie = useCookie('token'); // useCookie new hook in nuxt 3
                tokenCookie.value = res.access_token; // set token to cookie
                authenticated.value = true;
                userStore.get_user();
            }else if(res.status=='success'){
                // toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                return navigateTo('/');
            }
        }
        return false
    }

    return {authenticateUser,authenticateTgUser, authenticated, token, logOut,registerUser}
})
