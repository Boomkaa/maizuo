<template>
  <div class="swiper-container billboards">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
      v-for="(item,index) in banners"
      :key="index">
        <img :src="item.imgUrl">
      </div>
    </div>
    <!--分页器-->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  props: {
    banners: {
      type: Array
    }
  },
  data() {
    return {
      swiper: null
    };
  },
  updated () {
    if (!this.swiper) {
      this.swiper = new Swiper(".swiper-container", {
        loop: true, // 无缝连续轮播
        pagination: {
          el: ".swiper-pagination"
        }
      });
    }
  }
};
</script>

<style lang="less">
.swiper-container {
  width: 100%;
  height: 210px;

  img {
    width: 100%;
  }
}
</style>
