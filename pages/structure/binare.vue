<script setup>
import { onMounted, ref } from 'vue';
import {storeToRefs} from "pinia";
import { useStructureStore } from '@/stores/structure';

import { writeContract,readContract } from '@wagmi/core'

const structureStore = useStructureStore();
const { list,loadingList, binaryTree,binaryInfo } = storeToRefs(structureStore)

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore)

import { Formatter } from "@/service/formatter";
const { asToken ,asDateTime} = Formatter();

import {useMelStore} from '@/stores/mel';
import Structure_nav from "../../components/structure_nav.vue";
const melStore = useMelStore();
const {
  referral_list
} = storeToRefs(melStore)

const source = ref('https://new-cabinet.untime.tech/'+user?.referal_id)
const { text, copy, copied, isSupported } = useClipboard({ source })

onMounted(() => {
});
const data = ref({
  key: '0',
  type: 'country',
  label: 'Argentina',
  data: 'ar',
  children: [
    {
      key: '0_0',
      type: 'country',
      label: 'Argentina',
      data: 'ar',
      children: [
        {
          key: '0_0_0',
          type: 'country',
          label: 'Argentina',
          data: 'ar'
        },
        {
          key: '0_0_1',
          type: 'country',
          label: 'Croatia',
          data: 'hr'
        }
      ]
    },
    {
      key: '0_1',
      type: 'country',
      label: 'France',
      data: 'fr',
      children: [
        {
          key: '0_1_0',
          type: 'country',
          label: 'France',
          data: 'fr'
        },
        {
          key: '0_1_1',
          type: 'country',
          label: 'Morocco',
          data: 'ma'
        }
      ]
    }
  ]
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

              <structure_nav page="binare"></structure_nav>

              <div class="flex flex-wrap justify-content-between" style="margin:3px">
                <div class="flex align-items-center justify-content-center" style="height: 100px; border:1px solid black; padding:10px">
                  <table>
                    <tr>
                      <td>Структура слева:</td>
                      <td>{{binaryInfo.count_left}}</td>
                    </tr>
                    <tr>
                      <td>Оборот слева:</td>
                      <td>{{binaryInfo.turnover_left}}</td>
                    </tr>
                    <tr>
                      <td>Оборот слева:</td>
                      <td>0</td>
                    </tr>
                  </table>
                </div>
                <div  class="flex align-items-center justify-content-center" style="margin-bottom:50px" >
                  <div>
                    <Button icon="pi pi-arrow-down-left"  severity="success"  size="small" rounded label="Влево"></Button>
                    <span  class="" >Выбрать направление</span>
                    <Button icon="pi pi-arrow-down-right"  disabled  size="small" rounded label="Вправо"></Button>
                  </div>
                </div>
                <div class="flex align-items-center justify-content-center" style="height: 100px; border:1px solid black; padding:10px">
                  <table>
                    <tr>
                      <td>Структура справа:</td>
                      <td>{{binaryInfo.count_right}}</td>
                    </tr>
                    <tr>
                      <td>Оборот справа:</td>
                      <td>{{binaryInfo.turnover_right}}</td>
                    </tr>
                    <tr>
                      <td>Оборот слева:</td>
                      <td>0</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="card overflow-auto" style="margin-top:-105px">
                <OrganizationChart v-model:selectionKeys="selection" :value="binaryTree" selectionMode="multiple" style="margin-top:50px">
                  <template #person="slotProps">
                    <div class="flex flex-column">
                      <div v-if="slotProps.node.data.name" class="flex flex-column align-items-center block-binary">
                        <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
                        <span>{{ slotProps.node.data.title }} USDT</span>
                      </div>
                      <div v-else class="flex flex-column align-items-center block-binary">
                        <span ></span>
                      </div>
                    </div>
                  </template>
                </OrganizationChart>
              </div>
            </div>
        </div>
    </div>
</template>
<style>
.block-binary{
  height:50px;
  width:50px
}
</style>
