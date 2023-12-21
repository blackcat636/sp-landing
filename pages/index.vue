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
  <div class="frame-screen">
    <div class="frame-2">
      <overlap />
      <div class="overlap-6">
        <img class="image-7" alt="Image" src="/img/image-26.png" />
        <img class="image-8" alt="Image" src="/img/image-23.png" />
      </div>
      <overlap-group />
      <img class="image-9" alt="Image" src="/img/image-5.png" />
      <overlap-wrapper />
      <boiler/>
      <boiler-booster/>
      <overlap-group-wrapper />
      <div class="text-wrapper-23">авторитет</div>
      <p class="text-wrapper-24">
        Наш основной токен называется Boiler(BLR). Благодаря его алгоритму каждый имеет возможность зарабатывать
        ежедневно прямо сейчас. BLR растет каждый день от 1% до 25% в зависимости от пропорции ввода и вывода активов
        участниками.
      </p>
      <p class="text-wrapper-25">
        После покупки BLR он размораживается с определенной скоростью скоростью от 1% до 3,5% . Данная скорость
        зависит от наличия у участника нашего второго токена под названием booster(BST). Подробнее (ссылка на
        презентацию)
      </p>
      <div class="text-wrapper-26">Ранг</div>
      <img class="group-6" alt="Group" src="/img/group.png" />
      <Frame />
      <div class="text-wrapper-27">о проекте</div>
      <group />
      <group-wrapper />
      <div class="vector-wrapper">
        <img class="vector-5" alt="Vector" src="/img/vector-5.svg" />
      </div>
      <div class="group-7">
        <div class="overlap-group-3">
          <div class="text-wrapper-28">регистрация</div>
        </div>
      </div>
      <div class="group-8">
        <div class="overlap-7">
          <div class="text-wrapper-29">вход</div>
        </div>
      </div>
      <element />
      <frame-wrapper />
      <div class="frame-3" />
    </div>
  </div>
</template>
<style>
.frame-screen {
  background-color: #1b1f1d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.frame-screen .frame-2 {
  background-color: #1b1f1d;
  height: 5661px;
  position: relative;
  width: 1200px;
}

.frame-screen .overlap-6 {
  height: 282px;
  left: 769px;
  position: absolute;
  top: 1089px;
  width: 411px;
}

.frame-screen .image-7 {
  height: 274px;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 411px;
}

.frame-screen .image-8 {
  background-blend-mode: color-dodge;
  height: 282px;
  left: 288px;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 123px;
}

.frame-screen .image-9 {
  height: 631px;
  left: 23px;
  position: absolute;
  top: 326px;
  width: 1157px;
}

.frame-screen .text-wrapper-23 {
  color: #a34343;
  font-family: "Molot-Regular", Helvetica;
  font-size: 24px;
  font-weight: 400;
  left: 985px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 3885px;
  white-space: nowrap;
}

.frame-screen .text-wrapper-24 {
  color: #a4a4a0;
  font-family: var(--2-font-family);
  font-size: var(--2-font-size);
  font-style: var(--2-font-style);
  font-weight: var(--2-font-weight);
  left: 20px;
  letter-spacing: var(--2-letter-spacing);
  line-height: var(--2-line-height);
  position: absolute;
  top: 2779px;
  width: 625px;
}
.frame-screen .text-wrapper-25 {
  color: #a4a4a0;
  font-family: var(--2-font-family);
  font-size: var(--2-font-size);
  font-style: var(--2-font-style);
  font-weight: var(--2-font-weight);
  left: 610px;
  letter-spacing: var(--2-letter-spacing);
  line-height: var(--2-line-height);
  position: absolute;
  top: 3496px;
  width: 560px;
}

.frame-screen .text-wrapper-26 {
  color: #fffbdc;
  font-family: "Century-Regular", Helvetica;
  font-size: 18px;
  font-weight: 400;
  left: 989px;
  letter-spacing: 0;
  line-height: 23.4px;
  position: absolute;
  top: 3862px;
  white-space: nowrap;
}

.frame-screen .group-6 {
  height: 547px;
  left: 682px;
  position: absolute;
  top: 2580px;
  width: 498px;
}

.frame-screen .text-wrapper-27 {
  color: #fffbdc;
  font-family: "Molot-Regular", Helvetica;
  font-size: 96px;
  font-weight: 400;
  left: 165px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 2412px;
  white-space: nowrap;
}

.frame-screen .vector-wrapper {
  background-color: #a34343;
  height: 120px;
  left: 20px;
  position: absolute;
  top: 2972px;
  width: 104px;
}

.frame-screen .vector-5 {
  height: 75px;
  left: 16px;
  position: absolute;
  top: 24px;
  width: 73px;
}

.frame-screen .group-7 {
  height: 64px;
  left: 23px;
  position: absolute;
  top: 230px;
  width: 276px;
}

.frame-screen .overlap-group-3 {
  background-color: #a34343;
  height: 64px;
  position: relative;
  width: 274px;
}

.frame-screen .text-wrapper-28 {
  color: #ffffff;
  font-family: "Molot-Regular", Helvetica;
  font-size: 24px;
  font-weight: 400;
  left: 61px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 18px;
  white-space: nowrap;
}

.frame-screen .group-8 {
  height: 64px;
  left: 313px;
  position: absolute;
  top: 230px;
  width: 182px;
}

.frame-screen .overlap-7 {
  background-color: #54a3a5;
  height: 64px;
  position: relative;
  width: 180px;
}

.frame-screen .text-wrapper-29 {
  color: #ffffff;
  font-family: "Molot-Regular", Helvetica;
  font-size: 24px;
  font-weight: 400;
  left: 60px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 18px;
  white-space: nowrap;
}

.frame-screen .frame-3 {
  background-color: #000000;
  height: 512px;
  left: 0;
  position: absolute;
  top: 5149px;
  width: 1200px;
}
</style>
