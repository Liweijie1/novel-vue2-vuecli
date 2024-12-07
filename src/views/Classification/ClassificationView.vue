<template>
  <div class="classification">
    <header>
      <van-image class="back" src="/assets/icon_back.png" @click="gotoCharts" />
      <nav class="toggleChart">
        <router-link to="/male-classification">男生频道</router-link>
        <router-link to="/female-classification">女生频道</router-link>
      </nav>
    </header>

    <transition name="xxx">
      <router-view class="router" />
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    gotoCharts() {
      if (this.$route.path == "/male-classification") {
        this.$router.push({
          path: "/male-chart",
        });
      } else {
        this.$router.push({
          path: "/female-chart",
        });
      }
    },
  },
  
};
</script>

<style lang="less" scoped>
.classification {
  header {
    width: 100%;
    height: 50rem;
    display: flex;
    align-items: center;
    .back {
      width: 12rem;
      height: 20rem;
      margin: 0 40rem 0 18rem;
    }
    .toggleChart {
      width: 235rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      line-height: 50rem;
      a {
        color: #000;
        font-size: 16rem;
        &:link {
          color: #000;
        }
        &:hover {
          color: #000;
        }
        &:visited {
          color: #000;
        }
        &::active {
          color: #000;
        }
      }
    }
  }
}
</style>