<script setup lang="ts">
import { BaseError, ContractFunctionRevertedError,TransactionExecutionError } from 'viem';
import {useAccount, useConnect, useDisconnect, configureChains, useSwitchNetwork, useNetwork,useContractRead,erc20ABI, useBalance,useContractWrite} from 'use-wagmi'
import { writeContract,readContract } from '@wagmi/core'
import { onMounted, reactive, ref, watch } from 'vue';
import {storeToRefs} from "pinia";
import {useBalanceStore} from "@/stores/balance";
import { useUserStore } from '@/stores/user';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
const props = defineProps(['update_list'])

import { publicClient } from '@/composables/client'

const update_list = computed(() => props.update_list)
watch(update_list, async ()=>{
  await getCountStaking()
});
const confirm = useConfirm();
const toast = useToast();

const balanceStore = useBalanceStore();
const {balance:balanceOld} = storeToRefs(balanceStore)

const userStore = useUserStore();
const { user } = storeToRefs(userStore)

import {useMelStore} from '@/stores/mel';
const melStore = useMelStore();
const {balance:balanceMel,address:addressUser,tokenAddress,stakingAddress,abiMelToken,abiMelStaking} = storeToRefs(melStore)

import { Formatter } from "@/service/formatter";
const { asToken ,asDateTime} = Formatter();

const visible1 = ref(false);
const isLoading = ref(false);
const loadingMessage = ref('');

import {computed} from "../../.nuxt/imports";
const {address, isConnected} = useAccount()


let showStakingModel = ref(false);
let amountMel = ref(0);
let errorMessageUserCancel = ref('');
let errorMessage = ref('');
const countStaking = ref(0);

const stakedDataArray = ref([])
const stakedReward = ref([])
const stakeData = computed( async ()=>{
  const dataStaking = await getStake().then((result)=>{

    const res = {
      'amount': result[0],
      'dateLast': new Date(parseInt(result[1])),
      'dateNext': new Date(parseInt(result[2])),
      'dateStart': new Date(parseInt(result[3])),
      'earnedAmount': new Date(parseInt(result[3]))
    }
    stakedDataArray.value = res;
    return result;
  });
  return dataStaking;
});


watch(address,async ()=>{
  await getCountStaking();
})
async function getCountStaking(){

  if(!address?.value){
    countStaking.value = 0;
    stakedDataArray.value = [];
    return false;
  }
  await readContract({
    address: stakingAddress.value,
    abi: abiMelStaking.value,
    functionName: 'getNumberOfStakes',
    args: [address?.value],
  }).then(async (result) => {

    let count = Number(result);
    countStaking.value = count
    if (count > 0) {
        await getStake()
    }
  });
  return countStaking;
}
async function getStake(){

  if(!address?.value){
    return false;
  }

  stakedDataArray.value = [];
  for(let i=0;i<countStaking.value;i++) {
    await readContract({
      address: stakingAddress.value,
      abi: abiMelStaking.value,
      functionName: 'userStakes',
      args: [address?.value, i],
    }).then(async (result) => {
      const res = {
        'index': i,
        'amount': (Number(result[0]) / 10**18),
        'leftAmount': Number(result[1]),
        'leftDay': Number(result[2]),
        'lastClaim': Number(result[3]),
        'dateNext': Number(result[4]),
        'dateStart': Number(result[5]),
        'dayClaim': Number(result[6]),
        'earnedAmount': Number(result[7]) /10**18,
        'reward': 0
      }

      stakedDataArray.value.push(res);

      const data = getStakeReward(i).then((result) => {
        stakedReward.value[i] = Number(result) / 10 ** 18;
      })
    });
  }
}
async function getStakeReward(index:number){

  if(!address?.value){
    return false;
  }
  const dataStakingReward = await readContract({
    address: stakingAddress.value,
    abi: abiMelStaking.value,
    functionName: 'calculateReward',
    args: [address?.value,index],
  });
  return dataStakingReward;
}
async function claim(index:number){

    try{

      const {request} = await publicClient.simulateContract({
        address: stakingAddress.value,
        abi: abiMelStaking.value,
        functionName: 'claimReward',
        args: [index],
      })
      // const hash = await walletClient.writeContract(request)
      const {hash} = await writeContract(request)
      let timeInterval = setInterval(async() => {
        const confirmations = await publicClient.getTransactionConfirmations({
          hash: hash
        })
        if(Number(confirmations)>2){
          clearInterval(timeInterval);
          await getCountStaking();
        }
      },1000)

    }catch ( err){
      if (err instanceof BaseError) {
        const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
        if (revertError instanceof ContractFunctionRevertedError) {
          const errorName = revertError.data?.errorName ?? ''
          // do something with `errorName`
          console.log(revertError.data?.args[0])
        }
      }
    }

}

function trimLetters(text){
  return text.slice(0,6)+ '...' + text.slice( text.length-4 , text.length)
}
await getCountStaking();

const requireConfirmation = (header:string,message:string) => {
  confirm.require({
    group: 'headlesserror',
    header: header,
    icon: 'pi pi-exclamation-circle',
    message: message,
    accept: () => {
      // toast.add({ severity: 'custom', summary: 'Uploading your files.', group: 'headless' });
      // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 30000,group: 'bc' });
    },
    reject: () => {
      // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
};
</script>

<template>

  <div class="col-12">
      <DataTable
          :value="stakedDataArray"
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
        <Column field="index" :header="$t('№')" sortable filterField="username" style="min-width: 10rem" >
          <template #body="{ data }">
            <div>
              {{ data.index+1 }}
            </div>
          </template>
        </Column>
        <Column field="amount" :header="$t('pages.staking.table.summa')" sortable filterField="username" style="min-width: 10rem" >
          <template #body="{ data }">
            <div>
              {{ data.amount }}
            </div>
          </template>
        </Column>
        <Column field="earnedAmount" :header="$t('pages.staking.table.earned')" sortable filterField="amount" style="min-width: 10rem">
          <template #body="{ data } ">
            {{data.earnedAmount}}
          </template>
        </Column>
        <Column field="dateStart" :header="$t('pages.staking.table.dateStart')" sortable filterField="amount" style="min-width: 10rem">
          <template #body="{ data } ">
            {{asDateTime(data.dateStart)}}
          </template>
        </Column>
        <Column field="lastClaim" :header="$t('pages.staking.table.dateLastClaimed')" sortable filterField="count_partners" style="min-width: 10rem">
          <template #body="{ data } ">
            {{asDateTime(data.lastClaim)}}
          </template>
        </Column>
        <Column field="reward" :header="$t('pages.staking.table.reward')" sortable filterField="count_partners" style="min-width: 10rem">
          <template #body="{ data } ">
            {{stakedReward[data.index]}}
          </template>
        </Column>
        <Column field="claim" :header="$t('pages.staking.table.claim')" style="min-width: 10rem">
          <template #body="{ data } ">
            <span  v-if="stakedReward[data.index]>0">
              <Button :id="'claim_'+data.index" @click="claim(data.index)" icon="pi pi-cloud-download" rounded>
              </Button>
            </span>
            <span v-else>
              <Button disabled icon="pi pi-stopwatch" rounded>
              </Button>
            </span>
          </template>
        </Column>
      </DataTable>
  </div>
</template>

<style scoped lang="scss">

</style>
