<template>
  <div class="overlap-group">
    <div class="div">
      <img class="image" alt="Image" src="/img/image-25.png" />
      <img class="image-2" alt="Image" src="/img/image-7.png" />
      <img class="image-3" alt="Image" src="/img/image-22.png" />
      <p class="text-wrapper">
        Мы хотим изменить эту статистику и взяли громкое название. Все знают, что если даёшь слово пацана — разбейся на
        куски, но выполни то, что обещал. Поэтому мы создали этот проект и обещаем, что любой человек может здесь
        заработать и каждый со своей скоростью.
      </p>
      <img class="image-4" alt="Image" src="/img/image-19.png" />
      <img class="image-5" alt="Image" src="/img/image-22.png" />
      <img class="image-6" alt="Image" src="/img/image-24.png" />
    </div>
    <p class="p">
      В современном мире стало слишком много нечестных проектов. Обманщики обещают, что человек сможет заработать, но в
      конечном итоге проект закрывается и люди теряют деньги. Создатели таких проектов словно напёрсточники, которые не
      остановятся ни перед чем, чтобы забрать ваши кровные.
    </p>
    <p class="div-2">
      <span class="span">
        у нас КАЖДЫЙ
        <br />
        МОЖЕТ ЧЕСТНО{" "}
      </span>
      <span class="text-wrapper-2">ЗАРАБАТЫВАТЬ</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "OverlapGroup",
};
</script>

<style>
.overlap-group {
  height: 792px;
  left: 23px;
  position: absolute;
  top: 1376px;
  width: 1157px;
}

.overlap-group .div {
  height: 786px;
  left: 0;
  position: absolute;
  top: 1px;
  width: 1157px;
}

.overlap-group .image {
  height: 346px;
  left: 365px;
  object-fit: cover;
  position: absolute;
  top: 251px;
  width: 519px;
}

.overlap-group .image-2 {
  height: 338px;
  left: 597px;
  position: absolute;
  top: 0;
  width: 560px;
}

.overlap-group .image-3 {
  background-blend-mode: screen;
  height: 338px;
  left: 597px;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 560px;
}

.overlap-group .text-wrapper {
  color: #fffbdc;
  font-family: var(--text-font-family);
  font-size: var(--text-font-size);
  font-style: var(--text-font-style);
  font-weight: var(--text-font-weight);
  left: 597px;
  letter-spacing: var(--text-letter-spacing);
  line-height: var(--text-line-height);
  position: absolute;
  top: 447px;
  width: 560px;
}

.overlap-group .image-4 {
  height: 338px;
  left: 0;
  position: absolute;
  top: 448px;
  width: 560px;
}

.overlap-group .image-5 {
  background-blend-mode: screen;
  height: 338px;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 448px;
  width: 560px;
}

.overlap-group .image-6 {
  background-blend-mode: screen;
  height: 192px;
  left: 53px;
  object-fit: cover;
  position: absolute;
  top: 354px;
  width: 304px;
}

.overlap-group .p {
  color: #fffbdc;
  font-family: var(--text-font-family);
  font-size: var(--text-font-size);
  font-style: var(--text-font-style);
  font-weight: var(--text-font-weight);
  left: 0;
  letter-spacing: var(--text-letter-spacing);
  line-height: var(--text-line-height);
  position: absolute;
  top: 0;
  width: 557px;
}

.overlap-group .div-2 {
  color: transparent;
  font-family: "Molot-Regular", Helvetica;
  font-size: 48px;
  font-weight: 400;
  left: 597px;
  letter-spacing: 0;
  line-height: 48px;
  position: absolute;
  top: 648px;
  width: 437px;
}

.overlap-group .span {
  color: #fffbdc;
}

.overlap-group .text-wrapper-2 {
  color: #54a3a5;
}
</style>
