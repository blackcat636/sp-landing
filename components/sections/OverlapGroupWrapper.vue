<template>
    <div class="overlap-group-wrapper flex flex-wrap">
        <div class="col-12 lg:col-6">
            <div class="text-wrapper-10">{{ $t('pages.landing.text_16') }}</div>
            <p class="text-regular-column">
                {{ $t('pages.landing.text_17') }}
            </p>
        </div>
        
        <div class="col-12 lg:col-6 relative hidden lg:block">
            <div class="text-wrapper-11 molot-text">{{ $t('pages.landing.text_18') }}</div>
            <div class="text-wrapper-12 molot-text">{{ $t('pages.landing.text_19') }}</div>
            <div class="text-wrapper-14 molot-text">{{ $t('pages.landing.text_20') }}</div>
            <div class="overlap-2">
                <img class="mask-group" alt="Mask group" src="/img/mask-group-2.png" />
                <img class="mask-group-2" alt="Mask group" src="/img/mask-group-1.png" />
                <img class="mask-group-3" alt="Mask group" src="/img/mask-group.png" />
                <div class="rectangle" />
            </div>
            <div class="text-wrapper-12">{{ $t('pages.landing.text_21') }}</div>
            <div class="text-wrapper-14">{{ $t('pages.landing.text_21') }}</div>
            <div class="text-wrapper-15">{{ $t('pages.landing.text_21') }}</div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "OverlapGroupWrapper",
};
</script>

<style>
.overlap-group-wrapper {
    height: 544px;
    position: relative;
    width: 100%;
    
    
    margin-top:80px
}

.overlap-group-wrapper .text-wrapper-10 {
    color: #FFFBDC;
    font-family: Molot;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.overlap-group-wrapper .text-wrapper-11 {
    color: #fffbdc;
    font-family: "Century-Regular", Helvetica;
    font-size: 24px;
    font-weight: 400;
    left: 40px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 60px;
    white-space: nowrap;
    &.molot-text{
        top:80px;
        color: #fffbdc;
        font-family: Molot;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
}

.overlap-group-wrapper .text-wrapper-12 {
    color: #FFFBDC;
    font-family: "Century-Regular", Helvetica;
    font-size: 16px;
    font-weight: 400;
    left: 200px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 72px;
    white-space: nowrap;
    width:80px;
    &.molot-text{
        top:92px;
        color: rgba(255, 251, 220, 0.21);
        font-family: Molot;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
}

.overlap-group-wrapper .overlap-2 {
    height: 544px;
    left: 0;
    position: relative;
    top: 0;
    width: 100%;
}

.overlap-group-wrapper .mask-group {
    height: 389px;
    left: 183px;
    position: absolute;
    top: 124px;
    width: 183px;
}

.overlap-group-wrapper .mask-group-2 {
    height: 397px;
    left: 0px;
    position: absolute;
    top: 119px;
    width: 241px;
}

.overlap-group-wrapper .mask-group-3 {
    height: 544px;
    right: 0;
    position: absolute;
    top: 0;
    width: 228px;
}

.overlap-group-wrapper .rectangle {
    background: linear-gradient(180deg, rgb(27, 32, 29) 0%, rgba(27, 32, 29, 0) 100%);
    height: 303px;
    left: 0;
    position: absolute;
    top: 241px;
    width: 616px;
    transform:rotate(180deg);
}

.overlap-group-wrapper .text-wrapper-14 {
    color: #fffbdc;
    font-family: "Century-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    right: 121px;
    letter-spacing: 0;
    line-height: 23.4px;
    position: absolute;
    top: -57px;
    white-space: nowrap;
    width:100px;
    
    &.molot-text{
        top:-37px;
        color: #A44343;
        font-family: Molot;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
}

.overlap-group-wrapper .text-wrapper-15 {
    color: #fffbdc;
    font-family: "Century-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    left: 40px;
    letter-spacing: 0;
    line-height: 23.4px;
    position: absolute;
    top: 60px;
    white-space: nowrap;
}
</style>
