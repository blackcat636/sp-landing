<template>
  <div class="frame">
    <div class="text-wrapper-16">до 25% в день</div>
    <p class="text-wrapper-17">
      Токен boiler растёт от 1 до 25% в день. Рост зависит от транзакций всех участников проекта.
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
  display: flex;
  flex-direction: column;
  gap: 12px;
  left: 124px;
  padding: 16px;
  position: absolute;
  top: 2972px;
  width: 456px;
}

.frame .text-wrapper-16 {
  color: #fffbdb;
  font-family: "Molot-Regular", Helvetica;
  font-size: 32px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 32px;
  margin-top: -8px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.frame .text-wrapper-17 {
  align-self: stretch;
  color: #fffbdb;
  font-family: "Century-Regular", Helvetica;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 21.6px;
  position: relative;
}
</style>
