<template>
  <div class="novelContent">
    <div class="top" v-if="isShow">
      <van-image
        src="/assets/back_lanse.png"
        @click="$router.back()"
      />
      <span></span>
    </div>
    <div class="content" v-html="currentCatalogContent" @click="isShow = !isShow"></div>
  </div>
</template>

<script>
import { getChapterContent } from "@/api/index.js";
export default {
  data() {
    return {
      isShow:false,
      currentCatalogContent: null,
    };
  },
  created() {
    getChapterContent(
      this.$route.query.bookId,
      this.$route.query.catalogId
    ).then((res) => {
      if (res.data.successful) {
        this.currentCatalogContent = res.data.data.content;
      } else {
        this.currentCatalogContent = "<h1>付费章节,请充值</h1>";
      }
    });
  },
};
</script>

<style lang="less">
.novelContent {
  width: 100vw;
  position: relative;
  .top{
    width: 100vw;
    height: 55rem;
    background: white;
    display: flex;
    align-items: center;
    position: fixed;
    .van-image{
      width: 8rem;
      height: 16rem;
      margin-left: 24rem;
    }
  }
  .content {
    padding-top: 55rem;
    background: #f7f3f7;
    h1 {
      font-size: 24rem;
      text-align: center;
    }
    p {
      color: #313431;
      font-size: 21rem;
      text-indent: 2em;
    }
  }
}
</style>