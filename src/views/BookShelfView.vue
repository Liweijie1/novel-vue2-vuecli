<template>
  <div class="bookShelf">
    <header>
      <van-image class="box" src="/assets/icon_shelf_read_time.png" />
      <div class="time">本周已阅读<span>30</span>分钟</div>
      <div class="reward">
        <span>兑奖励</span>
        <van-image src="/assets/icon_home_top_right.png" />
      </div>
      <van-image class="book" src="/assets/icon_read_history.png" />
      <van-image class="magnifier" src="/assets/icon_search.png" />
    </header>

    <van-swipe class="my-swipe" :autoplay="30000" indicator-color="white">
      <van-swipe-item v-for="item in swipeList" :key="item.id">
        <van-image :src="item.cover" />
        <div class="text">
          <div class="bookName van-ellipsis">{{ item.title }}</div>
          <div class="content van-multi-ellipsis--l2">{{ item.content }}</div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="edit" @click="isEditing = !isEditing">
      <span v-if="!isEditing">编辑</span>
      <span v-else>取消</span>
    </div>

    <section class="books">
      <ShelfBookItem
        class="book"
        :class="{ isEditing: isEditing }"
        v-for="item in bookList"
        :key="item"
        :bookId="item"
        :isEditing="isEditing"
        @refash-book-list="refash"
      ></ShelfBookItem>
    </section>
  </div>
</template>

<script>
import ShelfBookItem from "@/components/ShelfBookItem.vue";
import { getBookCity } from "@/api/index.js";
export default {
  data() {
    return {
      swipeList: [],
      token: JSON.parse(localStorage.getItem("token")),
      shelf: JSON.parse(localStorage.getItem("shelf")),
      bookList: [],
      isEditing: false,
    };
  },
  components: {
    ShelfBookItem,
  },
  methods: {
    refash() {
      this.shelf=JSON.parse(localStorage.getItem("shelf"))
      const userShelf = this.shelf.find((obj) => {
        return this.token in obj;
      });
      this.bookList = userShelf[this.token];
    },
  },
  created() {
    getBookCity().then((res) => {
      this.swipeList = res.data.list.slice(22, 24);
    });
    const userShelf = this.shelf.find((obj) => {
      return this.token in obj;
    });
    this.bookList = userShelf[this.token];
  },
};
</script>

<style lang="less" >
.bookShelf {
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 50rem;
  background-color: #f7f7f7;
  header {
    width: 100%;
    height: 50rem;
    background: white;
    display: flex;
    align-items: center;
    .box {
      width: 25rem;
      height: 25rem;
      margin-left: 15rem;
    }
    .time {
      font-size: 14rem;
      margin-left: 12rem;
      span {
        color: #fc9b57;
        font-size: 16rem;
        font-weight: 600;
      }
    }
    .reward {
      width: 70rem;
      height: 20rem;
      margin-left: 6rem;
      border: 1px solid #fc9b57;
      border-radius: 22rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        color: #fc9b57;
        font-size: 14rem;
      }
      .van-image {
        width: 10rem;
        height: 10rem;
      }
    }
    .book {
      width: 22rem;
      height: 22rem;
      margin-left: 42rem;
    }
    .magnifier {
      width: 22rem;
      height: 22rem;
      margin-left: 16rem;
    }
  }

  .my-swipe .van-swipe-item {
    height: 155rem;
    position: relative;
    .van-image {
      width: 80rem;
      height: 112rem;
      border-radius: 5rem;
      position: absolute;
      top: 20rem;
      left: 10rem;
      z-index: 2;
    }
    .text {
      width: 333rem;
      height: 100rem;
      padding: 15rem 5rem 0 75rem;
      box-sizing: border-box;
      background: white;
      box-shadow: 1rem 1rem 10rem rgba(255, 255, 255, 0.421);
      position: absolute;
      top: 45rem;
      left: 25rem;
      .bookName {
        font-size: 14rem;
        margin-bottom: 12rem;
      }
      .content {
        font-size: 12rem;
        color: #a4adbe;
      }
    }
  }

  .edit {
    height: 46rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
      font-size: 12rem;
      color: #508ffb;
      margin-right: 10rem;
    }
  }

  .books {
    width: 100vw;
    padding: 0 10rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;

    .book {
      &:nth-child(3n) {
        margin: 0;
      }
      &.isEditing {
        .cover {
          opacity: 0.5;
        }
        .del {
          display: block;
        }
      }
    }
  }
}
</style>
