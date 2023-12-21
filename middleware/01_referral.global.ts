
export default defineNuxtRouteMiddleware((to, from) => {
    if(from.query.ref&&from.query.ref!=''){
        const rCode = useCookie('rCode'); // useCookie new hook in nuxt 3
        rCode.value = from.query.ref; // set token to cookie
    }
})
