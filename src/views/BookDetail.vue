<template>
  <div class="bookDetail" v-if="book">
    <div
      class="bg"
      :style="{ 'background-image': `url(${bookCoverImage})` }"
    ></div>

    <header >
      <img @click="$router.back()" src="/assets/icon_back_white.png">
    </header>

    <section class="info">
      <van-image class="left" fit="cover" :src="bookCoverImage" />
      <div class="right">
        <div class="bookTitle">{{bookTitle}}</div>
        <div class="bookAuthor">作者：{{bookAuthor}}</div>
        <div class="bookTotalCount">{{bookTotalCount}}万字</div>
      </div>
    </section>

  </div>
</template>

<script>
import { getBookInfo } from "@/api/index.js";
export default {
  data() {
    return {
      book: null,
      bookCoverImage: null,
      bookTitle: null,
      bookAuthor: null,
      bookTotalCount: null,
    };
  },
  methods:{},
  created() {
    getBookInfo(this.$route.query.bookId).then((res) => {
      this.book = res.data.data.book;
      this.bookCoverImage = this.book.coverImage;
      this.bookTitle = this.book.title;
      this.bookAuthor = this.book.author;
      this.bookTotalCount = this.book.totalCount;
      if (this.bookTotalCount > 10000) {
        this.bookTotalCount = (this.bookTotalCount/10000).toFixed(1)
      }
    });
  },
};
</script>

<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
}
.bookDetail {
  .bg {
    width: 100vw;
    height: 100vh;
    background-size: 136%;
    background-repeat: no-repeat;
    background-position: 10% 10%;
    filter: blur(18px);
    position: fixed;
    z-index: -1;
  }

  header {
    padding: 20rem;
    img{
      width: 11rem;
      height: 17rem;
    }
  }

  .info{    
    margin-top: 33rem;
    display: flex;

    .van-image.left{
      width: 107rem;
      height: 144rem;
      margin-left: 10rem;
    }

    .right{
      display: flex;
      flex-direction: column;

    }
  }
}
</style>