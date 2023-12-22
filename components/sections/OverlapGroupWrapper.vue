<template>
    <div class="overlap-group-wrapper flex flex-wrap">
        <div class="col-12 lg:col-6">
            <div class="text-wrapper-10">поднимайтесь по иерархии</div>
            <p class="text-regular-column">
                Иерархия Слово пацана это народный проект , в котором каждый имеет возможность занять свою роль и зарабатывать
                столько, сколько пожелает. Ты можешь вырасти благодаря нашей программе от простого пацана до авторитета и при
                этом получить существенную прибыль.
            </p>
        </div>
        
        <div class="col-12 lg:col-6 relative">
            <div class="text-wrapper-11">супера</div>
            <div class="text-wrapper-12">чушпан</div>
            <div class="text-wrapper-14">авторитет</div>
            <div class="overlap-2">
                
                <img class="mask-group" alt="Mask group" src="/img/mask-group-2.png" />
                <img class="mask-group-2" alt="Mask group" src="/img/mask-group-1.png" />
                <img class="mask-group-3" alt="Mask group" src="/img/mask-group.png" />
                <div class="rectangle" />
            </div>
            <div class="text-wrapper-14">Ранг</div>
            <div class="text-wrapper-15">Ранг</div>
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
    font-family: "Molot-Regular", Helvetica;
    font-size: 24px;
    font-weight: 400;
    left: 200px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 60px;
    white-space: nowrap;
}

.overlap-group-wrapper .text-wrapper-12 {
    color: #fffbdc36;
    font-family: "Molot-Regular", Helvetica;
    font-size: 16px;
    font-weight: 400;
    left: 160px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 92px;
    white-space: nowrap;
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
    left: 222px;
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
    left: 360px;
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
    left: 360px;
    letter-spacing: 0;
    line-height: 23.4px;
    position: absolute;
    top: 33px;
    white-space: nowrap;
}

.overlap-group-wrapper .text-wrapper-15 {
    color: #fffbdc;
    font-family: "Century-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    left: 200px;
    letter-spacing: 0;
    line-height: 23.4px;
    position: absolute;
    top: 65px;
    white-space: nowrap;
}
</style>
