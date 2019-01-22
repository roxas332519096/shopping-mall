<template>
  <div class="container with-top-search" style="min-height: 667px;">
    <div class="custom-search js-search-bar" id="element">
      <form>
        <input
          type="search"
          class="custom-search-input"
          autocomplete="off"
          name="keyword"
          :value="keyword"
          placeholder="搜索更赞的商品"
          style="padding-left: 66px;"
        >
        <span class="icon-custom-search"></span>
      </form>
      <button class="custom-search-type-selection-btn custom-search-type-selection-btn-focus">商品</button>
      <span class="cancel">取消</span>
      <div class="search-type-dropdown-menu" style="display: none;">
        <span class="search-type-dropdown-menu-indicator">
          <i></i>
        </span>
        <div class="drop-menu-content">
          <div class="search-type-goods">
            <i class="icon-goods"></i>
            <span>商品</span>
          </div>
          <div class="search-type-dropdown-menu-divider"></div>
          <div class="search-type-shop">
            <i class="icon-shop"></i>
            <span>店铺</span>
          </div>
        </div>
      </div>
    </div>
    <div class="search-content" style="display: none;"></div>
    <div class="content">
      <div class="search-wrap">
        <ul
          class="js-list"
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="loading"
          infinite-scroll-distance="15"
        >
          <li class="goods-item" v-for="(item,index) in list" :key="index">
            <a href="#">
              <div class="thumb">
                <img :src="item.image">
                <i class="sell-out" v-if="item.isOut"></i>
              </div>
              <div class="detail">
                <div class="title">111</div>
                <div class="meta relative">
                  <span class="price">￥{{item.price}}</span>
                  <span class="ship pull-right" v-if="item.isPostage">包邮</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <loading v-show="loading"/>
        <div class="list-finished" v-if="noMore">已经没有更多了</div>
      </div>
    </div>
    <div
      class="go-to-top"
      v-show="isTop"
      v-scroll-to="{ element: '#element', duration: 500 }"
      @move="Onscroll"
      style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"
    ></div>
  </div>
</template>

<script>
import "../css/search.css";
import loading from "../components/loading";

export default {
  name: "search",
  components: {
    loading
  },
  data() {
    return {
      keyword: "",
      id: "",
      isTop: false,
      list: [],
      loading: false,
      noMore: false
    };
  },
  methods: {
    loadMore() {
      if (this.loading === true) return;
      this.loading = true;
      this.$axios
        .post(`/search/list`, {
          keyword: this.keyword,
          id: this.id
        })
        .then(res => {
          this.noMore = res.data.list.length < 6 ? true : false;
          this.list = this.list.concat(res.data.list);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goToTop() {},
    Onscroll() {
      this.isTop = window.scrollY > 100 ? true : false;
    }
  },
  created() {
    this.keyword = this.$route.params.name;
    this.id = this.$route.params.id;
  },
  beforeMount() {
    this.loadMore();
  },
  mounted() {
    window.addEventListener("scroll", this.Onscroll);
  }
};
</script>

<style lang="scss" scoped>
.search-wrap {
  margin-bottom: 40px;
}
</style>


