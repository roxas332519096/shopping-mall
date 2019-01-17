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
      <div class="search-wrap js-waterfull-wrap">
        <ul class="js-list">
          <li class="goods-item" v-for="(item,index) in 10" :key="index">
            <a
              href="https://h5.youzan.com/v2/showcase/goods?alias=2755moo9i2r1c&amp;source=yzapp&amp;f_platform=yzapp"
            >
              <div class="thumb">
                <img
                  src="https://img.yzcdn.cn/upload_files/2017/07/10/FoIdS7VgL1S1ENyDVzfhcLP95p69.jpg?imageView2/2/w/320/h/0/q/75/format/jpg"
                >
                <i class="sell-out"></i>
              </div>
              <div class="detail">
                <div class="title">简箪黄花梨 当季新鲜水果 现摘现发 无农药化肥 清甜多汁 包邮</div>
                <div class="meta relative">
                  <span class="price">￥58.00</span>
                  <span class="ship pull-right">包邮</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div class="list-finished">已经没有更多了</div>
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

export default {
  name: "search",
  data() {
    return {
      keyword: "",
      id: "",
      isTop: false
    };
  },
  methods: {
    getData(id) {},
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
    this.getData(this.id);
  },
  mounted() {
    window.addEventListener("scroll", this.Onscroll);
  }
};
</script>

<style lang="scss" scoped>
</style>


