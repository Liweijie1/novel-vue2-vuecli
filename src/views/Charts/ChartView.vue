<template>
  <div class="chart">
    chart
    <nav>
      <router-link to="/male-chart">男生频道</router-link>
      <router-link to="/female-chart">女生频道</router-link>
    </nav>

    <transition name="xxx">
      <router-view class="router" />
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>