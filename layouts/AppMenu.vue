<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
const model = ref([
    {
        label: '',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
              label: 'menu.dashboard',
              icon: 'pi pi-fw pi-home',
              to: '/'
            },
            {
                label: 'menu.balance',
                icon: 'pi pi-fw pi-briefcase',
                to: '/balance',
            },
            {
                label: 'pages.structure.title',
                icon: 'pi pi-fw pi-sitemap',
                to: '/structure',
            },
            {
                label: 'menu.support',
                icon: 'pi pi-fw pi-cog',
                url: 'https://t.me/untime_support',
                target: '_blank'
            },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
