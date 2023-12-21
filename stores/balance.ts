import { defineStore } from 'pinia'
import {ref, computed, Ref, UnwrapRef} from 'vue';
import {fetchAuth,useMyFetch, useBackendFetch} from "../composables/fetchAuth";
import {Balance,Breakeven} from '@/types/Balance';
import {useCustomersStore} from "./customer";
import history from "../server/api/history";


export const useBalanceStore = defineStore('balance', () => {
    const balance = ref<Balance>({
        'usdt': 0,
        'blr': 0,
        'bst': 0
    });

    const blr = ref({
        'course_blr':1,
        'freeze':0,
        'unfreeze_percent':1,
        'unfreeze_next_amount':0,
        'unfreeze_next_date':0,
        'max_profit':10,
    })
    const bst = ref({
        'course_bst':0.01,
    })
    const list_bst_level = ref([
        {id: 1, amount: 1000, percent: 0.3, all_percent: 1.3},
        {id: 2, amount: 5000, percent: 0.5, all_percent: 1.5},
        {id: 3, amount: 10000, percent: 0.8, all_percent: 1.8},
        {id: 4, amount: 20000, percent: 1, all_percent: 2},
        {id: 5, amount: 30000, percent: 1.3, all_percent: 2.3},
        {id: 6, amount: 50000, percent: 1.8, all_percent: 2.8},
        {id: 7, amount: 100000, percent: 2.5, all_percent: 3.5}
    ]);
    const list_bst_amount = ref({
        1000:1,
        5000:2,
        10000:3,
        20000:4,
        30000:5,
        50000:6,
        100000:7,
    });
    const transactions = ref([])
    const historyIn = ref([])
    const historyOut = ref([])
    const breakevenList = ref<Breakeven>([])

    const loadingRefill = ref(false);


    upd_balance();
    // setTimeout(() => {
    //     get_transaction('usdt')
    // }, 1000)

    async function upd_balance() {

        const { isFetching, error, data } = await useMyFetch('balance/finance');
        let res = JSON.parse(data?.value);
        balance.value.usdt =  res?.data.balance.usdt;
        balance.value.blr =  res?.data.balance.blr;
        balance.value.bst =  res?.data.balance.bst;
        blr.value.course_blr = res?.data.blr.course_blr;
        blr.value.freeze = res?.data.blr.freeze;
        blr.value.unfreeze_percent = res?.data.blr.unfreeze_percent;
        blr.value.unfreeze_next_amount = res?.data.blr.unfreeze_next_amount;
        blr.value.unfreeze_next_date = res?.data.blr.unfreeze_next_date;
    }
    async function upd_breakeven_list() {

        const { isFetching, error, data } = await useMyFetch('balance/breakeven');
        let res = JSON.parse(data.value);
        breakevenList.value = []
        console.log(res.data)
        res.data.items.forEach(function (value){
            breakevenList.value.push(value);
        })
    }
    async function get_transaction(wallet) {
        const page=1
        const { isFetching, error, data, statusCode } = await useMyFetch('history?' + new URLSearchParams({
            wallet: wallet,
            page: page,
        }));
        let res = JSON.parse(data.value);
        transactions.value = []
        res.data.items.forEach(function (value){
            transactions.value.push(value);
        })
    }
    async function get_history_in(wallet) {
        const page=1
        const { isFetching, error, data, statusCode } = await useMyFetch('balance/history-in/'+wallet);
        let res = JSON.parse(data.value);
        // transactions.value =  res.data.items;
        historyIn.value = [];
        res.data.items.forEach(function (value){
            historyIn.value.push(value);
        })
    }
    async function get_history_out(wallet) {
        const page=1
        const { isFetching, error, data, statusCode } = await useMyFetch('balance/history-out/'+wallet);
        let res = JSON.parse(data.value);
        historyOut.value = [];
        res.data.items.forEach(function (value){
            historyOut.value.push(value);
        })
    }

    async function refill(amount){
        loadingRefill.value = true
        const { isFetching, error, data } = await useMyFetch('balance/refill').post({'amount':amount});
        let res = JSON.parse(data?.value);
        console.log(res)
        loadingRefill.value = isFetching.value;
    }

    function get_bst_current(){
        let amount = balance.value.bst;
        let cur_level = 0;
        list_bst_level.value.forEach((value)=>{
            if(value.amount < amount){
                cur_level = value.id;
            }
        })
        return cur_level;
    }


    return { balance,blr,bst,list_bst_level, transactions,loadingRefill, historyIn,historyOut, get_bst_current, upd_balance, refill, upd_breakeven_list,get_transaction,get_history_in,get_history_out}
})
