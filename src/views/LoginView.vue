<template>
  <div class="login">
    <section class="top">
      <van-image src="/assets/back_lanse.png" @click="$router.back()" />
      <span>登录</span>
    </section>
    <section class="logo">
      <van-image src="/assets/ic_launcher.png" @click="$router.back()" />
    </section>
    <section class="middle">
      <div class="phone">
        <input
          type="tel"
          v-model="phone"
          placeholder="请输入您的手机号"
          pattern="[0-9]{11}"
        />
      </div>
      <div class="code">
        <input type="text" v-model="code" placeholder="请输入验证码" />
        <span @click="showPopup">获取验证码</span>
        <van-popup
          closeable
          close-icon-position="top-right"
          v-model="show"
          position="top"
          :style="{ height: '60rem' }"
        >
          <div>您的验证码为:1234</div>
        </van-popup>
      </div>
      <div class="tip">*请确保手机能够接收验证码</div>
      <div
        class="loginBtn"
        closeable
        :class="{ active: isActive }"
        @click="loginHandle"
      >
        登录
      </div>
      <div class="tipTwo">第一次登录会自动帮您注册账号</div>
    </section>
    <section class="bottom">
      <input
        type="checkBox"
        :checked="isChecked"
        @click="isChecked = !isChecked"
      />
      <div>我已经阅读并同意<span>用户协议</span>和<span>隐私协议</span></div>
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      phone: "",
      code: "",
      isActive: false,
      checkBoxVal: true,
      show: false,
      isChecked: true,
      users: JSON.parse(localStorage.getItem("users")),
      shelf:JSON.parse(localStorage.getItem("shelf"))
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    loginHandle() {
      if ( this.code != "1234") {
        Toast("请输入正确的验证码");
      } else if (!this.isChecked) {
        Toast("请勾选我已经阅读并同意用户协议和隐私协议");
      } else {
        let userExist = this.users.find((item) => {
          return item === this.phone;
        });
        if (!userExist) {
          this.users.push(this.phone)
          this.shelf.push({[this.phone]:[]})
          localStorage.setItem("users",JSON.stringify(this.users));
          localStorage.setItem("token",JSON.stringify(this.phone));
          localStorage.setItem("shelf",JSON.stringify(this.shelf));
          this.$router.back()
        }else{
          localStorage.setItem("token",JSON.stringify(this.phone));
          this.$router.back()
        }
      }
    },
  },
  watch: {
    phone() {
      if (this.phone.length == 11 && this.code.length == 4) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
    code() {
      if (this.phone.length == 11 && this.code.length == 4) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
  },
};
</script>

<style lang="less">
.login {
  height: 100vh;
  position: relative;
  .top {
    width: 100vw;
    height: 55rem;
    background: white;
    display: flex;
    align-items: center;
    .van-image {
      width: 8rem;
      height: 20rem;
      margin-left: 24rem;
    }
    span {
      font-size: 18rem;
      margin-left: 138rem;
    }
  }

  .logo {
    width: 100%;
    height: 140rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-image {
      height: 90rem;
    }
  }

  .middle {
    padding: 0 30rem;
    .phone,
    .code {
      height: 60rem;
      border-bottom: 1px solid #f3f3f3;
      input {
        height: 60rem;
        line-height: 60rem;
        font-size: 16rem;
        border: none;
      }
    }
    .code {
      span {
        height: 60rem;
        line-height: 60rem;
        float: right;
        display: block;
        margin-right: 10rem;
      }
      .van-popup {
        div {
          width: 100%;
          height: 50rem;
          line-height: 60rem;
          text-align: center;
        }
      }
    }

    .tip {
      font-size: 12rem;
      color: red;
      padding: 15rem;
    }

    .loginBtn {
      height: 40rem;
      line-height: 40rem;
      text-align: center;
      border-radius: 5rem;
      background: #fcdd22;
      opacity: 0.5;
      &.active {
        opacity: 1;
      }
    }

    .tipTwo {
      margin-top: 12rem;
      color: #a6a6a6;
      font-size: 12rem;
    }
  }

  .bottom {
    width: 100%;
    height: 16rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20rem;
    input {
      width: 16rem;
      height: 16rem;
    }
    div {
      color: #a6a6a6;
      font-size: 14rem;
      span {
        color: #fce243;
        text-decoration: underline;
      }
    }
  }
}
</style>