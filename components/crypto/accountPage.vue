<script setup>
import { onMounted, ref } from 'vue';
import {storeToRefs} from "pinia";
import { useStructureStore } from '@/stores/structure';

import {useAccount, useConnect, useDisconnect, configureChains, useSwitchNetwork, useNetwork,useContractRead,erc20ABI, useBalance} from 'use-wagmi'

const {address, isConnected} = useAccount()

import { writeContract,readContract } from '@wagmi/core'
import { BaseError, ContractFunctionRevertedError,TransactionExecutionError } from 'viem';

import { Formatter } from "@/service/formatter";
const { asToken ,asDateTime} = Formatter();

const structureStore = useStructureStore();
const { list,loadingList } = storeToRefs(structureStore)

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore)

import {useMelStore} from '@/stores/mel';
const melStore = useMelStore();
const {balance:balanceMel,address:addressUser,tokenAddress,userProfileAddress,abiUserProfile,profile_name,profile,profile_data, need_register,update_profile} = storeToRefs(melStore)

const source = ref('https://new-cabinet.untime.tech/'+user?.referal_id)
// const source = ref("https://new-cabinet.untime.tech?ref="+ profile?.refCode)
const legacy = true;
const { text, copy, copied, isSupported } = useClipboard({ source, legacy })

const isLoading = ref(false);

const visibleEditName = ref(false);
const visibleEditRefCode = ref(false);

const newName = ref('');
const newRefCode = ref('');

async function editName(){
  if(address.value){
    try{
    const {hash} = await writeContract({
      address: userProfileAddress.value,
      abi: abiUserProfile.value,
      functionName: 'changeName',
      args: [newName.value],
    })
    if(hash){
      successConfirmation('Success','');
      update_profile.value = true;
    }
  }catch ( err){
    if (err instanceof BaseError) {
      const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
      if (revertError instanceof ContractFunctionRevertedError) {
        const errorName = revertError.data?.errorName ?? ''
        // do something with `errorName`
        console.log(revertError.data?.args[0])
        errorConfirmation('Error',revertError.data?.args[0]);
      }
    }
  }finally {
    isLoading.value = false;
  }

  }
}

onMounted(() => {
});
</script>

<template>
  <div class="surface-ground">
    <div class="surface-section px-6 py-5">
      <div class="flex align-items-start flex-column lg:flex-row lg:justify-content-between">
        <div class="flex align-items-start flex-column md:flex-row">
          <img src="/images/account_default.svg" class="mr-5 mb-3 lg:mb-0" style="width:90px;height:90px" />
          <div>
            <span class="text-900 font-medium text-3xl">{{profile.name}}</span>
            <i class="pi pi-star text-2xl ml-4 text-yellow-500"></i>
            <div class="flex align-items-center flex-wrap text-sm">
              <div class="mr-5 mt-3">
                <span class="font-medium text-500">REFERRALS</span>
                <div class="text-700 mt-2">{{profile?.referredCount}}</div>
              </div>
              <div class="mr-5 mt-3">
                <span class="font-medium text-500">EARNED</span>
                <div class="text-700 mt-2">{{profile?.referredAmountEarned}}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="false" class="mt-3 lg:mt-0">
          <Button icon="pi pi-bookmark" class="p-button-rounded mr-2"></Button>
          <Button icon="pi pi-heart" class="p-button-rounded p-button-success mr-2"></Button>
          <Button icon="pi pi-list" class="p-button-rounded p-button-help"></Button>
        </div>
      </div>
    </div>
    <div v-if="profile.name" class="px-6 py-5">
      <div class="surface-card p-4 shadow-2 border-round">
        <div class="font-medium text-3xl text-900 mb-3">Profile</div>
        <div class="text-500 mb-5"></div>
        <ul class="list-none p-0 m-0 border-top-1 border-300">
          <li class="flex align-items-center py-3 px-2 flex-wrap surface-ground">
            <div class="text-500 w-full md:w-2 font-medium">Name</div>
            <div class="text-900 w-full md:w-9">{{profile_name}}</div>
            <div class="text-900 w-full md:w-1">
              <Button @click="visibleEditName=true" icon="pi pi-pencil" class="p-button-rounded p-button-help"></Button>
            </div>
          </li>
          <li class="flex align-items-center py-3 px-2 flex-wrap">
            <div class="text-500 w-full md:w-2 font-medium">Contact</div>
            <div class="text-900 w-full md:w-10 line-height-3">{{profile_data?.contact??'-'}}</div>
          </li>
          <li class="flex align-items-center py-3 px-2 flex-wrap surface-ground">
            <div class="text-500 w-full md:w-2 font-medium">Register</div>
            <div class="text-900 w-full md:w-10">{{asDateTime(profile?.date)}}</div>
          </li>
          <li class="flex align-items-center py-3 px-2 flex-wrap">
            <div class="text-500 w-full md:w-2 font-medium">Реферальне посилання</div>
            <div class="text-900 w-full md:w-9 line-height-3">

              <span class="mr-2" >{{profile?.refCode}}</span>
              <span v-if="isSupported">
                <button class="p-button p-component align-items-center" @click='copy(source )'>
                  <i class="pi pi-copy"></i>
                  <span v-if='!copied'>{{ $t('pages.common.copy') }}</span>
                  <span v-else>{{ $t('pages.common.copied') }}</span>
                </button>
              </span>
            </div>
            <div class="text-900 w-full md:w-1"><Button icon="pi pi-pencil" class="p-button-rounded p-button-help"></Button></div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else  class="px-6 py-5">
      <div></div>
      <div>

        <button @click="need_register=true" class="p-link layout-topbar-button mb-2 lg:mb-0  mt-2 lg:mt-0">
          <i class="pi pi-user"></i>
          <span>&nbsp;&nbsp;{{ $t('pages.account.Реєстрація') }}</span>
        </button>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="visibleEditName" appendTo="body" :modal="true" :breakpoints="{'960px': '75vw', '340px': '100vw'}">
    <template #header>
      <div class="flex align-items-center">
                    <span class="flex align-items-center justify-content-center bg-mel text-gray-50 mr-3 border-circle" style="width:32px;height:32px">
                        <i class="pi pi-info text-lg"></i>
                    </span>
        <span class="font-medium text-2xl text-900"> {{ $t('pages.account.register') }}</span>
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


        <div class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">
          <div class="text-xl mb-14">
            {{ $t('pages.account.name') }}
          </div>

          <div class="transition-all transition-duration-400 transition-ease-in-out mb-4">
            <InputText v-model="newName" class="w-full"/>
          </div>

          <Button @click="editName()" class="btn-mel" :label="$t('pages.account.change_confirm')"></Button>
        </div>
      </div>

    </div>
  </Dialog>

</template>
