<script setup lang="ts">
import { createPublicClient, http } from 'viem'

import {bsc,bscTestnet} from '@wagmi/core/chains';
const publicClient = createPublicClient({
  chain: bsc,
  transport: http()
})
import {useAccount, useContractEvent} from 'use-wagmi'
import { onMounted, reactive, ref, watch } from 'vue';
import {storeToRefs} from "pinia";
import {useBalanceStore} from "@/stores/balance";
import { useUserStore } from '@/stores/user';

const balanceStore = useBalanceStore();
const {balance} = storeToRefs(balanceStore)

const userStore = useUserStore();
const { user } = storeToRefs(userStore)

import {useMelStore} from '@/stores/mel';
const melStore = useMelStore();
const {balance:balanceMel,address:addressUser,tokenAddress,stakingAddress,abiMelToken,abiMelStaking} = storeToRefs(melStore)

import { Formatter } from "@/service/formatter";
const { asToken } = Formatter();

const visible1 = ref(false);

const viewQuestionBalanceOld = computed(()=>{
  // return true;
  return !user?.value?.uvtm && balance?.value?.mel>0;
})

import {useAccount} from 'use-wagmi'
import Pricing from "../../pages/utilities/Pricing.vue";
import ConnectButtonV2 from "./ConnectButtonV2.vue";
const {address, isConnected} = useAccount()

const logs = await publicClient.getContractEvents({
  address: tokenAddress.value,
  abi: abiMelToken.value,
  fromBlock: 34922383,
  toBlock: 34922393
})
console.log(logs)


</script>

<template>

  <div class="col-12 xl:col-12">
    <div class="card">
      <h5>   {{ $t('pages.new_texts.text_9') }}</h5>
      <DataTable :value="[]" :rows="5" responsiveLayout="scroll">
        <Column style="width: 15%">
          <template #header>    {{ $t('pages.new_texts.text_10') }} </template>
          <template #body="slotProps">
            +1000 1MEL
          </template>
        </Column>
        <Column field="name" :header="$t('pages.new_texts.action')" :sortable="true" style="width: 35%"></Column>
        <Column field="price" :header="$t('pages.new_texts.transaction')" :sortable="true" style="width: 35%">
          <template #body="slotProps">
            {{ $t('pages.new_texts.text_11') }}
          </template>
        </Column>
        <Column style="width: 15%">
          <template #header>{{ $t('pages.new_texts.date') }}</template>
          <template #body>
            {{ new Date() }}
          </template>
        </Column>
        <Column style="width: 15%">
          <template #header>    {{ $t('pages.new_texts.text_13') }} </template>
          <template #body>
            {{ $t('pages.new_texts.text_12') }}
          </template>
        </Column>
        <Column style="width: 15%">
          <template #header>    {{ $t('pages.new_texts.text_14') }} </template>
          <template #body>
            <div style="max-width:100px;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">edfblsknxdfgbkdjlxfibhodixfhcbolikxhcibholxhnvc </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
