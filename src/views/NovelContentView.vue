<template>
  <div class="novelContent" :class="{ night: this.contentTheme == 'night' }">
    <div class="top" v-if="isTopAndBottonShow">
      <van-image
        v-if="this.contentTheme == 'dayTime'"
        src="/assets/back_lanse.png"
        @click="back"
      />
      <van-image v-else src="/assets/night_back.png" @click="back" />
      <span>{{ bookTitle }}</span>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div
        class="content"
        v-html="currentCatalogContent"
        :style="{
          fontSize: contentFontSize + 'rem',
          background: contentColor,
        }"
        @click="isTopAndBottonShow = !isTopAndBottonShow"
      ></div>
    </van-pull-refresh>
    <div class="bottom" v-if="isTopAndBottonShow">
      <div class="text">
        <span @click="prevItem">上一章</span>
        <span @click="nextItem">下一章</span>
      </div>
      <ul class="btn">
        <li @click="showLeftPopup">
          <van-image v-if="this.contentTheme == 'dayTime'" src="/assets/chapterlist.png" />
          <van-image v-else src="/assets/chapterlist_night.png" />
          <span>目录</span>
        </li>
        <li @click="setTheme">
          <van-image
            v-if="this.contentTheme == 'dayTime'"
            src="/assets/night.png"
          />
          <van-image v-else src="/assets/sun.png" />
          <span v-if="this.contentTheme == 'dayTime'">夜间</span>
          <span v-else>日间</span>
        </li>
        <li @click="showBottomPopup">
          <van-image v-if="this.contentTheme == 'dayTime'" src="/assets/setting.png" />
          <van-image v-else src="/assets/setting_night.png" />
          <span>设置</span>
        </li>
        <li>
          <van-image v-if="this.contentTheme == 'dayTime'" src="/assets/moremenu.png" />
          <van-image v-else src="/assets/moremenu_setting.png" />
          <span>更多</span>
        </li>
      </ul>
    </div>
    <van-popup class="leftPopup" v-model="isLeftShow" position="left">
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
            {{ range.start }}-{{ range.end }}
          </li>
        </ul>
      </van-popup>
      <div class="contents" v-if="catalog.length != 0">
        <ul v-if="isSelect">
          <li
            v-for="number in currentRange"
            :key="number"
            :class="{active: catalog[number - 1].secId == catalogId}"
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
        <ul v-else>
          <li
            v-for="number in defaultRange"
            :key="number"
            :class="{active: catalog[number - 1].secId == catalogId}"
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
    <van-popup
      class="bottomPopup"
      v-model="isBottomShow"
      position="bottom"
      :overlay-style="{
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }"
    >
      <div class="contentFontSize">
        <span>字号</span>
        <div class="del" @click="contentFontSizeDel">-</div>
        <div class="num">{{ contentFontSize }}</div>
        <div class="add" @click="contentFontSizeAdd">+</div>
        <span>字号大小</span>
      </div>

      <div class="contentBackground">
        <span>背景</span>
        <div @click="setContentColor('#F2F2F2')"></div>
        <div @click="setContentColor('#D3C2A4')"></div>
        <div @click="setContentColor('#CEEAD3')"></div>
        <div @click="setContentColor('#DBC2C9')"></div>
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
      isBottomShow: false,
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
      catalogNeedPayList: [],
      currentCatalogIdIndex: 0,
      routerChangeCount: JSON.parse(localStorage.getItem("routerChangeCount")),
      isLoading: false,
      token: JSON.parse(localStorage.getItem("token")),
      contentStyle: JSON.parse(localStorage.getItem("contentStyle")),
      contentTheme: "dayTime",
      contentFontSize: 21,
      contentColor: "f7f3f7",
      readHistory: JSON.parse(localStorage.getItem("readHistory")),
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
      this.routerChangeCount++;
      localStorage.setItem("routerChangeCount", JSON.stringify(this.routerChangeCount));
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
    showLeftPopup() {
      this.isTopAndBottonShow = false;
      this.isLeftShow = true;
    },
    showBottomPopup() {
      this.isTopAndBottonShow = false;
      this.isBottomShow = true;
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
      } else if (id == this.catalogId) {
        Toast("正在阅读当前章节");
      } else {
        this.catalogId = id;
        this.isLeftShow = false;
        this.$router.push({
          push: "/novel-content",
          query: {
            bookId: this.bookId,
            catalogId: this.catalogId,
          },
        });
      }
    },
    prevItem() {
      this.currentCatalogIdIndex = this.catalogIdList.indexOf(this.catalogId);
      if (this.currentCatalogIdIndex > 0) {
        if (!this.catalogNeedPayList[this.currentCatalogIdIndex - 1]) {
          this.currentCatalogIdIndex--;
          this.catalogId = this.catalogIdList[this.currentCatalogIdIndex];
          this.$router.push({
            push: "/novel-content",
            query: {
              bookId: this.bookId,
              catalogId: this.catalogId,
            },
          });
        } else {
          Toast("付费内容,请先充值");
        }
      } else {
        Toast("没有上一章了");
      }
    },
    nextItem() {
      this.currentCatalogIdIndex = this.catalogIdList.indexOf(this.catalogId);
      if (this.currentCatalogIdIndex < this.catalogIdList.length - 1) {
        if (!this.catalogNeedPayList[this.currentCatalogIdIndex + 1]) {
          this.currentCatalogIdIndex++;
          this.catalogId = this.catalogIdList[this.currentCatalogIdIndex];
          this.$router.push({
            push: "/novel-content",
            query: {
              bookId: this.bookId,
              catalogId: this.catalogId,
            },
          });
        } else {
          Toast("付费内容,请先充值");
        }
      } else {
        Toast("已经是最新章节了");
      }
    },
    back() {
      this.$router.go(-this.routerChangeCount);
      this.routerChangeCount = 1
      localStorage.setItem("routerChangeCount", JSON.stringify(this.routerChangeCount));
    },
    onRefresh() {
      this.prevItem();
      this.isLoading = false;
    },
    refashContentStyle() {
      this.contentStyle = JSON.parse(localStorage.getItem("contentStyle"));
      this.contentTheme = this.contentStyle[0];
      this.contentFontSize = this.contentStyle[1];
      this.contentColor = this.contentStyle[2];
    },
    setTheme() {
      if (this.contentTheme == "dayTime") {
        this.contentTheme = "night";
      } else {
        this.contentTheme = "dayTime";
      }
      localStorage.setItem("contentStyle", JSON.stringify([this.contentTheme,this.contentFontSize,this.contentColor]));
    },
    contentFontSizeAdd(){
      this.contentFontSize++
      localStorage.setItem("contentStyle", JSON.stringify([this.contentTheme,this.contentFontSize,this.contentColor]));
    },
    contentFontSizeDel(){
      this.contentFontSize--
      localStorage.setItem("contentStyle", JSON.stringify([this.contentTheme,this.contentFontSize,this.contentColor]));
    },
    setContentColor(color){
      this.contentColor = color
      localStorage.setItem("contentStyle", JSON.stringify([this.contentTheme,this.contentFontSize,this.contentColor]));
    }
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
      this.catalog = res.data.data.catalog.filter((o) => {
        if (o.leaf) {
          return o;
        }
      });
      this.catalogTotal = this.catalog.length;
      this.catalogIdList = this.catalog.map((o) => {
        return o.secId;
      });
      this.catalogNeedPayList = this.catalog.map((o) => {
        return o.needPay;
      });
    });
  
    this.refashContentStyle();

    if (!this.readHistory.includes(this.bookId)) {
        this.readHistory.push(this.bookId);
        localStorage.setItem(
          "readHistory",
          JSON.stringify(this.readHistory)
        );
      }
  },
};
</script>

<style lang="less">
.novelContent {
  width: 100vw;
  height: 100%;
  .top {
    width: 100vw;
    height: 55rem;
    background: white;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 2;
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
    width: 100vw;
    padding-top: 55rem;
    font-size: 21rem;

    h1 {
      font-size: 1.2em;
      text-align: center;
    }
    p {
      color: #313431;
      text-indent: 2em;
      padding: 0 14rem;
      box-sizing: border-box;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .bottom {
    width: 100vw;
    height: 132rem;
    background: white;
    position: fixed;
    bottom: 0;

    .text {
      width: 100vw;
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
      width: 100vw;
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
  .leftPopup {
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

    .catalogListBox {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .catalogList {
        width: 85rem;
        height: 28rem;
        line-height: 28rem;
        border-radius: 5rem;
        font-size: 12rem;
        text-align: center;
        color: #6e6e6e;
        background: #f6f7fa;
        margin-top: 12rem;
        &.selected {
          color: white;
          background: #0096ff;
        }
      }
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
          &.active{
            color: #ADADAD;
          }
        }
      }
    }

    .leftPopup {
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
  .bottomPopup {
    width: 100vw;
    height: 200rem;
    background: white;
    .contentFontSize {
      width: 100vw;
      height: 30rem;
      margin: 10rem 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 12rem;
        &:first-child {
          color: #000;
        }
        &:last-of-type {
          color: #adadaf;
        }
      }
      .del,
      .add {
        width: 88rem;
        height: 28rem;
        background: #e0e0e0;
        border-radius: 5rem;
        text-align: center;
        line-height: 28rem;
      }
      .num {
        width: 56rem;
        height: 28rem;
        text-align: center;
        line-height: 28rem;
      }
    }
    .contentBackground {
      width: 100vw;
      height: 55rem;
      display: flex;
      align-items: center;
      span {
        margin-left: 10rem;
        font-size: 12rem;
      }
      div {
        width: 38rem;
        height: 38rem;
        border-radius: 50%;
        margin-left: 30rem;
        &:nth-child(2) {
          background: #f2f2f2;
        }
        &:nth-child(3) {
          background: #d3c2a4;
        }
        &:nth-child(4) {
          background: #ceead3;
        }
        &:nth-child(5) {
          background: #dbc2c9;
        }
      }
    }
  }

  &.night {
    .top {
      color: #adadaf;
      background: #333333;
    }
    .content {
      color: #adadaf;
      background: #000 !important;
      p {
        color: #adadaf;
        background: #000;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
    .bottom {
      color: #adadaf;
      background: #333333;
    }
  }
}
</style>