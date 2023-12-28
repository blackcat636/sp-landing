<template>
  <p class="boiler-booster">
    <span class="text-wrapper-8">{{ $t('pages.landing.text_27') }} boiler, </span>
    <span class="text-wrapper-9">{{ $t('pages.landing.text_24') }} booster</span>
  </p>
</template>

<script>
export default {
  name: "BoilerBooster",
};
</script>

<style>
.boiler-booster {
    color: transparent;
    font-family: Molot;
    font-size: 48px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    @media all and (max-width: 991px) {
        font-size: 32px;
        margin-top:20px
    }
}

.boiler-booster .text-wrapper-8 {
  color: #fffbdc;
}

.boiler-booster .text-wrapper-9 {
  color: #54a3a5;
}
</style>
