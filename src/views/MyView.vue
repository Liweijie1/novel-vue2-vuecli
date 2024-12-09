<template>
  <div class="my">
    <div class="set">
      <van-image src="/assets/icon_mine_setting.png" />
    </div>
    <div class="user" @click="gotoLogin">
      <div class="top">
        <div class="left">
          <van-image src="/assets/icon_mine_avater.png" />
        </div>
        <div class="right">
          <div class="userName">{{ token }}</div>
          <div class="userId">ID 87{{token.slice(7)}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="item">
          <div>0</div>
          <span>我的书币</span>
        </div>
        <div class="line"></div>
        <div class="item">
          <div>{{bookCoupons}}</div>
          <span>我的书劵</span>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="item">
        <van-image src="/assets/icon_recharge_history.png" />
        <span>充值记录</span>
      </div>
      <div class="item">
        <van-image src="/assets/icon_pay_history.png" />
        <span>消费记录</span>
      </div>
      <div class="item"  @click="$router.push({path:'/read-history'})">
        <van-image src="/assets/icon_history.png"/>
        <span>阅读历史</span>
      </div>
      <div class="item">
        <van-image src="/assets/icon_like.png" />
        <span>阅读喜好</span>
      </div>
    </div>
    <div class="option">
      <div class="item">
        <van-image src="/assets/icon_mine_account.png" />
        <span>我的账户</span>
      </div>
      <div class="item">
        <van-image src="/assets/icon_mine_service.png" />
        <span>联系客服</span>
      </div>
      <div class="item">
        <van-image src="/assets/icon_feedback.png" />
        <span>意见反馈</span>
      </div>
      <div class="item">
        <van-image src="/assets/icon_mine_protocol.png" />
        <span>用户协议</span>
      </div>
      <div class="item">
        <van-image src="/assets/icon_mine_cache.png" />
        <span>清除缓存</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      token: JSON.parse(localStorage.getItem("token")),
    };
  },
  computed: {
    ...mapState(["bookCoupons"]),
  },
  methods: {
    gotoLogin() {
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.my {
  min-height: 100vh;
  padding: 0 12rem;
  box-sizing: border-box;
  background: #f6f7fa;
 
  .set {
    height: 45rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-image {
      height: 22rem;
      margin-left: 24rem;
    }
  }
  .user {
    height: 166rem;
    background: white;
    .top {
      padding: 20rem 0 0 10rem;
      display: flex;
      align-content: center;
      .left {
        width: 50rem;
        height: 50rem;
        border-radius: 50%;
        .van-image {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        margin-left: 10rem;
        .userName {
          margin-top: 3rem;
          font-size: 14rem;
        }
        .userId {
          margin-top: 10rem;
          font-size: 12rem;
        }
      }
    }
    .bottom {
      margin-top: 20rem;
      display: flex;
      justify-content: space-around;
      .item {
        width: 100rem;
        height: 45rem;
        text-align: center;
        div {
          color: #f86c09;
          font-size: 18rem;
          font-weight: 600;
          margin-bottom: 12rem;
        }
        span {
          font-size: 14rem;
        }
      }
      .line {
        width: 3rem;
        height: 45rem;
        background: #000;
      }
    }
  }

  .middle {
    width: 350rem;
    height: 100rem;
    margin: 17rem auto;
    background: white;
    border-radius: 5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      width: 70rem;
      font-size: 14rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .van-image {
        width: 45rem;
        height: 45rem;
        margin: 0 auto 8rem;
      }
    }
  }

  .option {
    background: white;
    border-radius: 5rem;
    padding-bottom: 22rem;
    .item {
      padding: 25rem 0 0 10rem;
      height: 25rem;
      font-size: 18rem;
      display: flex;
      align-items: center;
      .van-image {
        width: 22rem;
        height: 22rem;
      }
      span {
        line-height: 22rem;
        margin-left: 12rem;
      }
    }
  }
}
</style>
