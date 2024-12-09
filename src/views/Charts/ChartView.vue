<template>
  <div class="chart">
    <van-nav-bar title="排行榜">
      <template #left>
        <van-image
          class="back"
          src="/assets/icon_back.png"
          @click="getBookCity"
        />
      </template>
      <template #right>
        <van-image class="search" src="/assets/icon_search.png"  @click="gotoSearch"/>
      </template>
    </van-nav-bar>
    <nav class="toggleChart">
      <router-link to="/male-chart">男生频道</router-link>
      <router-link to="/female-chart">女生频道</router-link>
    </nav>

    <transition name="xxx">
      <router-view class="router" />
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    getBookCity() {
      this.$router.push({
        path: "/male-channel",
      });
    },
    gotoSearch(){
      this.$router.push({
        path:"/search"
      })
    }
  },
};
</script>

<style lang="less" scoped>
.chart {
  .van-nav-bar {
    height: 50rem;
    font-size: 18rem;
    .back {
      width: 12rem;
      height: 20rem;
    }
    .search {
      width: 18rem;
      height: 18rem;
    }
  }
  .toggleChart{
    width: 100vw;
    height: 50rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    a{
      color: #000;
      font-size: 14rem;
      &:link{
        color: #000;
      }
      &:hover{
        color: #000;
      }
      &:visited{
        color: #000;
      }
      &::active{
        color: #000;
      }
    }
  }
}
</style>