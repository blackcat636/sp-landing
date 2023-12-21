<script>
export default {
    props: {
        header: '',
        count: '',
        greenText:'',
        commonText:'',
        icon:'pi pi-shopping-cart'
    }
}
</script>

<template>
    <div class="surface-card shadow-2 card">
        <div class="flex justify-content-between mb-3">
            <div>
                <span class="block text-500 font-medium mb-3">{{ header }}</span>
                <div class="font-bold text-5xl" >{{ count }}</div>
            </div>
            <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                <i class="text-3xl" :class="icon"></i>
            </div>
        </div>
        <span class="text-green-500 font-medium">{{ greenText}} &nbsp;</span>
        <span class="text-500">{{ commonText}}</span>
    </div>
</template>

<style scoped lang="scss">

</style>
