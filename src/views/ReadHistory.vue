<template>
  <div class="readHistory">
    <van-nav-bar title="阅读历史">
      <template #left>
        <van-image
          class="back"
          src="/assets/icon_back.png"
          @click="$router.back()"
        />
      </template>
    </van-nav-bar>
    <section class="books">
      <ReadHistoryItem
        class="book"
        v-for="item in readHistory"
        :key="item"
        :bookId="item"
        @refash-book-list="refash"
      ></ReadHistoryItem>
    </section>
  </div>
</template>

<script>
import ReadHistoryItem from "@/components/ReadHistoryItem.vue";
export default {
  data() {
    return {
      readHistory: JSON.parse(localStorage.getItem("readHistory")),
    };
  },
  components: {
    ReadHistoryItem,
  },
  methods: {
    refash() {
      this.readHistory = JSON.parse(localStorage.getItem("readHistory"));
    },
  },

  created() {
  },
};
</script>

<style lang="less" scoped>
.readHistory {
  width: 100vw;
  .van-nav-bar {
    height: 50rem;
    font-size: 18rem;
    .back {
      width: 12rem;
      height: 20rem;
    }
  }
}
</style>