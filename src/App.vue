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
body{
  font-size: 16px;
}
</style>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        bookShelfActive: require("@/assets/icon_book_shelf_select.png"),
        bookShelfInactive: require("@/assets/icon_book_shelf.png"),
        bookCityActive: require("@/assets/icon_book_city_select.png"),
        bookCityInactive: require("@/assets/icon_book_city.png"),
        benefitActive: require("@/assets/icon_task_select.png"),
        benefitInactive: require("@/assets/icon_task.png"),
        myActive: require("@/assets/icon_mine_select.png"),
        myInactive: require("@/assets/icon_mine.png"),
      },
    };
  },
};
</script>
