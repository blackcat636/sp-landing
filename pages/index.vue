<script setup lang="ts">
import Boiler from "../components/sections/Boiler.vue";
import BoilerBooster from "../components/sections/BoilerBooster.vue";
import Overlap from "../components/sections/Overlap.vue";
import OverlapGroup from "../components/sections/OverlapGroup.vue";
import OverlapWrapper from "../components/sections/OverlapWrapper.vue";
import OverlapGroupWrapper from "../components/sections/OverlapGroupWrapper.vue";
import Group from "../components/sections/Group.vue";
import GroupWrapper from "../components/sections/GroupWrapper.vue";
import Element from "../components/sections/Element.vue";
import FrameWrapper from "../components/sections/FrameWrapper.vue";
import Frame from "../components/sections/Frame.vue";

definePageMeta({
    layout: 'custom'
})
</script>
<template>
    <div class="main">
        <div class="container">
            <div class="col-12">
                <overlap-wrapper />
            </div>
            
            <div class="flex flex-wrap reg-enter-block col-12">
                <a href="https://cabinet.slovopacana.pro/signup" class="lang-button red">
                    {{ $t('pages.landing.text_3') }}
                </a>
                <a href="https://cabinet.slovopacana.pro/login" class="lang-button blue">
                    {{ $t('pages.landing.text_4') }}
                </a>
            </div>
            
            <div class="col-12">
                <img class="band-img img-responsive" src="/img/image-5.png" />
            </div>
            
            <div class="flex align-items-stretch col-12 mb-80">
                <svg class="hidden lg:block svg-stat flex-shrink-0" width="125" height="208" viewBox="0 0 125 208" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="26.3944" width="98.6056" height="208" fill="#A44343"/>
                    <rect x="12.4502" width="10.9562" height="208" fill="#A44343"/>
                    <rect x="4.98007" width="4.48207" height="208" fill="#A44343"/>
                    <rect width="1.99203" height="208" fill="#A44343"/>
                </svg>
                
                <element/>
                
                <div class="imgs-7-block hidden lg:block">
                    <img class="image-7" alt="Image" src="/img/image-26.png" />
                    <img class="image-8" alt="Image" src="/img/image-23.png" />
                </div>
                
            </div>
            
            <overlap-group/>
            
            <div class="about-project">
                <div class="flex align-items-center header-molot col-12">
                    <group />
                    <div class="">{{ $t('pages.landing.text_5') }}</div>
                </div>
                
                
                <div class="project-blocks flex flex-wrap align-items-stretch">
                    <div class="flex flex-column lg:col-6 col-12 justify-content-center">
                        <boiler/>
                        <p class="text-regular-column mb-37">
                            {{ $t('pages.landing.text_14') }}
                        </p>
                        <Frame />
                    </div>
                    <div class="lg:col-6 col-12 hidden lg:block">
                        <img class="img-responsive" alt="Group" src="/img/Group.svg" />
                    </div>
                    
                    <div class="lg:col-6 col-12 hidden lg:block"><overlap /></div>
                    
                    <div class="lg:col-6 col-12 flex flex-column justify-content-center">
                        <boiler-booster/>
                        
                        <p class="text-regular-column">
                            {{ $t('pages.landing.text_15') }}
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="avtoritet">
                <overlap-group-wrapper />
            </div>
            
            <div class="bottom-block">
                <div class="lg:col-9 col-12 ">
                    <div class="bottom-block_text">{{ $t('pages.landing.text_22') }}</div>
                    <div class="flex reg-enter-block flex-wrap">
                        <a href="https://cabinet.slovopacana.pro/signup" class="lang-button blue">
                            {{ $t('pages.landing.text_3') }}
                        </a>
                        <a href="https://cabinet.slovopacana.pro/login" class="lang-button white">
                            {{ $t('pages.landing.text_4') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

.mb-37{
    margin-bottom:37px;
    @media all and (max-width: 991px) {
        margin-bottom:20px;
    }
}
.main{
    padding:57px 0 0;
    display:flex;
    justify-content:center;
    .container{
        padding:0 16px;
        @media all and (min-width: 1200px){
            width:1200px
        }
    }
}

.reg-enter-block{
    margin-top:7px;
    margin-bottom:32px;
    >a{
        margin-bottom:16px;
        @media all and (max-width: 991px) {
            width:100%;
        }
    }
 }

.lang-button{
    padding:18px 60px;
    color: #FFF;
    text-align: center;
    font-family: Molot;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    
    margin-right:18px;
    &:last-child{
        margin-right:0;
    }
    @media all and (max-width: 991px) {
        margin-right:0;
    }
    
    
    &.red{
        background: #A44343;
    }
    &.blue{
        background: #55A4A6;
    }
    &.white{
        background: #fff;
        color:#A44343;
    }
}

.band-img{
    margin-bottom:115px;
}

.imgs-7-block{
    max-width: 411px;
    width:100%;
    position:relative;
    top:13px;
    img{
        position:absolute;
        top:0;
        bottom:0;
        height:100%;
        right:0;
    }
}

.svg-stat{
    margin-top:11px;
    margin-right:24px;
}


.header-molot {
    color: #FFFBDC;
    font-family: Molot;
    font-size: 96px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media all and (max-width: 991px) {
        font-size:48px;
    }
    
    margin-bottom:54px;
}

.project-blocks {

}
.img-responsive{
    width:100%;
    height:auto;
}

.bottom-block {
    background: #A44343;
    padding:25px;
    margin-top:150px;
    position:relative;
    
    @media all and (max-width: 991px) {
        margin-top:0px;
    }
    
    @media all and (min-width: 1200px) {
        &:after {
            display: block;
            position: absolute;
            content: '';
            background: url("/img/group.png") center no-repeat;
            width: 387px;
            height: 405px;
            
            bottom: 0;
            right: 0;
        }
    }
    .bottom-block_text{
        color: #FFFBDC;
        font-family: Molot;
        font-size: 96px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        @media all and (max-width: 991px){
            font-size: 36px;
        }
    }
}
</style>
