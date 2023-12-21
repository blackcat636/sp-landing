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

const {address, isConnected} = useAccount()

const emit = defineEmits(['addStaking'])

let showStakingModel = ref(false);
let amountMel = ref(0);
let needAllowance = ref(false);

import { publicClient } from '@/composables/client'

async function startStaking(){
  const amount = amountMel.value*10**18

  isLoading.value = true;

  let approved = false;

  const data = await readContract({
    address: tokenAddress.value,
    abi: abiMelToken.value,
    functionName: 'allowance',
    args: [address.value,stakingAddress.value],
  })
  if(amount > parseInt(data)) {
    try {
      const {request} = await publicClient.simulateContract({
        address: tokenAddress.value,
        abi: abiMelToken.value,
        functionName: 'approve',
        account: address.value,
        args: [stakingAddress.value, amount],
      })
      // const hash = await walletClient.writeContract(request)
      const {hash} = await writeContract(request)
      let timeInterval = setInterval(async() => {
        const confirmations = await publicClient.getTransactionConfirmations({
          hash: hash
        })
        if(Number(confirmations) > 2){
          approved = true;
          clearInterval(timeInterval);
          await staking();
        }
      },1000)

    } catch (err) {
      showStakingModel.value = false;
      isLoading.value = false;
      loadingMessage.value='';
      if (err instanceof BaseError) {
        const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
        if (revertError instanceof ContractFunctionRevertedError) {
          const errorName = revertError.data?.errorName ?? ''
          // do something with `errorName`
          errorConfirmation('Error Staking',revertError.data?.args[0]);
        }else if(err instanceof TransactionExecutionError){
          const revertError = err.walk(err => err instanceof TransactionExecutionError)
          errorConfirmation('Error Staking','You cancel');
        }else{
          errorConfirmation('Error Staking','');
        }
      }
    }
  }else{
    await staking();
  }
}
async function staking(){

  const amount = amountMel.value*10**18

    try{
      isLoading.value = true;
      loadingMessage.value='staking';

      const {request} = await publicClient.simulateContract({
        address: stakingAddress.value,
        abi: abiMelStaking.value,
        functionName: 'stake',
        account: address.value,
        args: [amount],
      })
      // const hash = await walletClient.writeContract(request)
      const {hash} = await writeContract(request)
      let timeInterval = setInterval(async() => {
        const confirmations = await publicClient.getTransactionConfirmations({
          hash: hash
        })
        if(Number(confirmations)>2){
          emit('addStaking')
          successConfirmation('Success','');
          showStakingModel.value = false;
          clearInterval(timeInterval);
        }
      },1000)


    }catch ( err){
      isLoading.value = false;
      loadingMessage.value='';
      showStakingModel.value = false;
      if (err instanceof BaseError) {
        const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
        if (revertError instanceof ContractFunctionRevertedError) {
          const errorName = revertError.data?.errorName ?? ''
          // do something with `errorName`
          errorConfirmation('Error Staking',revertError.data?.args[0]);
        }else if(err instanceof TransactionExecutionError){
          const revertError = err.walk(err => err instanceof TransactionExecutionError)
          errorConfirmation('Error Staking','You cancel');
        }else{
          errorConfirmation('Error Staking','');
        }
      }
    }finally {
      console.log('finish staking')
    }

}

function trimLetters(text){
  return text.slice(0,6)+ '...' + text.slice( text.length-4 , text.length)
}

const errorConfirmation = (header:string,message:string) => {
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
const successConfirmation = (header:string,message:string) => {
  confirm.require({
    group: 'headlesssuccess',
    header: header,
    icon: 'pi pi-check-circle',
    message: message,
    // accept: () => {
    //   // toast.add({ severity: 'custom', summary: 'Uploading your files.', group: 'headless' });
    //   // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 30000,group: 'bc' });
    // },
    // reject: () => {
    //   // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    // }
  });
};
</script>

<template>
  <Toast position="top-center" group="bc" @close="">
    <template #message="slotProps">
      <div class="flex flex-column align-items-start" style="flex: 1">
        <div class="flex align-items-center gap-2">
          <span class="font-bold text-900">{{ slotProps.message.action }}</span>
        </div>
        <div class="font-medium text-lg my-3 text-900">{{ slotProps.message.summary }}</div>
        <div class="font-medium text-lg my-3 text-900">{{ slotProps.message.detail }}</div>
        <Button class="p-button-sm" label="Reply" @click=""></Button>
      </div>
    </template>
  </Toast>
<!--  <ConfirmDialog group="headlesserror">-->
<!--    <template #container="{ message, acceptCallback }">-->
<!--      <div class="flex flex-column align-items-center p-5 surface-overlay border-round">-->
<!--        <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">-->
<!--          <i class="pi pi-exclamation-circle text-5xl"></i>-->
<!--        </div>-->
<!--        <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>-->
<!--        <p class="mb-0">{{ message.message }}</p>-->
<!--        <div class="flex align-items-center gap-2 mt-4">-->
<!--          <Button label="Ok" @click="acceptCallback" class="w-8rem"></Button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
<!--  </ConfirmDialog>-->
<!--  <ConfirmDialog group="headlesssuccess">-->
<!--    <template #container="{ message, acceptCallback }">-->
<!--      <div class="flex flex-column align-items-center p-5 surface-overlay border-round">-->
<!--        <div class="border-circle bg-green-400 inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">-->
<!--          <i class="pi pi-check-circle text-5xl"></i>-->
<!--        </div>-->
<!--        <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>-->
<!--        <p class="mb-0">{{ message.message }}</p>-->
<!--        <div class="flex align-items-center gap-2 mt-4">-->
<!--          <Button label="Ok" @click="acceptCallback" class="w-8rem"></Button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
<!--  </ConfirmDialog>-->
  <div class="col-12 " :class="{ 'xl:col-6':balanceOld.mel<=0,'xl:col-4':balanceOld.mel>0}">
    <Button v-if="address"  @click="showStakingModel = true;" class="flex justify-content-center p-styled-clear align-items-center flex text-medium text-2xl">
      <i class="pi pi-plus mr-3"></i><div>&nbsp;&nbsp;{{ $t('pages.new_texts.staking') }}</div>
    </Button>
  </div>
  <Toast />
    <Dialog v-model:visible="showStakingModel" appendTo="body" :modal="true" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
    <template #header>
      <div class="flex align-items-center">
                    <span class="flex align-items-center justify-content-center bg-mel text-gray-50 mr-3 border-circle" style="width:32px;height:32px">
                        <i class="pi pi-info text-lg"></i>
                    </span>
        <span class="font-medium text-2xl text-900"> {{ $t('pages.new_texts.staking') }}</span>
      </div>
    </template>
    <div v-if="isLoading" class="flex flex-column w-100">

      <div>
        <div class="bg-mel p-5">
          <div class="flex justify-content-center flex-wrap align-items-center">
            <div class="text-4xl font-bold">
              {{ $t('pages.account.text_confirm_wallet') }}
            </div>
          </div>
          <p class="m-0 line-height-3">
            &nbsp;
          </p>
        </div>
      </div>

    </div>
    <div v-else class="flex flex-column w-100">

      <div>
        <div class="bg-mel p-5">
          <div class="flex justify-content-between flex-wrap gap-3 mb-4 align-items-center">
            <div class="text-4xl font-bold">
              {{ $t('pages.new_texts.invest_to_staking') }}
            </div>
          </div>
          <p class="m-0 line-height-3">
            &nbsp;
          </p>
        </div>


        <div class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">
          <div class="text-xl mb-14">
            {{ $t('pages.new_texts.question_amount_staking') }}
          </div>

          <div class="transition-all transition-duration-400 transition-ease-in-out mb-4">
            <InputText v-model.number="amountMel" class="w-full"/>
          </div>

          <div class="text-medium mb-1" style="color:var(--gray-400)">
            {{ $t('pages.new_texts.balance_wallet') }}
          </div>


          <div class="text-xl mb-4">
            {{balanceMel}} Mel
          </div>

          <Button @click="startStaking()" class="btn-mel" :label="$t('pages.new_texts.confirm')"></Button>
        </div>
      </div>

    </div>
  </Dialog>

</template>

<style scoped lang="scss">

</style>
