<template>
  <div class="mostPopularItem" @click="gotoBookDetail">
    <div class="right">
      <van-image :src="img" lazy-load  fit="cover"/>
    </div>
    <div class="center"></div>
    <div class="left">
      <div class="bookName van-ellipsis">{{ title }}</div>
      <div class="author van-ellipsis">{{ author }}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Lazyload } from 'vant';

Vue.use(Lazyload);
export default {
  props: ["bookId", "img", "title", "author"],
  methods: {
    gotoBookDetail() {
      this.$router.push({
        path: "/book-detail",
        query: {
          bookId: this.bookId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mostPopularItem {
  width: 158rem;
  height: 65rem;
  margin-top: 14rem;
  display: flex;
  .right {
    .van-image {
      width: 46rem;
      height: 65rem;
      border-radius: 5rem;
    }
  }
  .center{
    width: 24rem;
  }
  .left{
    width: 84rem;
    .bookName{
      font-size: 14rem;
    }
    .author{
      margin-top: 16rem;
      color: #A2AEB6;
      font-size: 12rem;
    }
  }
}
</style>