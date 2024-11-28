<template>
  <div class="tabBar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tabBar {
  height: 40rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  .left {
    font-size: 18rem;
    font-weight: 600;
    line-height: 40rem;
    margin-left: 12rem;
  }
  .right {
    font-size: 12rem;
    color: #E96D20;
    line-height: 40rem;
    margin-right: 12rem;
  }
}
</style>

