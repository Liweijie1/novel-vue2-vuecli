<template>
  <div class="search">
    <header>
      <div class="searchbox">
        <van-image class="magnifier" src="/assets/icon_book_city_search.png" />
        <input
          type="text"
          placeholder="搜索您想看的书籍"
          v-model="searchValue"
          @keyup.enter="searchHandle(null)"
        />
        <van-image class="magnifier" src="/assets/search_clear.png" v-if="searchValue" @click="searchValue=''" />
      </div>
      <span v-if="searchValue" @click="searchHandle(null)">搜索</span>
      <span v-else @click="$router.back()">取消</span>
    </header>
    <div class="title">大家都在搜</div>
    <div class="hot" @click="searchHandle('都市沉浮')">
      <div class="one">1</div>
      <span>都市沉浮</span>
    </div>
    <div class="title">
      <div>历史记录</div>
      <div class="clear" @click="clear">
        <span>清空</span>
        <van-image class="magnifier" src="/assets/icon_delete_small.png" />
      </div>
    </div>
    <div class="history">
      <div
        class="record"
        v-for="item in searchHistory"
        :key="item"
        @click="searchHandle(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: null,
      searchHistory: JSON.parse(localStorage.getItem("searchHistory")),
    };
  },
  methods: {
    searchHandle(keyword) {
      this.$router.push({
        path: "/book-list",
        query: {
          type: "搜索",
          keyword: keyword || this.searchValue,
        },
      });
    },
    clear(){
      localStorage.setItem("searchHistory", JSON.stringify([]));
      this.searchHistory = [];
    }
  },
  created() {
    if (!this.searchHistory) {
      localStorage.setItem("searchHistory", JSON.stringify([]));
      this.searchHistory = [];
    }
  },
};
</script>

<style lang="less" scoped>
.search {
  width: 100vw;
  header {
    width: 100vw;
    height: 50rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #999999;
    .searchbox {
      width: 315rem;
      height: 38rem;
      border-radius: 36rem;
      border: none;
      box-shadow: 0rem 0rem 3rem rgb(169, 169, 169);
      display: flex;
      align-items: center;
      overflow: hidden;
      .magnifier {
        width: 15rem;
        height: 15rem;
        margin: 0 12rem;
      }
      input {
        flex: 1;
        border: none;
      }
    }
  }
  .title {
    width: 100vw;
    height: 18rem;
    padding: 0 12rem;
    margin-top: 25rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .clear {
      color: #999999;
      display: flex;
      align-items: center;
      .van-image {
        width: 16rem;
        height: 16rem;
        margin-left: 5rem;
      }
    }
  }
  .hot {
    width: 100vw;
    height: 21rem;
    display: flex;
    align-items: center;
    margin-top: 22rem;
    .one {
      width: 21rem;
      height: 21rem;
      background: #f54848;
      color: white;
      line-height: 21rem;
      text-align: center;
      margin: 0 7rem 0 12rem;
    }
  }
  .history {
    width: 100vw;
    margin-top: 32rem;
    padding-left: 12rem;
    box-sizing: border-box;
    display: flex;
    .record {
      font-size: 14rem;
      border-radius: 28rem;
      background: #f5f6f9;
      margin-left: 6rem;
      padding: 7rem 17rem;
    }
  }
}
</style>