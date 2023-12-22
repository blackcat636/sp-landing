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
    background:linear-gradient(to right, #a34343 0, #a34343 83px, #1B201D 83px, #1B201D 100%);
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    padding: 16px 16px 16px 93px ;
    position:relative;
    &:after{
        display:block;
        position:absolute;
        content:'';
        background: url("/img/schedule.svg");
        top:0;
        left:0;
        width:73px;
        height:75px;
    }
}

.frame .text-wrapper-16 {
    color: #fffbdb;
    font-family: "Molot-Regular", Helvetica;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 32px;
    margin-top: -8px;
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
    line-height: 21px;
}
</style>
