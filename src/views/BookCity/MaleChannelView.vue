<template>
  <div class="male">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
    </van-swipe>

    <FourTypes></FourTypes>

    <TabBar>
      <template #left>畅销佳作</template>
      <template #right>更多 ></template>
    </TabBar>

    <BestSelling></BestSelling>

    <MostPopular></MostPopular>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TabBar from "@/components/TabBar.vue";
import FourTypes from "@/components/FourTypes.vue";
import BestSelling from "@/components/BestSelling.vue";
import MostPopular from "@/components/MostPopular.vue";
import { getBookCity } from "@/api/index.js";
export default {
  data() {
    return {
      getBookCityData: [],
    };
  },
  components: {
    TabBar,
    FourTypes,
    BestSelling,
    MostPopular,
  },
  computed: {
    ...mapState(["bookCityData"]),
  },
  methods: {
    ...mapMutations(["setBookCityData"]),
  },
  created() {
    getBookCity().then((res) => {
      this.setBookCityData(res.data.list);
    });
  },
};
</script>

<style lang="scss" scoped>
.bookCity {
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20rem;
    line-height: 150rem;
    text-align: center;
    background-color: #39a9ed;
  }
  .van-grid-item__content {
    padding: 0;
  }
}
</style>
