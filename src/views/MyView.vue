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
          <div class="userName">{{token}}</div>
          <div class="userId">ID 873998</div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      token: JSON.parse(localStorage.getItem("token")),
    }
  },
  methods:{
    gotoLogin(){
      this.$router.push({
        path:"/login"
      })
    }
  }
};
</script>

<style lang="less" scoped>
.my {
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
  }
}
</style>
