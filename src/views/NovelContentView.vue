<template>
  <div class="novelContent">novelContent</div>
</template>

<script>
import { getBookInfo, getChapterContent } from "@/api/index.js";
export default {
  data(){
    return {
      book:null,
      bookCoverImage:null,
      bookTitle:null,
      bookAuthor:null,
      bookCatalogNum:null,
      bookFirstChapterId:null,
      bookSecondChapterId:null,
      bookThirdChapterId:null,
    }
  },
  created(){
    getBookInfo(this.$route.query.bookId).then((res) => {
      this.book = res.data.data.book;
      this.bookCoverImage = this.book.coverImage;
      this.bookTitle = this.book.title;
      this.bookAuthor = this.book.author;
      this.bookCatalogNum = res.data.data.catalog.length + 1;
      this.bookFirstChapterId = res.data.data.catalog[0].uuid;
      this.bookSecondChapterId = res.data.data.catalog[1].uuid;
      this.bookThirdChapterId = res.data.data.catalog[2].uuid;
      
      getChapterContent(this.$route.query.bookId, this.bookFirstChapterId).then(
        (res) => {
          this.bookFirstChapterContent = res.data.data.content;
        }
      );

    });
  }
}
</script>

<style lang="scss" scoped>

</style>