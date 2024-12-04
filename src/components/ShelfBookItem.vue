<template>
  <div class="shelfBookItem" @click="clickHandle(bookId)">
    <van-image
      class="cover"
      fit="cover"
      radius="2rem"
      :src="bookCoverImage"
      @error="handleError"
    />
    <van-image
      class="del"
      fit="cover"
      radius="2rem"
      src="/assets/icon_delete.png"
    />
    <div class="bookName van-ellipsis">{{ bookTitle }}</div>
    <div class="author van-ellipsis">{{ bookAuthor }}</div>
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
      token: JSON.parse(localStorage.getItem("token")),
      shelf: JSON.parse(localStorage.getItem("shelf")),
      catalog: null,
    };
  },
  methods: {
    handleError() {
      this.bookCoverImage = this.defaultImg;
    },
    clickHandle(id) {
      if (this.isEditing) {
        this.shelf = JSON.parse(localStorage.getItem("shelf"));
        const userShelf = this.shelf.find((obj) => {
          return this.token in obj;
        });
        if (userShelf[this.token].includes(id)) {
          const index = userShelf[this.token].indexOf(id);
          userShelf[this.token].splice(index, 1);
          localStorage.setItem("shelf", JSON.stringify(this.shelf));
          this.$emit("refash-book-list");
        }
      } else {
        getBookInfo(id).then((res) => {
          if (res.data.data.catalog[0].wordCount) {
            this.bookFirstChapterId = res.data.data.catalog[0].uuid;
          } else {
            this.bookFirstChapterId = res.data.data.catalog[1].uuid;
          }
          this.$router.push({
            path: "/novel-content",
            query: {
              bookId: id,
              catalogId: this.bookFirstChapterId,
            },
          });
        });
      }
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

<style lang="less">
.shelfBookItem {
  width: 100rem;
  padding-bottom: 25rem;
  margin-right: 24rem;
  position: relative;
  .cover {
    width: 100rem;
    height: 144rem;
    margin-bottom: 10rem;
  }
  .del {
    width: 20rem;
    height: 20rem;
    position: absolute;
    top: 3rem;
    right: 3rem;
    z-index: 3;
    display: none;
  }
  .bookName {
    font-size: 16rem;
  }
  .author {
    font-size: 12rem;
    color: #7a7a7a;
    margin-top: 8rem;
  }
}
</style>