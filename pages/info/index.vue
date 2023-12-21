<script setup>
import {onMounted, ref} from 'vue';
import {storeToRefs} from "pinia";
import {useStructureStore} from '@/stores/structure';

import {writeContract, readContract} from '@wagmi/core'

const structureStore = useStructureStore();
const {list, loadingList,list_career} = storeToRefs(structureStore)

import {useUserStore} from '@/stores/user';
const userStore = useUserStore();
const {user} = storeToRefs(userStore)


const source = ref('https://new-cabinet.untime.tech/' + user?.referal_id)
const {text, copy, copied, isSupported} = useClipboard({source})

onMounted(() => {
});
// const dataArray = ref([
//   {id: 1, purchase: 100, turnover: 0, income_first_line: 10, income_binary: 0},
//   {id: 2, purchase: 100, turnover: 1000, income_first_line: 10, income_binary: 10},
//   {id: 3, purchase: 200, turnover: 5000, income_first_line: 10, income_binary: 15},
//   {id: 4, purchase: 500, turnover: 10000, income_first_line: 10, income_binary: 20},
//   {id: 5, purchase: 1000, turnover: 20000, income_first_line: 10, income_binary: 25},
//   {id: 6, purchase: 2000, turnover: 100000, income_first_line: 10, income_binary: 30},
//   {id: 7, purchase: 5000, turnover: 500000, income_first_line: 10, income_binary: 35},
// ]);

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

        <info_nav page="career"></info_nav>

        <br/>

        <DataTable
            :value="list_career"
            :paginator=false
            class="p-datatable-gridlines"
            :rows="10"
            dataKey="id"
            compareSelectionBy=""
        >
          <ColumnGroup class="text-3xl" type="header">
            <Row>
              <Column :header="$t('pages.info.table_structure.title')" :rowspan="3"/>
            </Row>
            <Row>
              <Column :header="$t('pages.info.table_structure.condition')" :colspan="2"/>
              <Column :header="$t('pages.info.table_structure.income')" :colspan="2"/>
            </Row>
            <Row>
              <Column :header="$t('pages.info.table_structure.purchase')" field="Purchase"/>
              <Column :header="$t('pages.info.table_structure.turnover')" field="Turnover"/>
              <Column :header="$t('pages.info.table_structure.income_first_line')" field="IncomeFirstLine"/>
              <Column :header="$t('pages.info.table_structure.income_binary')" field="IncomeBinary"/>
            </Row>
          </ColumnGroup>
          <template #empty> No found.</template>
          <template #loading> Loading data. Please wait.</template>
          <Column field="title" :header="$t('pages.info.table_structure.title')" sortable filterField="username"
                  style="min-width: 10rem">
            <template #body="{ data }">
              <div>
                {{ $t('range.range_' + data.id) }}
              </div>
            </template>
          </Column>
          <Column field="purchase" :header="$t('pages.info.table_structure.purchase')" sortable filterField="amount"
                  style="min-width: 10rem">
            <template #body="{ data } ">
              {{ data.purchase }} BLR
            </template>
          </Column>
          <Column field="turnover" :header="$t('pages.info.table_structure.turnover')" sortable filterField="amount"
                  style="min-width: 10rem">
            <template #body="{ data } ">
              {{ data.turnover }} BLR
            </template>
          </Column>
          <Column field="income_first_line" :header="$t('pages.info.table_structure.income_first_line')" sortable
                  filterField="count_partners" style="min-width: 10rem">
            <template #body="{ data } ">
              {{ data.income_first_line }}%
            </template>
          </Column>
          <Column field="income_binary" :header="$t('pages.info.table_structure.income_binary')" sortable
                  filterField="count_partners" style="min-width: 10rem">
            <template #body="{ data } ">
              {{ data.income_binary }}%
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
