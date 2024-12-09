<template>
  <div class="readHistoryItem">
    <van-image fit="cover" :src="bookCoverImage" @error="handleError" />
    <div class="right">
      <div class="title van-ellipsis">
        <div class="name">{{ bookTitle }}</div>
        <div v-if="!inSlef" class="jion" @click="joinHandle">加入书架</div>
        <div v-else class="remove" @click="joinHandle">已加入</div>
        <div class="del" @click="del">
          <van-image src="/assets/icon_delete_small.png" />
        </div>
      </div>

      <div class="info van-ellipsis">
        {{ bookAuthor }}
      </div>
      <div class="info van-ellipsis">阅读到： 第一章</div>
      <div class="info van-ellipsis">2024-12-09</div>
    </div>
  </div>
</template>

<script>
import { getBookInfo } from "@/api/index.js";
export default {
  props: ["bookId", "isEditing"],
  data() {
    return {
      book: null,
      bookCoverImage: null,
      bookTitle: null,
      bookAuthor: null,
      defaultImg: "/assets/default.png",
      readHistory: JSON.parse(localStorage.getItem("readHistory")),
      token: JSON.parse(localStorage.getItem("token")),
      shelf: JSON.parse(localStorage.getItem("shelf")),
    };
  },
  computed: {
    inSlef: function () {
      const userShelf = this.shelf.find((obj) => {
        return this.token in obj;
      });
      if (userShelf[this.token].includes(this.bookId)) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    handleError() {
      this.bookCoverImage = this.defaultImg;
    },
    del() {
      const index = this.readHistory.indexOf(this.bookId);
      this.readHistory.splice(index, 1);
      localStorage.setItem("readHistory", JSON.stringify(this.readHistory));
      this.$emit("refash-book-list");
    },
    joinHandle() {
      this.shelf = JSON.parse(localStorage.getItem("shelf"));
      const userShelf = this.shelf.find((obj) => {
        return this.token in obj;
      });
      if (!this.inSlef) {
        userShelf[this.token].push(this.bookId);
      } else{
        userShelf[this.token] = userShelf[this.token].filter(
          (item) => item !== this.bookId
        );
      }
      localStorage.setItem("shelf", JSON.stringify(this.shelf));
    },
  },
  created() {
    getBookInfo(this.bookId).then((res) => {
      this.book = res.data.data.book;
      this.bookCoverImage = this.book.coverImage;
      this.bookTitle = this.book.title;
      this.bookAuthor = this.book.author;
    });
  },
};
</script>

<style lang="less" scoped>
.readHistoryItem {
  width: 350rem;
  height: 93rem;
  margin: 15rem auto;
  display: flex;
  flex-wrap: nowrap;
  .van-image {
    width: 75rem;
    height: 100%;
  }
  .right {
    width: 283rem;
    height: 100%;
    padding-left: 16rem;
    .title {
      width: 100%;
      height: 25rem;
      display: flex;
      align-items: center;
      font-size: 14rem;
      .name {
        width: 116rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 20rem;
      }
      .jion {
        height: 24rem;
        color: #f87e27;
        font-size: 12rem;
        line-height: 25rem;
        padding: 0 15rem;
        border-radius: 15rem;
        border: 1px solid #f87e27;
        margin-right: 12rem;
      }
      .remove {
        height: 24rem;
        color: #8696a0;
        border: 1px solid #8696a0;
        font-size: 12rem;
        line-height: 25rem;
        padding: 0 15rem;
        border-radius: 15rem;
        margin-right: 12rem;
      }
      .del {
        height: 24rem;
        padding: 0 10rem;
        border-radius: 15rem;
        border: 1px solid #8696a0;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-image {
          width: 15rem;
          height: 15rem;
        }
      }
    }
    .content {
      margin-top: 12rem;
      color: #8696a0;
      font-size: 12rem;
      text-indent: 1em;
    }
    .info {
      margin-top: 8rem;
      color: #8696a0;
      font-size: 12rem;
    }
  }
}
</style>