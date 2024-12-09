<template>
  <div class="bookListView">
    <van-nav-bar :title="this.$route.query.type">
      <template #left>
        <van-image
          class="back"
          src="/assets/icon_back.png"
          @click="$router.back()"
        />
      </template>
    </van-nav-bar>
    <ExcellentBookItem
      v-for="item in bookList"
      :key="item.id"
      :bookId="item.id || item.bookId"
      :img="item.cover"
      :title="item.title"
      :content="item.content || item.summary"
      :author="item.author"
    ></ExcellentBookItem>
  </div>
</template>

<script>
import ExcellentBookItem from "@/components/ExcellentBookItem.vue";
import { getSearch } from "@/api/index.js";
export default {
  data() {
    return {
      bookList: [],
      searchHistory: JSON.parse(localStorage.getItem("searchHistory")),
    };
  },
  components: {
    ExcellentBookItem,
  },
  methods: {
    getBookCity() {
      this.$router.push({
        path: "/male-channel",
      });
    },
  },
  created() {
    if (this.$route.query.keyword) {
      getSearch(this.$route.query.keyword).then((res) => {
        this.bookList = res.data.data.books;
        if (!this.searchHistory.includes(this.$route.query.keyword)) {
          this.searchHistory.push(this.$route.query.keyword);
          localStorage.setItem(
            "searchHistory",
            JSON.stringify(this.searchHistory)
          );
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
.bookListView {
  width: 100vw;
  .van-nav-bar {
    height: 50rem;
    font-size: 18rem;
    .back {
      width: 12rem;
      height: 20rem;
    }
  }
}
</style>