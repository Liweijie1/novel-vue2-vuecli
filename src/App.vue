<template>
  <div id="app">
    <transition name="xxx">
      <router-view class="router" />
    </transition>
    <van-tabbar v-model="active" route v-if="$route.meta.showNav">
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

<style lang="less">
#app {
  width: 100vw;
  overflow: hidden;
  font-size: 16rem;
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

  .xxx-enter-active,
  .xxx-leave-active {
    position: absolute;
    transition: all 0.3s;
  }

  .xxx-enter {
    transform: translateX(100%);
  }
  .xxx-enter-to,
  .xxx-leave {
    transform: translateX(0%);
  }

  .xxx-leave-to {
    transform: translateX(-100%);
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
      users: JSON.parse(localStorage.getItem("users")),
      token: JSON.parse(localStorage.getItem("token")),
      shelf: JSON.parse(localStorage.getItem("shelf")),
      readHistory: JSON.parse(localStorage.getItem("readHistory")),
      contentStyle: JSON.parse(localStorage.getItem("contentStyle")),
      routerChangeCount: JSON.parse(localStorage.getItem("contentStyle")),
    };
  },

  created() {
    if (!this.users) {
      localStorage.setItem("users", JSON.stringify(["游客_87399865"]));
    }
    if (!this.token) {
      localStorage.setItem("token", JSON.stringify("游客_87399865"));
    }
    if (!this.routerChangeCount) {
      localStorage.setItem("routerChangeCount", JSON.stringify(1));
    }
    if (!this.readHistory) {
      localStorage.setItem("readHistory", JSON.stringify([]));
    }
    if (!this.shelf) {
      localStorage.setItem(
        "shelf",
        JSON.stringify([
          {
            游客_87399865: [
              "bd_750bc41317254264ad384f5234c5bb78_4",
              "ts_02fa18a19aef4d86a890ab864c40493e_4",
            ],
          },
        ])
      );
    }
    if (!this.contentStyle) {
      localStorage.setItem(
        "contentStyle",
        JSON.stringify(["dayTime", "21", "#f7f3f7"])
      );
    }
  },
};
</script>
