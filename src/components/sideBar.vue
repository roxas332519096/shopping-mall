<template>
  <div class="class-nav">
    <div id="scroll-nav">
      <ul class="nav">
        <li
          class="category-name js-category-name"
          :class="{active:isActive}"
          v-for="(item,index) in list "
          :key="item.id"
          @click="getContent(index)"
        >{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "sdieBar",
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    getContent(index) {
      this.$emit("getData", index);
    }
  }
};
</script>

 <style lang="scss" scoped>
.class-nav {
  z-index: 1;
}
</style>


