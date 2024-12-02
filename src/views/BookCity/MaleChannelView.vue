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

    <BestSelling :bestSelling="bestSelling"></BestSelling>

    <MostPopular :mostPopular="mostPopular" :male="male"></MostPopular>

    <TabBar>
      <template #left>小说速递</template>
      <template #right>更多 ></template>
    </TabBar>

    <NovelExpress :novelExpress="novelExpress"></NovelExpress>

    <TabBar>
      <template #left>极品好书</template>
      <template #right>更多 ></template>
    </TabBar>

    <ExcellentBookItem
      v-for="item in excellentBookItem"
      :key="item.id"
      :bookId="item.id"
      :img="item.cover"
      :title="item.title"
      :content="item.content"
      :author="item.author"
    ></ExcellentBookItem>

    <TabBar>
      <template #left>大神佳作</template>
      <template #right>更多 ></template>
    </TabBar>

    <ExcellentBookItem
      v-for="item in excellentBookItemTwo"
      :key="item.id"
      :bookId="item.id"
      :img="item.cover"
      :title="item.title"
      :content="item.content"
      :author="item.author"
    ></ExcellentBookItem>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";
import FourTypes from "@/components/FourTypes.vue";
import BestSelling from "@/components/BestSelling.vue";
import MostPopular from "@/components/MostPopular.vue";
import NovelExpress from "@/components/NovelExpress.vue";
import ExcellentBookItem from "@/components/ExcellentBookItem.vue";
import { getBookCity } from "@/api/index.js";
export default {
  data() {
    return {
      male:true,
      bookCityData: [],
      bestSelling: [],
      mostPopular: [],
      novelExpress: [],
      excellentBookItem: [],
      excellentBookItemTwo: [],
    };
  },
  components: {
    TabBar,
    FourTypes,
    BestSelling,
    MostPopular,
    NovelExpress,
    ExcellentBookItem,
  },
  created() {
    getBookCity().then((res) => {
      this.bookCityData = res.data.list;
      this.bestSelling = this.bookCityData.slice(0, 4);
      this.mostPopular = this.bookCityData.slice(5, 13);
      this.novelExpress = this.bookCityData.slice(13, 17);
      this.excellentBookItem = this.bookCityData.slice(17, 19);
      this.excellentBookItemTwo = this.bookCityData.slice(19, 22);
    });
  },
};
</script>

<style lang="scss" scoped>
.male {
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
