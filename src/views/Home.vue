<template>
  <div>
    <div class="container with-bottom-nav" style="min-height: 667px;">
      <swipe :list="banner" v-if="bannerLoaded"/>
      <div class="content">
        <div class="section-title">优店推荐</div>
        <div class="section-content shops">
          <div class="shop-wrap">
            <div class="shop-item">
              <a href="#">
                <img
                  class="fadeIn"
                  src="https://img.yzcdn.cn/upload_files/2016/09/23/FgQUVNXnvpFKFl1DIN2LXhPA1cxy.png?imageView2/2/w/300/h/0/q/75/format/png"
                >
              </a>
            </div>
            <div class="shop-item">
              <a href="#">
                <img
                  class="fadeIn"
                  src="https://img.yzcdn.cn/upload_files/2016/08/03/FqNGnCQS1eq9nIhRg48E_UfFf9K2.png?imageView2/2/w/300/h/0/q/75/format/png"
                >
              </a>
            </div>
            <div class="shop-item">
              <a href="#">
                <img
                  class="fadeIn"
                  src="https://img.yzcdn.cn/upload_files/2016/08/05/Fv5hhMZrtPZQWE7fape0ddEYtSuy.png?imageView2/2/w/300/h/0/q/75/format/png"
                >
              </a>
            </div>
          </div>
        </div>
        <div class="section-content daily">
          <ul></ul>
        </div>
        <div class="line-block line-block-gray">
          <div class="lineblock-title">
            <span class="lineblock-font">最热商品推荐</span>
          </div>
        </div>
        <div class="hot-goods js-waterfull-wrap" data-src>
          <ul
            class="js-list js-lazy"
            data-src
            v-if="hotList"
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="loading && noMoreData"
            infinite-scroll-distance="15"
          >
            <li v-for="item in hotList" :key="item.id">
              <div class="goods-item">
                <router-link :to="{name:'good',params:{id:item.id}}">
                  <div class="thumb img-box">
                    <img class="fadeIn" :src="item.img">
                  </div>
                  <div class="detail">
                    <div class="title">{{ item.name }}</div>
                    <div class="price">￥{{ item.price }}</div>
                  </div>
                </router-link>
              </div>
            </li>
          </ul>
          <loading v-show="loading"/>
        </div>
        <div class="js-show-find category-guid" style="display: none;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import swipe from "../components/swipe.vue";
import "../css/index.css";
import "../css/common.css";
import loading from "../components/loading";

export default {
  name: "home",
  components: {
    swipe,
    loading
  },
  data() {
    return {
      banner: [],
      bannerLoaded: false,
      loading: false,
      hotList: [],
      currentPage: 1,
      noMoreData: false
    };
  },
  methods: {
    getBanner() {
      this.$axios.post("/index/banner").then(res => {
        this.banner = res.data.list;
        this.bannerLoaded = true;
      });
    },
    loadMore() {
      if (this.loading === true) return;
      this.loading = true;
      this.$axios
        .post("/index/hotList")
        .then(res => {
          this.noMoreData = res.data.list.length < 6 ? true : false;
          this.hotList = this.hotList.concat(res.data.list);
          this.currentPage++;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  beforeMount() {
    this.getBanner();
    this.loadMore();
  }
};
</script>
