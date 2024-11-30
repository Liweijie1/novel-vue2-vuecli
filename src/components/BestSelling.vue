<template>
  <div class="bestSelling">
    <BestSellingItem
      v-for="item in bestSelling"
      :key="item.id"
      :bookId="item.id"
      :img="item.cover"
      :title="item.title"
      :author="item.author"
    ></BestSellingItem>
  </div>
</template>

<script>
import BestSellingItem from "@/components/BestSellingItem.vue";
export default {
  props:["bestSelling"],
  components: {
    BestSellingItem,
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.bestSelling {
  display: flex;
  justify-content: space-around;
  align-content: center;
}
</style>