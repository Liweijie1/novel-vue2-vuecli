<template>
  <div class="mostPopular">
    <div class="top">
      <div class="most">最受欢迎</div>
      <div class="line"></div>
      <div class="more">更多 ></div>
    </div>
    <div class="bottom">
      <MostPopularItem
        v-for="item in mostPopular"
        :key="item.id"
        :bookId="item.id"
        :img="item.cover"
        :title="item.title"
        :author="item.author"
      ></MostPopularItem>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MostPopularItem from "@/components/MostPopularItem.vue";
export default {
  computed: {
    ...mapGetters(["mostPopular"]),
  },
  components: {
    MostPopularItem,
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>
.mostPopular {
  width: 350rem;
  height: 390rem;
  border-radius: 5rem;
  margin: 17rem auto;
  overflow: hidden;
  border: 1px solid #ECECEC;
  .top {
    width: 100%;
    height: 56rem;
    color: white;
    background: linear-gradient(to right, #7cacff, #4589ff);
    position: relative;
    .most {
      position: absolute;
      top: 16rem;
      left: 120rem;
      font-size: 14rem;
    }
    .line {
      width: 20rem;
      height: 2rem;
      background: white;
      position: absolute;
      top: 38rem;
      left: 138rem;
    }
    .more {
      position: absolute;
      top: 20rem;
      right: 7rem;
      font-size: 12rem;
    }
  }
  .bottom{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>