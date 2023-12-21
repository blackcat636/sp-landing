<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { CustomerService } from '@/service/CustomerService';
import { BalanceService } from '@/service/BalanceService';
import { ProductService } from '@/service/ProductService';
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useCustomersStore } from '@/stores/customer';
import { useBalanceStore } from '@/stores/balance';
import { Formatter } from "@/service/formatter";

import {useMyFetch} from "../composables/fetchAuth";

const customerStore = useCustomersStore();
const { list_customers } = storeToRefs(customerStore)
const balanceStore = useBalanceStore();
const {balance, transactions,historyIn,historyOut, blr,bst } = storeToRefs(balanceStore)
const route = useRoute()
const { asDateTime,diffDateTime,isTimeExpire,asToken } = Formatter();

let wallet = 'usdt';
const loading1 = ref(null);

const refill_amount = ref(null);
const showRefillModal = ref(false);
const isFetchingRefill = ref(false)
const modeRefill = ref(false)
const refillData = ref([])
const isWithdrawErrorAmount = ref(false)

const withdraw_amount = ref(null);
const withdraw_wallet = ref(null);
const showWithdrawModal = ref(false);
const isFetchingWithdraw = ref(false)
const modeWithdraw = ref(false)
const withdrawData = ref([])
const isWithdrawErrorAddress = ref(false)

const leftTimeRefill = ref(0);
let timer = ref(null);

const showConvertBlrModal = ref(false);
const convert_usdt_to_blr = ref(true)
const convertAmount = ref(0)
const isConvertErrorAmount = ref(false)
const convertAmountResult = computed(()=>{

  if(convert_usdt_to_blr.value){
    return asToken(convertAmount.value / blr.value.course_blr,2);
  }else{
    return asToken(convertAmount.value * blr.value.course_blr,2);
  }
  return 0;
})


const showBuyBstModal = ref(false);
const convertAmountBST = ref(0)
const isConvertErrorAmountBST = ref(false)
const convertAmountBSTResult = computed(()=>{
  return asToken(convertAmountBST.value / bst.value.course_bst,2);
})


const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);

onMounted(() => {
  if(route.params.currency){
    wallet = route.params.currency;
  }
  // balanceStore.get_transaction(wallet);
  balanceStore.get_history_in(wallet);
  balanceStore.get_history_out(wallet);
  if(refillData.value?.timeout){
    timer.value = setInterval(() => {
      leftTimeRefill.value = diffDateTime(refillData.value.timeout);

    }, 5000)
  }

});


async function startRefill() {
  if (refill_amount.value >= 10) {
    isFetchingRefill.value = true
    const {isFetching, error, data} = await useMyFetch('balance/refill').post({'amount': refill_amount.value});
    let res = JSON.parse(data?.value);
    console.log(res)
    if(res.data.address){
      modeRefill.value = true;
      refillData.value = res.data;

      this.timer = setInterval(() => {
        leftTimeRefill.value = diffDateTime(refillData.value.timeout);

      }, 1000)
    }
    isFetchingRefill.value = isFetching.value;
  }
}
async function startWithdraw() {
  if (withdraw_amount.value >= 10 && withdraw_wallet.value) {
    isFetchingWithdraw.value = true
    isWithdrawErrorAmount.value = false
    isWithdrawErrorAddress.value = false
    const {isFetching, error, data} = await useMyFetch('balance/withdraw').post({'amount': withdraw_amount.value,'address': withdraw_wallet.value});
    let res = JSON.parse(data?.value);
    console.log(res)
    if(res.data){
      modeWithdraw.value = true;

      console.log(res.data.messages)
      if(res.data.messages){
        if(res.data.messages.amount){
          isWithdrawErrorAmount.value = true;
        }
        if(res.data.messages.address){
          isWithdrawErrorAddress.value = true;
        }
      }

    }
    isFetchingWithdraw.value = isFetching.value;
  }
}
async function startConvert() {
  if (convertAmount.value >= 1) {
    isFetchingWithdraw.value = true
    isWithdrawErrorAmount.value = false
    isWithdrawErrorAddress.value = false
    let direction = convert_usdt_to_blr.value?'usdt_blr':'blr_usdt'
    const {isFetching, error, data} = await useMyFetch('balance/convert').post({'amount': convertAmount.value,'direction': direction});

    if(!error.value){
      console.log('no error')
      let res = JSON.parse(data?.value);
      console.log(res)

      console.log(res.data.messages)
      if(res.data.messages){
        if(res.data.messages.amount){
          isConvertErrorAmount.value = true;
        }
      }else{
        showConvertBlrModal.value = false
        await balanceStore.upd_balance();
      }

      isFetchingWithdraw.value = isFetching.value;
    }else{
      console.log('error')
      console.log(error.value)
      isFetchingWithdraw.value = isFetching.value;
    }
  }
}
async function startBuyBST() {
  if (convertAmountBST.value >= 1) {
    isFetchingWithdraw.value = true
    isWithdrawErrorAmount.value = false
    isWithdrawErrorAddress.value = false
    let direction = 'usdt_bst'
    const {isFetching, error, data} = await useMyFetch('balance/convert').post({'amount': convertAmountBST.value,'direction': direction});

    if(!error.value){
      console.log('no error')
      let res = JSON.parse(data?.value);
      console.log(res)

      console.log(res.data.messages)
      if(res.data.messages){
        if(res.data.messages.amount){
          isConvertErrorAmountBST.value = true;
        }
      }else{
        showBuyBstModal.value = false
        await balanceStore.upd_balance();
      }

      isFetchingWithdraw.value = isFetching.value;
    }else{
      console.log('error')
      console.log(error.value)
      isFetchingWithdraw.value = isFetching.value;
    }
  }
}

function checkTimeoutRefill(){
  if(refillData?.value?.timeout && !isTimeExpire(refillData?.value?.timeout)){
    return true;
  }
}

const {text, copy, copied, isSupported} = useClipboard()

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};


watch( withdraw_amount, async()=>{
  isWithdrawErrorAmount.value = false;
})
watch( withdraw_wallet, async()=>{
  isWithdrawErrorAddress.value = false;
})
watch( convertAmount, async()=>{
  isConvertErrorAmount.value = false;
})

</script>

<template>

  <div class="grid">
    <div class="col-12 xl:col-12 text-5xl font-bold">
      <div  class="">
        {{ $t('pages.balance.title') }}
      </div>
    </div>


    <div class="col-12 ">
      <div class="grid ">
        <div v-if="false" class="col-12 ">
          <div class="card shadow-2">
            <div class=" flex justify-content-between">

              <div class="flex flex-column ">
                <div class="flex align-items-center text-3xl" style="color:var(--grey-500)">{{
                    $t('pages.dashboard.balance')
                  }}
                </div>

              </div>
              <div class="flex flex-column ">
                <i class="pi pi-wallet" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>


        <div class="col-12 md:col-12 xl:col-4">
          <div class="card shadow-2  mb-0" style="height:100%">

            <div class=" flex justify-content-between">

              <div class="flex flex-column ">
                <div class="text-medium font-normal mb-7px  " style="color:var(--grey-500)">USDT
                </div>

              </div>
              <div class="flex flex-column ">
                {{balance.usdt}}
              </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <hr/>
            <div class=" flex justify-content-between">

              <div class="flex flex-column ">

                <div class="text-5xl font-normal mb-14">
                  <Button @click="showRefillModal=true">{{$t('pages.balance.refill_button')}}</Button>
                </div>

              </div>
              <div class="flex flex-column ">

                <div class="text-5xl font-normal mb-14">
                  <Button @click="showWithdrawModal=true">{{$t('pages.balance.withdraw_button')}}</Button>
                </div>

              </div>
            </div>


          </div>
        </div>
        <div class="col-12 md:col-12 xl:col-4">
          <div class="card shadow-2 mb-0" style="height:100%">

            <div class=" flex justify-content-between">

              <div class="flex flex-column ">
                <div class="text-medium font-normal mb-7px  " style="color:var(--grey-500)">
                  BLR
                </div>

              </div>
              <div class="flex flex-column ">
                {{balance.blr}}
              </div>
            </div>
            <br/>
            <div class="text-1xl  flex justify-content-between">

              <div class="flex flex-column ">

                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{$t('pages.balance.price')}}
                  </div>
                </div>
                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{$t('pages.balance.freeze')}}
                  </div>
                </div>
                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{$t('pages.balance.unfreeze')}}
                  </div>
                </div>
                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{$t('pages.balance.next_date')}}
                  </div>
                </div>
              </div>
              <div class="flex flex-column ">

                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{blr.course_blr}} USDT
                  </div>
                </div>
                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{blr.freeze}}
                  </div>
                </div>
                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{blr.unfreeze_next_amount}}
                  </div>
                </div>
                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{asDateTime(blr.unfreeze_next_date)}}
                  </div>
                </div>
              </div>

            </div>
            <hr/>
            <div class=" flex justify-content-center">

              <div class="flex flex-column ">

                <div class="text-5xl font-normal mb-14">
                  <div class="flex align-items-center">
                    <Button @click="showConvertBlrModal=true">{{$t('pages.balance.convert_button')}}</Button>
                  </div>
                </div>

              </div>
            </div>


          </div>
        </div>
        <div class="col-12 md:col-12 xl:col-4">
          <div class="card shadow-2 mb-0" style="height:100%">

            <div class=" flex justify-content-between">

              <div class="flex flex-column ">
                <div class="text-medium font-normal mb-7px  " style="color:var(--grey-500)">
                  BST
                </div>

              </div>
              <div class="flex flex-column ">
                {{balance.bst}}
              </div>
            </div>
            <br/>
            <div class="text-1xl  flex justify-content-between">

              <div class="flex flex-column ">

                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{$t('pages.balance.price')}}
                  </div>
                </div>
                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{$t('pages.balance.accelerates')}}
                  </div>
                </div>
                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    {{$t('pages.balance.to_next_level')}}
                  </div>
                </div>
              </div>
              <div class="flex flex-column ">

                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    0.01 USDT
                  </div>
                </div>
                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    +0% (1%)
                  </div>
                </div>
                <div class="font-normal mb-14">
                  <div class="flex align-items-center">
                    1000
                  </div>
                </div>
              </div>

            </div>
            <br/>
            <br/>
            <hr/>
            <div class=" flex justify-content-center">

              <div class="flex flex-column ">

                <div class="text-5xl font-normal mb-14">
                  <div class="flex align-items-center">
                    <Button @click="showBuyBstModal=true">{{$t('pages.balance.buy_button')}}</Button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

    </div>

    <div v-if="false" class="col-12">
      <div class="card">
        <h5>Balance</h5>
        <DataTable
            :value="transactions"
            :paginator="true"
            class="p-datatable-gridlines"
            :rows="5"
            dataKey="id"
            :rowHover="true"
            :loading="loading1"
            responsiveLayout="scroll"
            :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column field="amount" header="Balance" sortable filterField="amount" dataType="numeric" style="min-width: 10rem" >
            <template #body="{ data }">
              <div>
                {{ formatCurrency(data.amount) }}
              </div>
            </template>
            <template #filter="{ filterModel }">
              <InputNumber v-model="filterModel.value" mode="amount" currency="USD" locale="en-US" />
            </template>
          </Column>
          <Column field="date" header="Date" sortable filterField="date" dataType="date" style="min-width: 10rem">
            <template #body="{ data }">
              {{ asDateTime(data.date) }}
            </template>
            <template #filter="{ filterModel }">
              <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
            </template>
          </Column>
          <Column field="type" sortable header="Type" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.type }}
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
            </template>
          </Column>
          <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
            <template #body="{ data }">
              <span :class="'customer-badge status-' + data.status">{{ data.status }}</span>
            </template>
            <template #filter="{ filterModel }">
              <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                <template #value="slotProps">
                  <span v-if="slotProps.value" :class="'customer-badge status-' + slotProps.value">{{ slotProps.value }}</span>
                  <span v-else>{{ slotProps.placeholder }}</span>
                </template>
                <template #option="slotProps">
                  <span :class="'customer-badge status-' + slotProps.option">{{ slotProps.option }}</span>
                </template>
              </Dropdown>
            </template>
          </Column>
<!--          <Column field="activity" header="Activity" :showFilterMatchModes="false" style="min-width: 12rem">-->
<!--            <template #body="{ data }">-->
<!--              <ProgressBar :value="data.activity" :showValue="false" style="height: 0.5rem"></ProgressBar>-->
<!--            </template>-->
<!--            <template #filter="{ filterModel }">-->
<!--              <Slider v-model="filterModel.value" :range="true" class="m-3"></Slider>-->
<!--              <div class="flex align-items-center justify-content-between px-2">-->
<!--                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>-->
<!--                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>-->
<!--              </div>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="verified" header="Verified" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">-->
<!--            <template #body="{ data }">-->
<!--              <i-->
<!--                  class="pi"-->
<!--                  :class="{-->
<!--                                    'text-green-500 pi-check-circle': data.verified,-->
<!--                                    'text-pink-500 pi-times-circle': !data.verified-->
<!--                                }"-->
<!--              ></i>-->
<!--            </template>-->
<!--            <template #filter="{ filterModel }">-->
<!--              <TriStateCheckbox v-model="filterModel.value" />-->
<!--            </template>-->
<!--          </Column>-->
        </DataTable>
      </div>
    </div>
    <div class="col-12 lg:col-6">
      <div class="card">
        <h5>Invoice In</h5>
        <DataTable
            :value="historyIn"
            :paginator="true"
            :alwaysShowPaginator="false"
            class="p-datatable-gridlines"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            :loading="loading1"
            responsiveLayout="scroll"
            :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column field="amount" header="Balance" sortable filterField="amount" dataType="numeric" style="min-width: 20rem" >
            <template #body="{ data }">
              <div>
                {{ formatCurrency(data.amount) }}
              </div>
            </template>
            <template #filter="{ filterModel }">
              <InputNumber v-model="filterModel.value" mode="amount" currency="USD" locale="en-US" />
            </template>
          </Column>
          <Column field="date" header="Date" sortable filterField="date" dataType="date" style="min-width: 10rem">
            <template #body="{ data }">
              {{ asDateTime(data.created_at) }}
            </template>
            <template #filter="{ filterModel }">
              <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
            </template>
          </Column>
          <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }">
            <template #body="{ data }">
              <span :class="'customer-badge status-' + data.status">{{ data.status }}</span>
            </template>
            <template #filter="{ filterModel }">
              <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                <template #value="slotProps">
                  <span v-if="slotProps.value" :class="'customer-badge status-' + slotProps.value">{{ slotProps.value }}</span>
                  <span v-else>{{ slotProps.placeholder }}</span>
                </template>
                <template #option="slotProps">
                  <span :class="'customer-badge status-' + slotProps.option">{{ slotProps.option }}</span>
                </template>
              </Dropdown>
            </template>
          </Column>
<!--          <Column field="activity" header="Activity" :showFilterMatchModes="false" style="min-width: 12rem">-->
<!--            <template #body="{ data }">-->
<!--              <ProgressBar :value="data.activity" :showValue="false" style="height: 0.5rem"></ProgressBar>-->
<!--            </template>-->
<!--            <template #filter="{ filterModel }">-->
<!--              <Slider v-model="filterModel.value" :range="true" class="m-3"></Slider>-->
<!--              <div class="flex align-items-center justify-content-between px-2">-->
<!--                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>-->
<!--                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>-->
<!--              </div>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="verified" header="Verified" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">-->
<!--            <template #body="{ data }">-->
<!--              <i-->
<!--                  class="pi"-->
<!--                  :class="{-->
<!--                                    'text-green-500 pi-check-circle': data.verified,-->
<!--                                    'text-pink-500 pi-times-circle': !data.verified-->
<!--                                }"-->
<!--              ></i>-->
<!--            </template>-->
<!--            <template #filter="{ filterModel }">-->
<!--              <TriStateCheckbox v-model="filterModel.value" />-->
<!--            </template>-->
<!--          </Column>-->
        </DataTable>
      </div>
    </div>
    <div class="col-12 lg:col-6">
      <div class="card">
        <h5>Invoice Out</h5>
        <DataTable
            :value="historyOut"
            :paginator="true"
            :alwaysShowPaginator="false"
            class="p-datatable-gridlines"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            :loading="loading1"
            responsiveLayout="scroll"
            :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column field="amount" header="Balance" sortable filterField="amount" dataType="numeric" style="min-width: 20rem" >
            <template #body="{ data }">
              <div>
                {{ formatCurrency(data.amount) }}
              </div>
            </template>
            <template #filter="{ filterModel }">
              <InputNumber v-model="filterModel.value" mode="amount" currency="USD" locale="en-US" />
            </template>
          </Column>
          <Column field="date" header="Date" sortable filterField="date" dataType="date" style="min-width: 10rem">
            <template #body="{ data }">
              {{ asDateTime(data.created_at) }}
            </template>
            <template #filter="{ filterModel }">
              <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
            </template>
          </Column>
          <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }">
            <template #body="{ data }">
              <span :class="'customer-badge status-' + data.status">{{ data.status }}</span>
            </template>
            <template #filter="{ filterModel }">
              <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                <template #value="slotProps">
                  <span v-if="slotProps.value" :class="'customer-badge status-' + slotProps.value">{{ slotProps.value }}</span>
                  <span v-else>{{ slotProps.placeholder }}</span>
                </template>
                <template #option="slotProps">
                  <span :class="'customer-badge status-' + slotProps.option">{{ slotProps.option }}</span>
                </template>
              </Dropdown>
            </template>
          </Column>
<!--          <Column field="activity" header="Activity" :showFilterMatchModes="false" style="min-width: 12rem">-->
<!--            <template #body="{ data }">-->
<!--              <ProgressBar :value="data.activity" :showValue="false" style="height: 0.5rem"></ProgressBar>-->
<!--            </template>-->
<!--            <template #filter="{ filterModel }">-->
<!--              <Slider v-model="filterModel.value" :range="true" class="m-3"></Slider>-->
<!--              <div class="flex align-items-center justify-content-between px-2">-->
<!--                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>-->
<!--                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>-->
<!--              </div>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="verified" header="Verified" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">-->
<!--            <template #body="{ data }">-->
<!--              <i-->
<!--                  class="pi"-->
<!--                  :class="{-->
<!--                                    'text-green-500 pi-check-circle': data.verified,-->
<!--                                    'text-pink-500 pi-times-circle': !data.verified-->
<!--                                }"-->
<!--              ></i>-->
<!--            </template>-->
<!--            <template #filter="{ filterModel }">-->
<!--              <TriStateCheckbox v-model="filterModel.value" />-->
<!--            </template>-->
<!--          </Column>-->
        </DataTable>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="showRefillModal" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">{{$t('pages.balance.refill_header')}} USDT TRC-20</span>
      </div>
    </template>
    <div v-if="!modeRefill" class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">
      <div class="text-xl mb-14">
        {{ $t('pages.balance.amount_refill') }}
      </div>

      <div class="transition-all transition-duration-400 transition-ease-in-out mb-4">
        <InputText v-model.number="refill_amount" class="w-full"/>
      </div>
      USDT TRC-20

      <Button v-if="!isFetchingRefill" @click="startRefill()" :label="$t('pages.balance.refill_button')"></Button>
      <Button v-else  icon="pi pi-spin pi-spinner" class="p-button-rounded mr-2"></Button>
    </div>
    <div v-else class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">

      <Message severity="info" :sticky="sticky">

        <div  class="text-medium font-normal mb-7px">
          {{ $t('pages.balance.warning_text_refill_smart_address_1') }}
        </div>
        <div  class="text-medium font-normal mb-7px">
          {{ $t('pages.balance.warning_text_refill_smart_address_2') }}
        </div>

        <div  class="text-medium font-normal mb-7px">
          {{ $t('pages.balance.warning_text_refill_smart_address_3') }}
        </div>
      </Message>


      <div class="col-12">
        <div class="mb-0" style="height:100%">

          <div class=" flex justify-content-center">


              <div class="text-1xl font-normal mb-14">

                <div class="row mb-24">
                  <div class="col-12 col-lg-9">

                    <div class="text-label mb-14 font-medium flex justify-content-center">
                      {{$t('pages.safe.send_amount_usdt')}}
                    </div>
                    <div class="flex justify-content-center text-3xl font-normal "> {{ refillData.amount }} {{ refillData.currency }}</div>
                  </div>

                </div>
                <div class="flex justify-content-center"  >
                  <div class="qr-code d-flex justify-content-center justify-content-lg-start align-items-center ">
                    <img :src="refillData.qrcode" :alt="refillData.qrcode" style="background-color: white"/>
                  </div>
                </div>
                <Message severity="warn" :closable="false" v-if="checkTimeoutRefill()">
                  {{$t('pages.balance.warning_time_address_refill')}}
                  {{$t('pages.balance.left')}} {{leftTimeRefill}}
                </Message>
                <Message severity="error" :closable="false" v-else>
                  <div>{{$t('pages.balance.warning_time_address_refill_expire')}}</div>
                  {{$t('pages.balance.warning_time_address_refill_expire_2')}}
                </Message>
                  <div class="col-12">

                    <div class=" align-items-center shadow-2 card mb-14"
                          @click='copy(refillData.address)'
                          style="cursor:pointer;padding: 10px">
                      <span v-if='!copied'>{{ refillData.address }} <i
                          class="pi pi-copy"></i></span>
                      <span v-else-if="copied"><i class="pi pi-check-circle text-green-500"></i> {{$t('pages.common.copied')}}
                      </span>
                    </div>
                    <div class="text-label">
                      {{$t('pages.safe.enrollment_time')}}
                    </div>
                  </div>

                <div  class="text-label mb-14 font-medium flex justify-content-center">
                  <Button severity="success" icon="pi pi-check-circle" @click="showRefillModal=false" :label="$t('pages.balance.ready_button')"></Button>
                </div>
                <hr/>
                <div  class="text-label mb-14 font-medium flex justify-content-center">
                  <Button icon="pi pi-refresh" @click="refillData=[];modeRefill=false" :label="$t('pages.balance.new_refill_button')"></Button>
                </div>
              </div>

          </div>

        </div>
      </div>

    </div>
  </Dialog>
  <Dialog v-model:visible="showWithdrawModal" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">{{$t('pages.balance.withdraw_header')}} USDT TRC-20</span>
      </div>
    </template>
    <div class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">
      <div class="text-xl mb-14">
        {{ $t('pages.balance.amount_withdraw') }}
      </div>

      <div class="transition-all transition-duration-400 transition-ease-in-out mb-4">
        <InlineMessage v-if="isWithdrawErrorAmount"  class=" flex justify-content-center" >{{ $t('pages.balance.error_withdraw_amount') }}</InlineMessage>
        <div>{{$t('pages.balance.balance')}} {{balance.usdt}}</div>
        <InputText v-model.number="withdraw_amount" class="w-full"/>
      </div>
      <div class="text-xl mb-14">
        {{ $t('pages.balance.address_withdraw') }}
      </div>
      <div class="transition-all transition-duration-400 transition-ease-in-out mb-4">
        <InlineMessage v-if="isWithdrawErrorAddress"  class=" flex justify-content-center" >{{ $t('pages.balance.error_withdraw_address') }}</InlineMessage>
        <InputText v-model.trim="withdraw_wallet" class="w-full"/>
      </div>

      <Button v-if="!isFetchingWithdraw" @click="startWithdraw()" :label="$t('pages.balance.withdraw_button')"></Button>
      <Button v-else  icon="pi pi-spin pi-spinner" class="p-button-rounded mr-2"></Button>
    </div>
  </Dialog>
  <Dialog v-model:visible="showConvertBlrModal" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">{{$t('pages.balance.swap_blr_header')}} BLR</span>
      </div>
    </template>
    <div class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">
      <div class="text-xl mb-14">
        {{ $t('pages.balance.swap_amount_input') }}
      </div>

      <div class="transition-all transition-duration-400 transition-ease-in-out mb-4">
        <div v-if="convert_usdt_to_blr" class="text-xl mb-14">{{$t('pages.balance.balance')}}: {{balance.usdt}} USDT</div>
        <div v-else class="text-xl mb-14">{{$t('pages.balance.balance')}}: {{balance.blr}} BLR</div>
        <InlineMessage v-if="isConvertErrorAmount"  class=" flex justify-content-center" >{{ $t('pages.balance.error_convert_amount') }}</InlineMessage>
        <InputText v-model.number="convertAmount" class="w-full"/>
      </div>
      <div  class="inline-flex align-items-center justify-content-center gap-2 text-5xl">
          <i @click="convert_usdt_to_blr=!convert_usdt_to_blr" class="pi pi-sync" style="font-size: 1.5rem"></i>
      </div>
      <div v-if="convert_usdt_to_blr" class="text-xl mb-14">BLR</div>
      <div v-else class="text-xl mb-14">USDT</div>

      <div class="transition-all transition-duration-400 transition-ease-in-out mb-4">
        <InputText v-model.trim="convertAmountResult" class="w-full" disabled/>
      </div>

      <Button v-if="!isFetchingWithdraw" @click="startConvert()" :label="$t('pages.balance.swap_blr_button')"></Button>
      <Button v-else  icon="pi pi-spin pi-spinner" class="p-button-rounded mr-2"></Button>
    </div>
  </Dialog>
  <Dialog v-model:visible="showBuyBstModal" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">{{$t('pages.balance.buy_bst_header')}} BLR</span>
      </div>
    </template>
    <div class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">
      <div class="text-xl mb-14">
        {{ $t('pages.balance.buy_amount_input') }}
      </div>

      <div class="transition-all transition-duration-400 transition-ease-in-out mb-4">
        <div class="text-xl mb-14">{{$t('pages.balance.balance')}}: {{balance.usdt}} USDT</div>
        <InlineMessage v-if="isConvertErrorAmount"  class=" flex justify-content-center" >{{ $t('pages.balance.error_convert_amount') }}</InlineMessage>
        <InputText v-model.number="convertAmountBST" class="w-full"/>
      </div>
      <div class="text-xl mb-14">BST</div>

      <div class="transition-all transition-duration-400 transition-ease-in-out mb-4">
        <InputText v-model.trim="convertAmountBSTResult" class="w-full" disabled/>
      </div>

      <Button v-if="!isFetchingWithdraw" @click="startBuyBST()" :label="$t('pages.balance.swap_blr_button')"></Button>
      <Button v-else  icon="pi pi-spin pi-spinner" class="p-button-rounded mr-2"></Button>
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}
::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
