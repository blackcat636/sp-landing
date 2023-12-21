<script setup>
import { useLayout } from '@/layouts/composables/layout';
import { onMounted, reactive, ref, watch } from 'vue';
import {storeToRefs} from "pinia";
import { Formatter } from "@/service/formatter";
import Mel from "@/components/icons/mel.vue";

import {useTokenStore} from "@/stores/token";
const tokenStore = useTokenStore();
const {tokenPrice,chart_label,chart_data} = storeToRefs(tokenStore)

import {useMelStore} from '@/stores/mel';
const melStore = useMelStore();
const {profile,profile_name,address} = storeToRefs(melStore)

const { asToken, asDateTime } = Formatter();

const list = ref([]);

const type='Transfer';


async function getList() {
  if(address.value){
    const { isFetching, error, data } = await useNodeFetch('history/event?type='+type+'&address='+address.value);
    let res = JSON.parse(data.value);
    res.data.forEach(function (value){
      list.value.push(value);
    })
  }else{
    list.value = [];
  }
}

watch( address, async()=>{
  await getList()
})

onMounted(async()=>{
 await getList()
})

</script>

<template>

      <div class="card">
          <h5>   {{ $t('pages.new_texts.text_9') }}</h5>
          <DataTable
              :value="list"
              :rows="25"
              paginator
              :alwaysShowPaginator="false"
              class="p-datatable-gridlines"
              dataKey="id"
              :rowHover="true"
              :loading = loadingList
              responsiveLayout="scroll"
              :rowsPerPageOptions="[5, 10, 20, 50]"
          >
              <Column style="width: 15%" sortable>
                  <template #header>    {{ $t('pages.new_texts.text_10') }} </template>
                  <template #body="{data}">
                    <div>
                      {{data.date}}
                    </div>
                  </template>
              </Column>
              <Column field="name" :header="$t('pages.new_texts.action')" :sortable="true" style="width: 15%">
                <template #body="slotProps">
                  Transfer
                </template>
              </Column>
              <Column style="width: 15%">
                  <template #header>{{ $t('pages.new_texts.from') }}</template>
                  <template #body="{data}">
                    <div>
                      {{data.from}}
                    </div>
                  </template>
              </Column>
              <Column style="width: 15%">
                  <template #header>{{ $t('pages.new_texts.to') }}</template>
                  <template #body="{data}">
                    <div>
                      {{data.to}}
                    </div>
                  </template>
              </Column>
              <Column style="width: 15%">
                  <template #header>{{ $t('pages.new_texts.date') }}</template>
                  <template #body="{data}">
                    {{asDateTime(data.date)}}
                  </template>
              </Column>
              <Column style="width: 15%">
                  <template #header>    {{ $t('pages.new_texts.text_13') }} </template>
                  <template #body>
                      {{ $t('pages.new_texts.text_12') }}
                  </template>
              </Column>
              <Column style="width: 15%">
                  <template #header>    {{ $t('pages.new_texts.text_14') }}&nbsp <i class="pi pi-external-link"></i></template>
                  <template #body="{data}">
                    <a target="_blank" :href="'https://bscscan.com/tx/'+data.tx">
                      <div style="max-width:100px;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                        {{data.tx}}
                      </div>
                    </a>
                  </template>
              </Column>
          </DataTable>
      </div>

</template>
