<template>
  <div class="container" style="min-height: 581px;">
    <div class="content clearfix js-page-content">
      <div id="cart-container">
        <div>
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
                    v-show="!editing"
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
                  @click="edit(shopIndex)"
                  v-show="shop.canEdit"
                >
                  <!---->
                  {{ shop.status }}
                </a>
              </div>
              <!---->
              <div>
                <ul class="js-list block block-list block-list-cart border-0">
                  <li
                    class="block-item block-item-cart"
                    v-for="(good,goodIndex) in shop.goodList"
                    :key="good.id"
                    :ref="`list-${shopIndex}-${goodIndex}`"
                    @touchstart="start($event,good)"
                    @touchend="end($event,good,shopIndex,goodIndex)"
                  >
                    <div>
                      <div class="check-container">
                        <span
                          class="check"
                          :class="{checked:good.selected}"
                          @click="selectGood(goodIndex,shopIndex)"
                          v-show="!editing"
                        ></span>
                        <span
                          class="check"
                          :class="{checked:good.deletedSelected}"
                          @click="good.deletedSelected = !good.deletedSelected"
                          v-show="shop.canEdit&&editing"
                        ></span>
                      </div>
                      <div class="name-card clearfix">
                        <a href="#" class="thumb js-goods-link">
                          <img class="js-lazy" :src="good.thumbnail">
                        </a>
                        <div class="detail">
                          <a href="#" class="js-goods-link">
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
                            <div class="quantity" v-show="shop.editing">
                              <button
                                type="button"
                                class="minus"
                                :class="{'disabled':good.quantity <=1}"
                              ></button>
                              <input
                                type="text"
                                pattern="[0-9]*"
                                class="txt"
                                :value="good.quantity"
                              >
                              <button type="button" class="plus"></button>
                              <div
                                class="response-area response-area-minus"
                                @click="countQuantity(shopIndex,goodIndex,-1)"
                              ></div>
                              <div
                                class="response-area response-area-plus"
                                @click="countQuantity(shopIndex,goodIndex,1)"
                              ></div>
                            </div>
                          </div>
                          <div class="price c-orange">
                            ¥
                            <span>{{ good.price }}</span>
                          </div>
                        </div>
                        <div class="error-box"></div>
                      </div>
                      <div class="delete-btn" @click="deleteGood(shopIndex,goodIndex)">
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
                  v-show="!editing"
                ></span>
                <span
                  class="check"
                  v-if="editing&&editIndex!==-1"
                  :class="{checked:allDeletedSelected }"
                  @click="allDeletedSelected = !allDeletedSelected"
                ></span>
                全选
              </div>
              <!-- 显示状态 -->
              <div class="total-price" v-show="!editing">
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
                v-show="editing"
                href="javascript:;"
                v-if="editing"
                :disabled="!allDeletedSelected"
                @click="deleteAllGoods(shopIndex)"
                class="j-delete-goods btn font-size-14 btn-red"
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
      shopList: [],
      editing: false,
      editIndex : -1,
    };
  },
  methods: {
    getList() {
      this.$axios.post("/cart/list").then(res => {
        res.data.cartList.forEach(shop => {
          shop.selected = true;
          shop.editing = false;
          shop.status = "编辑";
          shop.canEdit = true;
          shop.goodList.forEach(good => {
            good.selected = true;
            good.deletedSelected = false;
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
    },
    edit(index) {
      this.editing = !this.editing;
      if(this.editing){
        this.editIndex = index;
      }else{
        this.editIndex = -1;
      }
      this.shopList[index].editing = !this.shopList[index].editing;
      this.shopList[index].status = this.shopList[index].editing
        ? "完成"
        : "编辑";
      if (this.shopList[index].editing) {
        this.shopList.forEach((item, index2) => {
          if (index2 !== index) {
            item.canEdit = false;
          }
        });
      } else {
        this.shopList.forEach(item => {
          item.canEdit = true;
        });
      }
    },
    countQuantity(shopIndex,goodIndex,val){
      let good = this.shopList[shopIndex].goodList[goodIndex]
      if(val ===-1 && good.quantity <=1) return
      good.quantity += val
    },
    start(e,good){
      good.startX = e.changedTouches[0].clientX
    },
    end(e,good,shopIndex,goodIndex){
      good.endX = e.changedTouches[0].clientX
      if (!this.editing && this.editIndex !== shopIndex) return
      let node = this.$refs[`list-${shopIndex}-${goodIndex}`][0]
      node.style.transition = '0.1s'
      if(good.startX - good.endX > 50){
        node.style.transform = 'translateX(-65px)'
      }else if(good.startX - good.endX < -50){
        node.style.transform = 'translateX(0px)'
      }
    },
    deleteGood(shopIndex,goodIndex){
      this.shopList[shopIndex].goodList.splice(goodIndex,1)
      if(this.shopList[shopIndex].goodList.length ===0 ){
        this.shopList.splice(shopIndex,1)
        this.changeCanEdit()
      }
    },
    deleteAllGoods(shopIndex){
      this.shopList.splice(shopIndex,1)
      this.changeCanEdit()
    },
    changeCanEdit(){
      this.editing = false;
      this.editIndex = -1;
      this.shopList.forEach((item)=>{
        item.canEdit = true
      })
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
    allDeletedSelected:{
      get(){
       return this.shopList[this.editIndex].goodList.every(item=>{
          return item.deletedSelected === true;
        })
      },
      set(val){
        this.shopList[this.editIndex].goodList.forEach(item=>{
          item.deletedSelected = val;
        })
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
    },
    goods() {
      let goods = [];
      this.shopList.forEach(shop => {
        shop.goodList.forEach(good => {
          if (good.selected === true) {
            goods.push(good);
          }
        });
      });
      return goods;
    },
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
</style>


