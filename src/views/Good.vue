<template>
  <div>
    <div class="body-fixed-bottom default-theme" v-cloak>
      <div class="container wap-goods internal-purchase" style="min-height: 617px;">
        <div class="content no-sidebar">
          <div class="content-body">
            <div class="custom-image-swiper custom-goods-swiper js-swp swp">
              <swipe :list="banner" v-if="banner.length === 3"/>
            </div>
            <div class="goods-header">
              <h2 class="title">{{ detail.title }}</h2>
              <span
                class="hide js-add-wish js-wish-animate wish-add font-size-12 tag tag-redf30 pull-right"
              >喜欢</span>
              <div class="goods-price">
                <div class="current-price">
                  <span>¥</span>
                  <i class="js-goods-price price">{{ detail.price }}</i>
                </div>
                <span class="btn btn-blue btn-retail hide js-retail-btn">门店有售</span>
                <div class="original-price">{{ detail.originalPrice }}</div>
              </div>
              <hr class="with-margin-l">
              <div class="stock-detail">
                <dl>
                  <dt>运费:</dt>
                  <dd class="js-postage-desc" data-postage="免运费">¥{{ detail.postage }}</dd>
                </dl>
                <dl>
                  <dt>剩余:</dt>
                  <dd>{{ detail.remain }}</dd>
                </dl>
                <dl>
                  <dt>销量:</dt>
                  <dd>{{ detail.sales }}</dd>
                </dl>
              </div>
            </div>
            <div class="sku-detail adv-opts" @click="sku(0)">
              <div class="sku-detail-inner adv-opts-inner">
                <dl class="sku-group select-sku js-select-sku">
                  <dt>
                    <span class="js-sku-label">选择</span>：
                  </dt>
                  <dd class="js-sku-value">
                    <span class="sku-item">净含量</span>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="js-store-info">
              <div class="block block-list goods-store">
                <div class="custom-store block-item">
                  <a class="custom-store-link clearfix" href="#">
                    <div class="custom-store-img"></div>
                    <div class="custom-store-name">{{ detail.storeName }}</div>
                    <span class="custom-store-enter">进入店铺</span>
                  </a>
                </div>
                <a class="offline-store block-item js-retail-store hide">
                  <span class="offline-store-img"></span>
                  <span class="offline-store-name">线下门店</span>
                  <div class="offline-store-branch js-retail-store-name"></div>
                </a>
                <div class="renzheng block-item">
                  <span
                    class="js-rz-item-alert rz-item"
                    data-type="team_certificate_company"
                    v-for="(item,index) in detail.identification"
                    :key="index"
                  >
                    <span class="rz-name font-size-12 c-gray-darker">{{ item }}</span>
                  </span>
                </div>
              </div>
            </div>
            <a class="js-package-buy-block hide"></a>
            <div class="js-detail-container" style="margin-top: 10px;">
              <div class="js-tabber-container goods-detail">
                <div class="js-tabber tabber tabber-n2 clearfix orange">
                  <button
                    v-for="(item,index) in type"
                    :key="index"
                    :class="{active:currentIndex === index}"
                    @click="changeType(index)"
                  >{{ item }}</button>
                </div>
                <div class="js-tabber-content">
                  <div class="js-part" data-type="sales" v-show="currentIndex === 1">
                    <div class="js-traderecord-list block-list-traderecord">
                      <div class="list-header">
                        <span class="col-1">买家</span>
                        <span class="col-2 center">成交时间</span>
                        <span class="col-3 center">数量</span>
                      </div>
                      <div class="js-list b-list block block-list">
                        <li class="block-item" v-for="(item,index) in sales" :key="index">
                          <span class="col-1 c-gray-darker">{{ item.buyer }}</span>
                          <span class="col-2 c-gray-dark center">{{ item.time }}</span>
                          <span class="col-3 c-gray-darker center">{{ item.num }}</span>
                        </li>
                        <loading v-show="loading"/>
                        <div
                          class="js-show-more-btn block-item center font-size-14 c-gray-darker"
                          style
                          @click="getSale"
                        >查看更多</div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="js-part js-goods-detail goods-tabber-c"
                    data-type="goods"
                    v-html="detail.description"
                    v-show="currentIndex === 0"
                  ></div>
                </div>
              </div>
            </div>
            <div class="js-bottom-opts js-footer-auto-ele stick-bottom">
              <div class="stick-bottom-icons">
                <a href="javascript:;" class="js-yz-im icons icons-im">店主</a>
                <a href="#" class="js-call-im icons icons-home">店铺</a>
                <a href="javascript:;" class="js-yz-zan icons icons-zan">收藏</a>
              </div>
              <div class="stick-bottom-btns">
                <!-- 尚未开售 -->
                <div class="btn-cart">
                  <a href="#" class="js-add-cart" @click="sku(1)">加入购物车</a>
                </div>
                <div class="btn-buy" @click="sku(2)">
                  <a href="javascript:;" class="js-buy-it">立即购买</a>
                </div>
              </div>
            </div>
            <!-- <div id="right-icon" class="js-right-icon hide">
          <div class="js-right-icon-container right-icon-container clearfix">
            <a id="global-cart" href="https://h5.youzan.com/v2/trade/cart?kdt_id=16546132" class="icon hide" style="">
              <p class="icon-img"></p>
              <p class="icon-txt">购物车</p>
            </a>
            <a class="js-show-more-btn icon show-more-btn hide"></a>
          </div>
            </div>-->
            <div id="right-icon" class="js-right-icon" v-show="carShow">
              <div class="js-right-icon-container right-icon-container clearfix">
                <router-link :to="{name:'cart'}" id="global-cart" href="#" class="icon new s0" style>
                  <p class="icon-img"></p>
                  <p class="icon-txt">购物车</p>
                </router-link>
                <a class="js-show-more-btn icon show-more-btn"></a>
              </div>
            </div>
            <div class="js-recommend">
              <p class="center font-size-14 c-black" style="padding: 5px 0;margin-top: 10px;">更多精选商品</p>
              <div class="js-recommend-goods-list">
                <ul
                  class="js-goods-list sc-goods-list pic clearfix size-1"
                  data-size="1"
                  data-showtype="card"
                  style="visibility: visible;"
                >
                  <!-- 商品区域 -->
                  <!-- 展现类型判断 -->
                  <li
                    class="js-goods-card goods-card small-pic card"
                    v-for="(item,index) in hotList"
                    :key="index"
                  >
                    <a
                      href="#"
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="343086880"
                      :title="item.name"
                    >
                      <div
                        class="photo-block"
                        data-width="750"
                        data-height="750"
                        style="background-color: rgb(255, 255, 255);"
                      >
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/07/11/FoN0SazpvslhoiiyuHETeyWHqzTE.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          :src="item.img"
                          style
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">{{ item.name }}</p>
                        <p class="goods-sub-title c-black hide"></p>
                        <p class="goods-price">
                          <em>{{ item.price }}</em>
                        </p>
                        <p class="goods-price-taobao hide"></p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <p class="center" style="margin: 10px 0 20px;">
                <a
                  href="https://h5.youzan.com/v2/showcase/homepage?kdt_id=16546132"
                  class="center btn btn-white btn-xsmall font-size-14"
                  style="padding:8px 26px;"
                >进店逛逛&gt;</a>
              </p>
            </div>
          </div>
          <div id="shop-nav"></div>
        </div>
      </div>
      <div class="js-footer" style="min-height: 1px;">
        <div>
          <div class="footer">
            <div class="copyright">
              <div class="ft-links">
                <a
                  href="#"
                  target="_blank"
                >店铺主页</a>
                <a
                  href="#"
                  target="_blank"
                >会员中心</a>
                <a href="javascript:;" class="js-open-follow">关注我们</a>
                <a href="#" target="_blank">店铺信息</a>
                <!-- 第三方app隐藏topbar时，需要在底部显示购物记录入口 -->
              </div>
              <div
                class="ft-copyright"
                style="background-image: url(https://img.yzcdn.cn/upload_files/2017/06/16/FgtL3QzprXTGrVPaolozNT08Xs2K.png);"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div
        style="position: static; width: 0px; height: 0px; border: none; padding: 0px; margin: 0px;"
      >
        <div id="trans-tooltip">
          <div
            id="tip-left-top"
            style="background: url(&quot;chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/tip-left-top.png&quot;);"
          ></div>
          <div
            id="tip-top"
            style="background: url(&quot;chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/tip-top.png&quot;) repeat-x;"
          ></div>
          <div
            id="tip-right-top"
            style="background: url(&quot;chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/tip-right-top.png&quot;);"
          ></div>
          <div
            id="tip-right"
            style="background: url(&quot;chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/tip-right.png&quot;) repeat-y;"
          ></div>
          <div
            id="tip-right-bottom"
            style="background: url(&quot;chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/tip-right-bottom.png&quot;);"
          ></div>
          <div
            id="tip-bottom"
            style="background: url(&quot;chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/tip-bottom.png&quot;) repeat-x;"
          ></div>
          <div
            id="tip-left-bottom"
            style="background: url(&quot;chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/tip-left-bottom.png&quot;);"
          ></div>
          <div
            id="tip-left"
            style="background: url(&quot;chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/tip-left.png&quot;);"
          ></div>
          <div id="trans-content"></div>
        </div>
        <div
          id="tip-arrow-bottom"
          style="background: url(&quot;chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/tip-arrow-bottom.png&quot;);"
        ></div>
        <div
          id="tip-arrow-top"
          style="background: url(&quot;chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/tip-arrow-top.png&quot;);"
        ></div>
      </div>
      <div class="search-bar" style="display:none;">
        <form class="search-form" action="https://h5.youzan.com/v2/search" method="GET">
          <input type="search" class="search-input" placeholder="搜索商品" name="q" value>
          <input type="hidden" name="kdt_id" value="16546132">
          <a class="js-search-cancel search-cancel" href="javascript:;">取消</a>
          <span class="search-icon"></span>
          <span class="close-icon hide"></span>
        </form>
        <div class="history-wrap center">
          <ul class="history-list search-recom-list js-history-list clearfix"></ul>
          <a class="tag tag-clear js-tag-clear c-gray-darker hide" href="javascript:;">清除历史搜索</a>
        </div>
      </div>
      <div
        id="yFzBKP9GDL"
        v-show="skuShow"
        style="height: 100%; position: fixed; top: 0px; left: 0px; right: 0px; background-color: rgba(0, 0, 0, 0.7); z-index: 1000; transition: none 0.2s ease; opacity: 1;"
      ></div>
      <transition name="sku">
        <div
          id="QfEqtDbeK9"
          class="sku-layout sku-box-shadow popup"
          v-show="skuShow"
          style="overflow: hidden; position: fixed; z-index: 1000; background: white; bottom: 0px; left: 0px; right: 0px; visibility: visible;"
        >
          <div class="sku-layout-title name-card sku-name-card">
            <div class="thumb" v-if="banner.length === 3">
              <img class="js-goods-thumb goods-thumb" :src="banner[0].image" >
            </div>
            <div class="detail goods-base-info clearfix">
              <p class="title c-black ellipsis">{{ detail.title }}</p>
              <div class="goods-price clearfix">
                <div class="current-price pull-left c-black">
                  <span class="price-name pull-left font-size-14 c-orange">¥</span>
                  <i
                    class="js-goods-price price font-size-16 vertical-middle c-orange"
                  >{{ detail.price }}</i>
                </div>
                <div
                  class="original-price vertical-middle font-size-14 line-through"
                >{{ detail.originalPrice }}</div>
              </div>
            </div>
            <div class="js-cancel sku-cancel" @click="skuShow = false">
              <div class="cancel-img"></div>
            </div>
          </div>
          <div
            class="sku-detail adv-opts hotel-checkin-select"
            style="border: block; margin: 0; display: block;"
          ></div>
          <div class="adv-opts layout-content" style="max-height: 554px;">
            <div class="goods-models js-sku-views block block-list border-top-0">
              <dl class="clearfix block-item sku-list-container">
                <dt class="model-title sku-sel-title">
                  <label>净含量：</label>
                </dt>
                <dd>
                  <ul class="model-list sku-sel-list">
                    <li class="tag sku-tag pull-left ellipsis active">4500g-5000g</li>
                  </ul>
                </dd>
              </dl>
              <dl class="clearfix block-item">
                <dt class="sku-num pull-left">
                  <label>购买数量：</label>
                </dt>
                <dd class="sku-quantity-contaienr">
                  <dl class="clearfix">
                    <div class="quantity">
                      <button class="minus" :class="{disabled:skuBuy <= 1}" type="button"></button>
                      <input type="text" class="txt" pattern="[0-9]*" :value="skuBuy">
                      <button class="plus" type="button"></button>
                      <div class="response-area response-area-minus" @click="count(-1)"></div>
                      <div class="response-area response-area-plus" @click="count(1)"></div>
                    </div>
                  </dl>
                </dd>
                <dt class="other-info">
                  <div class="stock">剩余{{ detail.remain }}件</div>
                </dt>
              </dl>
              <div class="block-item block-item-messages" style="display: block;"></div>
            </div>
            <!-- <div class="bottom-padding"></div> -->
            <div class="confirm-action content-foot clearfix">
              <!-- 加入购物车 -->
              <div class="big-btn-1-1" v-show="skuType === 1">
                <a
                  href="javascript:;"
                  class="js-confirm-it big-btn red-btn main-btn"
                  @click="addCar()"
                >加入购物车</a>
              </div>
              <!-- 立即购买 -->
              <div class="big-btn-1-1" v-show="skuType === 2">
                <a href="javascript:;" class="js-confirm-it big-btn red-btn main-btn">下一步</a>
              </div>
              <!-- 选择规格 -->
              <div class="big-btn-2-1" v-show="skuType === 0">
                <a
                  href="javascript:;"
                  class="js-mutiBtn-confirm cart big-btn orange-btn vice-btn"
                  @click="addCar()"
                >加入购物车</a>
                <a
                  href="javascript:;"
                  class="js-mutiBtn-confirm confirm big-btn red-btn main-btn"
                >立即购买</a>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="motify" v-show="addCarSucess">
        <div class="motify-inner">已成功添加到购物车</div>
      </div>
    </div>
    <loading v-show="false"/>
  </div>
</template>

<script>
import "../css/goods.css";
import "../css/goods_base.css";
import "../css/goods_common.css";
import "../css/goods_custom.css";
import "../css/goods_mars.css";
import "../css/goods_sku.css";
import "../css/goods_theme.css";
import swipe from "../components/swipe.vue";
import loading from "../components/loading.vue";

export default {
  name: "good",
  components: {
    swipe,
    loading
  },
  data() {
    return {
      detail: {},
      banner: [],
      hotList: [],
      type: ["商品详情", "本店成交"],
      currentIndex: 0,
      sales: [],
      loading: false,
      skuBuy: 1,
      skuShow: false,
      carShow: false,
      addCarSucess: false,
      skuType: null
    };
  },
  methods: {
    getData() {
      this.$axios.post("/goods/details").then(res => {
        this.detail = res.data.data;
        this.detail.imgs.forEach(item => {
          this.banner.push({
            image: item,
            clickUrl: "#"
          });
        });
      });
    },
    getMoreData() {
      this.$axios.post("/index/hotList").then(res => {
        this.hotList = res.data.list;
      });
    },
    getSale() {
      if (this.loading === true) return;
      this.loading = true;
      this.$axios
        .post("/goods/sales")
        .then(res => {
          this.sales = this.sales.concat(res.data.list);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    changeType(index) {
      this.currentIndex = index;
    },
    sku(type) {
      this.skuType = type;
      this.skuShow = true;
    },
    count(num) {
      if (num === -1 && this.skuBuy === 1) return;
      this.skuBuy = this.skuBuy + num;
    },
    addCar() {
      this.carShow = true;
      this.addCarSucess = true;
      this.skuShow = false;
      setTimeout(() => {
        this.addCarSucess = false;
      }, 1500);
    }
  },
  created() {
    this.getData();
    this.getMoreData();
    this.getSale();
  }
};
</script>

<style lang="scss" scoped>
.custom-image-swiper .swiper-slide a {
  width: 100% !important;
}

.sku-enter-active,
.sku-leave-active {
  transition: all 0.3s ease;
  transform: translateY(0);
}
.sku-enter, .sku-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
}
</style>


