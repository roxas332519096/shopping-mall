<template>
  <div class="container" style="min-height: 581px;">
    <div class="content clearfix js-page-content">
      <div id="cart-container">
        <div>
          <!---->
          <!---->
          <!---->
          <div class="js-shop-list shop-list">
            <div
              class="block block-order block-cart"
              v-for="(shop,shopIndex) in shopList"
              :key="shop.id"
            >
              <div class="header">
                <div class="select-group js-select-group">
                  <span
                    class="check"
                    :class="{checked:shop.selected}"
                    @click="selectShop(shopIndex)"
                  ></span>
                </div>
                <a class="shop-title">
                  <i class="custom-store-img">店铺：</i>
                  {{ shop.title }}
                </a>
                <a
                  href="javascript:;"
                  data-type="cart"
                  class="j-edit-list pull-right c-blue font-size-12 edit-list"
                >
                  <!---->
                  编辑
                </a>
              </div>
              <!---->
              <div>
                <ul class="js-list block block-list block-list-cart border-0">
                  <li
                    class="block-item block-item-cart"
                    v-for="(good,goodIndex) in shop.goodList"
                    :key="good.id"
                  >
                    <div>
                      <div class="check-container">
                        <span
                          class="check"
                          :class="{checked:good.selected}"
                          @click="selectGood(goodIndex,shopIndex)"
                        ></span>
                      </div>
                      <div class="name-card clearfix">
                        <a href="#" class="thumb js-goods-link">
                          <img class="js-lazy" :src="good.thumbnail">
                        </a>
                        <div class="detail">
                          <a
                            href="https://h5.youzan.com/v2/showcase/goods?alias=2oivacpjh2ex0"
                            class="js-goods-link"
                          >
                            <h3 class="title js-ellipsis">
                              <i>{{ good.title }}</i>
                            </h3>
                          </a>
                          <p class="sku ellipsis">{{ good.sku }}</p>
                          <!-- 显示状态 -->
                          <div class="num">
                            ×
                            <span class="num-txt">{{ good.quantity }}</span>
                            <!---->
                          </div>
                          <!-- 编辑状态 -->
                          <div class="num">
                            <!---->
                            <div class="quantity" v-show="false">
                              <button type="button" class="minus disabled"></button>
                              <input
                                type="text"
                                pattern="[0-9]*"
                                class="txt"
                                :value="good.quantity"
                              >
                              <button type="button" class="plus"></button>
                              <div class="response-area response-area-minus"></div>
                              <div class="response-area response-area-plus"></div>
                            </div>
                          </div>
                          <div class="price c-orange">
                            ¥
                            <span>{{ good.price }}</span>
                          </div>
                        </div>
                        <div class="error-box"></div>
                      </div>
                      <div class="delete-btn" v-show="false">
                        <span>删除</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div style="padding:0;" class="js-bottom-opts bottom-fix">
            <div class="bottom-cart clear-fix">
              <div class="select-all">
                <span
                  class="check"
                  :class="{ checked:allSelected }"
                  @click="allSelected = !allSelected"
                ></span> 全选
              </div>
              <!-- 显示状态 -->
              <div class="total-price">
                合计：¥
                <span class="js-total-price" style="color: rgb(255, 102, 0);">{{ total }}</span>
                <p class="c-gray-dark">不含运费</p>
              </div>
              <button
                href="javascript:;"
                class="js-go-pay btn btn-orange-dark font-size-14"
                :disabled="!count"
              >结算 ({{ count }})</button>
              <!-- 编辑状态 -->
              <button
                href="javascript:;"
                disabled="disabled"
                class="j-delete-goods btn font-size-14 btn-red"
                v-show="false"
              >删除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css/cart.css";
import "../css/cart_base.css";
import "../css/cart_trade.css";

export default {
  name: "cart",
  data() {
    return {
      shopList: []
    };
  },
  methods: {
    getList() {
      this.$axios.post("/cart/list").then(res => {
        res.data.cartList.forEach(shop => {
          shop.selected = true;
          shop.goodList.forEach(good => {
            good.selected = true;
          });
        });
        this.shopList = res.data.cartList;
      });
    },
    selectShop(index) {
      let shop = this.shopList[index];
      shop.selected = !shop.selected;
      shop.goodList.forEach(good => {
        good.selected = shop.selected;
      });
    },
    selectGood(index, shopIndex) {
      let shop = this.shopList[shopIndex];
      shop.goodList[index].selected = !shop.goodList[index].selected;
      shop.selected = shop.goodList.every(item => {
        return item.selected === true;
      });
    }
  },
  computed: {
    allSelected: {
      get() {
        return this.shopList.every(item => {
          return item.selected === true;
        });
      },
      set(val) {
        this.shopList.forEach(shop => {
          shop.selected = val;
          shop.goodList.forEach(good => {
            good.selected = val;
          });
        });
      }
    },
    total() {
      let total = 0;
      this.shopList.forEach(shop => {
        shop.goodList.forEach(good => {
          if (good.selected) {
            total += good.price * good.quantity;
          }
        });
      });
      return total;
    },
    count() {
      let count = 0;
      this.shopList.forEach(shop => {
        shop.goodList.forEach(good => {
          if (good.selected) {
            count++;
          }
        });
      });
      return count;
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
</style>


