<template>
  <div class="femaleClassification">
    <ul class="cateName">
      <li
        :class="{ active: myfilter.catId == item.cateId }"
        v-for="item in cates"
        :key="item.catId"
        @click="myfilter = { ...myfilter, catId: item.cateId }"
      >
        {{ item.cateName }}
      </li>
    </ul>
    <ul class="bookStatus">
      <li
        :class="{ active: myfilter.bookStatus == 0 }"
        @click="myfilter = { ...myfilter, bookStatus: 0 }"
      >
        全部
      </li>
      <li
        :class="{ active: myfilter.bookStatus == 1 }"
        @click="myfilter = { ...myfilter, bookStatus: 1 }"
      >
        连载
      </li>
      <li
        :class="{ active: myfilter.bookStatus == 2 }"
        @click="myfilter = { ...myfilter, bookStatus: 2 }"
      >
        完结
      </li>
    </ul>
    <ExcellentBookItem
      v-for="item in books"
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
import ExcellentBookItem from "@/components/ExcellentBookItem.vue";
import { getClassification, getClassificationTypeList } from "@/api/index.js";
export default {
  data() {
    let { catId = 8, bookStatus = 0, page = 1 } = this.$route.query;
    return {
      cates: null,
      catId: null,
      cateName: null,
      page: Number(page),
      myfilter: { catId, bookStatus, page },
      finished: false,
      books: [],
    };
  },
  components: {
    ExcellentBookItem,
  },
  computed: {
    query: function () {
      return { ...this.myfilter, page: this.page };
    },
  },
  methods: {
    getBookReplace(options) {
      this.page = 1;
      this.finished = false;
      return getClassificationTypeList(options).then((res) => {
        this.books = res.data.list;
      });
    },
  },
  watch: {
    myfilter: function (f) {
      this.getBookReplace(f);
    },
    query: function (query, old) {
      if (
        new URLSearchParams(query).toString() !==
        new URLSearchParams(old).toString()
      ) {
        this.$router.replace({
          path: "/female-classification",
          query,
        });
      }
    },
  },
  created() {
    getClassification().then((res) => {
      this.cates = res.data[1].cates.slice(0, 4);
      this.catId = this.cates.cateId;
      this.cateName = this.cates.cateName;
    });
    this.getBookReplace(this.myfilter);
  },
};
</script>

<style lang="less" scoped>
.femaleClassification {
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      font-size: 14rem;
      color: #86959f;
      margin: 10rem 8rem;
      padding: 6rem 12rem;
      border-radius: 26rem;
      &.active {
        color: #488afc;
        background: #e2ecff;
      }
    }
  }
}
</style>