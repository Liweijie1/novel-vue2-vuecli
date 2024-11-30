<template>
  <div class="novelExpress">
    <div class="top"> 
      
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
export default {
  props:["novelExpress"],
  created() {
    console.log(123,this.novelExpress);
  },
};
</script>

<style lang="scss" scoped>
.novelExpress{
  width: 350rem;
  margin: auto;
  
}
</style>