<template>
  <div class="bread-crumb">
    <!-- <h1><router-link to="/" tag="a">Dashboard</router-link> /  {{this.$route.params.title || this.$route.name}}</h1> -->
  </div>
</template>

<script>
  import utils from '../mixins/utils';
  import ajax from '../mixins/ajax';

export default {
    data () {
    return {
      posts: [],
      page: 1,
      totalPages: null
    }
  },
  created: function () {
    if(this.$route.name === 'page') {
      this.page = this.$route.params.page;
    }
  }
}
</script>


<style>
/* .bread-crumb {
  margin-right: -13.5%;background-color: #ebebeb; padding: 1%;width: 100%;
}
@media all and (max-width: 1200px) { 
  .bread-crumb {
    margin-left: 15%;
  }
 } */
</style>