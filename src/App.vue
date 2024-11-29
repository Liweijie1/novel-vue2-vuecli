<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/book-shelf">
        <span>书架</span>
        <template #icon="props">
          <img
            :src="props.active ? icon.bookShelfActive : icon.bookShelfInactive"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/book-city">
        <span>书城</span>
        <template #icon="props">
          <img
            :src="props.active ? icon.bookCityActive : icon.bookCityInactive"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/benefit">
        <span>福利</span>
        <template #icon="props">
          <img
            :src="props.active ? icon.benefitActive : icon.benefitInactive"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon.myActive : icon.myInactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
body {
  font-size: 16rem;
  padding-bottom: 50rem;
  .van-tabbar {
    height: 50rem;
    .van-tabbar-item {
      span {
        font-size: 12rem;
      }
      img {
        width: 20rem;
        height: 20rem;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        bookShelfActive: "/assets/icon_book_shelf_select.png",
        bookShelfInactive: "/assets/icon_book_shelf.png",
        bookCityActive: "/assets/icon_book_city_select.png",
        bookCityInactive: "/assets/icon_book_city.png",
        benefitActive: "/assets/icon_task_select.png",
        benefitInactive: "/assets/icon_task.png",
        myActive: "/assets/icon_mine_select.png",
        myInactive: "/assets/icon_mine.png",
      },
    };
  },
};
</script>
