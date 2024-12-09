<template>
  <div class="bookCity">
    <header>
      <nav>
        <router-link :class="{active : this.$route.path == '/male-channel'}" class="male" to="/male-channel">男频</router-link>
        <router-link :class="{active : this.$route.path == '/female-channel'}" class="female" to="/female-channel">女频</router-link>
      </nav>
      <div class="search" @click="gotoSearch">
        <span>搜索书籍</span>
        <van-image class="magnifier" src="/assets/icon_book_city_search.png" />
      </div>
    </header>
    <transition name="xxx">
      <router-view class="router" />
    </transition>
  </div>
</template>

<script>
export default {
  methods:{
    gotoSearch(){
      this.$router.push({
        path:"/search"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.bookCity {
  width: 100vw;
  margin-bottom: 60px;
  padding-top: 50rem;
  header {
    width: 100vw;
    height: 50rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
    position: fixed;
    top: 0;
    z-index: 2;
    .male,
    .female {
      font-size: 18rem;
      font-weight: 600;
      position: relative;
      &:link{
        color: #000;
      }
      &:hover{
        color: #000;
      }
      &:visited{
        color: #000;
      }
      &::active{
        color: #000;
      }
      &.active::after{
        content:"";
        width: 18rem;
        height: 6rem;
        background: url('@/assets/icon_book_city_tab.png');
        background-size: cover;
        background-position: 100%;
        display: block;
        position: absolute;
        left: 5rem;
        bottom: -10rem;
      }
    }

    .male{
      margin-right: 19rem;
    }

    .search {
      width: 226rem;
      height: 30rem;
      border-radius: 36rem;
      border: none;
      box-shadow: 0rem 0rem 3rem rgb(169, 169, 169);
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        color: #D4D4D4;
        font-size: 12rem;
        margin-left: 15rem;
      }
      .magnifier{
        width: 15rem;
        height: 15rem;
        margin-right: 15rem;
      }
    }
  }
  .xxx-enter-active,
  .xxx-leave-active {
    transition: all 0.5s;
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
