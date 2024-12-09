<template>
  <div class="classificationItem" @click="gotoClassification">
    <div class="title">{{ cateName }}</div>
    <van-image :src="imageUrl" fit="cover" radius="5rem" />
  </div>
</template>

<script>
export default {
  props: ["cateId", "cateName", "sex"],
  data() {
    return {
      imageUrl: "/assets/catId" + this.cateId + ".png",
    };
  },
  methods: {
    gotoClassification() {
      if (this.sex == "female") {
        this.$router.push({
          path: "/female-classification",
          query: {
            catId: this.cateId,
            bookStatus: 0,
            page: 1,
          },
        });
      } else {
        this.$router.push({
          path: "/male-classification",
          query: {
            catId: this.cateId,
            bookStatus: 0,
            page: 1,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.classificationItem {
  width: 112rem;
  height: 135rem;
  background: #f5f5f5;
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .van-image {
    width: 60rem;
    height: 85rem;
  }
}
</style>