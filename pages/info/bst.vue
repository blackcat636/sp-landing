<script setup>
import {onMounted, ref} from 'vue';
import {storeToRefs} from "pinia";
import {useStructureStore} from '@/stores/structure';

import {writeContract, readContract} from '@wagmi/core'

const structureStore = useStructureStore();
const {list, loadingList} = storeToRefs(structureStore)

import {useUserStore} from '@/stores/user';

const userStore = useUserStore();
const {user} = storeToRefs(userStore)


import {useBalanceStore} from "../stores/balance";
const balanceStore = useBalanceStore();
const {list_bst_level} = storeToRefs(balanceStore)

const source = ref('https://new-cabinet.untime.tech/' + user?.referal_id)
const {text, copy, copied, isSupported} = useClipboard({source})

onMounted(() => {
});

</script>

<template>
  <div class="grid">
    <div class="col-12 xl:col-12 text-5xl font-bold">
      <div class="">
        {{ $t('pages.info.title') }}
      </div>
    </div>
    <div class="col-12">
      <div class="card">

        <info_nav page="bst"></info_nav>

        <br/>

        <DataTable
            :value="list_bst_level"
            :paginator=false
            class="p-datatable-gridlines"
            :rows="10"
            dataKey="id"
            compareSelectionBy=""
        >
          <template #empty> No found.</template>
          <template #loading> Loading data. Please wait.</template>
          <Column field="amount" :header="$t('pages.info.table_bst.amount')" filterField="username"
                  style="min-width: 10rem">
            <template #body="{ data }">
              <div>
                {{ data.amount}}
              </div>
            </template>
          </Column>
          <Column field="percent" :header="$t('pages.info.table_bst.percent')" filterField="amount"
                  style="min-width: 10rem">
            <template #body="{ data } ">
              +{{ data.percent }}% &nbsp&nbsp&nbsp({{data.all_percent}}%)
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
