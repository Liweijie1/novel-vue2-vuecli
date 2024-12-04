<template>
  <div class="bookDetail" v-if="book">
    <div
      class="bg"
      :style="{ 'background-image': `url(${bookCoverImage})` }"
    ></div>

    <header>
      <van-image @click="$router.back()" src="/assets/icon_back_white.png" />
    </header>

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
        <div class="bookTotalCount van-ellipsis">{{ bookTotalCount }}万字</div>
      </div>
    </section>

    <section class="detail">
      <section class="introduction">
        <div class="titel">内容简介</div>
        <div class="content van-multi-ellipsis--l2">{{ bookContent }}</div>
      </section>

      <section class="catalog" @click="gotoContentsView">
        <div class="titel">查看章节目录</div>
        <div class="content van-multi-ellipsis--l2">
          连载至{{ bookCatalogNum }}章
        </div>
        <div class="upTime">更新于{{ formattedDate }} ></div>
      </section>

      <div class="bar"></div>

      <div class="firstCatalog">
        <div class="title">第一章</div>
        <div class="contentBox" ref="contentBox">
          <div class="content" v-html="bookFirstChapterContent"></div>
          <div class="read" @click="readHandle">
            <div class="mask"></div>
            <div class="text">{{ read }}</div>
          </div>
        </div>
      </div>

      <div class="bar"></div>
    </section>

    <footer>
      <div class="join" @click="joinHandle">
        <van-image src="/assets/icon_detail_add.png" />
        <span v-if="!isInShelf">加入书架</span>
        <span v-else>已加入</span>
      </div>
      <div class="read" @click="readHandleTwo">
        <van-image src="/assets/icon_detail_read.png" />
        <span>继续阅读</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { getBookInfo, getBookDetail, getChapterContent } from "@/api/index.js";
export default {
  data() {
    return {
      book: null,
      bookCoverImage: null,
      bookTitle: null,
      bookAuthor: null,
      bookTotalCount: null,
      bookContent: null,
      bookCatalogNum: null,
      bookUpdateTime: null,
      bookFirstChapterId: null,
      bookFirstChapterContent: null,
      read: "抢先阅读 >",
      readClick: false,
      token: JSON.parse(localStorage.getItem("token")),
      shelf: JSON.parse(localStorage.getItem("shelf")),
      isInShelf: false,
      defaultImg: "/assets/default.png",
    };
  },
  computed: {
    formattedDate() {
      let date = new Date(this.bookUpdateTime);
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    readHandle() {
      if (!this.readClick) {
        this.read = "继续阅读 >";
        this.$refs.contentBox.style = "height: 500rem;";
        this.readClick = !this.readClick;
      } else {
        this.$router.push({
          path: "/novel-content",
          query: {
            bookId: this.$route.query.bookId,
            catalogId: this.bookFirstChapterId,
          },
        });
      }
    },
    readHandleTwo() {
      this.$router.push({
        path: "/novel-content",
        query: {
          bookId: this.$route.query.bookId,
          catalogId: this.bookFirstChapterId,
        },
      });
    },
    gotoContentsView() {
      this.$router.push({
        path: "/novel-contents",
        query: { bookId: this.$route.query.bookId },
      });
    },
    joinHandle() {
      this.shelf = JSON.parse(localStorage.getItem("shelf"));
      const userShelf = this.shelf.find((obj) => {
        return this.token in obj;
      });
      if (!userShelf[this.token].includes(this.$route.query.bookId)) {
        userShelf[this.token].push(this.$route.query.bookId);
      } else if (userShelf) {
        userShelf[this.token] = userShelf[this.token].filter(
          (item) => item !== this.$route.query.bookId
        );
      }
      localStorage.setItem("shelf", JSON.stringify(this.shelf));
    },
    handleError() {
      this.bookCoverImage = this.defaultImg;
    },
  },
  watch: {
    shelf() {
      const userShelf = this.shelf.find((obj) => {
        return this.token in obj;
      });
      if (
        userShelf &&
        !userShelf[this.token].includes(this.$route.query.bookId)
      ) {
        this.isInShelf = false;
      } else {
        this.isInShelf = true;
      }
    },
  },
  created() {
    getBookInfo(this.$route.query.bookId).then((res) => {
      this.book = res.data.data.book;
      this.bookCoverImage = this.book.coverImage;
      this.bookTitle = this.book.title;
      this.bookAuthor = this.book.author;
      this.bookTotalCount = this.book.totalCount;
      if (this.bookTotalCount > 10000) {
        this.bookTotalCount = (this.bookTotalCount / 10000).toFixed(1);
      }
      this.bookCatalogNum = res.data.data.catalog.length + 1;
      this.bookUpdateTime = this.book.updateTime;
      if (res.data.data.catalog[0].wordCount) {
        this.bookFirstChapterId = res.data.data.catalog[0].uuid;
      } else {
        this.bookFirstChapterId = res.data.data.catalog[1].uuid;
      }
      getChapterContent(this.$route.query.bookId, this.bookFirstChapterId).then(
        (res) => {
          this.bookFirstChapterContent = res.data.data?.content;
        }
      );
    });

    getBookDetail(this.$route.query.bookId).then((res) => {
      this.bookContent = res.data?.feed?.entry?.content?.text;
    });

    const userShelf = this.shelf.find((obj) => {
      return this.token in obj;
    });
    if (
      userShelf &&
      !userShelf[this.token].includes(this.$route.query.bookId)
    ) {
      this.isInShelf = false;
    } else {
      this.isInShelf = true;
    }
  },
};
</script>

<style lang="scss">
.bookDetail {
  padding-bottom: 50rem;
  position: relative;
  .bg {
    width: 100vw;
    height: 100vh;
    background-size: 136%;
    background-repeat: no-repeat;
    background-position: 10% 10%;
    filter: blur(18px);
    position: fixed;
    z-index: -1;
  }

  header {
    padding: 20rem;
    .van-image {
      width: 11rem;
      height: 17rem;
    }
  }

  .info {
    margin-top: 33rem;
    display: flex;

    .van-image.left {
      width: 107rem;
      height: 144rem;
      margin-left: 10rem;
    }

    .right {
      display: flex;
      flex-direction: column;
    }
  }

  .detail {
    padding: 16rem 12rem;
    margin-top: 10rem;
    border-radius: 5rem 5rem 0 0;
    background: white;
    .introduction {
      .titel {
        font-weight: 600;
        font-size: 16rem;
        margin-bottom: 18rem;
      }
      .content {
        font-size: 14rem;
        color: #75838b;
      }
    }

    .catalog {
      height: 18rem;
      line-height: 18rem;
      display: flex;
      align-items: center;
      margin: 20rem 0;
      .titel {
        font-weight: 600;
        font-size: 16rem;
      }
      .content {
        font-size: 12rem;
        color: #75838b;
        margin-left: 10rem;
      }
      .upTime {
        font-size: 12rem;
        color: #75838b;
        margin-left: 60rem;
      }
    }

    .bar {
      width: 100vw;
      height: 6rem;
      background: #f6f7fa;
      position: relative;
      left: -12rem;
    }

    .firstCatalog {
      margin: 30rem 0 20rem;
      .firstCatalog {
        font-size: 16rem;
      }
      .contentBox {
        height: 300rem;
        overflow: hidden;
        position: relative;
        text-overflow: ellipsis;
        .content {
          font-size: 16rem;
          color: #76848c;
          text-indent: 2em;
          h1 {
            display: none;
          }
        }
        .read {
          width: 100%;
          height: 45rem;
          position: absolute;
          bottom: 0rem;
          .mask {
            height: 20rem;
            background: linear-gradient(
              to top,
              white 10%,
              rgba(255, 255, 255, 0.379)
            );
          }
          .text {
            width: 100%;
            height: 25rem;
            line-height: 25rem;
            text-align: center;
            background: white;
            font-size: 12rem;
            color: #f86e0c;
          }
        }
      }
    }
  }

  footer {
    width: 100vw;
    height: 50rem;
    position: fixed;
    bottom: 0;
    display: flex;
    .join,
    .read {
      width: 50%;
      height: 100%;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-image {
        width: 20rem;
        height: 20rem;
        margin-right: 10rem;
      }
    }
    .read {
      background: #fcdd22;
    }
  }
}
</style>