<template>
  <div class="task-center">
    <header>
      <div class="title">任务中心</div>
      <div class="sign">
        <div class="left">
          <p>
            您已连续签到<span>{{ signInDays }}</span
            >天
          </p>
          <p>连续签到可持续获得最高额奖励~</p>
        </div>
        <div class="right" v-if="signInDays == 0" @click="signIn">立即签到</div>
        <div class="right signed" v-else>已签到</div>
      </div>
    </header>

    <div class="rewardSection">
      <div v-for="(reward, index) in rewards" :key="index" class="rewardItem">
        <p>{{ reward.day }}</p>
        <van-image src="/assets/icon_task_red_package.png" />
        <p>{{ reward.coins }}</p>
      </div>
      <div class="rewardItemLast">
        <div class="left">
          <p>第7天</p>
          <p class="box">神秘大礼包</p>
        </div>
        <div class="right">
          <van-image src="/assets/icon_task_seven_day.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      signInDays: 0,
      rewards: [
        { day: "第1天", coins: 30 },
        { day: "第2天", coins: 30 },
        { day: "第3天", coins: 35 },
        { day: "第4天", coins: 35 },
        { day: "第5天", coins: 40 },
        { day: "第6天", coins: 45 },
      ],
    };
  },
  methods: {
    ...mapMutations(["changeBookCoupons"]),
    signIn() {
      this.signInDays++;
      this.changeBookCoupons()
    },
  },
};
</script>

<style lang="less" scoped>
.task-center {
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f5f5f5;
  header {
    height: 200rem;
    background: url("@/assets/bg_task_top.png");
    background-size: cover;
    background-position: 100%;
    padding: 0 10px;
    .title {
      height: 50rem;
      line-height: 50rem;
      text-align: center;
    }
    .sign {
      height: 80rem;
      margin-top: 20rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14rem;
      .left {
        color: #bb591f;
        span {
          font-size: 20rem;
          flex-wrap: 600;
        }
      }
      .right {
        width: 80rem;
        height: 34rem;
        border-radius: 5rem;
        line-height: 34rem;
        text-align: center;
        color: white;
        background: #f86c09;
        &.signed{
          background: #FCBD7E;
        }
      }
    }
  }
  .rewardSection {
    width: 350rem;
    height: 249rem;
    background-color: #fff;
    margin: -50rem auto 20rem;
    border-radius: 5rem;
    display: flex;
    flex-wrap: wrap;
    .rewardItem {
      width: 70rem;
      height: 90rem;
      margin: 10rem 0 0 10rem;
      background-color: #f5f5f5;
      text-align: center;
      p {
        padding: 0;
        margin: 5rem 0;
      }
      .van-image {
        width: 25rem;
        height: 27rem;
      }
    }
    .rewardItemLast {
      width: 150rem;
      height: 90rem;
      margin: 10rem 0 0 10rem;
      background-color: #f5f5f5;
      text-align: center;
      display: flex;

      .left {
        width: 90rem;
        height: 90rem;
        .box {
          color: #a6a6a6;
        }
      }
      .right {
        width: 60rem;
        height: 90rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-image {
          width: 40rem;
          height: 40rem;
        }
      }
    }
  }
}

.dailyTasksSection {
  background-color: #fff;
  padding: 10px;
}

.taskItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.taskItem:last-child {
  border-bottom: none;
}
</style>