<template>
  <div
    class="excellentBookItem"
    lazy-load
    :bookId="bookId"
    @click="gotoBookDetail"
  >
    <van-image fit="cover" radius="5rem" :src="imgUrl" @error="handleError" />
    <div class="right">
      <div class="title van-ellipsis">
        {{ title }}
      </div>
      <div class="content van-multi-ellipsis--l2">
        {{ content }}
      </div>
      <div class="author van-ellipsis">
        {{ author }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bookId", "img", "content", "title", "author"],
  data() {
    return {
      imgUrl: this.img,
      defaultImg: "/assets/default.png",
    };
  },
  
  methods: {
    gotoBookDetail() {
      this.$router.push({
        path: "/book-detail",
        query: {
          bookId: this.bookId,
        },
      });
      console.log(123);
    },
    handleError() {
      this.imgUrl = this.defaultImg;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.excellentBookItem {
  width: 350rem;
  height: 93rem;
  margin: 15rem auto;
  display: flex;
  flex-wrap: nowrap;
  .van-image {
    width: 67rem;
    height: 100%;
  }
  .right {
    width: 283rem;
    height: 100%;
    padding-left: 10rem;
    .title {
      font-size: 14rem;
      font-weight: 600;
    }
    .content {
      margin-top: 12rem;
      color: #8696a0;
      font-size: 12rem;
      text-indent: 1em;
    }
    .author {
      margin-top: 12rem;
      color: #8696a0;
      font-size: 12rem;
    }
  }
}
</style>