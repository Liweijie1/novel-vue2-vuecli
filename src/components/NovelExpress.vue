<template>
  <div class="novelExpress">
    <div
      class="top"
      @click="gotoBookDetail(novelExpress[0].id)"
      v-if="novelExpress.length > 0"
    >
      <van-image
        fit="cover"
        radius="5rem"
        :src="topImage"
        @error="handleError(0)"
      />
      <div class="right">
        <div class="title">
          {{ novelExpress[0].title }}
        </div>
        <div class="content van-multi-ellipsis--l2">
          {{ novelExpress[0].content }}
        </div>
        <div class="author">
          {{ novelExpress[0].author }}
        </div>
      </div>
    </div>
    <div class="bottom">
      <div
        class="book"
        v-for="(item, index) in bottomArr"
        :key="item.id"
        @click="gotoBookDetail(bottomArr[index].id)"
      >
        <van-image
          fit="cover"
          radius="5rem"
          :src="bottomArr[index].imageSrc"
          @error="handleError(index + 1)"
        />
        <div class="title van-ellipsis">
          {{ bottomArr[index].title }}
        </div>
        <div class="author">
          {{ bottomArr[index].author }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["novelExpress"],
  data() {
    return {
      bottomArr: this.novelExpress.slice(1, 4).map(item => ({
        ...item,
        imageSrc: item.cover
      })),
      topImage: this.novelExpress.length > 0 ? this.novelExpress[0].cover : '/assets/default.png',
      defaultImg: "/assets/default.png",
    };
  },
  methods: {
    gotoBookDetail(bookId) {
      this.$router.push({
        path: "/book-detail",
        query: {
          bookId,
        },
      });
    },
    handleError(index) {
      let item = index === 0 ? this.novelExpress[0] : this.bottomArr[index - 1];
      item.imageSrc = this.defaultImg;
    },
  },
  watch: {
    novelExpress() {
      this.bottomArr = this.novelExpress.slice(1, 4).map(item => ({
        ...item,
        imageSrc: item.cover
      }));
      if (this.novelExpress.length > 0) {
        this.topImage = this.novelExpress[0].cover;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.novelExpress {
  width: 350rem;
  margin: 0 auto 16rem;
  .top {
    width: 100%;
    height: 120rem;
    display: flex;
    flex-wrap: nowrap;
    .van-image {
      width: 81rem;
      height: 113rem;
      align-self: flex-end;
    }
    .right {
      width: 269rem;
      height: 107rem;
      background: #f5f7fc;
      align-self: flex-end;
      padding-left: 6rem;
      .title {
        margin-top: 8rem;
        font-size: 14rem;
        font-weight: 600;
      }
      .content {
        margin-top: 13rem;
        color: #8696a0;
        font-size: 12rem;
        text-indent: 1em;
      }
      .author {
        margin-top: 13rem;
        color: #8696a0;
        font-size: 12rem;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 200rem;
    padding-top: 10rem;
    display: flex;
    justify-content: space-between;
    .book {
      width: 98rem;
      .van-image {
        width: 100%;
        height: 135rem;
      }
      .title {
        margin-top: 12rem;
        font-size: 14rem;
      }
      .author {
        margin-top: 10rem;
        color: #8696a0;
        font-size: 12rem;
      }
    }
  }
}
</style>