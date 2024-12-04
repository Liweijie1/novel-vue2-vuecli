<template>
  <div class="contents">
    <van-nav-bar
      title="目录"
      :right-text="activeRangeText"
      left-arrow
      @click-left="$router.back()"
      @click-right="showPopup"
    />
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: '50%', top: '45rem' }"
      :overlay-style="{ top: '45rem', backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
    >
      <ul class="catalogListBox" v-if="catalog.length">
        <li
          class="catalogList"
          v-for="(range, index) in ranges"
          :key="index"
          @click="selectRange(range)"
          :class="{ selected: index === selectedRangeIndex }"
        >
          {{ range.start }} - {{ range.end }}
        </li>
      </ul>
    </van-popup>
    <div class="content" v-if="catalog.length != 0">
      <ul v-if="isSelect">
        <li
          v-for="number in currentRange"
          :key="number"
          @click="gotoContentsView(catalog[number - 1].secId)"
        >
          {{ catalog[number - 1].title }}
        </li>
      </ul>
      <ul v-else>
        <li
          v-for="number in defaultRange"
          :key="number"
          @click="gotoContentsView(catalog[number - 1].secId)"
        >
          {{ catalog[number - 1].title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBookInfo } from "@/api/index.js";
export default {
  data() {
    return {
      show: false,
      catalog: [],
      catalogArr: [],
      catalogTotal: null,
      interval: 99,
      currentCatalog: null,
      currentRange: [],
      isSelect: false,
      activeRangeText: "1-100 V",
      selectedRangeIndex: 0,
    };
  },
  computed: {
    ranges() {
      let ranges = [];
      let start = 1;
      while (start <= this.catalogTotal) {
        let end = start + this.interval;
        if (end > this.catalogTotal) {
          end = this.catalogTotal;
        }
        ranges.push({ start, end });
        start = end + 1;
      }
      return ranges;
    },
    defaultRange() {
      return Array.from(
        { length: this.ranges[0].end },
        (_, index) => index + 1
      );
    },
  },
  watch:{
    ranges(){
      this.activeRangeText = "1-" + this.ranges[0].end + "V"
    }
  },
  methods: {
    showPopup() {
      this.show = !this.show;
    },
    selectRange(range) {
      this.isSelect = true;
      this.currentRange = [];
      for (let i = range.start; i <= range.end; i++) {
        this.currentRange.push(i);
      }
      this.show = false;
      this.activeRangeText = `${range.start}-${range.end} V`;
      this.selectedRangeIndex = this.ranges.indexOf(range);
    },
    gotoContentsView(id) {
      this.$router.push({
        path: "/novel-content",
        query: {
          bookId: this.$route.query.bookId,
          catalogId: id,
        },
      });
    },
  },
  created() {
    getBookInfo(this.$route.query.bookId).then((res) => {
      this.catalog = res.data.data.catalog;
      this.catalogTotal = this.catalog.length;
      console.log(res.data.data);
    });
    
  },
  
};
</script>

<style lang="less">
.contents {
  .van-nav-bar {
    height: 45rem;
    .van-nav-bar__arrow {
      color: #000;
      font-size: 24rem;
    }
    .van-nav-bar__title {
      color: #000;
      font-size: 18rem;
    }
    .van-nav-bar__text {
      color: #000;
      font-size: 12rem;
    }
  }

  .van-popup {
    .catalogListBox {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      font-size: 12rem;
      .catalogList {
        width: 100rem;
        height: 30rem;
        background: #f6f7fa;
        margin-top: 20rem;
        line-height: 30rem;
        text-align: center;
        &.selected {
          background-color: #fcdd22;
          color: white;
        }
      }
    }
  }

  .content {
    ul {
      li {
        font-size: 12rem;
        margin-top: 20rem;
        padding-left: 12rem;
      }
    }
  }
}
</style>