<template>
  <div class="classificationItem" @click="gotoClassification">
    <div class="title">{{cateName}}</div>
  </div>
</template>

<script>

export default {
  props:["cateId","cateName"],
  methods:{
    gotoClassification(){
      this.$router.push({
        path:"/classification",
        query:{
          catId: this.cateId,
          bookStatus:0,
          page:1,
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.classificationItem{
  width: 112rem;
  height: 135rem;
  background: #F5F5F5;
  margin-top: 8rem;
}
</style>