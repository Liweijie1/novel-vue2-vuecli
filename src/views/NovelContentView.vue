<template>
  <div class="novelContent">
    <div class="top" v-if="isTopAndBottonShow">
      <van-image src="/assets/back_lanse.png" @click="$router.back()" />
      <span>{{ bookTitle }}</span>
    </div>
    <div
      class="content"
      v-html="currentCatalogContent"
      @click="isTopAndBottonShow = !isTopAndBottonShow"
    ></div>
    <div class="bottom" v-if="isTopAndBottonShow">
      <div class="text">
        <span @click="prevItem">上一章</span>
        <span @click="nextItem">下一章</span>
      </div>
      <ul class="btn">
        <li>
          <van-image src="/assets/chapterlist.png" @click="showPopup" />
          <span>目录</span>
        </li>
        <li>
          <van-image src="/assets/night.png" />
          <span>夜间</span>
        </li>
        <li>
          <van-image src="/assets/setting.png" />
          <span>设置</span>
        </li>
        <li>
          <van-image src="/assets/moremenu.png" />
          <span>更多</span>
        </li>
      </ul>
    </div>
    <van-popup v-model="isLeftShow" position="left">
      <section class="info">
        <van-image
          class="left"
          fit="cover"
          :src="bookCoverImage"
          @error="handleError"
        />
        <div class="right">
          <div class="bookTitle van-ellipsis">{{ bookTitle }}</div>
          <div class="bookAuthor van-ellipsis">作者：{{ bookAuthor }}</div>
          <div class="bookTotalCount van-ellipsis">
            连载至{{ bookCatalogNum }}章
          </div>
        </div>
      </section>
      <section class="bar">
        <span>章节</span>
        <span @click="showContentsPopup">{{ activeRangeText }}</span>
      </section>
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '485rem', bottom: '0rem' }"
        :overlay-style="{
          bottom: '45rem',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }"
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
      <div class="contents" v-if="catalog.length != 0">
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
            @click="
              gotoContentsView(
                catalog[number - 1].secId,
                catalog[number - 1].needPay
              )
            "
          >
            {{ catalog[number - 1].title }}
            <van-image
              class="closeread"
              src="/assets/closeread.png"
              v-if="catalog[number - 1].needPay"
            />
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getBookInfo, getChapterContent } from "@/api/index.js";
export default {
  data() {
    return {
      bookId: this.$route.query.bookId,
      catalogId: this.$route.query.catalogId,
      isTopAndBottonShow: false,
      isLeftShow: false,
      currentCatalogContent: null,
      book: null,
      bookCoverImage: null,
      bookTitle: null,
      bookAuthor: null,
      bookCatalogNum: null,
      bookCatalog: null,
      defaultImg: "/assets/default.png",
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
      catalogIdList: [],
      currentCatalogIdIndex: 0,
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
  watch: {
    ranges() {
      this.activeRangeText = "1-" + this.ranges[0].end + "V";
    },
    catalogId() {
      getChapterContent(this.bookId, this.catalogId).then((res) => {
        if (res.data.successful) {
          this.currentCatalogContent = res.data.data.content;
        } else {
          this.currentCatalogContent = "<h1>付费章节,请充值</h1>";
        }
      });
    },
  },
  methods: {
    showPopup() {
      this.isTopAndBottonShow = false;
      this.isLeftShow = true;
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
    showContentsPopup() {
      this.show = !this.show;
    },
    handleError() {
      this.bookCoverImage = this.defaultImg;
    },
    gotoContentsView(id, needPay) {
      if (needPay) {
        Toast("付费内容,请先充值");
      } else {
        this.catalogId = id;
        this.isLeftShow = false;
      }
    },
    prevItem() {
      this.currentCatalogIdIndex = this.catalogIdList.indexOf(this.catalogId);
      if (this.currentCatalogIdIndex > 0) {
        this.currentCatalogIdIndex--;
        this.catalogId = this.catalogIdList[this.currentCatalogIdIndex];
      } else {
        Toast("没有上一章了");
      }
    },
    nextItem() {
      this.currentCatalogIdIndex = this.catalogIdList.indexOf(this.catalogId);
      if (this.currentCatalogIdIndex < this.catalogIdList.length - 1) {
        this.currentCatalogIdIndex++;
        this.catalogId = this.catalogIdList[this.currentCatalogIdIndex];
      } else {
        Toast("付费内容,请先充值");
      }
    },
  },
  created() {
    getChapterContent(this.bookId, this.catalogId).then((res) => {
      if (res.data.successful) {
        this.currentCatalogContent = res.data.data.content;
      } else {
        this.currentCatalogContent = "<h1>付费章节,请充值</h1>";
      }
    });

    getBookInfo(this.bookId).then((res) => {
      this.book = res.data.data.book;
      this.bookCoverImage = this.book.coverImage;
      this.bookTitle = this.book.title;
      this.bookAuthor = this.book.author;
      this.bookCatalogNum = res.data.data.catalog.length + 1;
      this.catalog = res.data.data.catalog;
      this.catalogTotal = this.catalog.length;
      this.catalogIdList = this.catalog.map((o) => o.secId);
    });
  },
};
</script>

<style lang="less">
.novelContent {
  width: 100vw;
  position: relative;
  .top {
    width: 100vw;
    height: 55rem;
    background: white;
    display: flex;
    align-items: center;
    position: fixed;
    .van-image {
      width: 8rem;
      height: 16rem;
      margin-left: 24rem;
    }
    span {
      font-size: 16rem;
      font-weight: 600;
      margin-left: 40rem;
    }
  }
  .content {
    padding-top: 55rem;
    background: #f7f3f7;
    h1 {
      font-size: 24rem;
      text-align: center;
    }
    p {
      color: #313431;
      font-size: 21rem;
      text-indent: 2em;
    }
  }
  .bottom {
    width: 100%;
    height: 132rem;
    background: white;
    position: fixed;
    bottom: 0;

    .text {
      width: 100%;
      height: 60rem;
      padding: 0 18rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      span {
        line-height: 60rem;
      }
    }

    .btn {
      width: 100%;
      height: 72rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        width: 30rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .van-image {
          width: 30rem;
          height: 30rem;
          margin-bottom: 5rem;
        }
        span {
          font-size: 14rem;
        }
      }
    }
  }
  .van-popup {
    width: 312rem;
    height: 100vh;
    position: fixed;
    .info {
      width: 290rem;
      height: 100rem;
      margin: 20rem 10rem;
      display: flex;

      .van-image.left {
        width: 70rem;
        height: 100rem;
      }

      .right {
        margin-left: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 14rem;
        .bookAuthor,
        .bookTotalCount {
          color: #676767;
        }
      }
    }
    .bar {
      height: 40rem;
      background: #f6f7fa;
      font-size: 12rem;
      padding: 0 10rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .contents {
      ul {
        li {
          font-size: 14rem;
          padding: 15rem 10rem;
          position: relative;
          .closeread {
            width: 12rem;
            height: 14rem;
            position: absolute;
            right: 10rem;
          }
        }
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
          width: 85rem;
          height: 28rem;
          background: #f6f7fa;
          color: #707070;
          margin-top: 20rem;
          line-height: 30rem;
          text-align: center;
          border-radius: 5rem;
          &.selected {
            background-color: #0096ff;
            color: white;
          }
        }
      }
    }
  }
}
</style>