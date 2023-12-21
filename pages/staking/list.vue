<script setup>
import { onMounted, ref } from 'vue';
import {storeToRefs} from "pinia";
import { useStructureStore } from '@/stores/structure';

import { writeContract,readContract } from '@wagmi/core'

const structureStore = useStructureStore();
const { list,loadingList } = storeToRefs(structureStore)

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore)

import { Formatter } from "@/service/formatter";
const { asToken ,asDateTime} = Formatter();

import {useMelStore} from '@/stores/mel';
const melStore = useMelStore();
const {
  referral_list
} = storeToRefs(melStore)

const update_list = ref(false)

const source = ref('https://new-cabinet.untime.tech/'+user?.referal_id)
const { text, copy, copied, isSupported } = useClipboard({ source })

onMounted(() => {
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>{{ $t("pages.staking.title") }}</h5>

              <ClientOnly fallback-tag="span" fallback="">
                <staking-add-staking @add-staking="update_list=!update_list"></staking-add-staking>
                <staking-table-staking :update_list="update_list"></staking-table-staking>
              </ClientOnly>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
