<template>
  <div class="container with-bottom-nav" style="min-height: 667px;">
    <div class="custom-search js-search-bar">
      <form>
        <input
          type="search"
          class="custom-search-input"
          autocomplete="off"
          name="keyword"
          value
          placeholder="搜索更赞的商品"
        >
        <span class="icon-custom-search"></span>
      </form>
      <button class="custom-search-type-selection-btn">商品</button>
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
    <div class="content" style="height: 617px;">
      <div class="class-nav">
        <div id="scroll-nav" style="height: 100%;">
          <ul
            class="nav"
            id="scroll-nav-content"
            style="height: 540px; transform: translate3d(0px, 0px, 0px);"
          >
            <li
              class="category-name js-category-name"
              :class="{active:index === page}"
              v-for="(item,index) in list"
              :key="item.id"
              @click="getContent(index)"
            >{{ item.name }}</li>
          </ul>
        </div>
      </div>
      <div class="class-category">
        <div id="scroll-main-wrap" class="main-content">
          <loading v-show="loading"/>
          <div
            id="scroll-main-content"
            class="js-main-content inner-content"
            style="height: 943px; transform: translate3d(0px, 0px, 0px);"
            v-if="page === 0 && !loading"
          >
            <div class="hot-wrap">
              <div class="hot-goods">
                <div class="hot-title">
                  <p class="pull-left">热销商品榜</p>
                  <a
                    href="https://maijia.youzan.com/mars/rank/hotgoods"
                    class="pull-right icon-right"
                  >更多</a>
                </div>
                <ul>
                  <li class="goods-item" v-for="item in topCategory.hotGoods" :key="item.id">
                    <a href="#">
                      <div class="thumb badge center-img">
                        <img :src="item.image">
                        <span class="num">1</span>
                      </div>
                      <div class="detail">
                        <div class="title">{{ item.name }}</div>
                        <div class="price">￥{{ item.price }}</div>
                        <div class="recommend">
                          <span>推荐值:</span>
                          <span>{{ item.recommend }}</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="hot-shops" style="position: relative;">
                <div class="hot-title">
                  <p class="pull-left">TOP店铺榜</p>
                  <a href="#" class="pull-right icon-right">更多</a>
                </div>
                <ul>
                  <li class="shop-item" v-for="(item,index) in topCategory.hotShops" :key="item.id">
                    <div class="shop-title">
                      <span class="badge">{{ index + 1 }}</span>
                      <a href="#">{{ item.name }}</a>
                      <span class="follows">/ 关注度: {{ item.follows }}</span>
                    </div>
                    <ul class="shop-images">
                      <li v-for="(img,index) in item.images" :key="index">
                        <a href="#">
                          <img :src="img">
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="hot-keywords">
                <div class="hot-title">
                  <p class="pull-left">热搜词排行</p>
                </div>
                <ul class="keywords-list">
                  <li v-for="(item,index) in topCategory.hotKeywords" :key="index">
                    <a href="javascript:;" class="js-hot-keyword">{{ item }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            id="scroll-main-content"
            class="js-main-content inner-content"
            style="height: 534px; transform: translate3d(0px, 0px, 0px);"
            v-if="page !==0 && !loading"
          >
            <h3 class="category-title">热门品牌</h3>
            <ul class="category-content">
              <li
                class="category-item js-category-item"
                v-for="item in subCategory.brandList"
                :key="item.id"
              >
                <img :src="item.image" :alt="item.name" class="category-img">
                <span class="category-item-name">{{ item.name }}</span>
              </li>
            </ul>
            <h3 class="category-title">热门分类</h3>
            <ul class="category-content">
              <li
                class="category-item js-category-item"
                v-for="item in subCategory.subCategoryList"
                :key="item.id"
              >
                <img :src="item.image" :alt="item.name" class="category-img">
                <span class="category-item-name">{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css/category.css";
import loading from "../components/loading.vue";

export default {
  name: "category",
  components: {
    loading
  },
  data() {
    return {
      list: [],
      page: 0,
      loading: false,
      topCategory: [],
      subCategory: []
    };
  },
  methods: {
    getList() {
      this.$axios.post("/category/topCategory").then(res => {
        this.list = res.data.list;
      });
    },
    getContent(index) {
      this.loading = true;
      this.page = index;
      if (index === 0) {
        this.$axios.post("category/rank").then(res => {
          this.topCategory = res.data.data;
          this.loading = false;
        });
      } else {
        this.$axios.post("/category/subCategory").then(res => {
          this.subCategory = res.data.data;
          this.loading = false;
        });
      }
    }
  },
  beforeMount() {
    this.getList();
    this.getContent(0);
  }
};
</script>

<style lang="scss">
.container {
  padding-bottom: 30px;
}
.class-nav {
  z-index: 1;
}
.class-category {
  overflow: auto;
}
.shop-item {
  width: 100%;
}
</style>



