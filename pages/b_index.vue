<script setup>
import {useLayout} from '@/layouts/composables/layout';
import {onMounted, reactive, ref, watch} from 'vue';
import {storeToRefs} from "pinia";
import {Formatter} from "@/service/formatter";
import Mel from "../components/icons/mel.vue";

import {useUserStore} from '@/stores/user';

const userStore = useUserStore();
const {user} = storeToRefs(userStore)


import {useBalanceStore} from "../stores/balance";
const balanceStore = useBalanceStore();
const {balance,blr} = storeToRefs(balanceStore)

import {useTokenStore} from "../stores/token";

const tokenStore = useTokenStore();
const {tokenPrice, chart_label, chart_data} = storeToRefs(tokenStore)


import {useStructureStore} from '@/stores/structure';

const structureStore = useStructureStore();
const {count_first_line, count_binary,list_career} = storeToRefs(structureStore)

const {asToken, asDateTime} = Formatter();

const {isDarkTheme} = useLayout();
const {locale} = useI18n()

const setChartData = () => {
  return {
    labels: chart_label?.value,
    datasets: [
      {
        label: false,
        data: chart_data?.value,
        fill: true,
        backgroundColor: 'rgba(186,104,200,0.25)',
        borderColor: '#BA68C8',
        tension: 0.4,
      }
    ]
  };
}
const optionsTypeChart = ref([
  {name: '24H', value: 'day', constant: false},
  {name: '1W', value: 'week', constant: false},
  {name: '1M', value: 'month', constant: false}
]);
const valueTypeChart = ref(optionsTypeChart.value[0]);
watch(valueTypeChart, (last, news) => {
  if (valueTypeChart?.value?.value) {
    tokenStore.get_chart(valueTypeChart.value.value)
  }
})
const lineOptions = ref(null);

onMounted(() => {
});

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
};

const applyLightTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: false
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: '#9E9E9E'
        },
        grid: {
          color: 'rgba(69, 69, 69, 0)'
        }
      },
      y: {
        ticks: {
          color: '#9E9E9E'
        },
        grid: {
          color: 'rgba(69, 69, 69, 0.3)'
        }
      }
    }
  };
};

const applyDarkTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: false
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: '#ebedef'
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)'
        }
      },
      y: {
        ticks: {
          color: '#ebedef'
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)'
        }
      }
    }
  };
};

const dayPercent = '+0%';
const monthPercent = '+0%';

const chartData = ref();

chartData.value = setChartData();

watch(chart_label, () => {
  chartData.value = setChartData();
})
watch(
    isDarkTheme,
    (val) => {
      if (val) {
        applyDarkTheme();
      } else {
        applyLightTheme();
      }
    },
    {immediate: true}
);

// const firstTime = true;


// const viewQuestionBalanceOld = computed(()=>{
//   console.log(!user.uvtm);
//   console.log(balance?.value?.mel);
//   // balance.value.mel = 1;
//   return false;
//   return !user.uvtm && balance?.value?.mel>0;
// })

</script>

<template>
  <div class="grid">

    <div class="col-12 xl:col-12 text-5xl font-bold">
      <div class="">
        {{ $t('pages.dashboard.title') }}
      </div>
    </div>

    <div class="col-12 md:col-6 xl:col-3">
      <div class="card shadow-2  mb-0" style="height:100%">

        <div class=" flex justify-content-between">

          <div class="flex flex-column ">
            <div class="text-medium font-normal mb-7px  " style="color:var(--grey-500)">{{
                $t('pages.dashboard.balance')
              }}
            </div>

          </div>
          <div class="flex flex-column ">
            <i class="pi pi-wallet" style="font-size: 2rem"></i>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <div class=" flex justify-content-between">

          <div class="flex flex-column ">

            <div class="text-2xl font-normal mb-14">
              <div class="flex align-items-center"> {{ balance?.usdt }} USDT</div>
            </div>

          </div>
          <div class="flex flex-column ">

            <div class="text-2xl font-normal mb-14">
              <div class="flex align-items-center"> {{ balance?.blr }} BLR</div>
            </div>

          </div>
        </div>


      </div>
    </div>
    <!--    <div class="col-12 md:col-6 xl:col-3">
          <div class="card shadow-2 mb-0" style="height:100%">

            <div class=" flex justify-content-between">

              <div class="flex flex-column ">
                <div class="text-medium font-normal mb-7px  " style="color:var(&#45;&#45;grey-500)">
                  {{ $t('pages.dashboard.all_earned') }}
                </div>

              </div>
              <div class="flex flex-column ">
                <i class="pi pi-wallet" style="font-size: 2rem"></i>
              </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div class=" flex justify-content-between">

              <div class="flex flex-column ">

                <div class="text-5xl font-normal mb-14">
                  <div class="flex align-items-center"> {{ balance?.mel }} USDT</div>
                </div>

              </div>
              <div class="flex flex-column ">

                <div class="text-5xl font-normal mb-14">
                  <div class="flex align-items-center"> {{ balance?.mel }} BLR</div>
                </div>

              </div>
            </div>


          </div>
        </div>-->
    <div class="col-12 md:col-6 xl:col-3">
      <div class="card shadow-2 mb-0" style="height:100%">

        <div class=" flex justify-content-between">

          <div class="flex flex-column ">
            <div class="text-medium font-normal mb-7px  " style="color:var(--grey-500)">
              {{ $t('pages.dashboard.structure') }}
            </div>

          </div>
          <div class="flex flex-column ">
            <i class="pi pi-sitemap" style="font-size: 2rem"></i>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <div class=" flex justify-content-between">

          <div class="flex flex-column ">

            <div class="text-5xl font-normal mb-14">
              <div class="flex align-items-center"> {{ count_first_line }}
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
    <div class="col-12 md:col-6 xl:col-3">
      <div class="card shadow-2 mb-0" style="height:100%">

        <div class=" flex justify-content-between">

          <div class="flex flex-column ">
            <div class="text-medium font-normal mb-7px  " style="color:var(--grey-500)">
              {{ $t('pages.dashboard.binar_structure') }}
            </div>

          </div>
          <div class="flex flex-column ">
            <i class="pi pi-share-alt" style="font-size: 2rem"></i>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <div class=" flex justify-content-between">

          <div class="flex flex-column ">

            <div class="text-5xl font-normal mb-14">
              <div class="flex align-items-center"> {{ count_binary }}
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
    <div class="col-12 md:col-6 xl:col-3">
      <div class="card shadow-2 mb-0" style="height:100%">

        <div class=" flex justify-content-between">

          <div class="flex flex-column ">
            <div class="text-medium font-normal mb-7px  " style="color:var(--grey-500)">
              {{ $t('pages.dashboard.career') }}
            </div>

          </div>
          <div class="flex flex-column ">
            <i class="pi pi-sort-amount-up" style="font-size: 2rem"></i>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <div class=" flex justify-content-between">

          <div class="flex flex-column ">

            <div class="text-5xl font-normal mb-14">
              <div class="flex align-items-center" v-if="user">{{ $t('range.range_' + user?.range_level) }}
              </div>
            </div>

          </div>
          <div class="flex flex-column ">

            <div class="text-5xl font-normal mb-14">
              <router-link to="/info">
                <Button>{{$t('detail')}}</Button>
              </router-link>
            </div>

          </div>
        </div>


      </div>
    </div>


    <div class="col-12 xl:col-6">
      <div class="card shadow-2">
        <div class="flex justify-content-between text-xl font-medium">
          <div class="text-xl font-bold mb-2 flex align-items-center">
            1 BLR
            <span class="mr-2 ml-2">=</span> {{ asToken(blr.course_blr) }}$
          </div>
          <div class="flex">
            <SelectButton v-model="valueTypeChart" :options="optionsTypeChart" :allowEmpty=false
                          optionDisabled="constant" optionLabel="name" aria-labelledby="basic"/>
          </div>
        </div>
        <div class="flex justify-content-between text-xl font-medium">
        </div>
        <Chart type="line" :data="chartData" :options="lineOptions"/>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <!--        <div class="col-12 xl:col-6">-->
      <div class="grid">
        <div class="col-12">
          <div class="card shadow-2">
            <div class=" flex justify-content-between">

              <div class="flex flex-column ">
                <div class="text-medium font-normal mb-7px  " style="color:var(--grey-500)">{{
                    $t('pages.dashboard.balance')
                  }}
                </div>
                <br/>

              </div>
              <div class="flex flex-column ">
                <i class="pi pi-wallet" style="font-size: 2rem"></i>

              </div>
            </div>
            <br/>
            <div class=" flex justify-content-between">

              <div class="flex flex-column ">
                <br/>
                <div class="text-medium font-normal mb-7px text-2xl">
                  {{$t('pages.dashboard.info_block.course')}} BLR

                </div>
                <div>
                  {{blr.course_blr}} USDT
                </div>
                <br/>
                <br/>
                <div class="text-medium font-normal mb-7px text-2xl">
                  {{$t('pages.dashboard.info_block.freeze')}} BLR

                </div>
                <div>
                  {{blr.freeze}} USDT
                </div>
                <br/>
                <br/>
                <div class="text-medium font-normal mb-7px text-2xl">
                  {{$t('pages.dashboard.info_block.next_unfreeze_amount')}}

                </div>
                <div>
                  {{blr.unfreeze_next_amount}} USDT
                </div>
                <br/>
                <br/>
                <div class="text-medium font-normal mb-7px text-2xl">
                  {{$t('pages.dashboard.info_block.next_unfreeze_percent')}}

                </div>
                <div>
                  {{blr.unfreeze_percent}} %
                </div>
                <br/>
                <br/>
                <div class="text-medium font-normal mb-7px text-2xl">
                  {{$t('pages.dashboard.info_block.next_unfreeze_date')}}

                </div>
                <div>
                  {{asDateTime(blr.unfreeze_next_day)}}
                </div>
                <br/>
                <br/>

              </div>
              <div class="flex flex-column ">

                <br/>
                <div class="text-medium font-normal mb-7px text-2xl">
                  {{$t('pages.dashboard.info_block.bought')}} BST

                </div>
                <div>
                  {{balance.bst}}
                </div>
                <br/>
                <br/>
                <div class="text-medium font-normal mb-7px text-2xl">
                  {{$t('pages.dashboard.info_block.max_profit')}} BLR

                </div>
                <div>
                  х{{list_career[user?.range_level+1]?.income_binary}}
                </div>
                <br/>
                <br/>
                <div class="text-medium font-normal mb-7px text-2xl">
                  {{$t('pages.dashboard.info_block.binary_percent')}}

                </div>
                <div>
                  {{list_career[user?.range_level+1]?.income_binary}}%
                </div>
                <br/>
                <br/>
                <div class="text-medium font-normal mb-7px text-2xl">
                  {{$t('pages.dashboard.info_block.linear_percent')}}

                </div>
                <div>
                  10%
                </div>
                <br/>
                <br/>
                <div>
                  <router-link to="/balance">
                    <Button class="text-medium font-normal mb-7px text-3xl">{{$t('pages.dashboard.info_block.buy')}}</Button>
                  </router-link>
                </div>

              </div>
            </div>
          </div>
        </div>


      </div>


    </div>


    <div v-if="false" class="col-12 xl:col-12">
      <transaction-table-transfer></transaction-table-transfer>
    </div>
  </div>

</template>
