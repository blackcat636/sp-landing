<script setup lang="ts">
import {ref, computed, onMounted, onBeforeUnmount, watch} from 'vue';
import { useLayout } from './composables/layout';
import { useRouter } from 'vue-router';
import {storeToRefs} from 'pinia'


import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const { logOut} = storeToRefs(authStore)

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore)

import { useSettingsStore } from '@/stores/settings';
const settingsStore = useSettingsStore();
const { config,isDark} = storeToRefs(settingsStore)

import {useBalanceStore} from '@/stores/balance';
const balanceStore = useBalanceStore();
const {balance} = storeToRefs(balanceStore)

import {useMelStore} from '@/stores/mel';
const melStore = useMelStore();
const {balance:balanceMel,address,profile,profile_name} = storeToRefs(melStore)

const { onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

import { Formatter } from "@/service/formatter";
const { asToken ,asDateTime} = Formatter();

const { locale,setLocale,availableLocales } = useI18n()

onMounted(() => {
    bindOutsideClickListener();
});
onBeforeUnmount(() => {
    unbindOutsideClickListener();
});
const logoUrl = computed(() => {
    return `/logo.png`;
    // return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
const changeLocale = (lang) => {
    setLocale(lang);
}
const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/utilities/documentation');
};
const onThemeChangeClick = () => {
    settingsStore.switchTheme()
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };

        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};

const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;
    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
const themeMode = computed(() => settingsStore.getThemeMode());


const localeModel = ref();
const localesDropdown = ref([
    { name: 'EN', code: 'en' },
    { name: 'RU', code: 'ru' },
]);

const visibleRight = ref(false);
const items = ref([
  {
    separator: true
  },
  {
    label: '',
    items: [
      {
        label: 'language',
        icon: 'pi pi-globe',
        type: 'language',
      },
      {
        label: 'theme',
        icon: 'pi pi-moon',
        type: 'theme',
      }
    ]
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'ID',
        icon: 'pi pi-cog',
        type: 'uid',
      },
      {
        label: 'Wallet',
        icon: 'pi pi-cog',
        type: 'wallet',
      },
      {
        label: 'Messages',
        icon: 'pi pi-inbox',
        badge: 2
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        type:'logout'
      }
    ]
  },
  {
    separator: true
  }
]);

import { useClipboard } from '@vueuse/core'
const source = ref(user?.value?.referal_id)
const legacy = true;
const { text, copy, copied, isSupported } = useClipboard({ source, legacy })

</script>

<script lang="ts">
export default {
    computed: {
    },
}
</script>
<template>

  <div class="bg-gray-500 py-3 px-5 flex align-items-center justify-content-between relative lg:static" style="min-height: 80px; position:fixed !important; width:100%; z-index:999">
    <a href="/landing" target="_blank">
      <img src="/logo.png" alt="Image" height="40" class="mr-0 lg:mr-6" />
    </a>
    <a
        v-ripple
        class="cursor-pointer block lg:hidden text-gray-50 p-ripple"
        v-styleclass="{
                            selector: '@next',
                            enterClass: 'hidden',
                            leaveToClass: 'hidden',
                            hideOnOutsideClick: true
                        }"
    >
      <i class="pi pi-bars text-4xl"></i>
    </a>
    <div class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full bg-gray-500 left-0 top-100 z-1 shadow-2 lg:shadow-none">
      <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row">
        <li>
          <router-link to="/" v-ripple class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-100 hover:text-gray-50 hover:bg-gray-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
            <i class="pi pi-home mr-2"></i>
            <span>{{$t('menu.home')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/balance" v-ripple class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-100 hover:text-gray-50 hover:bg-gray-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
            <i class="pi pi-wallet mr-2"></i>
            <span>{{$t('menu.balance')}}</span>
          </router-link>
        </li>
        <li>
          <router-link
              to="/structure"
              v-ripple
              class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-100 hover:text-gray-50 hover:bg-gray-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
              v-styleclass="{
                                        selector: '@next',
                                        enterClass: 'hidden',
                                        enterActiveClass: 'scalein',
                                        leaveToClass: 'hidden',
                                        leaveActiveClass: 'fadeout',
                                        hideOnOutsideClick: true
                                    }"
          >
            <i class="pi pi-users mr-2"></i>
            <span>{{$t('menu.structure')}}</span>
            <i class="pi  ml-auto lg:ml-3"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/info" v-ripple class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-100 hover:text-gray-50 hover:bg-gray-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
            <i class="pi pi-chart-line mr-2"></i>
            <span>{{$t('menu.info')}}</span>
          </router-link>
        </li>
      </ul>
      <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row border-top-1 border-indigo-400 lg:border-top-none">
        <li>
          <template>
            <div class="flex align-items-center justify-content-center mb-2 lg:mb-0">
              <Dropdown @change="changeLocale(localeModel.code)" v-model="localeModel" :options="localesDropdown" optionLabel="name" :placeholder="locale.toUpperCase()" class="w-full" />
            </div>
          </template>
        </li>
        <li>
          <button  @click="onThemeChangeClick()" v-ripple class="flex p-link layout-topbar-button mb-2 lg:mb-0 px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-100 hover:text-gray-50 hover:bg-gray-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
            <i class="pi text-base lg:text-2xl mr-2 lg:mr-0"
               :class="{
                      'pi-sun':!isDark,
                      'pi-moon':isDark
                    }"
            ></i>
            <span class="block lg:hidden font-medium">Theme</span>
          </button>
        </li>
        <li>
          <button @click="authStore.logOut()" v-ripple class="flex p-link layout-topbar-button mb-2 lg:mb-0 px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-100 hover:text-gray-50 hover:bg-gray-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
            <i class="pi pi-sign-out text-base lg:text-2xl mr-2 lg:mr-0"></i>
            <span class="block lg:hidden font-medium">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
  <Sidebar v-model:visible="visibleRight" header="Menu" position="right">
    <div class="flex justify-content-center">
    <Menu :model="items" class="w-full md:w-15rem">
      <template #start>
        <span class="inline-flex align-items-center gap-1 px-2 py-2">
            <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-2rem">
                <path d="..." fill="var(--primary-color)" />
                <path d="..." fill="var(--text-color)" />
            </svg>
            <span class="font-medium text-xl font-semibold">UNTIME<span class="text-primary">APP</span></span>
        </span>
      </template>
      <template #submenuheader="{ item }">
        <span class="text-primary font-bold">{{ item.label }}</span>
      </template>
      <template #item="{ item, props }">
        <template v-if="item.type=='language'">

          <div class="flex align-items-center justify-content-center mb-2 lg:mb-0">
            <Dropdown @change="changeLocale(localeModel.code)" v-model="localeModel" :options="localesDropdown" optionLabel="name" :placeholder="locale.toUpperCase()" class="w-full md:w-14rem" />
          </div>
        </template>
        <template v-if="item.type=='theme'">

          <a v-ripple class="flex align-items-center"  v-bind="props.action">
            <span class="pi w-full "
                  :class="{
                      'pi-sun':!isDark,
                      'pi-moon':isDark
                    }" />
            <span class="ml-2">
              <InputSwitch v-model="isDark"  @click="onThemeChangeClick()" />
            </span>
          </a>
        </template>
        <template v-if="item.type=='uid'">

          <span v-ripple class="flex align-items-center px-2 py-3">
            <span :class="item.icon" />
            <span class="ml-2">ID: &nbsp;{{user?.referal_id}}</span>
            <div v-if="isSupported">
              <Button class="p-button p-component align-items-center" :class="{'p-button-success':copied}" @click='copy(user?.referal_id )'>
                <i class="pi" :class="{
                      'pi-copy':!copied,
                      'pi-check-circle ':copied
                    }"></i>
              </Button>
            </div>
          </span>
        </template>
        <template v-if="item.type=='logout'">
          <a v-ripple class="flex align-items-center"  @click="authStore.logOut()" v-bind="props.action">
          <span class="pi " :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </template>
        <template v-if="false">
          <a v-ripple class="flex align-items-center"  @click="onThemeChangeClick()" v-bind="props.action">
          <span class="pi "
                :class="{
                    'pi-sun':!isDark,
                    'pi-moon':isDark
                  }" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </template>
      </template>
      <template #end>
        <router-link to="/account">
        <button v-ripple class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
          <span class="inline-flex flex-column">
                <span class="font-bold">{{profile_name??user?.username}}</span>
            </span>
        </button>
        </router-link>
      </template>
    </Menu>
    </div>
  </Sidebar>
</template>

<style lang="scss" scoped></style>
