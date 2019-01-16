<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "loading"
};
</script>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loading span {
  display: block;
  width: 20px;
  height: 20px;
  background: url(https://b.yzcdn.cn/v2/image/loader.gif) no-repeat 50%;
  background-size: 20px 20px;
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min--moz-device-pixel-ratio: 1.5),
  only screen and (min-device-pixel-ratio: 1.5) {
  .loading span {
    background-image: url(https://b.yzcdn.cn/v2/image/loader@2x.gif);
  }
}
</style>

