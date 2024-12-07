<template>
  <div class="maleChart">
    <van-tree-select
      height="100%"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div class="classification" v-if="active === 0">
          <ClassificationItem
            v-for="item in cates"
            :key="item.cateId"
            :cateId="item.cateId"
            :cateName="item.cateName"
          ></ClassificationItem>
        </div>
        <div class="mostPopular" v-if="active === 1">
          <ExcellentBookItem
            v-for="item in mostPopular"
            :key="item.id"
            :bookId="item.id"
            :img="item.cover"
            :title="item.title"
            :content="item.content"
            :author="item.author"
          ></ExcellentBookItem>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import ClassificationItem from "@/components/ClassificationItem.vue";
import ExcellentBookItem from "@/components/ExcellentBookItem.vue";
import { getBookCityFemale, getClassification } from "@/api/index.js";
export default {
  data() {
    return {
      active: 0,
      items: [{ text: "分类" }, { text: "最受欢迎" }],
      cates: null,
      bookCityData: null,
      mostPopular: null,
    };
  },
  components: {
    ExcellentBookItem,
    ClassificationItem,
  },
  created() {
    getBookCityFemale().then((res) => {
      this.bookCityData = res.data.list;
      this.mostPopular = this.bookCityData.slice(5, 13);
    });
    getClassification().then((res) => {
      this.cates = res.data[0].cates.slice(0, 8);
    });
  },
};
</script>

<style lang="less">
.maleChart {
  width: 100vw;
  height: calc(100vh - 100rem);
  .van-tree-select {
    height: 100%;
    .van-sidebar {
      width: 78rem;
      margin-right: -70rem;
      .van-sidebar-item {
        width: 78rem;
        text-align: center;
        padding-left: 0;
        padding-right: 0;
        &::before{
          width: 2rem;
          background: #FCDD22;
        }
      }
    }
    .classification {
      width: 264rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-left: 16rem;
    }
    .mostPopular {
      width: 264rem;
      margin-left: 16rem;
      .excellentBookItem {
        width: 100%;
      }
    }
  }
}
</style>