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
            
            <div class="flex reg-enter-block col-12">
                <a href="https://cabinet.slovopacana.pro/signup" class="lang-button red">
                    регистрация
                </a>
                <a href="https://cabinet.slovopacana.pro/login" class="lang-button blue">
                    вход
                </a>
            </div>
            
            <div class="col-12">
                <img class="band-img img-responsive" src="/img/image-5.png" />
            </div>
            
            <div class="flex align-items-stretch col-12 mb-80">
                <svg class="svg-stat flex-shrink-0" width="125" height="208" viewBox="0 0 125 208" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <div class="">о проекте</div>
                </div>
                
                
                <div class="project-blocks flex flex-wrap align-items-stretch">
                    <div class="flex flex-column lg:col-6 col-12 justify-content-center">
                        <boiler/>
                        <p class="text-regular-column mb-37">
                            Наш основной токен называется Boiler(BLR). Благодаря его алгоритму каждый имеет возможность зарабатывать
                            ежедневно прямо сейчас. BLR растет каждый день от 1% до 25% в зависимости от пропорции ввода и вывода активов
                            участниками.
                        </p>
                        <Frame />
                    </div>
                    <div class="lg:col-6 col-12">
                        <img class="img-responsive" alt="Group" src="/img/Group.svg" />
                    </div>
                    
                    <div class="lg:col-6 col-12"><overlap /></div>
                    
                    <div class="lg:col-6 col-12 flex flex-column justify-content-center">
                        <boiler-booster/>
                        
                        <p class="text-regular-column">
                            После покупки BLR он размораживается с определенной скоростью скоростью от 1% до 3,5% . Данная скорость
                            зависит от наличия у участника нашего второго токена под названием booster(BST). Подробнее (ссылка на
                            презентацию)
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="avtoritet">
                <overlap-group-wrapper />
            </div>
            
            <div class="bottom-block">
                <div class="col-9">
                    <div class="bottom-block_text">зарабатывайте уже сейчас</div>
                    <div class="flex reg-enter-block">
                        <a href="/" class="lang-button blue">
                            регистрация
                        </a>
                        <a href="/" class="lang-button white">
                            вход
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
