<script>
export default {
    name: "OverlapGroup",
};
</script>

<template>
    <div class="overlap-group flex flex-wrap">
        <div class="text-regular-column lg:col-6 col-12">
            В современном мире стало слишком много нечестных проектов. Обманщики обещают, что человек сможет заработать, но в
            конечном итоге проект закрывается и люди теряют деньги. Создатели таких проектов словно напёрсточники, которые не
            остановятся ни перед чем, чтобы забрать ваши кровные.
        </div>
        
        <div class="img-overlay lg:col-6 col-12">
            <img class="image-2" alt="Image" src="/img/image-7.png" />
            <img class="image-3" alt="Image" src="/img/image-22.png" />
        </div>
        
        <div class="img-overlay lg:col-6 col-12 flex-order-2 flex-lg:order-1">
            <img class="image-4" alt="Image" src="/img/image-19.png" />
            <img class="image-3" alt="Image" src="/img/image-22.png" />
        </div>
        
        <div class="lg:col-6 col-12 flex flex-column flex-order-1 flex-lg:order-2">
            <div class="text-regular-column">
                Мы хотим изменить эту статистику и взяли громкое название. Все знают, что если даёшь слово пацана — разбейся на
                куски, но выполни то, что обещал. Поэтому мы создали этот проект и обещаем, что любой человек может здесь
                заработать и каждый со своей скоростью.
            </div>
            
            <p class="div-2">
                <span class="text-molot small-font white">
                у нас КАЖДЫЙ
                <br />
                МОЖЕТ ЧЕСТНО
                </span>
                <span class="text-molot small-font blue">ЗАРАБАТЫВАТЬ</span>
            </p>
        </div>
        
        <img class="image hidden lg:block" alt="Image" src="/img/image-25.png" />
        <img class="image-6 hidden lg:block" alt="Image" src="/img/image-24.png" />
    </div>
</template>

<style>

.overlap-group{
    margin-bottom:250px;
    position:relative;
    
    .image{
        position: absolute;
        top: calc(50% - 150px);
        right: calc(50% - 260px);
        z-index: -1;
    }
    .image-6{
        position: absolute;
        top: calc(50% - 150px);
        left: 20px;
        z-index: -1;
        transform: rotate(-165deg);
    }
    
    
}

.img-overlay{
    position:relative;
    .image-3{
        position:absolute;
        opacity:0.4;
        left:24px;
        top:24px;
    }
}

.text-regular-column {
    color: #FFFBDC;
}

.div-2{
    margin-top:40px;
}
</style>
