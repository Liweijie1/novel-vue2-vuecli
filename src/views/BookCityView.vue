<template>
  <div class="bookCity">
    <header>
      <div class="man">男频</div>
      <div class="woman">女频</div>
      <input type="text" />
    </header>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
    </van-swipe>

    <van-grid :border="false" :column-num="4">
      <van-grid-item text="榜单">
        <van-image
          width="50"
          height="50"
          :src="require('@/assets/icon_city_ranking.png')"
        />
        
      </van-grid-item>
      <van-grid-item text="完结">
        <van-image
          width="50"
          height="50"
          :src="require('@/assets/icon_city_update.png')"
        />
      </van-grid-item>
      <van-grid-item text="连载">
        <van-image
          width="50"
          height="50"
          :src="require('@/assets/icon_city_finish.png')"
        />
      </van-grid-item>
      <van-grid-item text="书库">
        <van-image
          width="50"
          height="50"
          :src="require('@/assets/icon_city_library.png')"
        />
      </van-grid-item>
    </van-grid>

    <TabBar>
      <template #left>畅销佳作</template>
      <template #right>更多 ></template>
    </TabBar>

    <van-grid>
      <van-grid-item :icon="require('@/assets/icon_city_ranking.png')" text="文字" />
      <van-grid-item icon="/assets/icon_book_city.png" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>

    <MostPopular></MostPopular>

    <van-grid :border="false" :column-num="4" :gutter="10">
      <van-grid-item>
        <van-image
          width="78rem"
          height="110rem"
          :src="require('@/assets/icon_city_ranking.png')"
        />
        <div class="van-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略</div>
      </van-grid-item>
      <van-grid-item>
        <van-image
          width="78rem"
          height="110rem"
          :src="require('@/assets/icon_city_update.png')"
        />
      </van-grid-item>
      <van-grid-item>
        <van-image
          width="78rem"
          height="110rem"
          :src="require('@/assets/icon_city_finish.png')"
        />
      </van-grid-item>
      <van-grid-item>
        <van-image
          width="78rem"
          height="110rem"
          :src="require('@/assets/icon_city_library.png')"
        />
      </van-grid-item>
    </van-grid>

    <hr />
    <van-grid>
      <van-grid-item :icon="require('@/assets/icon_city_ranking.png')" text="文字" />
      <van-grid-item icon="/assets/icon_book_city.png" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    
  </div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";
import MostPopular from "@/components/MostPopular.vue";
import { getBookCity } from "@/api/index.js";
export default {
  data() {
    return {
      getBookCityOne: [],
    };
  },
  components: {
    TabBar,
    MostPopular,
  },
  created() {
    getBookCity().then((res) => {
      console.log(res);
    });
  },
};
</script>

<style lang="scss" scoped>
.bookCity {
  margin-bottom: 60px;
  header {
    height: 50rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .man,
    .woman {
      font-size: 18rem;
      font-weight: 600;
    }

    input {
      width: 226rem;
      height: 30rem;
      border-radius: 36rem;
      border: none;
      box-shadow: 0rem 0rem 3rem rgb(169, 169, 169);
    }
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20rem;
    line-height: 150rem;
    text-align: center;
    background-color: #39a9ed;
  }
  .van-grid-item__content {
    padding: 0;
  }
}
</style>
