<template>
  <div class="contents">
    <van-nav-bar
      title="目录"
      left-text=""
      right-text="1-100 V"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.contents {
  .van-nav-bar{
    color: #000;
    $nav-bar-text-color:#000;
  }
}
</style>