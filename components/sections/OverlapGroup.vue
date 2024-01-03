<script>
export default {
    name: "OverlapGroup",
};
</script>

<template>
    <div class="overlap-group flex flex-wrap">
        <div class="text-regular-column lg:col-6 col-12 mb-110">
            {{ $t('pages.landing.text_6') }}
        </div>

        <div class="img-overlay lg:col-6 col-12 mb-110">
            <img class="image-2 img-responsive" alt="Image" src="/img/image-7.png" />
            <img class="image-3" alt="Image" src="/img/image-22.png" />
        </div>

        <div class="img-overlay lg:col-6 col-12 flex-order-2 lg:flex-order-1">
            <img class="image-4 img-responsive" alt="Image" src="/img/image-19.png" />
            <img class="image-3" alt="Image" src="/img/image-22.png" />
        </div>

        <div class="lg:col-6 col-12 flex flex-column flex-order-1 lg:flex-order-2">
            <div class="text-regular-column">
                {{ $t('pages.landing.text_7') }}
            </div>

            <p class="div-2">
                <span class="text-molot small-font white">
                {{ $t('pages.landing.text_11') }}
                <br />
                {{ $t('pages.landing.text_12') }}
                </span>
                <span class="text-molot small-font blue">{{ $t('pages.landing.text_13') }}</span>
            </p>
        </div>

        <img class="image hidden lg:block" alt="Image" src="/img/image-25.png" />
        <img class="image-6 hidden lg:block" alt="Image" src="/img/image-24.png" />
    </div>
</template>

<style>

.overlap-group{
    margin-bottom:250px;

    @media all and (max-width: 991px) {
        margin-bottom:20px;
    }
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
        top:0;
        width: calc(100% - 48px);
    }
}

.text-regular-column {
    color: #FFFBDC;
}

.div-2{
    margin-top:40px;
}
</style>
