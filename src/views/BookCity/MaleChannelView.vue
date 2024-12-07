<template>
  <div class="male">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in swipeList" :key="item.id" @click="gotoBookDetail(item.id)">
        <van-image :src="item.cover" 
          @error="handleError(index)"/>
        <div class="text">
          <div class="bookName van-ellipsis">{{ item.title }}</div>
          <div class="content van-multi-ellipsis--l2">{{ item.content }}</div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <FourTypes :male="male"></FourTypes>

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
      swipeList: [],
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
  methods:{
    handleError(index) {
      this.swipeList[index].cover = this.defaultImg;
    },
    gotoBookDetail(id) {
      this.$router.push({
        path: "/book-detail",
        query: {
          bookId: id,
        },
      });
    },
  },
  created() {
    getBookCity().then((res) => {
      this.bookCityData = res.data.list;
      this.swipeList = this.bookCityData.slice(0, 2);
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
    height: 155rem;
    background-color: #f7f7f7;
    position: relative;
    .van-image {
      width: 80rem;
      height: 112rem;
      border-radius: 5rem;
      position: absolute;
      top: 20rem;
      left: 10rem;
      z-index: 2;
    }
    .text {
      width: 333rem;
      height: 100rem;
      padding: 15rem 5rem 0 75rem;
      box-sizing: border-box;
      background: white;
      box-shadow: 1rem 1rem 10rem rgba(255, 255, 255, 0.421);
      position: absolute;
      top: 45rem;
      left: 25rem;
      .bookName {
        font-size: 14rem;
        margin-bottom: 12rem;
      }
      .content {
        font-size: 12rem;
        color: #a4adbe;
      }
    }
  }
  .van-grid-item__content {
    padding: 0;
  }
}
</style>
