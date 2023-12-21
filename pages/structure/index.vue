<script setup>
import { onMounted, ref } from 'vue';
import {storeToRefs} from "pinia";
import { useStructureStore } from '@/stores/structure';

const structureStore = useStructureStore();
const { list,loadingList } = storeToRefs(structureStore)

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore)

const source = ref('https://new-cabinet.untime.tech/'+user?.referal_id)
const { text, copy, copied, isSupported } = useClipboard({ source })

onMounted(() => {
});
</script>

<template>
    <div class="grid">
      <div class="col-12 xl:col-12 text-5xl font-bold">
        <div  class="">
          {{ $t('pages.structure.title') }}
        </div>
      </div>
        <div class="col-12">
            <div class="card">

              <structure_nav page="linear"></structure_nav>

              <br/>

              <DataTable
                  :value="list"
                  :paginator="true"
                  :alwaysShowPaginator="false"
                  class="p-datatable-gridlines"
                  :rows="5"
                  dataKey="id"
                  :rowHover="true"
                  :loading = loadingList
                  responsiveLayout="scroll"
                  :rowsPerPageOptions="[5, 10, 20, 50]"
              >
                <template #empty> No found. </template>
                <template #loading> Loading data. Please wait. </template>
                <Column field="username" :header="$t('pages.structure.table.participant')" sortable filterField="username" style="min-width: 10rem" >
                  <template #body="{ data }">
                    <div>
                      {{ data.username }}
                    </div>
                  </template>
                </Column>
                <Column field="email" header="Contact" sortable filterField="telegram" style="min-width: 10rem">
                  <template #body="{ data } ">
                    <a v-if="data.telegram" target="_blank" :href="'https://t.me/'+data.telegram">@{{data.telegram}}</a>
                    <div v-if="data.email">{{data.email}}</div>
                  </template>
                </Column>
                <Column field="amount" :header="$t('pages.structure.table.turnover')" sortable filterField="amount" style="min-width: 10rem">
                  <template #body="{ data } ">
                    {{data.personal_invest}}
                  </template>
                </Column>
                <Column field="personal_invest" :header="$t('pages.structure.table.turnover')" sortable filterField="personal_invest" style="min-width: 10rem">
                  <template #body="{ data } ">
                    {{data.personal_invest}}
                  </template>
                </Column>
                <Column field="count_partners" :header="$t('pages.structure.table.structure')" sortable filterField="count_partners" style="min-width: 10rem">
                  <template #body="{ data } ">
                    {{data.count_partners}}
                  </template>
                </Column>
                <!--                <Column field="type" sortable header="Type" style="min-width: 12rem">-->
                <!--                  <template #body="{ data }">-->
                <!--                    {{ data.type }}-->
                <!--                  </template>-->
                <!--                  <template #filter="{ filterModel }">-->
                <!--                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />-->
                <!--                  </template>-->
                <!--                </Column>-->
                <!--                <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">-->
                <!--                  <template #body="{ data }">-->
                <!--                    <span :class="'customer-badge status-' + data.status">{{ data.status }}</span>-->
                <!--                  </template>-->
                <!--                  <template #filter="{ filterModel }">-->
                <!--                    <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">-->
                <!--                      <template #value="slotProps">-->
                <!--                        <span v-if="slotProps.value" :class="'customer-badge status-' + slotProps.value">{{ slotProps.value }}</span>-->
                <!--                        <span v-else>{{ slotProps.placeholder }}</span>-->
                <!--                      </template>-->
                <!--                      <template #option="slotProps">-->
                <!--                        <span :class="'customer-badge status-' + slotProps.option">{{ slotProps.option }}</span>-->
                <!--                      </template>-->
                <!--                    </Dropdown>-->
                <!--                  </template>-->
                <!--                </Column>-->
              </DataTable>
            </div>
        </div>
    </div>
</template>
