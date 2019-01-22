<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in list" :key="index">
        <a class="js-no-follow" :href="item.clickUrl">
          <img class="goods-main-photo fadeIn" :src="item.image">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";

export default {
  name: "swipe",
  props: ["list"],
  methods: {
    initSwiper() {
      new Swiper(".swiper-container", {
        speed: 300,
        spaceBetween: 100,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      });
    }
  },
  mounted() {
    this.initSwiper();
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
}

.swiper-wrapper {
  img {
    width: 100%;
  }
}
.swiper-pagination {
  text-align: center;
}
</style>


