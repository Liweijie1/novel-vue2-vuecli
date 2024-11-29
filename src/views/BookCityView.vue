<template>
  <div class="bookCity">
    <header>
      <div class="man">男频</div>
      <div class="woman">女频</div>
      <input type="text" />
    </header>

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
      this.setBookCityData(res.data.list)
    });
  },
};
</script>

<style lang="scss" scoped>
.bookCity {
  margin-bottom: 60px;
  header {
    height: 50rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .man,
    .woman {
      font-size: 18rem;
      font-weight: 600;
    }

    input {
      width: 226rem;
      height: 30rem;
      border-radius: 36rem;
      border: none;
      box-shadow: 0rem 0rem 3rem rgb(169, 169, 169);
    }
  }
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
