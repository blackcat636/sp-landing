<template>
    <div class="frame">
        <div class="text-wrapper-16">{{ $t('pages.landing.text_25') }}</div>
        <p class="text-wrapper-17">
            {{ $t('pages.landing.text_26') }}
        </p>
    </div>
</template>

<script>
export default {
    name: "Frame",
};
</script>

<style>
.frame {
    align-items: flex-start;
    border: 8px solid;
    border-color: #a34343;
    background:linear-gradient(to right, #a34343 0, #a34343 83px, #1B201D 83px, #1B201D 100%);
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    padding: 16px 16px 16px 93px ;
    position:relative;
    &:after{
        display:block;
        position:absolute;
        content:'';
        background: url("/img/schedule.svg");
        top:0;
        left:0;
        width:73px;
        height:75px;
    }
}

.frame .text-wrapper-16 {
    color: #FFFBDC;
    font-family: Molot;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 32px */
}

.frame .text-wrapper-17 {
    align-self: stretch;
    color: #fffbdb;
    font-family: "Century-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 21px;
}
</style>
