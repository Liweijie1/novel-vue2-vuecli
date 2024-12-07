<template>
  <div class="fourTypes">
    <div class="type">
      <van-image
        src="/assets/icon_city_ranking.png"
        @click="gotoCharts"
        fit="cover"
      />
      <div>榜单</div>
    </div>
    <div class="type">
      <van-image src="/assets/icon_city_update.png" fit="cover" />
      <div>完结</div>
    </div>
    <div class="type">
      <van-image src="/assets/icon_city_finish.png" fit="cover" />
      <div>连载</div>
    </div>
    <div class="type">
      <van-image src="/assets/icon_city_library.png" fit="cover" />
      <div>书库</div>
    </div>
  </div>
</template>

<script>
export default {
  props:["male"],
  methods: {
    gotoCharts() {
      if (this.male) {
        this.$router.push({
          path: "/male-chart",
        });
      }else{
        this.$router.push({
          path: "/female-chart",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fourTypes {
  margin-top: 10rem;
  display: flex;
  justify-content: space-around;
  .type {
    .van-image {
      width: 50rem;
      height: 50rem;
    }
    div {
      font-size: 14px;
      color: #666666;
    }
  }
}
</style>