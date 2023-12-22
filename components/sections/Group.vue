<template>
    <div class="group">
        <div class="rectangle-2"></div>
        <div class="rectangle-3"></div>
        <div class="rectangle-4"></div>
        <div class="rectangle-5"></div>
    </div>
</template>

<script>
export default {
    name: "Group",
};
</script>

<style>
.group {
    height: 87px;
    width: 125px;
    position:relative;
    margin-right:16px;
}

.group .rectangle-2 {
    background-color: #a34343;
    height: 87px;
    left: 26px;
    position: absolute;
    top: 0;
    width: 99px;
}

.group .rectangle-3 {
    background-color: #a34343;
    height: 87px;
    left: 12px;
    position: absolute;
    top: 0;
    width: 11px;
}

.group .rectangle-4 {
    background-color: #a34343;
    height: 87px;
    left: 5px;
    position: absolute;
    top: 0;
    width: 4px;
}

.group .rectangle-5 {
    background-color: #a34343;
    height: 87px;
    left: 0;
    position: absolute;
    top: 0;
    width: 2px;
}
</style>
