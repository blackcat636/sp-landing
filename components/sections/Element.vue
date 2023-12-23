<template>
  <p class="element">
    <span class="text-wrapper-18">
      по статистике,
      <br />
    </span>
    <span class="text-wrapper-19">99% проектов</span>
    <span class="text-wrapper-18">
      <br />
      являются скамом
    </span>
  </p>
</template>

<script>
export default {
  name: "Element",
};
</script>

<style>
.element {
    color: #A44343;
    font-family: Molot;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    
    @media all and (max-width: 991px) {
        font-size:24px;
    }
  
}

.element .text-wrapper-18 {
  color: #fffbdc;
    white-space:nowrap;
}

.element .text-wrapper-19 {
  color: #a34343;
}
</style>
