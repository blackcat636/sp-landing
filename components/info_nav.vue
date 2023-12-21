<script>
export default {
  props: {
    page: 'career',
  }
}
</script>
<script setup>

import {storeToRefs} from "pinia";

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore)


const source = ref('https://new-cabinet.untime.tech/'+user?.referal_id)
const { text, copy, copied, isSupported } = useClipboard({ source })

</script>

<template>
    <div class="surface-card shadow-2 card">
      <div class=" flex justify-content-center">
        <span>
          <Button v-if="page=='career'" icon="pi pi-sitemap" :label="$t('pages.info.career')" disabled severity="secondary" text raised class="mr-2 ml-2 mb-2 flex justify-content-center text-xl  font-bold"/>
          <router-link  v-else  to="/info">
            <Button severity="success" icon="pi pi-sitemap" :label="$t('pages.info.career')" text raised class="mr-2 ml-2 mb-2 flex justify-content-center text-xl  font-bold"/>
          </router-link>
        </span>
        <span>
          <Button v-if="page=='bst'" icon="pi pi-percentage" label="BST" disabled severity="secondary" text raised class="mr-2 ml-2 mb-2 flex justify-content-center text-xl  font-bold"/>
          <router-link v-else to="/info/bst">
            <Button severity="success" icon="pi pi-percentage" label="BST" text raised class="mr-2 ml-2 mb-2 flex justify-content-center text-xl  font-bold"/>
          </router-link>
        </span>
      </div>
      <br/>
    </div>
</template>

<style scoped lang="scss">

</style>
