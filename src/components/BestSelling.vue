<template>
  <div class="bestSelling">
    <BestSellingItem
      v-for="item in bestSelling.splice(0,4)"
      :key="item.id"
      :bookId="item.id"
      :img="item.cover"
      :title="item.title"
      :author="item.author"
    ></BestSellingItem>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BestSellingItem from "@/components/BestSellingItem.vue";
export default {
  computed: {
    ...mapGetters(["bestSelling"]),
  },
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