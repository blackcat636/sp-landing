<script setup>
import AppFooter from './AppFooter.vue';
import {storeToRefs} from 'pinia'

import {useSettingsStore} from '@/stores/settings';

import {useLayout} from '@/layouts/composables/layout';
const {layoutConfig} = useLayout();

const settingsStore = useSettingsStore();
const {config} = storeToRefs(settingsStore)

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'UNTIME' : 'UNTIME'}.svg`;
});
useHead({
  link: [{rel: 'stylesheet', id: 'theme-css', href: '/themes/' + config.value.theme + '/theme.css'}]
})

</script>

<template>
  <div class="layout-wrapper">
    <div class="layout-main">
      <div
          class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
          <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">

            <div class="form-block  w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
              <div class="text-center mb-5">
                <img src="/logo.png" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0"/>
              </div>
              <router-view></router-view>

            </div>
          </div>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
    <div class="layout-mask"></div>
  </div>

</template>

<style lang="scss" scoped></style>
