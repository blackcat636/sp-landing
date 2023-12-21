<script>
export default {
  props: {
    page: 'linear',
  }
}
</script>
<script setup>

import {storeToRefs} from "pinia";

import {useUserStore} from '@/stores/user';

const userStore = useUserStore();
const {user} = storeToRefs(userStore)


const source = ref('https://new-cabinet.untime.tech/' + user?.referal_id)
const {text, copy, copied, isSupported} = useClipboard({source})

</script>

<template>
  <div class="surface-card shadow-2 card">
    <div class=" flex justify-content-center">
      <router-link to="/structure">
        <Button v-if="page=='linear'" icon="pi pi-sitemap" :label="$t('pages.structure.structure_linear_title')"
                disabled severity="secondary" text raised
                class="mr-2 ml-2 mb-2 flex justify-content-center text-xl  font-bold"/>
        <Button v-else severity="success" icon="pi pi-sitemap" :label="$t('pages.structure.structure_linear_title')"
                text raised class="mr-2 ml-2 mb-2 flex justify-content-center text-xl  font-bold"/>
      </router-link>
      <router-link to="/structure/binare">
        <Button v-if="page=='binare'" icon="pi pi-share-alt" :label="$t('pages.structure.structure_binar_title')"
                disabled severity="secondary" text raised
                class="mr-2 ml-2 mb-2 flex justify-content-center text-xl  font-bold"/>
        <Button v-else severity="success" icon="pi pi-share-alt" :label="$t('pages.structure.structure_binar_title')"
                text raised class="mr-2 ml-2 mb-2 flex justify-content-center text-xl  font-bold"/>
      </router-link>
    </div>
    <br/>
    <div v-if="false" class="flex align-items-center mr-4 ml-4 mb-2 lg:mb-0 ">
      <table style="width:100%">
        <tbody>
        <tr>
          <td style="width:300px">
            {{ $t('pages.structure.referral_link') }}
          </td>
          <td>
              <span class=" align-items-center shadow-2 card"
                    @click='copy("https://localhost:3000?ref="+ user?.referal_id )'
                    style="cursor:pointer;padding: 10px">
                <span v-if='!copied'>{{ "http://localhost:3000?ref=" + user?.referal_id }} <i
                    class="pi pi-copy"></i></span>
                <span v-else-if="copied"><i class="pi pi-check-circle text-green-500"></i> {{
                    $t('pages.common.copied')
                  }}</span>
              </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <div class="grid">
          <div class="col-12 md:col-12 xl:col-4">{{ $t('pages.structure.referral_link') }}</div>
          <div class="col-12 md:col-12 xl:col-4">
            <span class=" align-items-center shadow-2 card"
                                                       @click='copy("https://localhost:3000?ref="+ user?.referal_id )'
                                                       style="cursor:pointer;padding: 10px">
                <span v-if='!copied'>{{ "https://localhost:3000?ref=" + user?.referal_id }} <i
                    class="pi pi-copy"></i></span>
                <span v-else-if="copied"><i class="pi pi-check-circle text-green-500"></i> {{
                    $t('pages.common.copied')
                  }}</span>
              </span>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
