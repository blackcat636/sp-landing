<template>
  <p class="boiler">
    <span class="text-wrapper-6">{{ $t('pages.landing.text_23') }}, </span>
    <span class="text-wrapper-7">{{ $t('pages.landing.text_24') }} boiler</span>
  </p>
</template>

<script lang="ts">
export default {
  name: "Boiler",
};
</script>

<style>
.boiler {
  color: transparent;
  font-family: Molot;
  font-size: 48px;
  font-weight: 400;
  left: 20px;
  letter-spacing: 0;
  line-height: normal;
}

.boiler .text-wrapper-6 {
  color: #fffbdc;
}

.boiler .text-wrapper-7 {
  color: #a34343;
}
</style>
