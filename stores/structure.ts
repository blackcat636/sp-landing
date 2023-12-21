import { defineStore } from 'pinia'
import {ref, computed} from 'vue';
import {useMyFetch, } from "../composables/fetchAuth";
import {StructureUser} from '@/types/Structure';


export const useStructureStore = defineStore('structure', () => {
    const list = ref<StructureUser>([]);
    const binaryTree = ref<StructureUser>([]);
    const binaryInfo = ref({
        'count_left':0,
        'count_right':0,
        'turnover_left':0,
        'turnover_right':0,
    })
    const count_first_line = ref(0)
    const count_binary = ref(0)

    const list_career = ref([
        {id: 1, purchase: 100, turnover: 0, income_first_line: 10, income_binary: 0},
        {id: 2, purchase: 100, turnover: 1000, income_first_line: 10, income_binary: 10},
        {id: 3, purchase: 200, turnover: 5000, income_first_line: 10, income_binary: 15},
        {id: 4, purchase: 500, turnover: 10000, income_first_line: 10, income_binary: 20},
        {id: 5, purchase: 1000, turnover: 20000, income_first_line: 10, income_binary: 25},
        {id: 6, purchase: 2000, turnover: 100000, income_first_line: 10, income_binary: 30},
        {id: 7, purchase: 5000, turnover: 500000, income_first_line: 10, income_binary: 35},
    ]);


    const loadingList = ref(false)
    upd_list();
    upd_list_binary();
    // setTimeout(() => {
    //     get_transaction('usdt')
    // }, 1000)

    async function upd_list() {

        loadingList.value = true;
        const { isFetching, error, data } = await useMyFetch('structure/list');
        let res = JSON.parse(data.value);
        list.value =  res.data.items;
        count_first_line.value = res.data.info.count;
        loadingList.value = false;
    }
    async function upd_list_binary() {

        loadingList.value = true;
        const { isFetching, error, data } = await useMyFetch('structure/binary');
        let res = JSON.parse(data.value);
        binaryTree.value =  res.data.items;
        binaryInfo.value.count_left = res.data.info.count_left;
        binaryInfo.value.count_right = res.data.info.count_right;
        binaryInfo.value.turnover_left = res.data.info.turnover_left;
        binaryInfo.value.turnover_right = res.data.info.turnover_right;
        count_binary.value = binaryInfo.value.count_right + binaryInfo.value.count_left;
        loadingList.value = false;
    }


    return { list, binaryTree,binaryInfo, list_career,count_first_line,count_binary, loadingList }
})
