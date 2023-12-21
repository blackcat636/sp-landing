import { defineStore } from 'pinia'
import moment from "moment";
import { Formatter } from "@/service/formatter";
const { asDateTime} = Formatter();
import {ref, computed, Ref, UnwrapRef} from 'vue';
import {fetchAuth,useMyFetch,useNodeFetch, useBackendFetch} from "../composables/fetchAuth";
// import {Balance,Transactions} from '@/types/Balance';
// import {useCustomersStore} from "./customer";
// import history from "../server/api/history";

//
// const config = useRuntimeConfig()
// const urlNode = config.private.BACKEND_NODE_URL+'/api/'

export const useTokenStore = defineStore('token', () => {
    const tokenPrice = ref({
        'price':1,
        'percent_change':0,
        'time_upd':0,
        'data':{
            'circulatingSupply':0,
            'totalSupply':0,
            'mcap':0,
            'fdv':0,
            'holders':1,
            'transactions':0,
        }
    })
    const chart = ref({
        'label':[],
        'data':[],
    });
    const chart_label = ref([]);
    const chart_data = ref([]);

    // upd_token();
    // setTimeout(() => {
    get_chart('day')
    // }, 1000)

    async function upd_token() {
        const { isFetching, error, data } = await useNodeFetch('token');
        let res = JSON.parse(data.value);
        if(res){
            tokenPrice.value.price =  res.priceUSD;
            tokenPrice.value.percent_change =  res.percent_change;
            tokenPrice.value.time_upd =  Date.now();
            tokenPrice.value.data.circulatingSupply =  res.data.circulatingSupply;
            tokenPrice.value.data.totalSupply =  res.data.totalSupply;
            tokenPrice.value.data.holders =  res.data.holders;
            tokenPrice.value.data.mcap =  res.data.mcap;
        }
    }
    async function get_chart(time:string) {
        initChart();
        const { isFetching, error, data } = await useMyFetch('token/chart');
        let res = JSON.parse(data.value);

        console.log(res.data.items)
        let ChartLabel = [];
        let ChartData = [];
        res.data.items.forEach(function (value){
            const formatDate = moment.unix(value.created_at).format('DD-MM-YYYY HH:mm')
            ChartLabel.push(formatDate);
            ChartData.push(Number(value.price));
        })
        chart_label.value = ChartLabel;
        chart_data.value = ChartData;
    }
    function initChart(){
        // chart.value.label = [];
        // chart.value.data = [];
        chart_label.value = [];
        chart_data.value = [];
    }


    async function get_transaction(wallet) {
        // const { data, pending, error, refresh } = await useFetch('https://api.tgclient.work/finance', {
        //     onRequest({ request, options }) {
        //         // Set the request headers
        //         options.headers = options.headers || {}
        //         options.headers.authorization = '...'
        //     },
        //     onRequestError({ request, options, error }) {
        //         // Handle the request errors
        //         console.log(error.value)
        //     },
        //     onResponse({ request, response, options }) {
        //         // Process the response data
        //         localStorage.setItem('token', response._data.token)
        //     },
        //     onResponseError({ request, response, options }) {
        //         // Handle the response errors
        //         console.log('error.value')
        //         console.log(response)
        //     }
        // })
        // console.log(data.value)
        // console.log(data.value)
        // console.log(error)
        // console.log(error.value.statusCode)
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


    return { tokenPrice,chart_label,chart_data,get_chart }
})
