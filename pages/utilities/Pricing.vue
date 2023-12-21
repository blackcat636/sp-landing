<script setup lang="ts">

import {ref, computed} from 'vue';
import {storeToRefs} from 'pinia'

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { uvtmCheck } = storeToRefs(userStore)

const props = defineProps({
  balance: Number
})

const mel_step = ref(1);
const mel_quantity = ref(0);
const plans = [
  {
    id: 1,
    name: 'pages.new_texts.text_form_1',
    short_decs: 'pages.new_texts.text_form_1_2',
    icon: 'pi pi-pencil',
    description: [
      {name: 'pages.new_texts.text_form_1_desc_1', icon: 'pi pi-reply'},
      {name: 'pages.new_texts.text_form_1_desc_2', icon: 'pi pi-check-circle'},
      {name: 'pages.new_texts.text_form_1_desc_3', icon: 'pi pi-check-circle'},
    ]
  },
  {
    id: 2,
    name: 'pages.new_texts.text_form_2',
    short_decs: 'pages.new_texts.text_form_2_2',
    icon: 'pi pi-palette',
    description: [
      {name: 'pages.new_texts.text_form_2_desc_1', icon: false},
    ]
  }
];
const activeIndex = ref(0);
const changeMelStep = (id) =>{
    mel_step.value = id
}

const balanceOld = computed(()=>{
  return (props.balance.mel - mel_quantity.value ).toFixed(2);
});

const emit = defineEmits(['success','cancel'])



import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();
const confirm1 = () => {
  confirm.require({
    message: 'Уверены в своем выборе?', //$t('pages.new_texts.agree')
    header: 'Подтверждение', //$t('pages.new_texts.confirm')
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => {
      console.log(mel_quantity.value)
      console.log(balanceOld.value)
      userStore.uvtmCheck(0,mel_quantity.value,parseFloat(balanceOld.value));
      changeMelStep(3)
    },
    reject: () => {
    }
  });
};
const confirm2 = () => {
  confirm.require({
    message: 'Уверены в своем выборе?',
    header: 'Подтверждение',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => {
      userStore.uvtmCheck(1,0,0);
      emit('success')
    },
    reject: () => {
    }
  });
};
</script>

<template>
  <div>
    <div class="flex flex-column lg:flex-row gap-4  <!--xl:px-8 -->xl:mx-8">
      <div class="flex flex-column gap-4 flex-1">
        <div
            v-for="(plan,index) in plans"
            :key="plan.icon"
            class="shadow-2 surface-card p-4 cursor-pointer border-round-lg border-2 border-transparent text-900 hover:surface-hover transition-colors transition-duration-150"
            @click="activeIndex = index" :class="{ 'border-mel': index === activeIndex }">


          <div class="flex flex-column lg:flex-row align-items-start">
            <div class="mr-3">
                            <span
                                class="inline-flex justify-content-center border-circle align-items-center w-3rem h-3rem bg-mel">
                                <i :class="plan.icon" class="text-2xl"></i>
                            </span>
            </div>
            <div>
              <div class="text-xl mb-1 font-bold">{{ $t(plan.name) }}</div>
              <p class="mt-0 mb-4 font-light text-sm">{{ $t(plan.short_decs) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1">

        <div class="flex flex-column shadow-2 h-full border-round-lg overflow-hidden" v-if="activeIndex == 0">
          <div v-if="mel_step==1">
            <div class="bg-mel p-5">
              <div class="flex justify-content-between flex-wrap gap-3 mb-4 align-items-center">
                <div class="text-4xl font-bold">
                  {{ $t('pages.new_texts.exchange_to_mel')}}
                </div>
              </div>
              <p class="m-0 line-height-3">
                  {{ $t('pages.new_texts.get_money')}}
              </p>
            </div>
            <div class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">
              <div class="text-xl">
                  {{ $t('pages.new_texts.advantages')}}
              </div>

              <div class="flex-1 mb-3">
                <ul class="list-none p-0 m-0" v-for="description of plans[activeIndex].description" :key="description.icon">
                  <li class="flex align-items-center py-3">
                    <i :class="description.icon" class="text-mel mr-3"></i>
                    <span class="text-700">{{ $t(description.name) }}</span>
                  </li>
                </ul>
              </div>
              <Button @click="changeMelStep(2)" class="btn-mel" :label="$t('pages.new_texts.choose')"></Button>
            </div>
          </div>
          <div v-if="mel_step==2">
            <div class="bg-mel p-5">
              <div class="flex justify-content-between flex-wrap gap-3 mb-4 align-items-center">
                <div class="text-4xl font-bold">
                    {{ $t('pages.new_texts.convert')}}
                </div>
              </div>
              <p class="m-0 line-height-3">
                &nbsp;
              </p>
            </div>


            <div class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">
              <div class="text-xl mb-14">
                  {{ $t('pages.new_texts.mel_amount')}}
              </div>

              <div class="transition-all transition-duration-400 transition-ease-in-out mb-4">
                <InputText v-model.number="mel_quantity" class="w-full"/>
                <Slider v-model="mel_quantity" :max="balance.mel" class="w-full"/>
              </div>

              <div class="text-medium mb-1" style="color:var(--gray-400)">
                  {{ $t('pages.new_texts.balance')}}
              </div>

              <div class="text-xl mb-14">
                $ {{balanceOld}}
                <div v-if="balanceOld<0" class="text-xl mb-14" style="color:red">
                  Error
                </div>
              </div>

              <div class="text-medium mb-1" style="color:var(--gray-400)">
                  {{ $t('pages.new_texts.get_mel')}}
              </div>

              <div class="text-xl mb-4">
                {{mel_quantity}} Mel
              </div>

              <Button @click="confirm1()" class="btn-mel" :label="$t('pages.new_texts.convert')"></Button>
            </div>
          </div>

          <div v-if="mel_step==3">
            <div class="bg-mel p-5">
              <div class="flex justify-content-between flex-wrap gap-3 mb-4 align-items-center">
                <div class="text-4xl font-bold">
                    {{ $t('pages.new_texts.translation_completed') }}
                </div>
              </div>
              <p class="m-0 line-height-3">
                  {{ $t('pages.new_texts.thank_u') }}
              </p>
            </div>

            <div class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">

              <div class="text-xl mb-14">{{ $t('pages.new_texts.when_added')}}</div>

              <div class="text-medium" style="min-height:175px">{{ $t('pages.new_texts.text_exchange')}}</div>

              <Button  @click="emit('success')" class="btn-mel" :label="$t('pages.new_texts.translation_completed')"></Button>
            </div>
          </div>
        </div>


        <div class="flex flex-column shadow-2 h-full border-round-lg overflow-hidden" v-if="activeIndex == 1">
          <div class="bg-mel p-5">
            <div class="flex justify-content-between flex-wrap gap-3 mb-4 align-items-center">
              <div class="text-4xl font-bold">
                {{ $t(plans[activeIndex].name) }}
              </div>
            </div>
            <p class="m-0 line-height-3">
                {{ $t('pages.new_texts.return_funds')}}
            </p>
          </div>
          <div class="flex-1 border-round-lg border-noround-top surface-card p-5 flex flex-column">
            <div class="flex-1">
              <div class="text-xl mb-14">
                  {{ $t('pages.new_texts.info')}}
              </div>
              <div class="text-medium" style="min-height:175px">
                {{ $t(plans[activeIndex].description[0].name) }}
              </div>
            </div>
            <Button @click="confirm2()" class="btn-mel" :label="$t('pages.new_texts.choose')"></Button>
          </div>
        </div>


      </div>
    </div>
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>
