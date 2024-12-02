<template>
  <div
    class="bestSellingItem"
    lazy-load
    :bookId="bookId"
    @click="gotoBookDetail"
  >
    <van-image
      fit="cover"
      radius="5rem"
      width="78rem"
      height="110rem"
      :src="imgUrl"
      @error="handleError"
    />
    <div class="bookName van-ellipsis">{{ title }}</div>
    <div class="author van-ellipsis">{{ author }}</div>
  </div>
</template>

<script>
export default {
  props: ["bookId", "img", "title", "author"],
  data(){
    return{
      imgUrl: this.img, 
      defaultImg: "/assets/default.png" 
    }
  },
  methods: {
    gotoBookDetail() {
      this.$router.push({
        path: "/book-detail",
        query: {
          bookId: this.bookId,
        },
      });
    },
    handleError() {
      this.imgUrl = this.defaultImg;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.bestSellingItem {
  width: 78rem;
  .van-image {
    width: 78rem;
    height: 110rem;
    border-radius: 5rem;
  }
  .bookName {
    font-size: 16rem;
    margin: 10px 0;
  }
  .author {
    font-size: 12rem;
    color: #85949e;
  }
}
</style>