<script setup>
import { useLayout } from './composables/layout';
import { computed } from 'vue';
const { layoutConfig } = useLayout();
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'UNTIME' : 'UNTIME'}.svg`;
});
</script>

<template>
    <div class="layout-footer">
    
    </div>
</template>
<style lang="scss" scoped></style>
