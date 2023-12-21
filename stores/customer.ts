import { defineStore } from 'pinia'
import {ref, computed, Ref, UnwrapRef} from 'vue';
import {fetchAuth,useMyFetch} from "../composables/fetchAuth";

 interface Customer {
    id: number,
    name: String,
    country: {
        name: String,
        code: String
    },
    company: String,
    date: String,
    status: String,
    verified: boolean,
    activity: number,
    representative: {
        name: String,
        image: String
    },
    balance: number
}

export const useCustomersStore = defineStore('customer', () => {
    const list_customers  = ref([]);
    // const list_customers  = ref([
    //     {
    //         id: 1000,
    //         name: 'James Butt1',
    //         country: {
    //             name: 'Algeria',
    //             code: 'dz'
    //         },
    //         company: 'Benton, John B Jr',
    //         date: '2015-09-13',
    //         status: 'unqualified',
    //         verified: true,
    //         activity: 17,
    //         representative: {
    //             name: 'Ioni Bowcher',
    //             image: 'ionibowcher.png'
    //         },
    //         balance: 70663
    //     },
    //     {
    //         id: 1001,
    //         name: 'Josephine Darakjy',
    //         country: {
    //             name: 'Egypt',
    //             code: 'eg'
    //         },
    //         company: 'Chanay, Jeffrey A Esq',
    //         date: '2019-02-09',
    //         status: 'negotiation',
    //         verified: true,
    //         activity: 0,
    //         representative: {
    //             name: 'Amy Elsner',
    //             image: 'amyelsner.png'
    //         },
    //         balance: 82429
    //     },
    // ]);

    // setTimeout(() => {
    //     get_list_customer()
    // }, 1000)

    async function get_list_customer() {

        const { isFetching, error, data } = await useMyFetch('customers');

        let res = JSON.parse(data.value);
        console.log(res.customers)
        res.customers.forEach(function (value){
            list_customers.value.push(value);
        })
    }

    return { list_customers,get_list_customer }
})
