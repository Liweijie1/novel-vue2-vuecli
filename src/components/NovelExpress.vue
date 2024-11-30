<template>
  <div class="novelExpress">
    <div class="top"> 
      
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["novelExpress"]),
  },
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