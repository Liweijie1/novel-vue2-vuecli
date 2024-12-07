<template>
  <div class="bookCity">
    <header>
      <nav>
        <router-link to="/male-channel">男频</router-link>
        <router-link to="/female-channel">女频</router-link>
      </nav>
      <input type="text" />
    </header>
    <transition name="xxx">
      <router-view class="router" />
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bookCity {
  width: 100vw;
  margin-bottom: 60px;
  padding-top: 50rem;
  header {
    width: 100vw;
    height: 50rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
    position: fixed;
    top: 0;
    z-index: 2;
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
  .xxx-enter-active,
  .xxx-leave-active {
    transition: all 0.5s;
  }

  .xxx-enter {
    transform: translateX(100%);
  }
  .xxx-enter-to,
  .xxx-leave {
    transform: translateX(0%);
  }

  .xxx-leave-to {
    transform: translateX(-100%);
  }
}
</style>
