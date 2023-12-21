import { defineStore } from 'pinia'
import {ref, computed} from 'vue';
import {useMyFetch, } from "../composables/fetchAuth";
import {Product,Image} from '@/types/Market';


export const useMarketStore = defineStore('market', () => {
    const list = ref<Product>([]);

    const loadingList = ref(false);


    upd_list()
    // setTimeout(() => {
    //     get_transaction('usdt')
    // }, 1000)

    async function upd_list() {
        loadingList.value = true;
        const { isFetching, error, data } = await useMyFetch('market/list?country=ua&category=');
        let res = JSON.parse(data?.value);
        list.value =  res?.data.items;
        loadingList.value = false
    }


    return { list, loadingList }
})
